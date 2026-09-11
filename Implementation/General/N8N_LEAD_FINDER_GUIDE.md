# UK Local Business Lead Finder (n8n Workflow)

This n8n workflow automates the discovery of UK businesses on Google Maps that **do not have a website**, formats their phone numbers (flagging UK mobile `07...` numbers for WhatsApp), and auto-generates your exact **Stage 1 & Stage 2 outreach pitches**.

---

## ⚡ 1-Minute Setup Guide

### 1. Get Your Free Apify API Token (No Google Cloud Needed)
1. Go to [Apify.com](https://apify.com/) and sign up for a free account.
2. Go to **Settings** → **Integrations** → **API Tokens** (or [console.apify.com/account/integrations](https://console.apify.com/account/integrations)).
3. Copy your **Personal API Token** (e.g. `apify_api_...`).
   * *Note: The free tier gives you $5/month forever (~1,000–2,000 full Google Maps business results with zero credit card required).*

### 2. Import Workflow into n8n
1. In your **n8n** editor, click the **three dots menu (⋮)** in the top right.
2. Select **Import from File** (or **Import from URL / Text**).
3. Select the file: `Implementation/General/n8n-uk-lead-finder.json`.

### 3. Configure the Search
Double click the **2. Search Settings** node in n8n:
* **`search_query`**: Set your search (e.g., `Roofers in Solihull, UK` or `Builders in Reading, UK`).
* **`apify_api_token`**: Paste your Apify API token here.
* **`max_leads`**: Default is `25` (adjust as needed).
* **`min_reviews`**: Default is `3` (filters out dead or dormant listings).

### 4. Click "Test workflow" / "Execute Workflow"
The workflow will:
1. Search Google Maps in the background.
2. Exclude all businesses that already have a functioning website.
3. Keep businesses with only a social page (Facebook/Instagram) or no link at all.
4. Clean the UK phone number to international format (`+447...`).
5. Output a direct **`whatsapp_direct_link`** (`https://wa.me/447...`) that opens WhatsApp with `Hi 👋` ready to send.
6. Populate the custom **`stage_2_pitch`** with the business's actual name.
