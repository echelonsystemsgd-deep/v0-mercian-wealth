"""Local Gmail API transport for the outreach queue. No Codex connector required."""

import argparse
import base64
import json
import os
import sys
from email.message import EmailMessage
from functools import lru_cache
from pathlib import Path
from urllib.parse import quote

from google.auth.transport.requests import AuthorizedSession, Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow


ROOT = Path(__file__).resolve().parents[4]
SCOPES = [
    "https://www.googleapis.com/auth/gmail.send",
    "https://www.googleapis.com/auth/gmail.readonly",
]
TOKEN = Path(os.environ.get("LOCALAPPDATA", str(Path.home()))) / "website-outreach" / "gmail-token.json"
BASE = "https://gmail.googleapis.com/gmail/v1/users/me"


def client_file():
    configured = os.environ.get("OUTREACH_GOOGLE_CREDENTIALS")
    files = [Path(configured)] if configured else list(ROOT.glob("client_secret_*.json"))
    if len(files) != 1 or not files[0].is_file():
        raise RuntimeError("Expected one Desktop-app client_secret_*.json in the project root")
    data = json.loads(files[0].read_text(encoding="utf-8"))
    if "installed" not in data:
        raise RuntimeError("Google OAuth client must have application type Desktop app")
    return files[0]


def session(interactive=False):
    credentials = None
    if TOKEN.exists():
        credentials = Credentials.from_authorized_user_file(str(TOKEN), SCOPES)
    if credentials and credentials.expired and credentials.refresh_token:
        credentials.refresh(Request())
    if not credentials or not credentials.valid:
        if not interactive:
            raise RuntimeError("Gmail authorization is missing; run gmail_client.py auth first")
        flow = InstalledAppFlow.from_client_secrets_file(str(client_file()), SCOPES)
        credentials = flow.run_local_server(port=0, open_browser=True, prompt="consent")
    TOKEN.parent.mkdir(parents=True, exist_ok=True)
    TOKEN.write_text(credentials.to_json(), encoding="utf-8")
    return AuthorizedSession(credentials)


def request(method, path, *, params=None, body=None):
    response = getattr(session(), method.lower())(BASE + path, params=params, json=body, timeout=30)
    response.raise_for_status()
    return response.json()


@lru_cache(maxsize=1)
def profile():
    return request("GET", "/profile")


def message(message_id):
    return request("GET", "/messages/" + quote(message_id, safe=""),
                   params={"format": "metadata", "metadataHeaders": ["Message-ID", "References"]})


def thread(thread_id):
    return request("GET", "/threads/" + quote(thread_id, safe=""), params={"format": "full"})


def headers(item):
    return {h["name"].lower(): h["value"] for h in item.get("payload", {}).get("headers", [])}


def send(to, subject, body, reply_message_id="", thread_id=""):
    if bool(reply_message_id) != bool(thread_id):
        raise ValueError("Follow-ups require both the previous Gmail message ID and thread ID")
    mail = EmailMessage()
    mail["From"] = profile()["emailAddress"]
    mail["To"] = to
    mail["Subject"] = subject
    mail.set_content(body)
    payload = {}
    if reply_message_id:
        previous = headers(message(reply_message_id))
        rfc_id = previous.get("message-id")
        if not rfc_id:
            raise RuntimeError("Previous message has no RFC Message-ID; cannot safely thread follow-up")
        mail["In-Reply-To"] = rfc_id
        mail["References"] = (previous.get("references", "") + " " + rfc_id).strip()
        payload["threadId"] = thread_id
    payload["raw"] = base64.urlsafe_b64encode(mail.as_bytes()).decode("ascii")
    result = request("POST", "/messages/send", body=payload)
    if not result.get("id") or not result.get("threadId"):
        raise RuntimeError("Gmail returned no message or thread ID; reconcile before retrying")
    if thread_id and result["threadId"] != thread_id:
        raise RuntimeError("Gmail returned a different thread; reconcile before retrying")
    return {"id": result["id"], "thread_id": result["threadId"]}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("command", choices=["auth", "profile"])
    args = parser.parse_args()
    try:
        if args.command == "auth":
            session(interactive=True)
        print(json.dumps({"authorized": True, "email": profile()["emailAddress"]}))
    except Exception as exc:
        print(json.dumps({"authorized": False, "error": str(exc)}), file=sys.stderr)
        raise SystemExit(1)


if __name__ == "__main__":
    main()
