#!/usr/bin/env python3
"""
queue_manager.py - Universal Lead Parser, State Machine & 30-Email/Day Allocator
Zero external dependencies (uses standard library: sqlite3, csv, json, re, datetime).
"""

import os
import sys
import csv
import json
import re
import secrets
import sqlite3
import argparse
from datetime import datetime, date, timedelta
from zoneinfo import ZoneInfo

def find_root_dir():
    current = os.path.dirname(os.path.abspath(__file__))
    while current and os.path.dirname(current) != current:
        if os.path.exists(os.path.join(current, "leads")) or os.path.exists(os.path.join(current, "templates")):
            return current
        current = os.path.dirname(current)
    return os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..", ".."))

ROOT_DIR = find_root_dir()
DB_DIR = os.path.join(ROOT_DIR, "data")
DB_PATH = os.environ.get('OUTREACH_DB_PATH', os.path.join(DB_DIR, "outreach.db"))
CALL_LIST_PATH = os.path.join(ROOT_DIR, "leads", "call_list.csv")

def get_db():
    os.makedirs(DB_DIR, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db(reset=False):
    conn = get_db()
    cur = conn.cursor()
    if reset:
        cur.execute("DROP TABLE IF EXISTS leads")
        cur.execute("DROP TABLE IF EXISTS daily_logs")
        cur.execute("DROP TABLE IF EXISTS email_sends")

    cur.execute("""
    CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        first_name TEXT DEFAULT '',
        last_name TEXT DEFAULT '',
        company TEXT DEFAULT '',
        website_domain TEXT DEFAULT '',
        phone TEXT DEFAULT '',
        position TEXT DEFAULT '',
        page TEXT DEFAULT '',
        website_problem TEXT DEFAULT '',
        recognizable_reason TEXT DEFAULT '',
        consequence_mechanics TEXT DEFAULT '',
        preview_asset_exists INTEGER DEFAULT 0,
        review_time INTEGER,
        micro_yes TEXT DEFAULT '',
        subject_label TEXT DEFAULT '',
        pitch_sent INTEGER DEFAULT 0,
        pitch_subject TEXT DEFAULT '',
        pitch_body TEXT DEFAULT '',
        pitch_message_id TEXT DEFAULT '',
        pitch_sent_at TEXT DEFAULT '',
        followup1_sent INTEGER DEFAULT 0,
        followup1_subject TEXT DEFAULT '',
        followup1_body TEXT DEFAULT '',
        followup1_message_id TEXT DEFAULT '',
        followup1_sent_at TEXT DEFAULT '',
        followup2_sent INTEGER DEFAULT 0,
        followup2_subject TEXT DEFAULT '',
        followup2_body TEXT DEFAULT '',
        followup2_message_id TEXT DEFAULT '',
        followup2_sent_at TEXT DEFAULT '',
        followup3_sent INTEGER DEFAULT 0,
        followup3_subject TEXT DEFAULT '',
        followup3_body TEXT DEFAULT '',
        followup3_message_id TEXT DEFAULT '',
        followup3_sent_at TEXT DEFAULT '',
        replied INTEGER DEFAULT 0,
        reply_message_id TEXT DEFAULT '',
        replied_at TEXT DEFAULT '',
        reply_notification_sent INTEGER DEFAULT 0,
        reply_notification_message_id TEXT DEFAULT '',
        reply_notification_sent_at TEXT DEFAULT '',
        original_subject TEXT DEFAULT '',
        sequence_completed INTEGER DEFAULT 0,
        sequence_completed_at TEXT DEFAULT '',
        call_lead INTEGER DEFAULT 0,
        status TEXT DEFAULT 'QUEUED',
        current_step INTEGER DEFAULT 0,
        last_sent_at TEXT DEFAULT '',
        next_action_due TEXT DEFAULT '',
        last_message_id TEXT DEFAULT '',
        thread_id TEXT DEFAULT '',
        notes TEXT DEFAULT '',
        created_at TEXT NOT NULL,
        UNIQUE(email, website_domain, first_name, last_name)
    );
    """)
    cur.execute("""
    CREATE TABLE IF NOT EXISTS daily_logs (
        log_date TEXT PRIMARY KEY,
        sent_count INTEGER DEFAULT 0,
        pitch_count INTEGER DEFAULT 0,
        fu1_count INTEGER DEFAULT 0,
        fu2_count INTEGER DEFAULT 0,
        fu3_count INTEGER DEFAULT 0
    );
    """)
    cur.execute("""
    CREATE TABLE IF NOT EXISTS email_sends (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lead_id INTEGER NOT NULL,
        step TEXT NOT NULL,
        state TEXT NOT NULL DEFAULT 'CLAIMED',
        claim_token TEXT NOT NULL UNIQUE,
        gmail_message_id TEXT UNIQUE,
        gmail_thread_id TEXT DEFAULT '',
        claimed_at TEXT NOT NULL,
        sent_at TEXT DEFAULT '',
        UNIQUE(lead_id, step)
    );
    """)
    cur.execute("PRAGMA table_info(leads)")
    columns = [row[1] for row in cur.fetchall()]
    migrations = {
        'position': "TEXT DEFAULT ''",
        'pitch_sent': 'INTEGER DEFAULT 0',
        'pitch_subject': "TEXT DEFAULT ''",
        'pitch_body': "TEXT DEFAULT ''",
        'pitch_message_id': "TEXT DEFAULT ''",
        'pitch_sent_at': "TEXT DEFAULT ''",
        'followup1_sent': 'INTEGER DEFAULT 0',
        'followup1_subject': "TEXT DEFAULT ''",
        'followup1_body': "TEXT DEFAULT ''",
        'followup1_message_id': "TEXT DEFAULT ''",
        'followup1_sent_at': "TEXT DEFAULT ''",
        'followup2_sent': 'INTEGER DEFAULT 0',
        'followup2_subject': "TEXT DEFAULT ''",
        'followup2_body': "TEXT DEFAULT ''",
        'followup2_message_id': "TEXT DEFAULT ''",
        'followup2_sent_at': "TEXT DEFAULT ''",
        'followup3_sent': 'INTEGER DEFAULT 0',
        'followup3_subject': "TEXT DEFAULT ''",
        'followup3_body': "TEXT DEFAULT ''",
        'followup3_message_id': "TEXT DEFAULT ''",
        'followup3_sent_at': "TEXT DEFAULT ''",
        'replied': 'INTEGER DEFAULT 0',
        'reply_message_id': "TEXT DEFAULT ''",
        'replied_at': "TEXT DEFAULT ''",
        'reply_notification_sent': 'INTEGER DEFAULT 0',
        'reply_notification_message_id': "TEXT DEFAULT ''",
        'reply_notification_sent_at': "TEXT DEFAULT ''",
        'original_subject': "TEXT DEFAULT ''",
        'sequence_completed': 'INTEGER DEFAULT 0',
        'sequence_completed_at': "TEXT DEFAULT ''",
        'call_lead': 'INTEGER DEFAULT 0',
    }
    for column, definition in migrations.items():
        if column not in columns:
            cur.execute(f"ALTER TABLE leads ADD COLUMN {column} {definition}")

    conn.commit()
    conn.close()

def detect_columns(fieldnames, sample_rows):
    """
    Intelligently maps arbitrary CSV headers and row values to standard outreach fields.
    """
    mapping = {}
    lower_map = {f.lower().strip(): f for f in fieldnames}
    
    # 1. Email detection (aliases + regex value check)
    email_aliases = [
        'email_address', 'emailaddress', 'email', 'e-mail', 'mail', 
        'contact_email', 'work_email', 'personal_email', 'lead_email', 
        'e_mail', 'correo', 'courriel'
    ]
    for alias in email_aliases:
        if alias in lower_map:
            mapping['email'] = lower_map[alias]
            break
            
    if 'email' not in mapping:
        for f, orig in lower_map.items():
            if 'email' in f or 'mail' in f:
                mapping['email'] = orig
                break
                
    if 'email' not in mapping:
        # Check actual values in sample rows
        for orig in fieldnames:
            for r in sample_rows:
                v = r.get(orig, '').strip()
                if re.match(r'^[^@\s]+@[^@\s]+\.[^@\s]+$', v):
                    mapping['email'] = orig
                    break
            if 'email' in mapping:
                break

    # 2. First Name detection
    fn_aliases = ['first_name', 'firstname', 'first', 'fname', 'given_name', 'f_name', 'prenom']
    for alias in fn_aliases:
        if alias in lower_map:
            mapping['first_name'] = lower_map[alias]
            break

    # 3. Last Name detection
    ln_aliases = ['last_name', 'lastname', 'last', 'lname', 'surname', 'family_name', 'l_name', 'nom']
    for alias in ln_aliases:
        if alias in lower_map:
            mapping['last_name'] = lower_map[alias]
            break

    # 4. Full Name detection
    name_aliases = ['full_name', 'fullname', 'contact_name', 'lead_name', 'person', 'contact']
    for alias in name_aliases:
        if alias in lower_map:
            mapping['full_name'] = lower_map[alias]
            break

    # 5. Company detection
    comp_aliases = [
        'company', 'company_name', 'companyname', 'business', 'business_name', 
        'organization', 'organisation', 'account_name', 'restaurant', 'firm', 
        'agency', 'practice', 'clinic'
    ]
    for alias in comp_aliases:
        if alias in lower_map:
            mapping['company'] = lower_map[alias]
            break

    # Smart Ambiguity Resolution for 'name' header:
    # If there is a column called 'name' and we ALREADY have first_name or last_name, 'name' is definitely Company!
    if 'company' not in mapping and 'name' in lower_map:
        if 'first_name' in mapping or 'last_name' in mapping:
            mapping['company'] = lower_map['name']
        elif 'full_name' not in mapping:
            # Check values in 'name' to see if it looks like a business or person
            sample_text = ' '.join([r.get(lower_map['name'], '') for r in sample_rows]).lower()
            business_keywords = ['ltd', 'llc', 'inc', 'restaurant', 'bistro', 'cafe', 'bar', 'hotel', 'dental', 'clinic', 'group', 'services', 'co']
            if any(k in sample_text for k in business_keywords):
                mapping['company'] = lower_map['name']
            else:
                mapping['full_name'] = lower_map['name']

    # 6. Website detection
    web_aliases = ['website', 'website_domain', 'domain', 'url', 'site', 'web', 'homepage', 'web_address', 'link']
    for alias in web_aliases:
        if alias in lower_map:
            mapping['website'] = lower_map[alias]
            break
            
    if 'website' not in mapping:
        for orig in fieldnames:
            for r in sample_rows:
                v = r.get(orig, '').lower().strip()
                if v.startswith('http') or '.com' in v or '.co' in v or '.org' in v or '.net' in v:
                    mapping['website'] = orig
                    break
            if 'website' in mapping:
                break

    # 7. Phone detection
    phone_aliases = [
        'formatted_phone_number', 'phone_number', 'phonenumber', 'phone', 
        'telephone', 'mobile', 'tel', 'cell', 'contact_number', 'phone_num'
    ]
    for alias in phone_aliases:
        if alias in lower_map:
            mapping['phone'] = lower_map[alias]
            break

    # 8. Position / Job Title detection
    pos_aliases = ['position', 'title', 'job_title', 'jobtitle', 'role', 'occupation', 'headline']
    for alias in pos_aliases:
        if alias in lower_map:
            mapping['position'] = lower_map[alias]
            break

    return mapping

def inspect_csv(csv_path):
    if not os.path.exists(csv_path):
        print(json.dumps({"error": f"File not found: {csv_path}"}))
        return

    with open(csv_path, mode='r', encoding='utf-8-sig', errors='ignore') as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames or []
        sample_rows = []
        total_rows = 0
        for i, row in enumerate(reader):
            total_rows += 1
            if i < 3:
                sample_rows.append(row)

    mapping = detect_columns(fieldnames, sample_rows)
    print(json.dumps({
        "file": csv_path,
        "total_rows": total_rows,
        "raw_headers": fieldnames,
        "detected_mapping": mapping,
        "first_row_preview": sample_rows[0] if sample_rows else {}
    }, indent=2))

def clean_domain(url):
    if not url:
        return ""
    url = url.strip().lower()
    url = re.sub(r'^https?://', '', url)
    url = re.sub(r'^www\.', '', url)
    return url.split('/')[0]

def import_csv(csv_path, clear_existing=False, custom_mapping=None):
    init_db()
    if not os.path.exists(csv_path):
        print(json.dumps({"error": f"File not found: {csv_path}"}))
        return

    conn = get_db()
    cur = conn.cursor()

    # Check if existing DB only has placeholder leads
    cur.execute("SELECT COUNT(*) as cnt FROM leads")
    existing_count = cur.fetchone()['cnt']
    
    if clear_existing:
        cur.execute("DELETE FROM leads")
        cur.execute("DELETE FROM daily_logs")
        cur.execute("DELETE FROM email_sends")
        conn.commit()
    elif existing_count > 0:
        # Check if the existing leads are just the 5 placeholder demo leads (Vanguard Dental, Apex Architecture, etc.)
        cur.execute("SELECT email FROM leads LIMIT 5")
        emails = [r['email'] for r in cur.fetchall()]
        dummy_markers = ['@vanguarddental.com', '@apexarchitecture.co', '@harborviewbistro.com']
        if any(any(dm in em for dm in dummy_markers) for em in emails) and existing_count <= 5:
            # Auto-clear dummy leads so user leads take over cleanly
            cur.execute("DELETE FROM leads")
            conn.commit()

    with open(csv_path, mode='r', encoding='utf-8-sig', errors='ignore') as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames or []
        rows = list(reader)

    sample_rows = rows[:5]
    mapping = detect_columns(fieldnames, sample_rows)
    if custom_mapping:
        mapping.update(custom_mapping)

    now_str = datetime.now().isoformat()
    imported = 0
    skipped_duplicates = 0
    skipped_invalid = 0

    for row in rows:
        email_col = mapping.get('email')
        email = row.get(email_col, '').strip() if email_col else ''
        if not email or '@' not in email:
            skipped_invalid += 1
            continue

        first_name = ''
        last_name = ''
        if mapping.get('first_name'):
            first_name = row.get(mapping['first_name'], '').strip()
        if mapping.get('last_name'):
            last_name = row.get(mapping['last_name'], '').strip()
        if not first_name and mapping.get('full_name'):
            full = row.get(mapping['full_name'], '').strip()
            parts = full.split(' ', 1)
            first_name = parts[0]
            last_name = parts[1] if len(parts) > 1 else ''

        company = row.get(mapping.get('company'), '').strip() if mapping.get('company') else ''
        raw_website = row.get(mapping.get('website'), '').strip() if mapping.get('website') else ''
        website = clean_domain(raw_website)
        phone = row.get(mapping.get('phone'), '').strip() if mapping.get('phone') else ''
        position = row.get(mapping.get('position'), '').strip() if mapping.get('position') else ''

        try:
            cur.execute("""
                INSERT INTO leads (
                    email, first_name, last_name, company, website_domain, 
                    phone, position, status, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, 'QUEUED', ?)
            """, (email, first_name, last_name, company, website, phone, position, now_str))
            imported += 1
        except sqlite3.IntegrityError:
            skipped_duplicates += 1

    conn.commit()
    conn.close()

    print(json.dumps({
        "success": True,
        "csv_file": csv_path,
        "detected_mapping": mapping,
        "imported": imported,
        "skipped_duplicates": skipped_duplicates,
        "skipped_invalid_emails": skipped_invalid
    }, indent=2))

def save_audit(lead_id, audit_data, quiet=False):
    init_db()
    conn = get_db()
    cur = conn.cursor()
    cur.execute("""
        UPDATE leads SET
            page = ?,
            website_problem = ?,
            recognizable_reason = ?,
            consequence_mechanics = ?,
            preview_asset_exists = ?,
            review_time = ?,
            micro_yes = ?,
            subject_label = ?,
            status = CASE WHEN status = 'QUEUED' THEN 'AUDITED' ELSE status END
        WHERE id = ?
    """, (
        audit_data.get('page', ''),
        audit_data.get('website_problem', ''),
        audit_data.get('recognizable_reason', ''),
        audit_data.get('consequence_mechanics', ''),
        1 if audit_data.get('preview_asset_exists') else 0,
        audit_data.get('review_time'),
        audit_data.get('micro_yes', ''),
        audit_data.get('subject_label', ''),
        lead_id
    ))
    conn.commit()
    conn.close()
    result = {"success": True, "lead_id": lead_id}
    if not quiet:
        print(json.dumps(result))
    return result

def prepare_domain(domain, audit_data):
    """Apply one site audit to every unsent lead on the same domain and render all copy."""
    init_db()
    normalized = clean_domain(domain)
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT id FROM leads WHERE website_domain = ? AND pitch_sent = 0 ORDER BY id", (normalized,))
    lead_ids = [row['id'] for row in cur.fetchall()]
    conn.close()
    if not lead_ids:
        print(json.dumps({'success': False, 'domain': normalized, 'reason': 'no_unsent_leads'}))
        return
    for lead_id in lead_ids:
        save_audit(lead_id, audit_data, quiet=True)
        for step in ('PITCH', 'FU1', 'FU2', 'FU3'):
            result = render_email(lead_id, step, quiet=True)
            if result and result.get('error'):
                print(json.dumps(result))
                return
    print(json.dumps({'success': True, 'domain': normalized, 'prepared_lead_ids': lead_ids, 'rendered_messages': len(lead_ids) * 4}))

def audit_candidates():
    """Group unsent, unaudited leads by domain so each website is inspected once."""
    init_db()
    conn = get_db()
    cur = conn.cursor()
    cur.execute("""
        SELECT id, website_domain, company
        FROM leads
        WHERE pitch_sent = 0 AND replied = 0 AND website_problem = ''
        ORDER BY website_domain, id
    """)
    grouped = {}
    for row in cur.fetchall():
        item = grouped.setdefault(row['website_domain'], {
            'website_domain': row['website_domain'],
            'company': row['company'],
            'lead_ids': []
        })
        item['lead_ids'].append(row['id'])
    conn.close()
    print(json.dumps({'unique_domains': len(grouped), 'sites': list(grouped.values())}))

def get_due_batch(target_date=None, max_limit=30, full=False):
    init_db()
    today_str = target_date if target_date else date.today().isoformat()
    config_path = os.path.join(ROOT_DIR, 'config.json')
    with open(config_path, 'r', encoding='utf-8') as f:
        config = json.load(f)
    due_cutoff = datetime.now().isoformat(timespec='seconds') if config.get('test_mode') and not target_date else f'{today_str}T23:59:59'
    conn = get_db()
    cur = conn.cursor()

    cur.execute("SELECT sent_count FROM daily_logs WHERE log_date = ?", (today_str,))
    log_row = cur.fetchone()
    already_sent = log_row['sent_count'] if log_row else 0
    quota = max(0, max_limit - already_sent)

    if quota <= 0:
        conn.close()
        print(json.dumps({
            "date": today_str,
            "quota_remaining": 0,
            "already_sent_today": already_sent,
            "batch": []
        }))
        return

    batch = []
    
    # Priority 1: Follow-up 3 due today (FU2_SENT -> next action <= today)
    cur.execute("""
        SELECT * FROM leads 
        WHERE status = 'FU2_SENT' AND followup3_sent = 0 AND replied = 0
          AND next_action_due <= ? AND next_action_due != ''
        ORDER BY next_action_due ASC LIMIT ?
    """, (due_cutoff, quota))
    fu3_leads = [dict(row) for row in cur.fetchall()]
    for l in fu3_leads:
        l['action_type'] = 'FU3'
    batch.extend(fu3_leads)
    quota -= len(fu3_leads)

    # Priority 2: Follow-up 2 due today (FU1_SENT -> next action <= today)
    if quota > 0:
        cur.execute("""
            SELECT * FROM leads 
            WHERE status = 'FU1_SENT' AND followup2_sent = 0 AND replied = 0
              AND next_action_due <= ? AND next_action_due != ''
            ORDER BY next_action_due ASC LIMIT ?
        """, (due_cutoff, quota))
        fu2_leads = [dict(row) for row in cur.fetchall()]
        for l in fu2_leads:
            l['action_type'] = 'FU2'
        batch.extend(fu2_leads)
        quota -= len(fu2_leads)

    # Priority 3: Follow-up 1 due today (PITCH_SENT -> next action <= today)
    if quota > 0:
        cur.execute("""
            SELECT * FROM leads 
            WHERE status = 'PITCH_SENT' AND followup1_sent = 0 AND replied = 0
              AND next_action_due <= ? AND next_action_due != ''
            ORDER BY next_action_due ASC LIMIT ?
        """, (due_cutoff, quota))
        fu1_leads = [dict(row) for row in cur.fetchall()]
        for l in fu1_leads:
            l['action_type'] = 'FU1'
        batch.extend(fu1_leads)
        quota -= len(fu1_leads)

    # Priority 4: New Pitches (AUDITED or QUEUED)
    if quota > 0:
        cur.execute("""
            SELECT * FROM leads 
            WHERE status IN ('AUDITED', 'QUEUED') AND pitch_sent = 0 AND replied = 0
            ORDER BY id ASC LIMIT ?
        """, (quota,))
        pitch_leads = [dict(row) for row in cur.fetchall()]
        for l in pitch_leads:
            l['action_type'] = 'PITCH'
        batch.extend(pitch_leads)
        quota -= len(pitch_leads)

    conn.close()
    if full:
        output_batch = batch
    else:
        output_batch = [{
            'id': lead['id'],
            'action_type': lead['action_type'],
            'email': lead['email'],
            'first_name': lead['first_name'],
            'company': lead['company'],
            'website_domain': lead['website_domain'],
            'needs_audit': lead['action_type'] == 'PITCH' and not bool(lead.get('website_problem')),
            'due': lead.get('next_action_due', ''),
        } for lead in batch]

    print(json.dumps({
        "date": today_str,
        "already_sent_today": already_sent,
        "batch_count": len(batch),
        "quota_remaining_after_batch": quota,
        "batch": output_batch
    }, indent=2))

def claim_send(lead_id, step):
    """Atomically reserve one lead/step before calling Gmail."""
    init_db()
    step = step.upper()
    rules = {
        'PITCH': (('QUEUED', 'AUDITED'), 'pitch_sent'),
        'FU1': (('PITCH_SENT',), 'followup1_sent'),
        'FU2': (('FU1_SENT',), 'followup2_sent'),
        'FU3': (('FU2_SENT',), 'followup3_sent'),
    }
    if step not in rules:
        print(json.dumps({'error': f'Invalid step: {step}'}))
        return

    allowed_statuses, sent_column = rules[step]
    token = secrets.token_hex(16)
    conn = get_db()
    cur = conn.cursor()
    try:
        cur.execute('BEGIN IMMEDIATE')
        cur.execute(f'SELECT *, {sent_column} AS already_sent FROM leads WHERE id = ?', (lead_id,))
        lead = cur.fetchone()
        if not lead:
            conn.rollback()
            print(json.dumps({'claimed': False, 'error': f'Lead {lead_id} not found'}))
            return
        if lead['status'] not in allowed_statuses or lead['already_sent']:
            conn.rollback()
            print(json.dumps({'claimed': False, 'lead_id': lead_id, 'step': step, 'reason': 'not_due_or_already_sent'}))
            return
        config_path = os.path.join(ROOT_DIR, 'config.json')
        with open(config_path, 'r', encoding='utf-8') as f:
            config = json.load(f)
        today_str = date.today().isoformat()
        cur.execute('SELECT sent_count FROM daily_logs WHERE log_date = ?', (today_str,))
        daily_row = cur.fetchone()
        sent_today = daily_row['sent_count'] if daily_row else 0
        daily_max = int(config.get('daily_max_outreach_emails', 30))
        if sent_today >= daily_max:
            conn.rollback()
            print(json.dumps({'claimed': False, 'lead_id': lead_id, 'step': step, 'reason': 'daily_limit_reached'}))
            return
        if step != 'PITCH':
            due_raw = lead['next_action_due'] or ''
            try:
                due_at = datetime.fromisoformat(due_raw)
            except ValueError:
                due_at = None
            if not due_at or due_at > datetime.now():
                conn.rollback()
                print(json.dumps({'claimed': False, 'lead_id': lead_id, 'step': step, 'reason': 'not_due'}))
                return
        step_columns = {
            'PITCH': ('pitch_subject', 'pitch_body'),
            'FU1': ('followup1_subject', 'followup1_body'),
            'FU2': ('followup2_subject', 'followup2_body'),
            'FU3': ('followup3_subject', 'followup3_body'),
        }
        subject_col, body_col = step_columns[step]
        if not lead[subject_col] or not lead[body_col]:
            conn.rollback()
            print(json.dumps({'claimed': False, 'lead_id': lead_id, 'step': step, 'reason': 'email_not_rendered'}))
            return
        if step == 'PITCH' and not lead['website_problem']:
            conn.rollback()
            print(json.dumps({'claimed': False, 'lead_id': lead_id, 'step': step, 'reason': 'audit_missing'}))
            return
        cur.execute("""
            INSERT INTO email_sends (lead_id, step, state, claim_token, claimed_at)
            VALUES (?, ?, 'CLAIMED', ?, ?)
        """, (lead_id, step, token, datetime.now().isoformat()))
        conn.commit()
        print(json.dumps({
            'claimed': True,
            'lead_id': lead_id,
            'step': step,
            'claim_token': token,
            'to_email': lead['email'],
            'subject': lead[subject_col],
            'body': lead[body_col],
            'thread_id': lead['thread_id'],
            'reply_message_id': lead['last_message_id'] if step != 'PITCH' else ''
        }))
    except sqlite3.IntegrityError:
        conn.rollback()
        print(json.dumps({'claimed': False, 'lead_id': lead_id, 'step': step, 'reason': 'already_claimed_or_sent'}))
    finally:
        conn.close()

def record_sent(lead_id, step, thread_id="", message_id="", claim_token="", subject=""):
    init_db()
    today = date.today()
    today_str = today.isoformat()
    now_str = datetime.now().isoformat()

    step_map = {
        'PITCH': ('PITCH_SENT', 1, 'pitch_count', 'pitch_sent', 'pitch_message_id', 'pitch_sent_at'),
        'FU1': ('FU1_SENT', 2, 'fu1_count', 'followup1_sent', 'followup1_message_id', 'followup1_sent_at'),
        'FU2': ('FU2_SENT', 3, 'fu2_count', 'followup2_sent', 'followup2_message_id', 'followup2_sent_at'),
        'FU3': ('FU3_SENT', 4, 'fu3_count', 'followup3_sent', 'followup3_message_id', 'followup3_sent_at')
    }

    if step.upper() not in step_map:
        print(json.dumps({"error": f"Invalid step: {step}. Must be PITCH, FU1, FU2, or FU3"}))
        return

    if not message_id or not claim_token:
        print(json.dumps({'error': 'message_id and claim_token are required; run claim-send before Gmail'}))
        return

    new_status, step_num, log_col, sent_col, message_col, sent_at_col = step_map[step.upper()]
    config_path = os.path.join(ROOT_DIR, 'config.json')
    with open(config_path, 'r', encoding='utf-8') as f:
        config = json.load(f)
    if config.get('test_mode'):
        minute_delays = config.get('follow_up_delays_minutes', [3, 2, 2])
        delay_indexes = {'PITCH': 0, 'FU1': 1, 'FU2': 2}
        if step.upper() in delay_indexes:
            delay_minutes = minute_delays[delay_indexes[step.upper()]]
        else:
            delay_minutes = config.get('post_sequence_delay_minutes', 3)
        next_due_str = (datetime.now() + timedelta(minutes=delay_minutes)).isoformat(timespec='seconds')
    else:
        day_delays = {'PITCH': 3, 'FU1': 2, 'FU2': 2, 'FU3': 3}
        next_due_str = (today + timedelta(days=day_delays[step.upper()])).isoformat()

    conn = get_db()
    cur = conn.cursor()
    cur.execute('BEGIN IMMEDIATE')
    cur.execute("""
        SELECT id FROM email_sends
        WHERE lead_id = ? AND step = ? AND claim_token = ? AND state = 'CLAIMED'
    """, (lead_id, step.upper(), claim_token))
    claim = cur.fetchone()
    if not claim:
        conn.rollback()
        conn.close()
        print(json.dumps({'error': 'No active claim for this lead and step; email was not recorded'}))
        return

    cur.execute(f"""
        UPDATE leads SET
            status = ?,
            current_step = ?,
            last_sent_at = ?,
            next_action_due = ?,
            thread_id = CASE WHEN ? != '' THEN ? ELSE thread_id END,
            last_message_id = ?,
            {sent_col} = 1,
            {message_col} = ?,
            {sent_at_col} = ?,
            original_subject = CASE
                WHEN ? = 'PITCH' AND ? != '' THEN ? ELSE original_subject END,
            sequence_completed = CASE WHEN ? = 'FU3' THEN 1 ELSE sequence_completed END,
            sequence_completed_at = CASE WHEN ? = 'FU3' THEN ? ELSE sequence_completed_at END,
            call_lead = CASE WHEN ? = 'FU3' AND replied = 0 THEN 1 ELSE call_lead END
        WHERE id = ?
    """, (new_status, step_num, now_str, next_due_str, thread_id, thread_id,
          message_id, message_id, now_str,
          step.upper(), subject, subject,
          step.upper(), step.upper(), now_str, step.upper(), lead_id))

    cur.execute("""
        UPDATE email_sends SET state = 'SENT', gmail_message_id = ?,
            gmail_thread_id = ?, sent_at = ? WHERE id = ?
    """, (message_id, thread_id, now_str, claim['id']))

    cur.execute(f"""
        INSERT INTO daily_logs (log_date, sent_count, {log_col})
        VALUES (?, 1, 1)
        ON CONFLICT(log_date) DO UPDATE SET
            sent_count = sent_count + 1,
            {log_col} = {log_col} + 1
    """, (today_str,))

    conn.commit()
    conn.close()
    print(json.dumps({"success": True, "lead_id": lead_id, "new_status": new_status, "next_action_due": next_due_str}))

def update_status(email, status, notes=""):
    init_db()
    valid_statuses = ['REPLIED', 'OOO', 'BOUNCED', 'OPTOUT', 'CALL_LIST', 'PAUSED']
    if status.upper() not in valid_statuses:
        print(json.dumps({"error": f"Invalid status: {status}. Allowed: {valid_statuses}"}))
        return

    conn = get_db()
    cur = conn.cursor()
    cur.execute("""
        UPDATE leads SET
            status = ?,
            notes = CASE WHEN ? != '' THEN ? ELSE notes END
        WHERE LOWER(email) = LOWER(?)
    """, (status.upper(), notes, notes, email.strip()))
    affected = cur.rowcount
    conn.commit()
    conn.close()
    print(json.dumps({"success": True, "email": email, "new_status": status.upper(), "rows_updated": affected}))

def reply_monitor_window():
    """Return whether an hourly reply check may run in the sending timezone."""
    config_path = os.path.join(ROOT_DIR, 'config.json')
    with open(config_path, 'r', encoding='utf-8') as f:
        config = json.load(f)
    timezone_name = config.get('sending_timezone', 'Europe/London')
    now = datetime.now(ZoneInfo(timezone_name))
    start_hour, start_minute = map(int, config.get('business_hours_start', '08:00').split(':'))
    end_hour, end_minute = map(int, config.get('business_hours_end', '20:00').split(':'))
    current_minutes = now.hour * 60 + now.minute
    start_minutes = start_hour * 60 + start_minute
    end_minutes = end_hour * 60 + end_minute
    allowed = start_minutes <= current_minutes < end_minutes
    if config.get('skip_weekends', True) and now.weekday() >= 5:
        allowed = False
    print(json.dumps({
        'allowed': allowed,
        'timezone': timezone_name,
        'local_time': now.isoformat(timespec='seconds'),
        'window': f"{config.get('business_hours_start', '08:00')}-{config.get('business_hours_end', '20:00')}"
    }))

def get_send_delay():
    """Return a randomized pacing delay without involving Gmail or a model."""
    config_path = os.path.join(ROOT_DIR, 'config.json')
    with open(config_path, 'r', encoding='utf-8') as f:
        config = json.load(f)
    prefix = 'test_' if config.get('test_mode') else ''
    minimum = int(config.get(f'{prefix}send_delay_seconds_min', 15))
    maximum = int(config.get(f'{prefix}send_delay_seconds_max', 30))
    if maximum < minimum:
        minimum, maximum = maximum, minimum
    delay = minimum + secrets.randbelow(maximum - minimum + 1)
    print(json.dumps({'delay_seconds': delay, 'test_mode': bool(config.get('test_mode'))}))

def reply_check_candidates():
    """Return active conversations for one batched Gmail reply check."""
    init_db()
    conn = get_db()
    cur = conn.cursor()
    cur.execute("""
        SELECT id, email, first_name, last_name, company, thread_id,
               last_message_id, replied, reply_notification_sent
        FROM leads
        WHERE thread_id != '' AND replied = 0
          AND status NOT IN ('BOUNCED', 'OPTOUT', 'CALL_LIST')
        ORDER BY id
    """)
    rows = [dict(row) for row in cur.fetchall()]
    conn.close()
    print(json.dumps({'candidate_count': len(rows), 'candidates': rows}, indent=2))

def mark_replied(lead_id, message_id, notes=""):
    init_db()
    now_str = datetime.now().isoformat()
    conn = get_db()
    cur = conn.cursor()
    cur.execute("""
        UPDATE leads SET replied = 1, reply_message_id = ?, replied_at = ?,
            status = 'REPLIED', next_action_due = '',
            call_lead = 0,
            notes = CASE WHEN ? != '' THEN ? ELSE notes END
        WHERE id = ? AND replied = 0
    """, (message_id, now_str, notes, notes, lead_id))
    changed = cur.rowcount
    conn.commit()
    conn.close()
    print(json.dumps({
        'success': True,
        'lead_id': lead_id,
        'replied': True,
        'new_reply': changed == 1,
        'notification_needed': changed == 1
    }))

def record_reply_notification(lead_id, message_id):
    init_db()
    if not message_id:
        print(json.dumps({'error': 'Gmail notification message_id is required'}))
        return
    now_str = datetime.now().isoformat()
    conn = get_db()
    cur = conn.cursor()
    cur.execute("""
        UPDATE leads SET reply_notification_sent = 1,
            reply_notification_message_id = ?, reply_notification_sent_at = ?
        WHERE id = ? AND replied = 1 AND reply_notification_sent = 0
    """, (message_id, now_str, lead_id))
    changed = cur.rowcount
    conn.commit()
    conn.close()
    print(json.dumps({'success': changed == 1, 'lead_id': lead_id, 'notification_recorded': changed == 1}))

def export_call_list(target_date=None):
    init_db()
    today_str = target_date if target_date else date.today().isoformat()
    config_path = os.path.join(ROOT_DIR, 'config.json')
    with open(config_path, 'r', encoding='utf-8') as f:
        config = json.load(f)
    due_cutoff = datetime.now().isoformat(timespec='seconds') if config.get('test_mode') and not target_date else f'{today_str}T23:59:59'
    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
        SELECT * FROM leads
        WHERE status = 'FU3_SENT' AND next_action_due <= ? AND next_action_due != ''
    """, (due_cutoff,))
    unresponsive = [dict(row) for row in cur.fetchall()]

    if not unresponsive:
        conn.close()
        print(json.dumps({"success": True, "exported_count": 0, "message": "No new leads ready for call list today."}))
        return

    os.makedirs(os.path.dirname(CALL_LIST_PATH), exist_ok=True)
    file_exists = os.path.exists(CALL_LIST_PATH)
    with open(CALL_LIST_PATH, mode='a', newline='', encoding='utf-8') as f:
        fieldnames = ['Lead ID', 'Full Name', 'Company', 'Phone', 'Email', 'Website', 'Issue Found', 'Date Exported']
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        if not file_exists:
            writer.writeheader()

        for l in unresponsive:
            full_name = f"{l['first_name']} {l['last_name']}".strip()
            writer.writerow({
                'Lead ID': l['id'],
                'Full Name': full_name,
                'Company': l['company'],
                'Phone': l['phone'],
                'Email': l['email'],
                'Website': l['website_domain'],
                'Issue Found': l['website_problem'],
                'Date Exported': today_str
            })
            cur.execute("UPDATE leads SET status = 'CALL_LIST' WHERE id = ?", (l['id'],))

    conn.commit()
    conn.close()
    print(json.dumps({
        "success": True,
        "exported_count": len(unresponsive),
        "call_list_file": CALL_LIST_PATH,
        "leads": unresponsive
    }, indent=2))

def get_stats():
    init_db()
    conn = get_db()
    cur = conn.cursor()
    today_str = date.today().isoformat()

    cur.execute("SELECT COUNT(*) as total FROM leads")
    total = cur.fetchone()['total']

    cur.execute("SELECT status, COUNT(*) as cnt FROM leads GROUP BY status")
    by_status = {row['status']: row['cnt'] for row in cur.fetchall()}

    cur.execute("SELECT sent_count, pitch_count, fu1_count, fu2_count, fu3_count FROM daily_logs WHERE log_date = ?", (today_str,))
    daily = cur.fetchone()

    conn.close()
    print(json.dumps({
        "total_leads_in_db": total,
        "breakdown_by_status": by_status,
        "today": today_str,
        "sent_today": dict(daily) if daily else {"sent_count": 0, "pitch_count": 0, "fu1_count": 0, "fu2_count": 0, "fu3_count": 0}
    }, indent=2))

def reset_db():
    init_db(reset=True)
    print(json.dumps({"success": True, "message": "Database wiped and re-created clean."}))

def render_email(lead_id, step, quiet=False):
    init_db()
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT * FROM leads WHERE id = ?", (lead_id,))
    row = cur.fetchone()
    conn.close()

    if not row:
        result = {"error": f"Lead {lead_id} not found"}
        if not quiet:
            print(json.dumps(result))
        return result

    lead = dict(row)
    
    config_path = os.path.join(ROOT_DIR, "config.json")
    cfg = {}
    if os.path.exists(config_path):
        try:
            with open(config_path, "r", encoding="utf-8") as f:
                cfg = json.load(f)
        except Exception:
            pass

    tpl_path = os.path.join(ROOT_DIR, "templates", "email_templates.json")
    if not os.path.exists(tpl_path):
        result = {'error': 'templates/email_templates.json is required before rendering email'}
        if not quiet:
            print(json.dumps(result))
        return result
    try:
        with open(tpl_path, "r", encoding="utf-8") as f:
            tpl_data = json.load(f)
    except Exception as exc:
        result = {'error': f'email_templates.json is invalid: {exc}'}
        if not quiet:
            print(json.dumps(result))
        return result

    sender_info = tpl_data.get("sender", {})
    sender_name = cfg.get("student_name") or sender_info.get("sender_name", "YOUR_NAME")
    agency_name = cfg.get("agency_name") or sender_info.get("agency_name", "Design Studio")
    sender_title = sender_info.get("sender_title", "Design Lead")

    step_key = step.lower()
    templates_dict = tpl_data.get("templates", {})
    step_tpl = templates_dict.get(step_key)
    if not step_tpl:
        result = {"error": f"Template step '{step_key}' not found"}
        if not quiet:
            print(json.dumps(result))
        return result

    first_name = lead.get("first_name") or "there"
    company = lead.get("company") or "your business"
    website = lead.get("website_domain") or "your website"
    page = lead.get("page") or "Homepage"
    problem = lead.get("website_problem") or "the layout breaks awkwardly on mobile screens"
    reason = lead.get("recognizable_reason") or "visitors have to pinch and zoom to read key details"
    consequence = lead.get("consequence_mechanics") or "that extra friction makes high-intent visitors hesitate and bounce"
    micro_yes = lead.get("micro_yes") or "Want me to show you?"
    subject_label = lead.get("subject_label") or "an established business"

    replacements = {
        "{{first_name}}": first_name,
        "{{last_name}}": lead.get("last_name", ""),
        "{{company}}": company,
        "{{position}}": lead.get("position", ""),
        "{{website_domain}}": website,
        "{{page}}": page,
        "{{website_problem}}": problem,
        "{{recognizable_reason}}": reason,
        "{{consequence_mechanics}}": consequence,
        "{{micro_yes}}": micro_yes,
        "{{subject_label}}": subject_label,
        "{{sender_name}}": sender_name,
        "{{agency_name}}": agency_name,
        "{{sender_title}}": sender_title,
    }

    pitch_tpl = templates_dict.get("pitch")
    if not pitch_tpl:
        result = {'error': 'pitch template is missing'}
        if not quiet:
            print(json.dumps(result))
        return result
    pitch_subject_options = pitch_tpl.get("subject_options") or [pitch_tpl.get("subject", "{{page}} on {{website_domain}}")]
    original_subject = lead.get("original_subject") or pitch_subject_options[0]
    for k, v in replacements.items():
        original_subject = original_subject.replace(k, str(v))
    replacements["{{original_subject}}"] = original_subject

    if step_key == "pitch":
        subj_options = step_tpl.get("subject_options", ["{{page}} on {{website_domain}}"])
        subject = subj_options[0]
    else:
        subject = step_tpl.get("subject", "Re: {{page}} on {{website_domain}}")

    for k, v in replacements.items():
        subject = subject.replace(k, str(v))

    body = step_tpl.get("body", "")
    for k, v in replacements.items():
        body = body.replace(k, str(v))

    if '{{' in subject or '{{' in body:
        result = {'error': 'Unresolved template placeholder', 'subject': subject}
        if not quiet:
            print(json.dumps(result))
        return result

    rendered_columns = {
        'pitch': ('pitch_subject', 'pitch_body'),
        'fu1': ('followup1_subject', 'followup1_body'),
        'fu2': ('followup2_subject', 'followup2_body'),
        'fu3': ('followup3_subject', 'followup3_body'),
    }
    subject_col, body_col = rendered_columns[step_key]
    conn = get_db()
    cur = conn.cursor()
    if step_key == 'pitch':
        cur.execute(f"UPDATE leads SET {subject_col} = ?, {body_col} = ?, original_subject = ? WHERE id = ?",
                    (subject, body, subject, lead_id))
    else:
        cur.execute(f"UPDATE leads SET {subject_col} = ?, {body_col} = ? WHERE id = ?",
                    (subject, body, lead_id))
    conn.commit()
    conn.close()

    result = {
        "lead_id": lead["id"],
        "to_email": lead["email"],
        "lead_name": f"{lead['first_name']} {lead['last_name']}".strip(),
        "company": company,
        "step": step.upper(),
        "subject": subject,
        "body": body,
        "thread_id": lead.get("thread_id", ""),
        "is_followup": step_key != "pitch"
    }
    if not quiet:
        print(json.dumps(result, indent=2))
    return result

def render_all(lead_id):
    """Render and persist all four messages while returning only a compact receipt."""
    rendered = []
    for step in ('PITCH', 'FU1', 'FU2', 'FU3'):
        result = render_email(lead_id, step, quiet=True)
        if result and result.get('error'):
            print(json.dumps(result))
            return
        rendered.append({
            'step': step,
            'subject': result['subject'],
            'body_chars': len(result['body'])
        })
    print(json.dumps({'success': True, 'lead_id': lead_id, 'rendered': rendered}))

def pending_claims():
    """List unresolved claims. A claimed step must be reconciled, never resent."""
    init_db()
    conn = get_db()
    cur = conn.cursor()
    cur.execute("""
        SELECT es.lead_id, es.step, es.claim_token, es.claimed_at,
               l.email, l.company, l.thread_id, l.last_message_id
        FROM email_sends es
        JOIN leads l ON l.id = es.lead_id
        WHERE es.state = 'CLAIMED'
        ORDER BY es.claimed_at
    """)
    rows = [dict(row) for row in cur.fetchall()]
    conn.close()
    print(json.dumps({'pending_claim_count': len(rows), 'pending_claims': rows}))

def validate_setup():
    """Cheap local preflight. Gmail connection is checked separately by Codex."""
    issues = []
    config_path = os.path.join(ROOT_DIR, 'config.json')
    template_path = os.path.join(ROOT_DIR, 'templates', 'email_templates.json')
    try:
        with open(config_path, 'r', encoding='utf-8') as f:
            config = json.load(f)
    except Exception as exc:
        config = {}
        issues.append(f'config.json invalid: {exc}')
    if not os.path.exists(template_path):
        templates = {}
        issues.append('templates/email_templates.json is missing')
    else:
        try:
            with open(template_path, 'r', encoding='utf-8') as f:
                templates = json.load(f)
        except Exception as exc:
            templates = {}
            issues.append(f'email_templates.json invalid: {exc}')
    for key in ('student_name', 'agency_name', 'secondary_alert_email', 'sending_timezone'):
        if not config.get(key):
            issues.append(f'config missing {key}')
    if str(config.get('student_name', '')).upper().startswith('YOUR_'):
        issues.append('student_name is still a placeholder')
    if str(config.get('agency_name', '')).upper().startswith('YOUR_'):
        issues.append('agency_name is still a placeholder')
    alert_email = str(config.get('secondary_alert_email', ''))
    if 'example.com' in alert_email or '@' not in alert_email:
        issues.append('secondary_alert_email is still a placeholder')
    if config.get('test_mode'):
        allowed = config.get('test_allowed_recipient_emails') or []
        if not allowed or any('@' not in str(email) for email in allowed):
            issues.append('test_allowed_recipient_emails must contain controlled test inboxes')
        try:
            if int(config.get('test_lead_count', 0)) < 1:
                issues.append('test_lead_count must be at least 1')
        except (TypeError, ValueError):
            issues.append('test_lead_count must be an integer')
        delays = config.get('follow_up_delays_minutes') or []
        if (len(delays) != 3
                or any(not isinstance(value, int) or value < 1 for value in delays)):
            issues.append('follow_up_delays_minutes must contain three positive integers')
    template_keys = set((templates.get('templates') or {}).keys())
    missing_templates = sorted({'pitch', 'fu1', 'fu2', 'fu3'} - template_keys)
    if missing_templates:
        issues.append('missing templates: ' + ', '.join(missing_templates))
    lead_files = sorted([
        name for name in os.listdir(os.path.join(ROOT_DIR, 'leads'))
        if name.lower().endswith('.csv') and name.lower() != 'call_list.csv'
    ]) if os.path.isdir(os.path.join(ROOT_DIR, 'leads')) else []
    if not lead_files:
        issues.append('no lead CSV found')
    elif len(lead_files) > 1:
        issues.append('multiple lead CSVs found; select one explicitly')
    try:
        ZoneInfo(config.get('sending_timezone', ''))
    except Exception:
        issues.append('sending_timezone is invalid')
    init_db()
    conn = get_db()
    cur = conn.cursor()
    cur.execute('SELECT COUNT(*) AS n FROM leads')
    lead_count = cur.fetchone()['n']
    cur.execute("SELECT COUNT(*) AS n FROM email_sends WHERE state = 'CLAIMED'")
    pending_count = cur.fetchone()['n']
    conn.close()
    print(json.dumps({
        'ready': not issues,
        'issues': issues,
        'lead_csv_files': lead_files,
        'database_leads': lead_count,
        'pending_claims': pending_count,
        'test_mode': bool(config.get('test_mode')),
        'gmail_check_required': True
    }))

def verify_run():
    """Return a compact integrity report without dumping message bodies."""
    init_db()
    conn = get_db()
    cur = conn.cursor()
    cur.execute("""
        SELECT id, first_name, status, pitch_sent, followup1_sent,
               followup2_sent, followup3_sent, replied,
               sequence_completed, call_lead, thread_id
        FROM leads ORDER BY id
    """)
    leads = [dict(row) for row in cur.fetchall()]
    cur.execute("SELECT COUNT(*) AS n FROM email_sends WHERE state = 'SENT'")
    sent_rows = cur.fetchone()['n']
    cur.execute("""
        SELECT COUNT(*) AS n FROM (
            SELECT lead_id, step FROM email_sends
            GROUP BY lead_id, step HAVING COUNT(*) > 1
        )
    """)
    duplicates = cur.fetchone()['n']
    cur.execute("SELECT COUNT(*) AS n FROM email_sends WHERE state = 'CLAIMED'")
    unresolved_claims = cur.fetchone()['n']
    cur.execute("""
        SELECT COUNT(*) AS n FROM email_sends es
        JOIN leads l ON l.id = es.lead_id
        WHERE es.state = 'SENT' AND es.gmail_thread_id != l.thread_id
    """)
    thread_mismatches = cur.fetchone()['n']
    conn.close()
    print(json.dumps({
        'lead_count': len(leads),
        'sent_receipts': sent_rows,
        'duplicate_steps': duplicates,
        'unresolved_claims': unresolved_claims,
        'thread_mismatches': thread_mismatches,
        'leads': leads
    }))

def main():
    parser = argparse.ArgumentParser(description="Universal Outreach Queue & State Manager")
    subparsers = parser.add_subparsers(dest="command")

    subparsers.add_parser("init")
    subparsers.add_parser("reset")
    
    inspect_p = subparsers.add_parser("inspect-csv")
    inspect_p.add_argument("csv_path", help="Path to leads CSV")

    import_p = subparsers.add_parser("import-csv")
    import_p.add_argument("csv_path", help="Path to leads CSV")
    import_p.add_argument("--clear", action="store_true", help="Clear existing leads before importing")
    import_p.add_argument("--mapping", help="Optional JSON string mapping standard fields to CSV columns")

    audit_p = subparsers.add_parser("save-audit")
    audit_p.add_argument("lead_id", type=int)
    audit_p.add_argument("json_input", help="JSON string, '-' for stdin, or path to json file")

    domain_p = subparsers.add_parser("prepare-domain")
    domain_p.add_argument("domain")
    domain_p.add_argument("json_input", help="JSON string, '-' for stdin, or path to json file")

    subparsers.add_parser("audit-candidates")

    render_p = subparsers.add_parser("render-email")
    render_p.add_argument("lead_id", type=int)
    render_p.add_argument("step", choices=["PITCH", "FU1", "FU2", "FU3", "pitch", "fu1", "fu2", "fu3"])

    render_all_p = subparsers.add_parser("render-all")
    render_all_p.add_argument("lead_id", type=int)

    batch_p = subparsers.add_parser("get-daily-batch")
    batch_p.add_argument("--date", help="Target date YYYY-MM-DD (defaults to today)")
    batch_p.add_argument("--limit", type=int, default=30)
    batch_p.add_argument("--full", action="store_true", help="Include complete lead rows (normally unnecessary)")

    claim_p = subparsers.add_parser("claim-send")
    claim_p.add_argument("lead_id", type=int)
    claim_p.add_argument("step", choices=["PITCH", "FU1", "FU2", "FU3", "pitch", "fu1", "fu2", "fu3"])

    sent_p = subparsers.add_parser("record-sent")
    sent_p.add_argument("lead_id", type=int)
    sent_p.add_argument("step", choices=["PITCH", "FU1", "FU2", "FU3", "pitch", "fu1", "fu2", "fu3"])
    sent_p.add_argument("--thread_id", default="")
    sent_p.add_argument("--message_id", default="")
    sent_p.add_argument("--claim_token", required=True)
    sent_p.add_argument("--subject", default="")

    status_p = subparsers.add_parser("update-status")
    status_p.add_argument("email")
    status_p.add_argument("status", choices=["REPLIED", "OOO", "BOUNCED", "OPTOUT", "CALL_LIST", "PAUSED", "replied", "ooo", "bounced", "optout"])
    status_p.add_argument("--notes", default="")

    subparsers.add_parser("reply-monitor-window")
    subparsers.add_parser("send-delay")
    subparsers.add_parser("reply-check-candidates")
    subparsers.add_parser("pending-claims")
    subparsers.add_parser("validate-setup")
    subparsers.add_parser("verify-run")

    replied_p = subparsers.add_parser("mark-replied")
    replied_p.add_argument("lead_id", type=int)
    replied_p.add_argument("message_id")
    replied_p.add_argument("--notes", default="")

    notified_p = subparsers.add_parser("record-reply-notification")
    notified_p.add_argument("lead_id", type=int)
    notified_p.add_argument("message_id")

    subparsers.add_parser("export-call-list")
    subparsers.add_parser("stats")

    args = parser.parse_args()

    if args.command == "init":
        init_db()
        print(json.dumps({"success": True, "message": "Database initialized."}))
    elif args.command == "reset":
        reset_db()
    elif args.command == "inspect-csv":
        inspect_csv(args.csv_path)
    elif args.command == "import-csv":
        custom_map = json.loads(args.mapping) if args.mapping else None
        import_csv(args.csv_path, clear_existing=args.clear, custom_mapping=custom_map)
    elif args.command == "save-audit":
        raw_in = args.json_input
        if raw_in == "-":
            raw_text = sys.stdin.read()
        elif os.path.exists(raw_in):
            with open(raw_in, "r", encoding="utf-8") as f:
                raw_text = f.read()
        else:
            raw_text = raw_in
        data = json.loads(raw_text)
        save_audit(args.lead_id, data)
    elif args.command == "prepare-domain":
        raw_in = args.json_input
        if raw_in == "-":
            raw_text = sys.stdin.read()
        elif os.path.exists(raw_in):
            with open(raw_in, "r", encoding="utf-8") as f:
                raw_text = f.read()
        else:
            raw_text = raw_in
        prepare_domain(args.domain, json.loads(raw_text))
    elif args.command == "audit-candidates":
        audit_candidates()
    elif args.command == "render-email":
        render_email(args.lead_id, args.step)
    elif args.command == "render-all":
        render_all(args.lead_id)
    elif args.command == "get-daily-batch":
        get_due_batch(args.date, args.limit, args.full)
    elif args.command == "claim-send":
        claim_send(args.lead_id, args.step)
    elif args.command == "record-sent":
        record_sent(args.lead_id, args.step, args.thread_id, args.message_id, args.claim_token, args.subject)
    elif args.command == "update-status":
        update_status(args.email, args.status, args.notes)
    elif args.command == "reply-monitor-window":
        reply_monitor_window()
    elif args.command == "send-delay":
        get_send_delay()
    elif args.command == "reply-check-candidates":
        reply_check_candidates()
    elif args.command == "pending-claims":
        pending_claims()
    elif args.command == "validate-setup":
        validate_setup()
    elif args.command == "verify-run":
        verify_run()
    elif args.command == "mark-replied":
        mark_replied(args.lead_id, args.message_id, args.notes)
    elif args.command == "record-reply-notification":
        record_reply_notification(args.lead_id, args.message_id)
    elif args.command == "export-call-list":
        export_call_list()
    elif args.command == "stats":
        get_stats()
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
