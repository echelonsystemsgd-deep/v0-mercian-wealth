# Autonomous n8n + Cloudflare Tunnel Student Prompt

Copy and paste the entire prompt below directly into your AI Assistant (Codex, Antigravity, Cursor, or ChatGPT).

---

```text
You are an autonomous DevOps setup agent. Your job is to set up a complete, production-ready n8n instance with a live Cloudflare Tunnel on my machine. 

I do not know how to code, use the terminal, or edit files. You must do 100% of the work autonomously by creating files and executing terminal commands directly. Do not give me instructions to follow—just do everything for me.

Here are my Cloudflare credentials and domain info:
- ACCOUNT_TOKEN: "PASTE_ACCOUNT_TOKEN_HERE"
- DNS_TOKEN:     "PASTE_DNS_TOKEN_HERE"
- DOMAIN:        "example.com"
- SUBDOMAIN:     "n8n"

Follow this exact automated sequence:

STEP 1: ENVIRONMENT & PREREQUISITES
- Check if Python and the requests library are installed. If missing, install requests via pip install requests.
- Check if Docker is installed and running. If Docker Desktop is not running, launch it or warn me to open Docker Desktop.

STEP 2: WRITE AND EXECUTE THE CLOUDFLARE & DOCKER DEPLOYMENT SCRIPT
Create a file named deploy_n8n.py and run it with Python. The script must:
1. Use Authorization: Bearer <ACCOUNT_TOKEN> to fetch the Cloudflare Account ID from https://api.cloudflare.com/client/v4/accounts.
2. Use Authorization: Bearer <DNS_TOKEN> to fetch the Zone ID for <DOMAIN> from https://api.cloudflare.com/client/v4/zones?name=<DOMAIN>.
3. Create a Cloudflare Tunnel named n8n-tunnel (or locate the existing one) using the Account Token, and retrieve the Tunnel Run Token.
4. Update the Tunnel Ingress configuration to route <SUBDOMAIN>.<DOMAIN> to http://n8n:5678.
5. Create or update the CNAME DNS record for <SUBDOMAIN>.<DOMAIN> pointing to <tunnel_id>.cfargotunnel.com with proxied: true using the DNS Token.
6. Create a directory docker-n8n-tunnel with a docker-compose.yml that runs:
   - n8n (n8nio/n8n:latest) with persistent volume ./n8n-data:/home/node/.n8n, N8N_HOST=<SUBDOMAIN>.<DOMAIN>, N8N_PROTOCOL=https, WEBHOOK_URL=https://<SUBDOMAIN>.<DOMAIN>.
   - cloudflared (cloudflare/cloudflared:latest) running tunnel --no-autoupdate run --token <TUNNEL_TOKEN>.
7. Execute docker compose up -d in that folder.

STEP 3: VERIFY & REPORT
- Check docker ps to verify that both n8n and cloudflared-n8n are running.
- Once both are up, print a congratulatory message and give me a clickable link to my new live n8n URL (e.g. https://n8n.example.com).
```
