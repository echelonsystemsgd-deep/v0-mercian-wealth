# Automated n8n + Cloudflare Tunnel Python Script (`deploy_n8n.py`)

This script automates Cloudflare Tunnel creation, DNS CNAME mapping, and Docker Compose deployment for self-hosting n8n with zero port forwarding.

```python
import os
import sys
import json
import base64
import subprocess
import requests

# ==========================================
# 1. CONFIGURATION (AI: FILL THESE 4 VALUES)
# ==========================================
ACCOUNT_TOKEN = "YOUR_CLOUDFLARE_ACCOUNT_TOKEN"
DNS_TOKEN     = "YOUR_CLOUDFLARE_DNS_TOKEN"
DOMAIN        = "yourdomain.com"
SUBDOMAIN     = "n8n"

FULL_HOSTNAME = f"{SUBDOMAIN}.{DOMAIN}" if SUBDOMAIN else DOMAIN
TUNNEL_NAME   = f"n8n-tunnel-{SUBDOMAIN}" if SUBDOMAIN else "n8n-tunnel"

# Proper Bearer Headers
account_headers = {"Authorization": f"Bearer {ACCOUNT_TOKEN}", "Content-Type": "application/json"}
dns_headers     = {"Authorization": f"Bearer {DNS_TOKEN}",     "Content-Type": "application/json"}

print(f"🚀 Starting automated deployment for {FULL_HOSTNAME}...\n")

# ==========================================
# 2. GET ACCOUNT ID (Using Account Token)
# ==========================================
print("1/6 Fetching Cloudflare Account ID...")
acc_res = requests.get("https://api.cloudflare.com/client/v4/accounts", headers=account_headers).json()
if not acc_res.get("success"):
    print("❌ Failed to get Account ID. Check ACCOUNT_TOKEN permissions:", acc_res)
    sys.exit(1)
account_id = acc_res["result"][0]["id"]
print(f"   ✓ Account ID: {account_id}")

# ==========================================
# 3. GET ZONE ID (Using DNS Token)
# ==========================================
print(f"2/6 Fetching Cloudflare Zone ID for {DOMAIN}...")
zone_res = requests.get(f"https://api.cloudflare.com/client/v4/zones?name={DOMAIN}", headers=dns_headers).json()
if not zone_res.get("success") or not zone_res.get("result"):
    print(f"❌ Failed to get Zone ID for {DOMAIN}. Check DNS_TOKEN permissions:", zone_res)
    sys.exit(1)
zone_id = zone_res["result"][0]["id"]
print(f"   ✓ Zone ID: {zone_id}")

# ==========================================
# 4. CREATE OR FETCH CLOUDFLARE TUNNEL
# ==========================================
print(f"3/6 Creating Cloudflare Tunnel '{TUNNEL_NAME}'...")
tunnel_secret = base64.b64encode(os.urandom(32)).decode("utf-8")
tunnel_payload = {
    "name": TUNNEL_NAME,
    "tunnel_secret": tunnel_secret
}

r_create = requests.post(
    f"https://api.cloudflare.com/client/v4/accounts/{account_id}/cfd_tunnel",
    headers=account_headers,
    json=tunnel_payload
).json()

if r_create.get("success"):
    tunnel_id = r_create["result"]["id"]
    print(f"   ✓ Created new Tunnel ID: {tunnel_id}")
else:
    # Check if tunnel already exists
    print(f"   ℹ️ Checking for existing tunnel named '{TUNNEL_NAME}'...")
    r_list = requests.get(
        f"https://api.cloudflare.com/client/v4/accounts/{account_id}/cfd_tunnel?name={TUNNEL_NAME}",
        headers=account_headers
    ).json()
    if r_list.get("success") and r_list.get("result"):
        tunnel_id = r_list["result"][0]["id"]
        print(f"   ✓ Found existing Tunnel ID: {tunnel_id}")
    else:
        print("❌ Could not create or locate tunnel:", r_create)
        sys.exit(1)

# Get Tunnel Run Token
r_token = requests.get(
    f"https://api.cloudflare.com/client/v4/accounts/{account_id}/cfd_tunnel/{tunnel_id}/token",
    headers=account_headers
).json()
if not r_token.get("success"):
    print("❌ Failed to get Tunnel Token:", r_token)
    sys.exit(1)
tunnel_token = r_token["result"]

# ==========================================
# 5. CONFIGURE TUNNEL INGRESS ROUTING
# ==========================================
print(f"4/6 Configuring Ingress -> Route {FULL_HOSTNAME} to n8n:5678...")
ingress_payload = {
    "config": {
        "ingress": [
            {"hostname": FULL_HOSTNAME, "service": "http://n8n:5678"},
            {"service": "http_status:404"}
        ]
    }
}
r_ingress = requests.put(
    f"https://api.cloudflare.com/client/v4/accounts/{account_id}/cfd_tunnel/{tunnel_id}/configurations",
    headers=account_headers,
    json=ingress_payload
).json()
if not r_ingress.get("success"):
    print("❌ Failed to set Ingress config:", r_ingress)
    sys.exit(1)
print("   ✓ Ingress configuration updated successfully.")

# ==========================================
# 6. CREATE / UPDATE CNAME RECORD
# ==========================================
print(f"5/6 Pointing DNS CNAME for {FULL_HOSTNAME}...")
cname_target = f"{tunnel_id}.cfargotunnel.com"

# Check if DNS record exists
dns_list = requests.get(
    f"https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records?name={FULL_HOSTNAME}&type=CNAME",
    headers=dns_headers
).json()

dns_payload = {
    "type": "CNAME",
    "name": FULL_HOSTNAME,
    "content": cname_target,
    "proxied": True,
    "ttl": 1
}

if dns_list.get("result"):
    record_id = dns_list["result"][0]["id"]
    r_dns = requests.put(
        f"https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records/{record_id}",
        headers=dns_headers,
        json=dns_payload
    ).json()
else:
    r_dns = requests.post(
        f"https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records",
        headers=dns_headers,
        json=dns_payload
    ).json()

if not r_dns.get("success"):
    print("❌ Failed to set DNS record:", r_dns)
    sys.exit(1)
print(f"   ✓ DNS CNAME pointing to {cname_target}")

# ==========================================
# 7. GENERATE DOCKER COMPOSE & LAUNCH
# ==========================================
print("6/6 Setting up Docker Compose and launching services...")

project_dir = os.path.join(os.path.expanduser("~"), "docker-n8n-tunnel")
os.makedirs(os.path.join(project_dir, "n8n-data"), exist_ok=True)

compose_content = f"""services:
  n8n:
    image: n8nio/n8n:latest
    container_name: n8n
    restart: always
    environment:
      - N8N_HOST={FULL_HOSTNAME}
      - N8N_PROTOCOL=https
      - WEBHOOK_URL=https://{FULL_HOSTNAME}
      - GENERIC_TIMEZONE=Europe/London
      - TZ=Europe/London
    volumes:
      - ./n8n-data:/home/node/.n8n
    networks:
      - n8n-net

  cloudflared:
    image: cloudflare/cloudflared:latest
    container_name: cloudflared-n8n
    restart: always
    depends_on:
      - n8n
    command: tunnel --no-autoupdate run --token {tunnel_token}
    networks:
      - n8n-net

networks:
  n8n-net:
    driver: bridge
"""

compose_path = os.path.join(project_dir, "docker-compose.yml")
with open(compose_path, "w", encoding="utf-8") as f:
    f.write(compose_content)

print("   ✓ docker-compose.yml written.")
print("   🚀 Running `docker compose up -d`...")

subprocess.run(["docker", "compose", "up", "-d"], cwd=project_dir, check=True)

print("\n" + "="*50)
print(f"🎉 n8n IS LIVE AND READY AT:")
print(f"👉 https://{FULL_HOSTNAME}")
print("="*50)
```
