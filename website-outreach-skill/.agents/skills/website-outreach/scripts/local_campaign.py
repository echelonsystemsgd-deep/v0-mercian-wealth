"""Run the outreach queue against a locally authorized Gmail API account."""

import argparse
import contextlib
import io
import json
import re
import sqlite3
import sys
import time
from pathlib import Path

import gmail_client
import queue_manager as queue


ROOT = Path(__file__).resolve().parents[4]
DB = Path(queue.DB_PATH)


def call(fn, *args, **kwargs):
    output = io.StringIO()
    with contextlib.redirect_stdout(output):
        fn(*args, **kwargs)
    return json.loads(output.getvalue())


def config():
    return json.loads((ROOT / "config.json").read_text(encoding="utf-8"))


def preflight():
    setup = call(queue.validate_setup)
    if not setup["ready"]:
        raise RuntimeError("Setup issues: " + "; ".join(setup["issues"]))
    claims = call(queue.pending_claims)
    if claims["pending_claim_count"]:
        raise RuntimeError("Unresolved send claims: reconcile Gmail before continuing")
    profile = gmail_client.profile()
    return {"sender": profile["emailAddress"], "leads": setup["database_leads"]}


def reply_check():
    window = call(queue.reply_monitor_window)
    if not window["allowed"]:
        return {"allowed": False, "checked": 0, "replies": 0}
    candidates = call(queue.reply_check_candidates)["candidates"]
    replied = 0
    for lead in candidates:
        thread = gmail_client.thread(lead["thread_id"])
        messages = thread.get("messages", [])
        outbound = next((index for index, item in enumerate(messages)
                         if item["id"] == lead["last_message_id"]), None)
        if outbound is None:
            raise RuntimeError(f"Stored outbound message missing from lead {lead['id']} thread")
        for item in messages[outbound + 1:]:
            if "SENT" in item.get("labelIds", []):
                continue
            marked = call(queue.mark_replied, lead["id"], item["id"])
            if marked["notification_needed"]:
                snippet = item.get("snippet", "")[:300]
                subject = f"Lead replied: {lead['first_name']} from {lead['company']}"
                body = (f"Lead {lead['id']} ({lead['first_name']} {lead['last_name']}) replied.\n"
                        f"From: {lead['email']}\nThread: {lead['thread_id']}\n\n{snippet}")
                receipt = gmail_client.send(config()["secondary_alert_email"], subject, body)
                recorded = call(queue.record_reply_notification, lead["id"], receipt["id"])
                if not recorded["notification_recorded"]:
                    raise RuntimeError("Reply alert sent but receipt could not be recorded")
                replied += 1
            break
    return {"allowed": True, "checked": len(candidates), "replies": replied}


def send_due(test_leads=None):
    cfg = config()
    batch = call(queue.get_due_batch, max_limit=cfg["daily_max_outreach_emails"])["batch"]
    sent = []
    eligible = [task for task in batch if not test_leads or task["id"] in test_leads]
    for index, task in enumerate(eligible):
        lead_id = task["id"]
        step = task["action_type"]
        claim = call(queue.claim_send, lead_id, step)
        if not claim.get("claimed"):
            continue
        if re.search(r"{{[^}]+}}", claim["subject"] + claim["body"]):
            raise RuntimeError(f"Lead {lead_id} {step} contains an unresolved placeholder; claim locked")
        try:
            receipt = gmail_client.send(claim["to_email"], claim["subject"], claim["body"],
                                        claim["reply_message_id"], claim["thread_id"])
        except Exception as exc:
            raise RuntimeError(f"Gmail result uncertain for lead {lead_id} {step}; reconcile claim before retry") from exc
        result = call(queue.record_sent, lead_id, step, receipt["thread_id"], receipt["id"],
                      claim["claim_token"], claim["subject"] if step == "PITCH" else "")
        if not result.get("success"):
            raise RuntimeError(f"Lead {lead_id} {step} sent but not recorded; reconcile before retry")
        sent.append({"lead_id": lead_id, "step": step, "message_id": receipt["id"]})
        if index < len(eligible) - 1:
            delay = call(queue.get_send_delay)["delay_seconds"]
            time.sleep(delay)
    return sent


def final_test_notification(test_leads, delays):
    with sqlite3.connect(DB) as conn:
        rows = conn.execute("SELECT id, status FROM leads WHERE id IN ({})".format(
            ",".join("?" for _ in test_leads)), tuple(test_leads)).fetchall()
        if len(rows) != len(test_leads) or not all(status == "FU3_SENT" for _, status in rows):
            return {"sent": False, "reason": "test sequence not complete"}
        conn.execute("CREATE TABLE IF NOT EXISTS test_notifications (key TEXT PRIMARY KEY, state TEXT, gmail_message_id TEXT)")
        try:
            conn.execute("INSERT INTO test_notifications (key,state) VALUES ('final_followup','CLAIMED')")
            conn.commit()
        except sqlite3.IntegrityError:
            return {"sent": False, "reason": "notification already claimed or sent"}
    subject = "Outreach test complete — final follow-up notification"
    cadence = "–".join(str(value) for value in delays)
    body = (f"The {cadence}-minute outreach test reached its final follow-up.\n"
            f"Test lead IDs: {', '.join(map(str, test_leads))}\n"
            "This is the single end-of-sequence notification test.")
    receipt = gmail_client.send(config()["secondary_alert_email"], subject, body)
    with sqlite3.connect(DB) as conn:
        conn.execute("UPDATE test_notifications SET state='SENT', gmail_message_id=? WHERE key='final_followup'",
                     (receipt["id"],))
    return {"sent": True, "message_id": receipt["id"]}


def test_run():
    check = preflight()
    cfg = config()
    delays = cfg.get("follow_up_delays_minutes", [])
    if (not cfg.get("test_mode") or len(delays) != 3
            or any(not isinstance(value, int) or value < 1 for value in delays)):
        raise RuntimeError("Test requires test_mode=true and three positive minute delays")
    with sqlite3.connect(DB) as conn:
        leads = conn.execute("SELECT id,email FROM leads ORDER BY id").fetchall()
    expected_count = int(cfg.get("test_lead_count", 2))
    if len(leads) != expected_count:
        raise RuntimeError(f"Test requires exactly {expected_count} imported leads")
    test_leads = {lead_id for lead_id, _ in leads}
    approved = {email.lower() for email in cfg.get("test_allowed_recipient_emails", [])}
    recipients = {email.lower() for _, email in leads}
    if not approved or not recipients.issubset(approved):
        raise RuntimeError("Every test recipient must appear in config test_allowed_recipient_emails")
    print(json.dumps({"preflight": check, "recipients": sorted(recipients), "cadence": delays}), flush=True)
    for stage in range(4):
        sent = send_due(test_leads)
        print(json.dumps({"stage": stage + 1, "sent": sent}), flush=True)
        if stage < 3:
            print(json.dumps({"reply_check": stage + 1, "result": reply_check()}), flush=True)
        if stage < 3:
            minutes = cfg["follow_up_delays_minutes"][stage]
            time.sleep(minutes * 60 + 5)
    print(json.dumps({"final_notification": final_test_notification(test_leads, delays)}), flush=True)
    print(json.dumps({"verification": call(queue.verify_run)}), flush=True)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("command", choices=["preflight", "reply-check", "send-due", "cycle", "run-test"])
    args = parser.parse_args()
    try:
        if args.command == "preflight":
            result = preflight()
        elif args.command == "reply-check":
            result = reply_check()
        elif args.command == "send-due":
            preflight()
            result = send_due()
        elif args.command == "cycle":
            preflight()
            checked = reply_check()
            result = {"reply_check": checked, "sent": send_due() if checked["allowed"] else []}
        else:
            test_run()
            return
        print(json.dumps(result))
    except Exception as exc:
        print(json.dumps({"error": str(exc)}), file=sys.stderr)
        raise SystemExit(1)


if __name__ == "__main__":
    main()
