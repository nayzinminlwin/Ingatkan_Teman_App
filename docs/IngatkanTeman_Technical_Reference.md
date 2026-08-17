# Ingatkan Teman — Exhaustive Technical Reference

> **Purpose**: This document is an **AI-readable migration reference** for transforming the Ingatkan Teman web prototype into a native mobile application. It exhaustively documents every file, module, data model, navigation flow, API integration, UI component, styling pattern, and i18n key in the current codebase — derived entirely from source code analysis.

> **Project**: SSW3001 Software Engineering — University Putra Malaysia (UPM)  
> **Team**: KATSPAW (Lead: Nay Zin @ Alex)  
> **Document Generated From**: Codebase at `Ingatkan_Teman_App/`

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack & Architecture](#2-technology-stack--architecture)
3. [Directory Structure & File Inventory](#3-directory-structure--file-inventory)
4. [Design System (global.css)](#4-design-system-globalcss)
5. [Internationalization (i18n) System](#5-internationalization-i18n-system)
6. [Module 0: Login / Authentication (index.html)](#6-module-0-login--authentication-indexhtml)
7. [Module 1: Home Dashboard (main/)](#7-module-1-home-dashboard-main)
8. [Module 2: Medication Reminder (medReminder/)](#8-module-2-medication-reminder-medreminder)
9. [Module 3: Medication Inventory Tracker (medInventoryTracker/)](#9-module-3-medication-inventory-tracker-medinventorytracker)
10. [Module 4: Daily Health Recorder (dailyHealthRecorder/)](#10-module-4-daily-health-recorder-dailyhealthrecorder)
11. [Module 5: Chit-Chat — Adik Aisya (conversationalUI/chitChat)](#11-module-5-chit-chat--adik-aisya-conversationaluichitchat)
12. [Module 6: Health Consulting — Encik Amirul (conversationalUI/consultChat)](#12-module-6-health-consulting--encik-amirul-conversationaluiconsultchat)
13. [Data Models & Storage](#13-data-models--storage)
14. [AI / Gemini API Integration](#14-ai--gemini-api-integration)
15. [Navigation Map](#15-navigation-map)
16. [Asset Inventory](#16-asset-inventory)
17. [PWA Configuration (manifest.json)](#17-pwa-configuration-manifestjson)
18. [Key Divergences from SRS/SDD](#18-key-divergences-from-srssdd)
19. [Known Limitations & Simulations](#19-known-limitations--simulations)
20. [Migration Considerations](#20-migration-considerations)

---

## 1. Project Overview

**Ingatkan Teman** ("Remind a Friend") is a health companion app designed for **elderly Malaysian users (age 70+)**. It provides:

- **Medication Reminder** — schedule and track daily medication intake
- **Medication Inventory Tracker** — monitor stock levels, expiry dates, find nearby pharmacies
- **Daily Health Recorder** — guided chat-based daily health check (BP, HR, blood sugar, symptoms)
- **Chit-Chat** — AI companion for casual conversation and emotional support
- **Health Consulting** — AI-powered general health information (non-diagnostic)

All features are presented through **AI personas** — friendly characters that guide the elderly user:

| Persona | Role | Module | Theme Color |
|---------|------|--------|-------------|
| Adik Ahmad | Medication Assistant | Medication Reminder | `#2D7FF9` (Blue) |
| PakCik Firdaus | Inventory Manager | Medication Inventory | `#2E7D32` (Green) |
| Dr. Fatimah | Doctor | Daily Health Recorder | `#009688` (Teal) |
| Nurse Alia | Nurse | Daily Health Recorder | `#009688` (Teal) |
| Adik Aisya | Friendly Companion | Chit-Chat | `#FF6F61` (Coral) |
| Encik Amirul | Health Consultant | Consulting | `#34495E` (Dark Blue-Grey) |

---

## 2. Technology Stack & Architecture

### Current Implementation (Web Prototype)

| Layer | Technology | Details |
|-------|-----------|---------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript | No framework, no build tools, no bundler |
| **Styling** | CSS Custom Properties (Variables) | Design system in `global.css`, module-specific CSS |
| **Data** | `localStorage` + JSON dummy files | All persistence is client-side |
| **AI** | Google Gemini 2.5 Flash API | Via Cloudflare Worker proxy |
| **i18n** | Custom IIFE module | English (`en`) + Bahasa Melayu (`bm`) |
| **PWA** | `manifest.json` | Installable, portrait-locked, standalone display |
| **Auth** | Simulated | FaceID animation → any 4-digit PIN → sessionStorage |

### Architecture Pattern

```
┌─────────────────────────────────────────────────────┐
│                    Browser (Client)                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │index.html│→ │homePage  │→ │ Module Pages      │  │
│  │(Login)   │  │(Dashboard│  │ (medReminder/,    │  │
│  │          │  │)         │  │  medInventory/,   │  │
│  └──────────┘  └──────────┘  │  healthRecorder/, │  │
│                              │  conversationalUI)│  │
│                              └──────────────────┘  │
│  ┌─────────────┐  ┌──────────────────────────────┐  │
│  │ localStorage │  │  fetch() → JSON dummy files  │  │
│  │ (persistent) │  │  (assets/dummyData/*.JSON)   │  │
│  └─────────────┘  └──────────────────────────────┘  │
│                              │                      │
│                    ┌─────────▼─────────┐            │
│                    │ Cloudflare Worker  │            │
│                    │ (Gemini Proxy)     │            │
│                    └─────────┬─────────┘            │
│                              │                      │
│                    ┌─────────▼─────────┐            │
│                    │ Google Gemini API  │            │
│                    │ (gemini-2.5-flash) │            │
│                    └───────────────────┘            │
└─────────────────────────────────────────────────────┘
```

### No Server-Side Code

Despite `package.json` listing `oracledb ^6.10.0`, there is **no server-side code** in the current codebase. All files are static HTML served directly. The Oracle DB dependency is aspirational / for future backend work.

---

## 3. Directory Structure & File Inventory

```
Ingatkan_Teman_App/
├── index.html                          # Login page (FaceID sim + PIN entry)
├── manifest.json                       # PWA manifest
├── package.json                        # Node.js metadata (only oracledb dep)
├── README.md                           # Project overview
│
├── styles/
│   ├── global.css                      # Design system (113 lines)
│   └── indexStyle.css                  # Login page styles
│
├── i18n/
│   ├── i18n.js                         # i18n IIFE module (240 lines)
│   └── translations.json              # All translation keys (en + bm)
│
├── main/
│   ├── homePage.html                   # Dashboard with feature grid
│   ├── homePageStyle.css               # Dashboard styles (responsive)
│   └── loadingPage.html                # Minimal loading page (placeholder)
│
├── medReminder/
│   ├── medReminderHome.html            # Medication schedule viewer
│   ├── manualInput.html                # Add medication form
│   ├── OCRScanPage.html                # Simulated OCR scan page
│   └── style.css                       # MedReminder module styles
│
├── medInventoryTracker/
│   ├── inventoryHome.html              # Inventory dashboard
│   ├── stock.html                      # Stock report + PDF export
│   ├── editStock.html                  # Edit quantities
│   ├── newMed.html                     # Add new medicine form
│   ├── Pharmacy.html                   # Nearby pharmacy finder
│   ├── inventoryUtils.js               # Shared utility functions (148 lines)
│   └── style.css                       # Inventory module styles (1716 lines)
│
├── dailyHealthRecorder/
│   ├── healthChat.html                 # Guided health check chat
│   └── style.css                       # Health recorder styles
│
├── conversationalUI/
│   ├── chitChat.html                   # Casual chat with Adik Aisya
│   ├── chitChat.JSON                   # Chat persona data + topics
│   ├── consultChat.html                # Health consulting with Encik Amirul
│   ├── consultChat.JSON                # Consulting persona data + topics
│   └── chatUI.css                      # Shared chat interface styles
│
├── assets/
│   ├── Ingatkan_Teman_Logo.PNG         # App logo
│   ├── Adik_Ahmad.png                  # Persona avatar
│   ├── Adik_Aisya.png                  # Persona avatar
│   ├── Dr_Fatimah.png                  # Persona avatar
│   ├── Nurse_Alia.png                  # Persona avatar
│   ├── PakCik_Firdaus.png              # Persona avatar
│   ├── Encik_Amirul.png                # Persona avatar
│   ├── ui1_login.png ... ui9_*.png     # UI screenshots (9 files)
│   └── dummyData/
│       ├── dummy.js                    # Gemini API key (window.GEMINI_API_KEY)
│       ├── medicationSchedules.JSON    # Medication schedule seed data
│       ├── inventory.JSON              # Inventory seed data
│       ├── healthChat.JSON             # Health chat conversation flow
│       └── healthRecords.JSON          # Health record seed data
│
├── docs/
│   ├── SSW3001_SRS_KATSPAW.md / .pdf   # Software Requirements Specification
│   ├── SSW3001_SDD_KATSPAW.md / .pdf   # Software Design Document
│   └── IngatkanTeman_Diagrams_n_Demo.pdf
│
└── UI_References/
    ├── homeDashboard.txt
    ├── main.JSON
    ├── ChitChat/chitChat.png
    ├── Consulting/consultChat.png
    ├── HealthRecorder/healthChat.png
    ├── MedInventory/inventoryHome.png, PhamarcyMap_ui.png, stockReport_ui.png,
    │               editStock.txt, newMedicine.txt
    └── MedReminder/medReminder_home.jpeg, textTract_ui.png, manualInput_ui.txt
```

---

## 4. Design System (global.css)

**File**: `styles/global.css` (113 lines)

### 4.1 CSS Custom Properties (Root Variables)

```css
:root {
    /* COLOR PALETTE */
    --bg-global: #FFFBF7;       /* Warm Off-White background */
    --bg-surface: #FFFFFF;       /* Pure White card surfaces */
    --text-primary: #121212;     /* Soft Black text */
    --text-secondary: #5A5A5A;   /* AAA Grey secondary text */

    /* PERSONA THEME COLORS */
    --color-meds: #2D7FF9;       /* Adik Ahmad — Blue */
    --color-inventory: #2E7D32;  /* PakCik Firdaus — Green */
    --color-health: #009688;     /* Dr. Fatimah — Teal */
    --color-chat: #FF6F61;       /* Adik Aisya — Coral */
    --color-consult: #34495E;    /* Encik Amirul — Dark Blue-Grey */

    /* SAFETY COLORS */
    --color-danger: #D32F2F;
    --color-warning: #FFA000;
    --color-success: #388E3C;

    /* TYPOGRAPHY (Senior-Optimized) */
    --font-main: 'Inter', 'Open Sans', sans-serif;
    --size-h1: 32px;
    --size-h2: 26px;
    --size-h3: 22px;
    --size-body: 18px;           /* MINIMUM body font size */
    --size-label: 16px;

    /* SPACING & SHAPE */
    --radius-btn: 12px;
    --radius-card: 16px;
    --space-sm: 8px;
    --space-md: 16px;
    --space-lg: 24px;
    --touch-target: 56px;        /* Minimum touch target */
}
```

### 4.2 Shared Components

| Component | Class | Properties |
|-----------|-------|-----------|
| Button | `.btn` | Full-width, 56px height, 12px radius, 600 weight, scale-on-press |
| Card | `.card` | White bg, 16px radius, 24px padding, subtle shadow+border |
| Input | `input, select, textarea` | Full-width, 56px height, 18px font, 2px border |

### 4.3 Senior-First Design Principles

- **Minimum font size**: 18px body text
- **Touch targets**: 56px minimum height for all interactive elements
- **High contrast**: `#121212` on `#FFFBF7` (passes WCAG AAA)
- **No hover states**: Only `:active` for touch-first design
- **Clamp padding**: `clamp(16px, 4vw, 24px)` for edge safety
- **No tap highlight**: `-webkit-tap-highlight-color: transparent`

---

## 5. Internationalization (i18n) System

**Files**: `i18n/i18n.js` (240 lines) + `i18n/translations.json`

### 5.1 Architecture

The i18n system is a **self-contained IIFE module** exposed as the global `I18n` object.

```javascript
const I18n = (function () {
    const STORAGE_KEY = "ingatkanTeman_language";
    const DEFAULT_LANG = "en";
    // ...
    return { init, t, getLanguage, setLanguage, switchLanguage, applyTranslations, updateLangButton };
})();
```

### 5.2 Public API

| Method | Signature | Description |
|--------|-----------|-------------|
| `init(callback?)` | `async (fn) → lang` | Loads translations JSON, applies to DOM, calls callback |
| `t(keyPath, fallback?)` | `(string, string?) → string` | Get translation by dot-path (e.g., `"home.welcome"`) |
| `getLanguage()` | `() → "en" \| "bm"` | Read language from localStorage |
| `setLanguage(lang)` | `("en" \| "bm") → lang` | Write language to localStorage |
| `switchLanguage()` | `async () → lang` | Toggle en↔bm, re-apply all, dispatch `languageChanged` event |
| `applyTranslations()` | `() → void` | Re-scan DOM and apply current language |
| `updateLangButton(el)` | `(HTMLElement) → void` | Set button text to opposite language code |

### 5.3 DOM Attribute Bindings

| Attribute | Target Property | Example |
|-----------|----------------|---------|
| `data-i18n="key.path"` | `el.innerHTML` | `<h1 data-i18n="home.welcome">` |
| `data-i18n-placeholder="key.path"` | `el.placeholder` | `<input data-i18n-placeholder="chitChat.typeMessage">` |
| `data-i18n-title="key.path"` | `document.title` | `<title data-i18n-title="login.pageTitle">` |

### 5.4 Path Resolution

The module auto-detects the page's directory depth to resolve `translations.json`:

- Pages in `/main/`, `/medReminder/`, `/medInventoryTracker/`, `/dailyHealthRecorder/`, `/conversationalUI/` → `"../i18n/translations.json"`
- Root-level `index.html` → `"i18n/translations.json"`

### 5.5 Language Persistence

- **Storage key**: `ingatkanTeman_language` in `localStorage`
- **Default**: `"en"` (English)
- **Supported**: `"en"` (English), `"bm"` (Bahasa Melayu)
- **Enforcement**: `homePage.html` forces English on first load unless user explicitly changed it

### 5.6 Custom Event

When language changes, the system dispatches:
```javascript
window.dispatchEvent(new CustomEvent("languageChanged", {
    detail: { language: newLang }
}));
```

### 5.7 Translation Key Structure

The `translations.json` file has top-level keys `"en"` and `"bm"`, each containing nested objects by module:

```
en / bm
├── common.*          (back, loading, etc.)
├── login.*           (pageTitle, scanning, welcomeBack, enterPin)
├── home.*            (pageTitle, welcome, medicationReminder, medicationInventory,
│                      dailyHealthRecorder, chitChat, consulting, footer)
├── medReminder.*     (pageTitle, stats labels, time labels, actions, form fields)
├── inventory.*       (pageTitle, all status labels, form fields, pharmacy labels)
├── healthChat.*      (pageTitle, header, report labels)
├── chitChat.*        (pageTitle, headerTitle, headerStatus, typeMessage, startNewChat)
└── consulting.*      (pageTitle, headerTitle, headerStatus, askQuestion, startNewConsultation)
```

> **Note for migration**: Each chat module (chitChat, consultChat, healthChat) also has its own **inline bilingual data** in its JSON data files (using `_BM` suffixed keys), separate from the i18n system. Both systems must be preserved.

---

## 6. Module 0: Login / Authentication (index.html)

**File**: `index.html` (137 lines)

### 6.1 Page Flow

```
┌──────────────────┐     3 seconds     ┌──────────────────┐    4th digit     ┌──────────────┐
│  Stage A:        │  ──────────────►  │  Stage B:        │  ─────────────► │  homePage.html│
│  FaceID Sim      │                   │  PIN Entry       │                 │  (Dashboard)  │
│  (scan-icon +    │                   │  (4-digit keypad)│                 │               │
│  "Scanning...")  │                   │                  │                 │               │
└──────────────────┘                   └──────────────────┘                 └──────────────┘
```

### 6.2 Stage A — FaceID Simulation

- Shows app logo (`assets/Ingatkan_Teman_Logo.PNG`)
- Shows scan icon `👤` with scanning animation
- Shows text "Scanning your face..." (i18n: `login.scanning`)
- Auto-transitions to Stage B after **3 seconds** via `setTimeout`
- CSS class `.hidden` hides Stage A

### 6.3 Stage B — PIN Entry

- Welcome header: "Welcome Back!" + "Please enter your PIN"
- 4 PIN boxes (visual-only, shows `•` when filled)
- Custom numeric keypad (1-9, 0, delete ⌫)
- **No PIN validation** — any 4 digits are accepted
- On 4th digit entry:
  - Sets `sessionStorage.setItem("isLoggedIn", "true")`
  - Sets `sessionStorage.setItem("loginTime", Date.now())`
  - Redirects to `main/homePage.html` after 300ms delay

### 6.4 Session Management

- **Login state**: `sessionStorage` key `"isLoggedIn"` = `"true"`
- **Login time**: `sessionStorage` key `"loginTime"` = timestamp string
- **Session check on homePage**: Redirects to `index.html` if `isLoggedIn !== "true"`
- **Logout**: Removes both keys, redirects to `index.html`
- **Note**: Uses `sessionStorage` (not `localStorage`), so session expires on tab close

### 6.5 PWA Meta Tags

```html
<link rel="manifest" href="manifest.json" />
<meta name="theme-color" content="#FF6F61" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<meta name="apple-mobile-web-app-title" content="Ingatkan Teman" />
<link rel="apple-touch-icon" href="assets/Ingatkan_Teman_Logo.PNG" />
```

### 6.6 Styling (indexStyle.css)

- Navbar: Fixed header with logo + title
- Stage A: Centered logo, pulsing scan icon animation
- Stage B: PIN boxes in a row, grid-based keypad (3 columns)
- Press feedback via `:active` pseudo-class (scale transform)

---

## 7. Module 1: Home Dashboard (main/)

### 7.1 homePage.html

**File**: `main/homePage.html`

#### Layout Structure

```
┌─────────────────────────────────────┐
│  Fixed Navbar                       │
│  [Logo] Ingatkan Teman    [BM][🚪] │
├─────────────────────────────────────┤
│  Welcome Header                     │
│  "Selamat Datang, Nenek ❤️"         │
├──────────────┬──────────────────────┤
│  Feature     │  Feature             │
│  Card:       │  Card:               │
│  Medication  │  Medication          │
│  Reminder    │  Inventory           │
│  (Ahmad)     │  (Firdaus)           │
├──────────────┴──────────────────────┤
│  Feature Card: Daily Health         │
│  Recorder (Full Width)              │
│  (Dr. Fatimah + Nurse Alia)         │
├──────────────┬──────────────────────┤
│  Feature     │  Feature             │
│  Card:       │  Card:               │
│  Chit-Chat   │  Consulting          │
│  (Aisya)     │  (Amirul)            │
├──────────────┴──────────────────────┤
│  Footer: "May God be with you ❤️"   │
└─────────────────────────────────────┘
```

#### Feature Grid Links

| Card | `data-theme` | Avatar | Link Target |
|------|-------------|--------|-------------|
| Medication Reminder | `meds` | `Adik_Ahmad.png` | `../medReminder/medReminderHome.html` |
| Medication Inventory | `inventory` | `PakCik_Firdaus.png` | `../medInventoryTracker/inventoryHome.html` |
| Daily Health Recorder | `health` | `Dr_Fatimah.png` + `Nurse_Alia.png` | `../dailyHealthRecorder/healthChat.html` |
| Chit-Chat | `chat` | `Adik_Aisya.png` | `../conversationalUI/chitChat.html` |
| Consulting | `consult` | `Encik_Amirul.png` | `../conversationalUI/consultChat.html` |

#### JavaScript Logic

1. **Session Check**: IIFE that redirects to `../index.html` if `sessionStorage.isLoggedIn !== "true"`
2. **Language Toggle**: Button shows opposite language code; click calls `I18n.switchLanguage()`
3. **Default Language Enforcement**: Forces English on first load via `I18n.setLanguage("en")` unless already `"en"`
4. **Logout**: Clears sessionStorage keys, redirects to login

### 7.2 homePageStyle.css

**File**: `main/homePageStyle.css` (300+ lines)

#### 3D Card Platform Design

Each feature card uses a **"stage" metaphor**: a colored platform with the persona avatar standing on top.

```css
.feature-card { min-height: 110px; max-height: 110px; }
.card-platform { position: absolute; bottom: 0; height: 70%; border-bottom: 8px solid rgba(0,0,0,0.3); }
.card-content { position: absolute; bottom: 10%; z-index: 2; }
.avatar { width: 100px; height: 100px; }
```

- Cards are `<a>` tags (whole-card-clickable)
- Health Recorder card is `.full-width` (spans both columns)
- Press feedback: `translateY(4px)` + reduced border

#### Responsive Breakpoints

| Breakpoint | Grid | Card Height | Avatar Size | Title Font |
|-----------|------|------------|-------------|------|
| ≤480px (mobile) | 1 column | 140px | 120px | 20px |
| 481-767px (default) | 2 columns | 110px | 100px | 16px |
| ≥768px (tablet) | 2 columns, max-width 700px | 180px | 150px | 22px |
| ≥1024px (large tablet) | 2 columns, max-width 800px | 220px | 180px | 26px |

### 7.3 loadingPage.html

**File**: `main/loadingPage.html` (11 lines)

Minimal placeholder page with just `<body><!-- Animated splash screen --></body>`. Currently unused / not linked from any page.

---

## 8. Module 2: Medication Reminder (medReminder/)

### 8.1 medReminderHome.html — Schedule Viewer

**File**: `medReminder/medReminderHome.html`

#### Page Layout

```
┌─────────────────────────────────────┐
│  Header: ← Back | Medication Rmdr  │
├─────────────────────────────────────┤
│  Avatar Scene:                      │
│  [Adik Ahmad] "You have X meds"    │
├──────┬──────┬──────┬────────────────┤
│ Taken│ Next │Pend. │ Missed         │
│  1   │  1   │  1   │  1             │ ← Stats Dashboard
├──────┴──────┴──────┴────────────────┤
│  Action Buttons:                    │
│  [➕ Add] [📸 OCR Scan]             │
├─────────────────────────────────────┤
│  Schedule Cards (dynamic):          │
│  ┌─────────────────────────────┐    │
│  │ 08:00 Paracetamol           │    │
│  │ 2 tablets • After Breakfast │    │
│  │ Status: ✅ Taken             │    │
│  │ [Mark Taken] [Delete]       │    │
│  └─────────────────────────────┘    │
│  ... more cards ...                 │
└─────────────────────────────────────┘
```

#### Data Source

- **Primary**: `localStorage` key `"ingatkanTeman_schedules"`
- **Fallback**: Fetches from `../assets/dummyData/medicationSchedules.JSON` and caches to localStorage

#### Schedule Data Model

```json
{
  "id": "sched_001",
  "medicineName": "Paracetamol",
  "dosage": "2 tablets",
  "dosage_BM": "2 biji",
  "time": "08:00",
  "instruction": "after-breakfast",
  "repeat": "daily",
  "status": "taken",
  "createdAt": "2026-01-20T10:00:00Z",
  "takenAt": "2026-01-22T08:05:00Z"
}
```

#### Status Types & Display

| Status | Icon | Color | i18n Key |
|--------|------|-------|----------|
| `taken` | ✅ | Green | `statusLabels.taken` |
| `upcoming` | ⏰ (Next) | Blue | `statusLabels.upcoming` |
| `pending` | ⏳ | Grey | `statusLabels.pending` |
| `missed` | ❌ | Red | `statusLabels.missed` |

#### Instruction Labels (Bilingual)

| Key | English | Bahasa Melayu |
|-----|---------|---------------|
| `after-breakfast` | After Breakfast | Selepas Sarapan |
| `before-breakfast` | Before Breakfast | Sebelum Sarapan |
| `after-lunch` | After Lunch | Selepas Makan Tengahari |
| `before-lunch` | Before Lunch | Sebelum Makan Tengahari |
| `after-dinner` | After Dinner | Selepas Makan Malam |
| `before-dinner` | Before Dinner | Sebelum Makan Malam |
| `before-sleep` | Before Sleep | Sebelum Tidur |

#### Repeat Labels (Bilingual)

| Key | English | Bahasa Melayu |
|-----|---------|---------------|
| `daily` | Every Day | Setiap Hari |
| `weekdays` | Weekdays Only | Hari Bekerja Sahaja |
| `weekly` | Weekly | Setiap Minggu |
| `monthly` | Monthly | Setiap Bulan |
| `once` | One Time Only | Sekali Sahaja |

#### JavaScript Functions

- `loadSchedules()` — Load from localStorage or fetch JSON
- `renderSchedules()` — Build cards, compute stats, group by status
- `markTaken(id)` — Update status to `"taken"`, set `takenAt` timestamp
- `deleteSchedule(id)` — Remove from array, save to localStorage
- `getStatusClass(status)` / `getStatusIcon(status)` — Visual mapping
- Stats computed: taken count, upcoming count, pending count, missed count

### 8.2 manualInput.html — Add Medication Form

**File**: `medReminder/manualInput.html`

#### Form Fields

| Field | Type | Required | Details |
|-------|------|----------|---------|
| Medicine Name | `text` with `<datalist>` | ✅ | Suggestions: Paracetamol, Amoxicillin, Metformin, etc. |
| Dosage | `text` | ✅ | e.g., "2 tablets" |
| Time | `time` | ✅ | HTML time picker |
| Instruction | `<select>` | ✅ | Options from instruction labels |
| Repeat | `<select>` | ✅ | Options from repeat labels |

#### Multi-Card System

- First card always visible with remove button hidden
- "Add Another Medicine" button clones the first card
- Clone gets new IDs, cleared values, visible remove button
- Remove button deletes card (minimum 1 card enforced)
- Card numbers auto-update on removal

#### Form Submission

```javascript
// On submit:
// 1. Collect all card data
// 2. Generate unique ID: "sched_" + Date.now() + "_" + index
// 3. Set default status: "pending"
// 4. Set createdAt: new Date().toISOString()
// 5. Load existing schedules from localStorage
// 6. Append new schedules
// 7. Save to localStorage key "ingatkanTeman_schedules"
// 8. Alert success count
// 9. Redirect to medReminderHome.html
```

### 8.3 OCRScanPage.html — Simulated OCR

**File**: `medReminder/OCRScanPage.html`

#### This is a SIMULATION — no actual OCR

```
┌───────────────────────────────┐
│  Camera Viewfinder (CSS)      │
│  ┌─────────────────────────┐  │
│  │  Scan animation lines   │  │
│  │  moving across screen   │  │
│  └─────────────────────────┘  │
│                               │
│  [Cancel]  [📸 Scan]          │
│                               │
│  After "scan":                │
│  "Scanning..." → 2s delay    │
│  → redirect to manualInput    │
└───────────────────────────────┘
```

- CSS-animated scan lines over a camera-like dark area
- "Scan" button triggers 2-second delay with "Scanning..." text
- After delay, redirects to `manualInput.html` (no data extracted)
- **No actual Textract/OCR API call**

---

## 9. Module 3: Medication Inventory Tracker (medInventoryTracker/)

### 9.1 inventoryUtils.js — Shared Utilities

**File**: `medInventoryTracker/inventoryUtils.js` (148 lines)

#### Constants

```javascript
const LOW_STOCK_THRESHOLD = 10;      // Qty ≤ 10 = low stock
const EXPIRING_SOON_DAYS = 60;       // ≤ 60 days to expiry = expiring soon
const INVENTORY_STORAGE_KEY = "medInventory";
const INVENTORY_JSON_PATH = "../assets/dummyData/inventory.JSON";
```

#### Functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `loadInventory()` | `async () → Array` | Load from localStorage or fetch JSON fallback |
| `saveInventory(inventory)` | `(Array) → void` | Save to localStorage |
| `parseDate(dateStr)` | `(string) → Date` | Parse `DD.MM.YYYY` format |
| `formatDateToDisplay(isoDate)` | `(string) → string` | Convert `YYYY-MM-DD` → `DD.MM.YYYY` |
| `getDaysUntilExpiry(expDate)` | `(string) → number` | Days until expiry (negative = expired) |
| `isExpiringSoon(expDate)` | `(string) → boolean` | ≤ 60 days AND > 0 days |
| `isExpired(expDate)` | `(string) → boolean` | ≤ 0 days |
| `isLowStock(qty)` | `(number) → boolean` | ≤ 10 |
| `getMedicineStatus(med)` | `(Object) → {text, class, icon}` | Returns status object |
| `formatReportDate()` | `() → string` | Format current date/time for reports |

#### Medicine Status Priority

| Priority | Status | Icon | Class | Condition |
|----------|--------|------|-------|-----------|
| 0 | Expired | 🔴 | `expired` | Days until expiry ≤ 0 |
| 1 | Expiring | 🟠 | `expiring` | Days until expiry ≤ 60 |
| 2 | Low Stock | 🟡 | `low` | Qty ≤ 10 |
| 3 | OK | 🟢 | `ok` | None of the above |

### 9.2 Inventory Data Model

```json
{
  "MedName": "Paracetamol",
  "Qty": 20,
  "Batch": "3",
  "ExpDate": "12.12.2026"
}
```

**Seed data** (`assets/dummyData/inventory.JSON`): 7 medicines:
- Paracetamol (Batch 3, Qty 20, Exp 12.12.2026)
- Amoxicillin (Batch 3, Qty 12, Exp 02.11.2028)
- Paracetamol (Batch 4, Qty 32, Exp 02.12.2029)
- Metformin (Batch 5, Qty 45, Exp 15.03.2026)
- Amlodipine (Batch 2, Qty 5, Exp 01.05.2026) — Low stock
- Atorvastatin (Batch 9, Qty 2, Exp 20.11.2026) — Low stock
- Vitamin C (Batch 1, Qty 10, Exp 10.02.2026) — Low stock + Expiring

### 9.3 inventoryHome.html — Dashboard

#### Layout

```
┌─────────────────────────────────────┐
│  Header: ← Back | Medicine Inventory│
├─────────────────────────────────────┤
│  PakCik Firdaus Welcome:            │
│  [Avatar] "You have X alerts today" │
├──────────┬──────────┬───────────────┤
│ 💊 Total │ ⚠️ Low   │ 📅 Expiring   │
│   Items  │  Stock   │   Soon        │
│    7     │   2      │    1          │
├──────────┴──────────┴───────────────┤
│  ⚡ Needs Attention                  │
│  [Alert medicine cards]             │
│                                     │
│  ✓ All Medicines                    │
│  [Normal medicine cards]            │
├─────────────────────────────────────┤
│  Fixed Bottom Toolbar:              │
│  [➕ Add] [✏️ Edit] [📋 Report] [🗺️]│
└─────────────────────────────────────┘
```

#### Bottom Toolbar Navigation

| Button | Icon | Link |
|--------|------|------|
| Add | ➕ | `newMed.html` |
| Edit | ✏️ | `editStock.html` |
| Report | 📋 | `stock.html` |
| Pharmacy | 🗺️ | `Pharmacy.html` |

#### i18n Initialization Pattern

```javascript
I18n.init(function () {
    renderInventory();
});
```

### 9.4 stock.html — Stock Report

- Table view of all medicines sorted by status priority (expired first)
- Summary header: total, low stock, expiring counts
- Status legend: 🟢 OK, 🟡 Low Stock, 🟠 Expiring, 🔴 Expired
- **PDF Download**: Uses `html2pdf.js` library (CDN: `https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js`)
  - Filename format: `Stock_Report_YYYY-MM-DD.pdf`
  - A4 portrait, 10mm margin, JPEG quality 0.98, 2x canvas scale

### 9.5 editStock.html — Quantity Editor

- Displays medicines in paginated edit cards (**5 per page**)
- Each card has **+/−** buttons and direct numeric input
- Tracks changes vs. original quantities in `editedQuantities` object
- Changed cards get `.changed` class (visual indicator)
- Shows "was X" label for modified items
- "Confirm" button shows change count badge
- Saves updated quantities to localStorage on confirm

### 9.6 newMed.html — Add New Medicine

#### Form Fields

| Field | Type | Required | Details |
|-------|------|----------|---------|
| Medicine Name | `text` with `<datalist>` | ✅ | 8 common medicine suggestions |
| Quantity | `number` (min=1) | ✅ | e.g., 30 |
| Batch No. | `number` (min=1) | ✅ | e.g., 5 |
| Expiry Date | `date` | ✅ | HTML date picker |

- Multi-card system (same clone pattern as medReminder's manualInput)
- Date converted from ISO (`YYYY-MM-DD`) to display format (`DD.MM.YYYY`) via `formatDateToDisplay()`
- New medicines appended to existing inventory in localStorage

### 9.7 Pharmacy.html — Nearby Pharmacy Finder

#### Data: Hardcoded Dummy Pharmacies (5 entries)

```javascript
const pharmacies = [
    { name: "Farmasi Guardian", address: "Lot 12, Jalan Merdeka, Serdang",
      distance: "0.8 km", status: "open", phone: "03-89123456",
      hours: "9:00 AM - 10:00 PM" },
    { name: "Watsons Pharmacy", address: "Giant Hypermarket, Seri Kembangan",
      distance: "1.2 km", status: "open", phone: "03-89456789",
      hours: "10:00 AM - 9:30 PM" },
    { name: "Farmasi Klinik Rahim", address: "No. 5, Lorong Setia, Bangi",
      distance: "2.1 km", status: "closing-soon", phone: "03-89012345",
      hours: "8:00 AM - 5:00 PM" },
    { name: "Big Pharmacy", address: "AEON Mall, Cheras Selatan",
      distance: "3.5 km", status: "open", phone: "03-90123456",
      hours: "10:00 AM - 10:00 PM" },
    { name: "Caring Pharmacy", address: "Tesco Extra, Kajang",
      distance: "4.2 km", status: "closed", phone: "03-87654321",
      hours: "9:00 AM - 9:00 PM" }
];
```

#### Features

- Simulated GPS location finding (1.5s delay → shows "Serdang, Selangor")
- Map placeholder (text: "Map Coming Soon" — no actual map API integrated)
- Pharmacy cards sorted: open first, then by distance
- Status badges: 🟢 Open, 🟡 Closing Soon, 🔴 Closed
- **Call button**: `<a href="tel:...">` — native phone dialing
- **Directions button**: Opens Google Maps search URL in new tab

### 9.8 Inventory Module Styles (style.css)

**File**: `medInventoryTracker/style.css` (1716 lines — largest CSS file)

#### Theme Colors

```css
:root {
    --green-primary: #2E7D32;
    --green-light: #E8F5E9;
    --green-dark: #1B5E20;
    --red-danger: #D32F2F;
    --orange-warning: #FF9800;
}
```

#### Key Style Sections (by page)

| Section | Lines (approx) | Description |
|---------|------|-------------|
| Global resets + page container | ~50 | 480px max-width, centered, flex column |
| Inventory Home | ~200 | Scene (avatar + bubble), stats row, medicine cards, alert badges |
| Fixed Toolbar | ~80 | 4-button bottom bar, themed primary button |
| Form Pages (newMed, editStock) | ~300 | Input cards, field groups, submit buttons |
| Edit Stock specific | ~150 | Qty editor (+/− buttons), change tracking visual |
| Report Page (stock) | ~200 | Table, status badges, download button, legend |
| Pharmacy Page | ~250 | Location banner, map container, pharmacy cards, action buttons |
| Back button + header | ~50 | Shared across all sub-pages |
| Responsive | ~100 | Mobile-optimized by default |

---

## 10. Module 4: Daily Health Recorder (dailyHealthRecorder/)

### 10.1 healthChat.html — Guided Health Check

**File**: `dailyHealthRecorder/healthChat.html` (most complex page in the app)

#### Chat-Based Health Recording Flow

The health recorder uses a **scripted conversation flow** defined in `assets/dummyData/healthChat.JSON`. Two personas (Dr. Fatimah and Nurse Alia) alternate asking health questions.

```
Step 0 (Dr. Fatimah):  "How are you feeling today?"
                        → Quick responses: Good / So-So / Not Well

Step 1 (Nurse Alia):   Dynamic response based on mood
                        → Quick responses: Measure BP / Skip

Step 2 (Dr. Fatimah):  Acknowledge BP (or skip)
                        → Quick responses: Measure HR / Skip

Step 3 (Nurse Alia):   Acknowledge HR (or skip)
                        → Quick responses: Measure Blood Sugar / Skip

Step 4 (Dr. Fatimah):  Acknowledge BS (or skip)
                        → Transition to symptoms

Step 5 (Nurse Alia):   "Any symptoms today?"
                        → Multi-select: Fever / Headache / Dizzy / Breathing / None

Step 6 (Dr. Fatimah):  Acknowledge symptoms

Step 7 (Nurse Alia):   "Have you taken medication?"
                        → Quick responses: All / Some / Not Yet

Step 8 (Dr. Fatimah):  Summary + "See you tomorrow!"
                        → Show daily summary card
```

#### Input Modals

| Modal | Fields | Unit | Triggered By |
|-------|--------|------|-------------|
| Blood Pressure | Systolic + Diastolic | mmHg | "Measure Now" quick response (action: `"bp"`) |
| Heart Rate | BPM | bpm | "Measure Heart Rate" quick response (action: `"hr"`) |
| Blood Sugar | Value + Type (Fasting/After Meal) | mg/dL | "Measure Blood Sugar" quick response (action: `"bs"`) |

#### Data Storage

- **Today's record**: `localStorage` key `"healthChat_today"` — stores current session's health data
- **All records**: `localStorage` key `"healthChat_records"` — array of past daily records

#### Health Record Data Model (Per Day)

```json
{
  "date": "2026-01-22",
  "mood": "good",
  "bloodPressure": {
    "systolic": 128,
    "diastolic": 82,
    "unit": "mmHg",
    "time": "08:30"
  },
  "heartRate": {
    "value": 72,
    "unit": "bpm",
    "time": "08:30"
  },
  "bloodSugar": {
    "value": 105,
    "unit": "mg/dL",
    "type": "fasting",
    "type_BM": "puasa",
    "time": "07:00"
  },
  "symptoms": [],
  "medication": "all",
  "notes": ""
}
```

#### Health Thresholds (from healthRecords.JSON)

```json
{
  "bloodPressure": {
    "systolic": { "low": 90, "normal": 120, "elevated": 140 },
    "diastolic": { "low": 60, "normal": 80, "elevated": 90 }
  },
  "heartRate": { "low": 60, "normal": 100, "elevated": 100 },
  "bloodSugar": {
    "fasting": { "low": 70, "normal": 100, "elevated": 126 },
    "afterMeal": { "low": 70, "normal": 140, "elevated": 200 }
  }
}
```

#### Symptom Options

| Value | English | Bahasa Melayu | Emoji |
|-------|---------|---------------|-------|
| `fever` | Fever | Demam | 🤒 |
| `headache` | Headache | Sakit Kepala | 🤕 |
| `dizzy` | Dizzy | Pening | 😵 |
| `breathing` | Breathing Difficulty | Sesak Nafas | 😮‍💨 |
| `none` | No Symptoms | Tiada Gejala | ✨ |

#### Health Report Feature

- Button in menu: "📊 View Health Report"
- Fetches records from `assets/dummyData/healthRecords.JSON`
- Displays in a modal overlay with:
  - 7-day averages (BP, HR, BS) in a grid
  - Individual day records with vitals, mood, symptoms, medication status
  - Status indicators (Normal/Elevated/Low) based on thresholds

#### AI Integration (Gemini)

- Free-text input is sent to **Gemini API via Cloudflare Worker proxy**
- Persona prompt includes Dr. Fatimah / Nurse Alia behavior instructions
- Conversation history maintained and sent with each request for context
- Response displayed as chat bubble from the appropriate persona

#### Conversation Flow State Machine

The flow uses a `currentStep` counter and `userResponses` object:

```javascript
let currentStep = 0;
let userResponses = {};        // Stores mood, bp, hr, bs, symptoms, medication
let todayRecord = {};          // Built progressively as user provides data
```

### 10.2 healthChat.JSON — Conversation Flow Data

**File**: `assets/dummyData/healthChat.JSON`

Contains:
- `personas` — Dr. Fatimah and Nurse Alia definitions
- `conversationFlow` — Array of 9 step objects (see schema in Section 13.4)
- `ui` — All UI labels (header, modals, summary, date banner) in EN + BM

### 10.3 healthRecords.JSON — Seed Health Data

**File**: `assets/dummyData/healthRecords.JSON`

Contains:
- `metadata` — Patient info (Mak Cik Aminah, ID: MC-2024-001)
- `records` — 7 daily entries (2026-01-16 to 2026-01-22)
- `thresholds` — Blood pressure, heart rate, blood sugar normal ranges
- `symptomLabels`, `moodLabels`, `medicationLabels` — Bilingual display labels
- `ui` — Report modal UI labels

### 10.4 Health Recorder Styles

Uses `chatUI.css` (shared) plus `dailyHealthRecorder/style.css` for module-specific additions. The `chatUI.css` file contains all the modal styles (BP, HR, BS input modals, health report modal, daily summary card).

---

## 11. Module 5: Chit-Chat — Adik Aisya (conversationalUI/chitChat)

### 11.1 chitChat.html

**File**: `conversationalUI/chitChat.html`

#### Page Structure

```
┌─────────────────────────────────────┐
│  Header (coral theme):              │
│  [←] [Adik Aisya avatar]           │
│       Adik Aisya                    │
│       🟢 Online & Ready to Chat  [⋮]│
├─────────────────────────────────────┤
│  Topic Chips:                       │
│  [👨‍👩‍👧 Family] [🍜 Food] [📸 Memories] │
│  [🎨 Hobbies] [🌦️ Weather] [💭 Feel.]│
├─────────────────────────────────────┤
│  Chat Container:                    │
│  [AI message bubbles]               │
│  [User message bubbles]             │
│                                     │
├─────────────────────────────────────┤
│  Input Area:                        │
│  [🎤] [Type your message...  ] [➤]  │
└─────────────────────────────────────┘
```

#### Topic System

6 conversation topics loaded from `chitChat.JSON`:

| Topic ID | Label (EN) | Label (BM) | # Starters |
|----------|-----------|------------|----------|
| `family` | 👨‍👩‍👧 Family | 👨‍👩‍👧 Keluarga | 3 EN + 3 BM |
| `food` | 🍜 Food | 🍜 Makanan | 3 EN + 3 BM |
| `memories` | 📸 Memories | 📸 Kenangan | 3 EN + 3 BM |
| `hobbies` | 🎨 Hobbies | 🎨 Hobi | 3 EN + 3 BM |
| `weather` | 🌦️ Weather | 🌦️ Cuaca | 3 EN + 3 BM |
| `feelings` | 💭 Feelings | 💭 Perasaan | 3 EN + 3 BM |

#### Time-Based Greetings

| Time | English | Bahasa Melayu |
|------|---------|---------------|
| Morning (0-11) | "Good morning! ☀️ How are you feeling today?" | "Selamat pagi! ☀️ Apa khabar hari ini?" |
| Afternoon (12-16) | "Good afternoon! 🌤️ Hope you're having a lovely day." | "Selamat petang! 🌤️ Harap hari anda indah." |
| Evening (17+) | "Good evening! 🌙 How was your day?" | "Selamat malam! 🌙 Macam mana hari anda?" |

#### AI Persona Prompt

```
You are Adik Aisya, a cheerful, caring, and patient AI granddaughter for elderly
Malaysian users (Tok & Nenek, age 70+).
- Calls user "Nenek" or "Tok"
- Simple, warm language, mixing English and Bahasa Melayu naturally
- No medical advice
- Lots of emojis (❤️, 😊, 🌸, 🧡)
- Short replies: 1-2 sentences
- Never mentions being AI
```

#### Conversation Flow

1. Page loads → `loadChatData()` fetches `chitChat.JSON`
2. `applyUIText()` — Sets header title, status, and input placeholder from data
3. `renderTopicChips()` — Creates topic chip buttons from data
4. `startConversation()` — Time-based greeting from Adik Aisya (with typing indicator)
5. User can:
   - Click a topic chip → random starter message from that topic
   - Type a message → sent to Gemini API → AI response displayed
   - Click voice button → simulated 2s recording → placeholder text filled

#### State Management

```javascript
let currentTopic = null;           // Currently selected topic object
let conversationHistory = [];      // Array of {sender, text, isUser}
```

- History is sent to Gemini for context in each API call
- No localStorage persistence — conversation resets on page reload or menu reset

### 11.2 chitChat.JSON Structure

```json
{
  "persona": { "name": "Adik Aisya", "avatar": "../assets/Adik_Aisya.png",
               "role": "Your Friendly Companion", "role_BM": "Teman Mesra Anda" },
  "greetings": [ /* 3 time-based entries */ ],
  "topics": [ /* 6 topic objects with starters */ ],
  "responses": { /* 5 categories × 4 responses × 2 languages — NOT USED in current code */ },
  "ui": { /* header, input, buttons labels */ }
}
```

> **Note**: The `responses` object is defined but **not used** in the current code — all free-text goes through Gemini API. These responses would be fallback options for offline mode.

---

## 12. Module 6: Health Consulting — Encik Amirul (conversationalUI/consultChat)

### 12.1 consultChat.html

**File**: `conversationalUI/consultChat.html`

#### Code Architecture: Nearly Identical to chitChat.html

The consulting page shares the same code structure as chit-chat with these key differences:

| Aspect | Chit-Chat | Consulting |
|--------|-----------|------------|
| Body class | `theme-chitchat` | `theme-consult` |
| Persona | Adik Aisya | Encik Amirul |
| Avatar | `Adik_Aisya.png` | `Encik_Amirul.png` |
| Data file | `chitChat.JSON` | `consultChat.JSON` |
| **Has disclaimers** | ❌ No | ✅ Yes |
| **System message** | N/A | `addSystemMessage()` function |
| Input placeholder | "Type your message..." | "Ask a health question..." |
| Menu action | "Start New Chat" | "Start New Consultation" |
| **Extra state** | — | `hasShownDisclaimer` flag |

#### Disclaimer System (Unique to Consulting)

- **General disclaimer**: Shown after greeting — "⚠️ I provide general health information only. For medical advice, please consult your doctor."
- **Medication disclaimer**: Shown when "medication" topic is selected — "⚠️ Always follow your doctor's prescription."
- Uses `addSystemMessage(text)` to display centered, styled system messages
- `hasShownDisclaimer` flag prevents repeated medication disclaimers
- System messages have distinct styling: centered, grey background, smaller font

#### Topic System (6 Health Topics)

| Topic ID | Label (EN) | Label (BM) |
|----------|-----------|------------|
| `medication` | 💊 Medication | 💊 Ubat-ubatan |
| `symptoms` | 🩺 Symptoms | 🩺 Gejala |
| `diet` | 🥗 Diet & Nutrition | 🥗 Pemakanan |
| `exercise` | 🚶 Exercise | 🚶 Senaman |
| `sleep` | 😴 Sleep | 😴 Tidur |
| `appointment` | 📅 Appointments | 📅 Temu Janji |

#### AI Persona Prompt

```
You are Encik Amirul, a wise, calm, and supportive health consultant for elderly
Malaysian users (Tok & Nenek, age 70+).
- Never diagnose or prescribe medication
- Calls user "Nenek" or "Tok"
- Always reminds to consult real doctor for serious issues
- Gentle emojis (😊, 👍, 💙, 🙏)
- Short replies: 1-2 sentences
- Never mentions being AI
```

### 12.2 consultChat.JSON Structure

Same structure as `chitChat.JSON` plus additional:
- `"disclaimers"` object with `"general"`, `"general_BM"`, `"medication"`, `"medication_BM"`
- Response categories: `informative`, `caution`, `reassurance`, `encouragement`, `followUp` (all with `_BM` variants)

---

## 13. Data Models & Storage

### 13.1 localStorage Keys

| Key | Module | Type | Description |
|-----|--------|------|-------------|
| `ingatkanTeman_language` | i18n | `"en"` \| `"bm"` | User language preference |
| `ingatkanTeman_schedules` | Med Reminder | `JSON Array` | Medication schedules |
| `medInventory` | Inventory | `JSON Array` | Medicine inventory items |
| `healthChat_today` | Health Recorder | `JSON Object` | Current day's health data |
| `healthChat_records` | Health Recorder | `JSON Array` | Historical health records |

### 13.2 sessionStorage Keys

| Key | Module | Type | Description |
|-----|--------|------|-------------|
| `isLoggedIn` | Login | `"true"` | Login state flag |
| `loginTime` | Login | timestamp string | Login timestamp |

### 13.3 JSON Dummy Data Files

| File | localStorage Key | Loaded By | Description |
|------|-----------------|-----------|-------------|
| `medicationSchedules.JSON` | `ingatkanTeman_schedules` | `medReminderHome.html` | 5 schedule entries |
| `inventory.JSON` | `medInventory` | `inventoryUtils.js` | 7 medicine entries |
| `healthChat.JSON` | *(not cached)* | `healthChat.html` | Conversation flow definition |
| `healthRecords.JSON` | *(not cached)* | `healthChat.html` | 7 days of health records + thresholds |
| `dummy.js` | N/A (sets `window.GEMINI_API_KEY`) | All AI chat pages | API key for Gemini |

### 13.4 Complete Data Schemas (TypeScript Notation)

#### Medication Schedule Entry

```typescript
interface MedicationSchedule {
  id: string;                    // "sched_001" or "sched_<timestamp>_<index>"
  medicineName: string;          // "Paracetamol"
  dosage: string;                // "2 tablets"
  dosage_BM: string;             // "2 biji"
  time: string;                  // "08:00" (24h format)
  instruction: string;           // "after-breakfast" | "before-breakfast" | etc.
  repeat: string;                // "daily" | "weekdays" | "weekly" | "monthly" | "once"
  status: string;                // "taken" | "upcoming" | "pending" | "missed"
  createdAt: string;             // ISO 8601 timestamp
  takenAt: string | null;        // ISO 8601 timestamp or null
}
```

#### Medicine Inventory Entry

```typescript
interface MedicineInventory {
  MedName: string;               // "Paracetamol"
  Qty: number;                   // 20
  Batch: string;                 // "3"
  ExpDate: string;               // "12.12.2026" (DD.MM.YYYY format)
}
```

#### Health Record Entry

```typescript
interface HealthRecord {
  date: string;                  // "2026-01-22" (YYYY-MM-DD)
  mood: "good" | "okay" | "unwell";
  bloodPressure: {
    systolic: number;            // e.g., 128
    diastolic: number;           // e.g., 82
    unit: "mmHg";
    time: string;                // "08:30"
  } | null;
  heartRate: {
    value: number;               // e.g., 72
    unit: "bpm";
    time: string;
  } | null;
  bloodSugar: {
    value: number;               // e.g., 105
    unit: "mg/dL";
    type: "fasting" | "after meal";
    type_BM: string;
    time: string;
  } | null;
  symptoms: string[];            // ["fever", "headache", "dizzy", "breathing"] or []
  medication: "all" | "partial" | "none";
  notes: string;
}
```

#### Health Records File

```typescript
interface HealthRecordsFile {
  metadata: {
    patientName: string;
    patientName_BM: string;
    patientId: string;
    lastUpdated: string;
  };
  records: HealthRecord[];
  thresholds: {
    bloodPressure: {
      systolic: { low: number; normal: number; elevated: number };
      diastolic: { low: number; normal: number; elevated: number };
    };
    heartRate: { low: number; normal: number; elevated: number };
    bloodSugar: {
      fasting: { low: number; normal: number; elevated: number };
      afterMeal: { low: number; normal: number; elevated: number };
    };
  };
  symptomLabels: Record<string, { en: string; bm: string }>;
  moodLabels: Record<string, { en: string; bm: string }>;
  medicationLabels: Record<string, { en: string; bm: string }>;
  ui: Record<string, string>;   // Report UI labels
}
```

#### Chat Persona Data (chitChat.JSON / consultChat.JSON)

```typescript
interface ChatData {
  persona: {
    name: string;
    avatar: string;              // Relative path to avatar image
    role: string;
    role_BM: string;
  };
  greetings: Array<{
    time: "morning" | "afternoon" | "evening";
    message: string;
    message_BM: string;
  }>;
  topics: Array<{
    id: string;
    label: string;
    label_BM: string;
    starters: string[];
    starters_BM: string[];
  }>;
  responses: Record<string, string[]>;  // Categories with _BM variants
  disclaimers?: {                        // consultChat only
    general: string;
    general_BM: string;
    medication: string;
    medication_BM: string;
  };
  ui: {
    header: { title: string; title_BM: string; status: string; status_BM: string };
    input: { placeholder: string; placeholder_BM: string };
    topicsHeader: string;
    topicsHeader_BM: string;
    buttons: { send: string; send_BM: string };
    voicePlaceholder: string;
    voicePlaceholder_BM: string;
  };
}
```

#### Health Chat Conversation Flow Step

```typescript
interface ConversationStep {
  id: number;
  persona: "drFatimah" | "nurseAlia";
  message: string | null;        // null if dynamicMessages used
  message_BM?: string;
  delay: number;                 // ms before displaying
  quickResponses?: Array<{
    text: string;
    text_BM: string;
    value: string;
    action?: "bp" | "hr" | "bs"; // Triggers input modal
  }>;
  dynamicMessages?: Record<string, string>;  // Context-dependent messages with _BM variants
  waitForInput?: "bp" | "hr" | "bs";
  multiSelect?: boolean;         // Step 5 — symptom multi-select
  showSummary?: boolean;         // Step 8 — final summary card
}
```

---

## 14. AI / Gemini API Integration

### 14.1 API Architecture

```
User types message → JavaScript builds request body
                   → fetch(WORKER_URL, POST, body)
                   → Cloudflare Worker
                   → Google Gemini API (gemini-2.5-flash)
                   → Response parsed → displayed as chat bubble
```

### 14.2 Cloudflare Worker Proxy

- **URL**: `https://demoo-gemini-proxy.captaindawood12.workers.dev`
- **Purpose**: Injects the real Gemini API key server-side (avoiding client exposure)
- **Protocol**: Accepts the same request body format as the Gemini API
- **Used by**: `chitChat.html`, `consultChat.html`, `healthChat.html`

### 14.3 Fallback Direct API (Defined but Not Active)

```javascript
// In chitChat.html — defined but Worker is used instead
function getGeminiApiUrl() {
    return "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + window.GEMINI_API_KEY;
}
```

### 14.4 API Key Management

```javascript
// assets/dummyData/dummy.js (gitignored)
window.GEMINI_API_KEY = "AIzaSyA9PKbMlpcBchb71_0x15LAsTFcEZf3q4o";
```

- Loaded via `<script src="../assets/dummyData/dummy.js">`
- Key is set on `window` object for global access
- Currently unused when Worker proxy is active (Worker injects its own key)

### 14.5 Request Format

```javascript
const body = {
  contents: [
    { role: "user", parts: [{ text: personaPrompt }] },    // System prompt as first "user" message
    ...conversationHistory.map(msg => ({
      role: msg.isUser ? "user" : "model",
      parts: [{ text: msg.text }]
    })),
    { role: "user", parts: [{ text: userMessage }] }       // Current message
  ]
};
```

### 14.6 Response Parsing

```javascript
const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text
           || data?.output?.[0]?.content?.[0]?.text           // fallback shape
           || data?.response?.text                              // other fallback
           || "Sorry, no response.";
```

### 14.7 Error Handling

- JSON parse failure → returns raw text or error message
- Fetch error → returns "Sorry, there was an error connecting to AI."
- Missing API key → alerts user (only in direct API mode)

### 14.8 Persona System Prompts Summary

| Module | Persona | Key Behavioral Rules |
|--------|---------|---------------------|
| Chit-Chat | Adik Aisya | Cheerful granddaughter, no medical advice, lots of emojis, 1-2 sentences |
| Consulting | Encik Amirul | Wise consultant, general health only, always refer to doctor, 1-2 sentences |
| Health Recorder | Dr. Fatimah / Nurse Alia | Primarily scripted flow; AI used for free-text responses |

---

## 15. Navigation Map

```
index.html (Login)
    │
    ▼
main/homePage.html (Dashboard)
    │
    ├──► medReminder/medReminderHome.html
    │       ├──► medReminder/manualInput.html
    │       └──► medReminder/OCRScanPage.html
    │               └──► medReminder/manualInput.html (redirect after scan)
    │
    ├──► medInventoryTracker/inventoryHome.html
    │       ├──► medInventoryTracker/newMed.html
    │       ├──► medInventoryTracker/editStock.html
    │       ├──► medInventoryTracker/stock.html
    │       └──► medInventoryTracker/Pharmacy.html
    │
    ├──► dailyHealthRecorder/healthChat.html
    │
    ├──► conversationalUI/chitChat.html
    │
    └──► conversationalUI/consultChat.html
```

### Navigation Patterns

- **Back buttons**: All module pages have `← Back` link to parent page
- **Home links**: All module pages link back to `../main/homePage.html`
- **No deep linking**: No URL parameters or hash-based routing
- **No history management**: Simple `<a href>` navigation + `window.location.href` redirects
- **Session guard**: Only `homePage.html` checks `sessionStorage.isLoggedIn`

---

## 16. Asset Inventory

### 16.1 Persona Avatars (PNG)

| File | Persona | Used In |
|------|---------|---------|
| `Adik_Ahmad.png` | Adik Ahmad | homePage, medReminderHome |
| `Adik_Aisya.png` | Adik Aisya | homePage, chitChat |
| `Dr_Fatimah.png` | Dr. Fatimah | homePage, healthChat |
| `Nurse_Alia.png` | Nurse Alia | homePage, healthChat |
| `PakCik_Firdaus.png` | PakCik Firdaus | homePage, inventoryHome |
| `Encik_Amirul.png` | Encik Amirul | homePage, consultChat |

### 16.2 App Branding

| File | Usage |
|------|-------|
| `Ingatkan_Teman_Logo.PNG` | Login page logo, navbar logo, PWA icon, apple-touch-icon |

### 16.3 UI Screenshots (for reference)

| File | Content |
|------|---------|
| `ui1_login.png` | Login page |
| `ui2_home.png` | Dashboard |
| `ui3_medication.png` | Med reminder |
| `ui4_ocr.png` | OCR scan |
| `ui5_inventory.png` | Inventory |
| `ui6_pharmacy.png` | Pharmacy |
| `ui7_chitchat.png` | Chit-chat |
| `ui8_consulting.png` | Consulting |
| `ui9_healthrecorder.png` | Health recorder |

---

## 17. PWA Configuration (manifest.json)

```json
{
  "name": "Ingatkan Teman",
  "short_name": "Ingatkan",
  "description": "Your caring medicine companion for elderly wellbeing.",
  "start_url": "index.html",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#FFFBF7",
  "theme_color": "#FF6F61",
  "icons": [
    { "src": "assets/Ingatkan_Teman_Logo.PNG", "sizes": "192x192", "type": "image/png" },
    { "src": "assets/Ingatkan_Teman_Logo.PNG", "sizes": "512x512", "type": "image/png" }
  ]
}
```

---

## 18. Key Divergences from SRS/SDD

| Aspect | Planned (SRS/SDD) | Actual (Codebase) |
|--------|-------------------|-------------------|
| **Platform** | Flutter (cross-platform mobile) | Static Web App (HTML/CSS/JS, PWA) |
| **Database** | Oracle Database with JDBC | `localStorage` (client-side only) |
| **OCR** | AWS Textract integration | Simulated (animation → redirect to manual input) |
| **Authentication** | FaceID + PIN with real auth | Simulated (any PIN works, sessionStorage) |
| **Notifications** | Push notifications for reminders | None implemented |
| **Voice Input** | Speech-to-text API | Simulated (2s timer → placeholder text) |
| **Maps** | Google Maps / Waze integration | Hardcoded pharmacy list, map placeholder |
| **Server** | Node.js/Express backend | No server code, all static files |
| **AI Model** | GPT-4 mentioned in some docs | Google Gemini 2.5 Flash via Cloudflare proxy |
| **Data Flow** | Client → Server → Oracle DB | Client → localStorage (+ JSON seed files) |

---

## 19. Known Limitations & Simulations

| Feature | Current State | What's Missing |
|---------|--------------|----------------|
| FaceID Authentication | 3-second CSS animation | No biometric API integration |
| PIN Validation | Any 4 digits accepted | No user accounts, no correct PIN check |
| OCR Scan | Visual simulation only | No camera access, no Textract/ML Kit API |
| Voice Input | 2-second fake recording | No Web Speech API or speech-to-text |
| Pharmacy Map | Static placeholder + text | No Google Maps API, no GPS geolocation |
| Pharmacy Data | 5 hardcoded entries | No Google Places / real pharmacy API |
| Push Notifications | Not implemented | No service worker, no push subscription |
| Data Sync | localStorage only | No server sync, data lost on browser clear |
| Health Monitoring | Manual entry only | No device/sensor integration (BP monitor, etc.) |
| Multi-user | Single implicit user ("Nenek") | No user management or profiles |
| PDF Report | Uses html2pdf.js CDN | Works but basic formatting |
| Offline Support | No service worker | PWA manifest present but no caching strategy |

---

## 20. Migration Considerations

### 20.1 Data Layer Transformation

| Current | Target Recommendation |
|---------|----------------------|
| `localStorage` (key-value JSON strings) | SQLite / Realm / Room database |
| JSON seed files fetched via `fetch()` | Embedded database seed / migration scripts |
| `sessionStorage` for login state | Native authentication state management |
| No data validation | Schema validation with TypeScript types from Section 13.4 |

### 20.2 API Integration Points

| Integration | Current | Mobile Equivalent |
|-------------|---------|-------------------|
| Gemini AI | Cloudflare Worker proxy → Gemini API | Firebase Functions / direct SDK / on-device ML |
| PDF Export | `html2pdf.js` (browser library) | Native PDF generation library |
| Phone Call | `<a href="tel:...">` | Native dialer intent / URL scheme |
| Maps/Directions | Google Maps URL (new tab) | Google Maps SDK / Apple Maps integration |
| Camera (OCR) | Simulated | Camera API + ML Kit / AWS Textract SDK |

### 20.3 UI Component Mapping

| Web Component | Description | Mobile Equivalent |
|---------------|-------------|-------------------|
| Feature grid (homePage) | 2-col CSS grid with avatar cards | GridView / LazyVerticalGrid |
| Chat interface (3 variants) | Scrollable message list + input bar | RecyclerView / LazyColumn + IME handling |
| PIN keypad | Custom CSS grid, 3 columns | Custom keypad composable / view |
| Input modals (BP, HR, BS) | CSS fixed overlay + card | BottomSheet / AlertDialog |
| Topic chips | Horizontal wrap flex | ChipGroup / FlowRow |
| Pharmacy cards | Vertical card list | RecyclerView / LazyColumn |
| Stats dashboard (3 cards) | Horizontal flex row | Row of Material Cards |
| PDF download button | html2pdf.js generation | Native PDF library (e.g., iText, PDFBox) |
| Menu dropdown | CSS positioned dropdown | PopupMenu / DropdownMenu |

### 20.4 Styling System Translation

| CSS Concept | Mobile Equivalent |
|-------------|-------------------|
| CSS Custom Properties (`:root`) | Theme object / Design tokens |
| `global.css` design system | App-wide theme (colors, typography, spacing) |
| Module-specific CSS files | Feature-specific theme overlays |
| Responsive breakpoints | Adaptive layout (phone vs tablet) |
| `:active` pseudo-class | Ripple effect / press feedback |
| `clamp()` / responsive units | Dimension utilities / dp units |
| `animation` + `@keyframes` | Animated API / Compose animations |

### 20.5 i18n System Translation

| Current | Mobile Equivalent |
|---------|-------------------|
| Custom IIFE module (`I18n`) | Platform i18n framework (flutter_localizations, Android res) |
| `data-i18n` DOM attributes | String resources (Android XML) / Localizable.strings (iOS) |
| `translations.json` (flat file) | ARB files / XML string resources |
| `_BM` suffix pattern in data files | Locale-aware data loading |
| `localStorage` language pref | System locale or app-specific setting |
| `languageChanged` CustomEvent | State management / provider pattern |

### 20.6 Critical Behaviors to Preserve

1. **Persona-driven UX**: Each module has its own AI persona with avatar, name, color theme, and distinct personality prompt
2. **Senior-first design**: 18px minimum text, 56px touch targets, simple layouts, high contrast
3. **Bilingual everything**: All UI text, all data labels, all AI prompts must support EN + BM
4. **Time-based greetings**: Chat modules greet based on hour of day (morning/afternoon/evening)
5. **Guided health check flow**: The scripted 9-step conversation with input modals at specific steps
6. **Multi-select symptoms**: Step 5 of health check allows selecting multiple symptom chips
7. **Health report with thresholds**: Visual indicators for normal/elevated/low readings
8. **Inventory alert system**: Low stock (≤10) and expiring soon (≤60 days) colored badges
9. **3D card platform design**: Dashboard cards have depth/shadow effect unique to this app
10. **Menu reset functionality**: All chat modules have "Start New Chat/Consultation" dropdown option

---

*Document generated from codebase analysis. Cross-referenced with SRS (SSW3001_SRS_KATSPAW.md) and SDD (SSW3001_SDD_KATSPAW.md) for divergence tracking only.*
