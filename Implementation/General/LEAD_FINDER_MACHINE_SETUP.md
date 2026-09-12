# Google Places Lead Finder Machine (Zero Google Cloud Required)

This workflow is an exact 1-to-1 recreation of your professor's lead finder architecture in **n8n**, but engineered so that **you do not need Google Cloud Console, billing accounts, or Google Places API keys**.

Your Google Sheet is **pre-linked**:
`https://docs.google.com/spreadsheets/d/1uOpaNT8t8q_CzTHuGhCkjygXEd3HaCbw4DCAoRF3CMo/edit`

---

## 🏗️ Architecture Comparison

| Professor's Node in Screenshot | Our Zero-Cloud Equivalent | Why It's Better |
| :--- | :--- | :--- |
| **Set Variables1** | `Set Variables1` | Set search query, location, and max leads (e.g. 60). |
| **Geocoding API (Coordinates)1** | `Geocoding API (Coordinates)1` | Uses **OpenStreetMap Nominatim** (`nominatim.openstreetmap.org`). **100% Free, NO API key or Google Cloud needed**. |
| **HTTP Request** | `HTTP Request` | Calls Apify's Google Maps Crawler synchronously using your pre-configured token. Returns up to 60 rich places directly from Google Maps with real phone numbers, ratings, review counts, and websites. |
| **Code in JavaScript** | `Code in JavaScript` | Parses the results, cleans phone numbers, classifies if the business has a real website or only a social page, and formats leads for Google Sheets. |
| **If** | `If` | Checks `Has Website == false`. |
| **Append row in sheet1** | `Append row in sheet1` | Appends **High Priority Leads (No Website)** to Sheet 1. *(Pre-linked to your Google Sheet!)* |
| **Wait** | `Wait` | 1-second buffer to prevent Google Sheets write rate-limiting. |
| **Append row in sheet2** | `Append row in sheet2` | Appends **Standard Leads (Has Website)** to Sheet 2. *(Pre-linked to your Google Sheet!)* |
| **When clicking 'Execute workflow'** | `When clicking 'Execute workflow'` | Manual trigger for the bottom deduplication workflow. |
| **Get row(s) in sheet1** | `Get row(s) in sheet1` | Reads existing rows from Sheet 1. *(Pre-linked to your Google Sheet!)* |
| **Code in JavaScript1** | `Code in JavaScript1` | Detects duplicate phone numbers or business names and marks the row numbers to delete. |
| **Delete rows or columns from sheet** | `Delete rows or columns from sheet` | Deletes the duplicate rows in Google Sheets. *(Pre-linked to your Google Sheet!)* |

---

## 🚀 How to Import into n8n (in 30 seconds)

1. Open your **n8n** editor.
2. In the top-right corner of the canvas, click the **three dots menu (`...`)** and select **Import from File**.
3. Select the file:
   `Implementation/General/n8n-lead-finder-machine.json`
   *(Alternatively, open that file, copy the entire JSON with `Ctrl + A` and `Ctrl + C`, click on your n8n canvas, and press `Ctrl + V`).*
4. All 12 nodes will appear on your canvas connected exactly as shown in your professor's screenshot.

---

## ⚙️ Google Sheet Setup

1. Open your Google Sheet:
   [Open Spreadsheet](https://docs.google.com/spreadsheets/d/1uOpaNT8t8q_CzTHuGhCkjygXEd3HaCbw4DCAoRF3CMo/edit)
2. Ensure you have two tabs:
   - `Sheet1` (for High Priority / No Website leads)
   - `Sheet2` (for Standard / Has Website leads)
3. Add these column headers in **Row 1** of both tabs:
   `Business Name | Phone | Has Website | Website | Google Rating | Reviews Count | Address | Category | Google Maps URL | WhatsApp Link | Search Query | Lead Priority`
4. In n8n, simply select your existing **Google Sheets Account** under credentials for the Google Sheets nodes (if not already selected).

---

## ▶️ Running the Machine

1. Double-click **Set Variables1** and edit:
   - `search_query`: e.g. `Roofers in Solihull, UK` (or `Dentists in Manchester`, `Plumbers in Austin, TX`)
   - `max_leads`: `60`
2. Click **Test workflow** / **Execute Workflow**.
3. The scraper will fetch the listings from Google Maps, clean and categorize them, and populate your Google Sheet tabs.
4. Whenever you want to remove duplicate leads, click **Execute workflow** on the bottom trigger node.
