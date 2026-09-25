# Lead Outreach Ledger & Operator Cockpit Streamlining Plan

**Target Areas:**
1. Lead Outreach Ledger: `app/(admin)/admin/leads/page.tsx`
2. Outreach Intelligence Cockpit: `components/admin/outreach-modal.tsx`
3. Sequence Messaging Component: `components/admin/whatsapp-sequence-blocks.tsx`
4. Main Command Center Dashboard: `app/(admin)/admin/page.tsx` & `components/admin/today-outreach-strip.tsx`
5. Global Admin Navigation & Shell: `app/(admin)/layout.tsx` & `components/admin/command-palette.tsx`
6. Revenue & Live Health Telemetry: `components/admin/revenue-thermometer.tsx`
7. Outreach Sprint Queue Runner: `components/admin/outreach-sprint-runner.tsx`
8. Quotes WhatsApp Dispatcher: `app/(admin)/admin/quotes/page.tsx`

---

## 1. Executive Summary & Objective

The **Lead Outreach Ledger** and **Command Center** represent the operational core of Mercian Wealth. The objective of this overhaul is to turn the admin dashboard from a passive database into a lightning-fast, operator-first revenue cockpit.

Key objectives:
1. **Zero Cognitive Friction**: Replace fragmented and duplicate filters with 4 clear Action Queues.
2. **Execution-First Outreach**: Instant 1-click WhatsApp openers with automatic status progression to `Contacted`.
3. **Global Speed (`Cmd + K`)**: Command palette to navigate anywhere or find any lead/quote/project in 1 second.
4. **Gamified Outreach Sprint Runner**: Complete 10-15 outreaches consecutively in minutes.
5. **Real-Time Financial & System Pulse**: Target progress tracker (£10,000 MRR) and live service health monitoring.
6. **Mobile Layout Integrity**: 100% fluid responsive design, accessible touch targets, and zero layout shift.

---

## 2. Current Architecture vs. Target Architecture

### Before:
```
[Stats Cards (6 clickable toggles)]
[Tabs: Active | Archived | Spam]
[Search Bar] + [Filters Button] + [Due Follow-Up Toggle] + [View Mode: Cards | Table | Board]
[Segmented Pill Bar (6 pathways)]
  ↳ [Expandable Filter Drawer: Pipeline Stages + Pathways (Duplicate)]
[Cards / Table / Board with conflicting click handlers]
  ↳ [Modal: 6 Textareas (Variables) + AI Brainstorm + 4 Tabs]
```

### After:
```
[Global Header: Cmd+K Command Search + Inspector + Notifications + Profile]
[Command Strip: 4 Action Queues (Ready to WhatsApp | Due Follow-Up | Hot / Booked | Needs Review) + Sprint Mode]
[Utility Row: High-Speed Search + View Switcher (Cards | Table | Board)]
[Clean Leads View: Cards / Table / Board with standardized actions]
  ↳ Primary Action: 1-Click WhatsApp Opener OR Open Outreach Cockpit
  ↳ Sprint Action: Start Sequential Outreach Runner (Lead 1 → Send → Lead 2)
[Main Dashboard]:
  ↳ Today's Schedule Strip + Today's Priority Outreach Sprint
  ↳ Revenue Target Thermometer (£10k MRR) + Live System Health Monitors
[Quotes]:
  ↳ 1-Click "Send via WhatsApp" with pre-formatted client scope message
```

---

## 3. Detailed Implementation Steps

### Phase 1: Core Outreach Ledger & Cockpit Overhaul (Completed)
- [x] **Consolidated Action Queues (`app/(admin)/admin/leads/page.tsx`)**: Replaced 3-tier duplicate filters with *Ready to WhatsApp*, *Due Follow-Up*, *Active Deals*, *Needs Review*, and *All Leads*.
- [x] **Execution-First Outreach Cockpit (`components/admin/outreach-modal.tsx`)**: Put the 3-message WhatsApp sequence front and center. Automated status advancement to `Contacted` on touch 1. Tucked the 6 variable textareas inside an expandable accordion.
- [x] **Standardized Card/Table/Kanban Interactions**: Unified row clicks, dossier links, and direct WhatsApp actions across all views.
- [x] **Main Dashboard "Today's Outreach Sprint" (`components/admin/today-outreach-strip.tsx`)**: Displays the top 4 priority fresh leads on `/admin` with 1-click WhatsApp dispatch.

### Phase 2: System-Wide Admin Enhancements
- [x] **Step 1: Global Admin Command Palette (`components/admin/command-palette.tsx`)**:
  - Hotkey listener (`Cmd + K` or `Ctrl + K`) and top-bar search button.
  - Fast search across Leads, Clients, Projects, Quotes, Bookings, and Pages.
  - Action shortcuts (Add Lead, Sync Sheets, Start Outreach Sprint).
- [x] **Step 2: Monthly Revenue Thermometer & Live Service Health (`components/admin/revenue-thermometer.tsx`)**:
  - Visual monthly MRR progress bar tracking collected revenue against the £10,000 goal.
  - Service health status indicators for Google Sheets Sync, Supabase Real-Time, n8n Scraper Webhook, and Stripe/Bank payments.
- [x] **Step 3: Interactive Outreach Sprint "Queue Runner" (`components/admin/outreach-sprint-runner.tsx`)**:
  - Sequential lead-by-lead runner for the active queue.
  - Preview message 1, 1-click WhatsApp send, auto-advance to next lead, keyboard arrow navigation.
- [x] **Step 4: WhatsApp Quote Dispatcher on Quotes Page (`app/(admin)/admin/quotes/page.tsx`)**:
  - 1-click WhatsApp share button next to client quote links with tailored client copy.

### Phase 3: Verification & Mobile Layout Preservation
- [x] Complete TypeScript compile (`tsc --noEmit`) with 0 errors.
- [x] Mobile viewport responsive validation across phone (<640px), tablet (640-1024px), and desktop.
