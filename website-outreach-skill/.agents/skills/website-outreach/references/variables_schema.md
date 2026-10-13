# Variables Extraction Schema: Strict 8-Key JSON Rules

When auditing a prospective client's website, the AI must extract verified observations into a standardized JSON format. These variables are directly injected into email templates to make every email hyper-personalized, grounded, and conversational.

---

## 1. The Strict 8-Key JSON Schema

The extracted analysis must strictly conform to this JSON schema:

```json
{
  "page": "Menu",
  "website_problem": "the large central image breaks up the menu flow on mobile",
  "recognizable_reason": "diners have to scroll heavily just to move between menu sections",
  "consequence_mechanics": "that extra friction makes checking dishes harder before deciding whether to book",
  "preview_asset_exists": false,
  "review_time": null,
  "micro_yes": "Want me to show you?",
  "subject_label": "a destination restaurant"
}
```

---

## 2. Field Definitions & Writing Constraints

| Field | Type | Constraints | Description & Purpose |
|---|---|---|---|
| `page` | string | 1–3 words (e.g. `Home`, `Menu`, `Services`, `Pricing`, `About`) | The specific page URL or section where the problem was verified. |
| `website_problem` | string | **8–18 words**, sentence fragment, lowercase start | The single strongest verified redesign-worthy issue. Must describe a concrete visual/structural flaw, NOT generic praise or vague critique. |
| `recognizable_reason` | string | **10–25 words**, conversational | What a normal human visitor actually sees, feels, or struggles with on that page. Must NOT repeat `website_problem`. |
| `consequence_mechanics` | string | **10–25 words**, cause-and-effect | The direct, realistic commercial chain explaining how this specific friction leads to fewer inquiries, bookings, or sales. |
| `preview_asset_exists` | boolean / null | `true`, `false`, or `null` | Whether a visual mockup, redesign preview, or screenshot comparison asset was prepared or exists. |
| `review_time` | integer / null | Integer minutes (e.g., `3`, `5`) or `null` | Estimated quick walkthrough time if offering a short video or breakdown. |
| `micro_yes` | string | **≤ 10 words**, low-friction question | A low-pressure, conversational call-to-action that invites a simple "yes" rather than asking for a 30-minute sales call. |
| `subject_label` | string | **2–5 words**, title casing or lowercase | A phrase describing what the company is known for, its category, or its market positioning (e.g. `a luxury boutique hotel`, `an established commercial law firm`). |

---

## 3. The 10 Golden Rules of Variable Y

1. **Observed or Conditional Only**: Every variable must either be directly observed on their public site, or conditional (describing a common buyer pattern without claiming it is measured fact).
2. **No Internal Measurement Claims**: Mechanics over metrics. Never cite conversion drop-offs, revenue loss, or analytics. You describe what typical buyers experience, not private data.
3. **One Lane Only**: Anchored strictly to the part of the business tied to the customer's next step (e.g. Menu $\rightarrow$ Book Table, or Services $\rightarrow$ Request Quote).
4. **One Friction Only**: If multiple issues exist, pick the **one single friction closest to the customer's next step**. Never list multiple issues.
5. **One Consequence Only**: The consequence must link directly to the friction and the lane. Multiple consequences create vague fluff.
6. **One Micro-Yes Only**: The ask must be answerable in one line, binary, and safe to say no to (e.g. *"Want me to show you?"*).
7. **No Opinion Variables**: Words like *"outdated"*, *"ugly"*, *"terrible layout"*, or *"bad design"* are banned. Describe the visible physical mechanics.
8. **No Flattery Variables**: Praise does not prove relevance; it reads like an amateur sales tactic.
9. **Names are Optional, Correctness is Mandatory**: Only use a first name if verified with high confidence. A wrong name destroys trust immediately; omitting a name does not.
10. **The Pass/Fail Standard**: If you cannot build Variable Y truthfully without guessing, skip the lead.

---

## 4. Anti-Jargon Phrasing Constraints

- **Banned Jargon**: *conversion rate optimization, digital presence, user engagement, UX friction, modern aesthetic, synergy, value-add*.
- **Required**: Concrete, observable language (e.g., *"the pricing table collapses into an unreadable column on mobile screens"*).
- Every field must read completely naturally when inserted directly into the email templates.

---

## 4. Good vs. Bad Extraction Examples

### Example A: Local Medical Clinic
- ❌ **Bad Extraction**:
  ```json
  {
    "page": "Homepage",
    "website_problem": "Needs complete redesign to optimize patient user experience and visual aesthetic",
    "recognizable_reason": "It looks old",
    "consequence_mechanics": "Patients won't like it",
    "preview_asset_exists": false,
    "review_time": null,
    "micro_yes": "Can we get on a 30 minute strategy call this Thursday at 2pm?",
    "subject_label": "healthcare clinic"
  }
  ```
- ✅ **Good Extraction**:
  ```json
  {
    "page": "Services",
    "website_problem": "the new patient registration link is buried under three layers of collapsed accordions",
    "recognizable_reason": "patients searching on their phones have to tap through multiple menus just to find booking options",
    "consequence_mechanics": "that added hesitation causes urgent patients to drop off and call competing clinics instead",
    "preview_asset_exists": false,
    "review_time": 3,
    "micro_yes": "Mind if I send over a quick 2-minute fix?",
    "subject_label": "a premier private medical practice"
  }
  ```

### Example B: Architectural / High-End Design Studio
- ✅ **Good Extraction**:
  ```json
  {
    "page": "Portfolio",
    "website_problem": "the project imagery renders in small low-res thumbnails that crop the architectural details",
    "recognizable_reason": "prospective clients on desktop cannot expand the photos to appreciate the build craftsmanship",
    "consequence_mechanics": "it undersells the high-end tier of your projects to developers looking for premium partners",
    "preview_asset_exists": true,
    "review_time": 4,
    "micro_yes": "Open to seeing how this could look full-screen?",
    "subject_label": "an award-winning architecture studio"
  }
  ```
