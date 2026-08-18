# Ingatkan Teman — Mobile App Transformation Prerequisites

> **Purpose**: This document outlines every decision, preparation, and prerequisite that must be resolved **before** constructing the Mobile App Transformation Plan. Each section flags open questions that will shape the plan's architecture, scope, and timeline.

> **Reference**: See [`IngatkanTeman_Technical_Reference.md`](./IngatkanTeman_Technical_Reference.md) for exhaustive codebase documentation.

---

## Table of Contents

1. [Target Platform & Framework](#1-target-platform--framework)
2. [Scope & Feature Parity](#2-scope--feature-parity)
3. [Backend & Data Strategy](#3-backend--data-strategy)
4. [Authentication System](#4-authentication-system)
5. [AI Integration Strategy](#5-ai-integration-strategy)
6. [Third-Party Services & APIs](#6-third-party-services--apis)
7. [Asset Preparation](#7-asset-preparation)
8. [Internationalization (i18n) Strategy](#8-internationalization-i18n-strategy)
9. [Development Environment & Tooling](#9-development-environment--tooling)
10. [Testing Strategy](#10-testing-strategy)
11. [Deployment & Distribution](#11-deployment--distribution)
12. [Decision Summary Checklist](#12-decision-summary-checklist)

---

## 1. Target Platform & Framework

This is the **single most impactful decision** — it determines the entire tech stack, project structure, and development workflow.

### 1.1 Framework Options

| Option | Pros | Cons | Fit for This Project |
|--------|------|------|---------------------|
| **Flutter (Dart)** | Cross-platform (iOS + Android), single codebase, rich widget library, strong i18n support, hot reload | New language (Dart), large app size, platform-specific features need plugins | ✅ **Strong fit** — SDD originally planned Flutter. Widget system maps well to the card-based UI. |
| **React Native (JS/TS)** | JavaScript-based (familiar from web), large ecosystem, Expo simplifies setup | Bridge overhead, some native modules needed, less consistent UI across platforms | ✅ Good fit — JS knowledge transfers, but less performant for animations |
| **Kotlin Multiplatform** | Native performance, shared business logic | Separate UI for iOS (SwiftUI) and Android (Compose), smaller ecosystem | ⚠️ Overkill for this prototype-stage app |
| **Native (Kotlin + Swift)** | Best performance, full platform access | Two separate codebases, doubled dev effort | ❌ Not practical for a university project team |

### 1.2 Decisions Required

- [ Flutter ] **Which framework?** (Flutter recommended based on SDD alignment and team context)
- [ Both, but Andriod only in this phase ] **Which platforms?** Android only? iOS only? Both?
- [ Andrioid 8+ ] **Minimum OS versions?** (affects API availability — e.g., Android 8+ for biometrics)

---

## 2. Scope & Feature Parity

The current web app has **12 simulated/placeholder features** (see Technical Reference §19). The transformation plan needs clarity on what to implement vs. keep as simulation.

### 2.1 Feature-by-Feature Decision Matrix

| Feature | Current State (Web) | Options for Mobile |
|---------|--------------------|--------------------|
| **FaceID/Biometric Auth** | 3-second CSS animation | A) Implement real biometrics (FaceID/fingerprint) B) Keep PIN-only C) Keep simulation |
| **PIN Validation** | Any 4 digits accepted | A) Real PIN with stored hash B) Keep any-PIN simulation |
| **OCR Prescription Scan** | Visual simulation → redirect | A) Implement with ML Kit / Google Vision B) Implement with AWS Textract C) Keep simulation |
| **Voice Input** | 2-second fake recording | A) Implement with platform speech-to-text B) Keep simulation |
| **Pharmacy Map** | Hardcoded list, no map | A) Google Maps SDK + Places API B) Static list with map widget C) Keep as-is |
| **Push Notifications** | Not implemented | A) Implement for med reminders B) Skip for now |
| **Data Persistence** | localStorage only | A) Local DB only (SQLite) B) Local + cloud sync C) Keep localStorage-equivalent |
| **Health Sensor Integration** | Manual entry only | A) Bluetooth BP monitor integration B) Apple Health / Google Fit C) Manual only |
| **PDF Report** | html2pdf.js in browser | A) Native PDF generation B) Share as image C) Skip |
| **Offline Support** | No service worker | A) Full offline-first B) Partial (cached data) C) Online required |
| **Multi-user** | Single implicit user | A) User profiles + login B) Keep single user |
| **Data Sync** | No sync | A) Firebase/Supabase sync B) Export/import JSON C) Local only |

### 2.2 Decisions Required

- [ {FaceID/Biometric : yes + PIN if faceID/biometric fail, OCR simulation for now, No Voice Input for now, Map : google map + places API, Implement Push notification, Data persistance : Local + CloudSync, healthSensor : manualInput, PDF : Native PDF generation, Offline Support : Partial with cache data, Multi-user : User profiles + login, DataSync : Firebase/supabase Sync} ] **Which features become real vs. stay simulated?** (Mark each row above)
- [ full product ] **Is this an MVP or full product?** (affects scope significantly)
- [ We will go production, but step by step ] **Is the target a demo/prototype or production-ready app?**

---

## 3. Backend & Data Strategy

The current app has **zero backend** — everything is client-side `localStorage` with JSON seed files. A mobile app needs a clear data strategy.

### 3.1 Options

| Approach | Description | Complexity | Best For |
|----------|-------------|-----------|----------|
| **A) Local-only (SQLite/Hive)** | All data stored on-device. No server. | Low | Demo / MVP / University submission |
| **B) Local + Firebase** | Local DB + Firebase for auth, sync, and cloud backup | Medium | Production-lite with multi-device support |
| **C) Local + Custom Backend** | Local DB + Node.js/Express + Oracle DB (per SDD) | High | Full production as per original SDD |
| **D) Local + Supabase/Appwrite** | Local DB + BaaS for auth and sync | Medium | Modern alternative to custom backend |

### 3.2 Current Data Inventory (Must Be Migrated)

| Data | Current Storage | Size | Migration Notes |
|------|----------------|------|-----------------|
| Language preference | `localStorage` key | 2 bytes | Simple key-value |
| Medication schedules | `localStorage` JSON array | ~3 KB | 5 seed entries, user-extendable |
| Medicine inventory | `localStorage` JSON array | ~1 KB | 7 seed entries, user-extendable |
| Today's health record | `localStorage` JSON object | ~500 bytes | Single daily record |
| Health history | `localStorage` JSON array | ~7 KB | 7 seed entries |
| Login state | `sessionStorage` | 2 keys | Session-scoped |
| Chat history | In-memory only | Variable | Lost on page reload — intentional? |

### 3.3 Database Schema Considerations

The TypeScript schemas in the Technical Reference (§13.4) map directly to database tables/collections:

- `medication_schedules` table
- `medicine_inventory` table
- `health_records` table
- `user_preferences` table (language, etc.)
- `chat_sessions` table (if persistence desired)

### 3.4 Decisions Required

- [ C:Local + Custom Backend ] **Which backend approach?** (A/B/C/D above)
- [ yes ] **Should chat history persist across sessions?** (Currently it doesn't)
- [ yes ] **Should health records sync to cloud?**
- [ SQLite] **Database choice?** (SQLite, Hive, Drift, Realm, etc.)
- [ Not sure ] **Is the Oracle DB dependency in package.json still relevant?**

---

## 4. Authentication System

The current web app uses **simulated authentication** (any PIN works, sessionStorage). 

### 4.1 Options

| Approach | Description | Complexity |
|----------|-------------|-----------|
| **A) Keep simulation** | Any PIN works, local session | None |
| **B) Local PIN only** | User sets PIN on first launch, stored as hash on device | Low |
| **C) Biometrics + Local PIN** | Fingerprint/FaceID with PIN fallback, all local | Medium |
| **D) Firebase Auth + Biometrics** | Cloud-backed accounts with biometric option | Medium-High |
| **E) Full auth (per SDD)** | Server-side auth with Oracle DB user table | High |

### 4.2 Decisions Required

- [ E : ServerSide Auth ] **Authentication approach?** (A-E above)
- [ Phones nowadays have only one, our app should call the OS's biometrics auth and proceed with what available, fingerprint or faceID, and PIN is backUp if fingerprint or faceID is faling] **If biometrics: which types?** (Fingerprint, FaceID, both?)
- [ Multi-user ] **Single user or multi-user support?**
- [ TTL custom setting like 5min/10min/..., app stopped/memory cleared] **Session timeout behavior?** (Current: expires on tab close)

---

## 5. AI Integration Strategy

The app heavily relies on **Google Gemini 2.5 Flash** via a Cloudflare Worker proxy for 3 modules (Chit-Chat, Consulting, Health Recorder).

### 5.1 Current Architecture

```
App → Cloudflare Worker (https://demoo-gemini-proxy.captaindawood12.workers.dev)
    → Google Gemini API (gemini-2.5-flash)
```

### 5.2 Options for Mobile

| Approach | Description | Pros | Cons |
|----------|-------------|------|------|
| **A) Keep Cloudflare Worker proxy** | Same architecture, HTTP calls from mobile | Simple, no change needed | Depends on external worker, no offline AI |
| **B) Firebase Functions proxy** | Replace Worker with Firebase Cloud Function | Better integration with Firebase ecosystem | Requires Firebase project setup |
| **C) Direct Gemini SDK** | Use Google AI SDK for Dart/Kotlin/Swift | Simpler architecture, official SDK | API key management on device |
| **D) On-device AI (Gemini Nano)** | Use on-device model for simple responses | Offline capable, no API costs | Limited capability, device requirements |
| **E) Hybrid (D + A/B/C)** | On-device for simple, cloud for complex | Best of both worlds | Most complex to implement |

### 5.3 Persona Prompts

All 3 AI personas (Adik Aisya, Encik Amirul, Dr. Fatimah) have detailed system prompts hardcoded in HTML `<script>` tags. These must be:
- Extracted into configurable files/constants
- Potentially refined for mobile context
- Tested for response quality

### 5.4 Decisions Required

- [ D:OnDevice + B:Firebase Fn Proxy ] **AI proxy approach?** (A-E above)
- [ Server Injected ] **API key management strategy?** (bundled, remote config, server-injected?)
- [ On Device AI, with backUp predefined JSON responses ] **Offline AI fallback?** (Use the pre-defined `responses` in JSON files?
- [ it should flexible ] **Keep or change the Gemini model?** (gemini-2.5-flash vs. other)
- [ dont know yet ] **Rate limiting / cost control?**
{for cost control, we gotta introduce a token point system, with ADs, which user need to watch AD to gain token points}

---

## 6. Third-Party Services & APIs

### 6.1 Services Needed (Based on Feature Scope)

| Service | Purpose | Options | Required? |
|---------|---------|---------|-----------|
| **Maps SDK** | Pharmacy location display | Google Maps SDK, Mapbox, Apple Maps | Only if implementing real map |
| **Places API** | Find nearby pharmacies | Google Places API, Foursquare | Only if implementing real pharmacy search |
| **OCR / Document Scanning** | Prescription text extraction | Google ML Kit, AWS Textract, Apple Vision | Only if implementing real OCR |
| **Speech-to-Text** | Voice input for chat | Platform native (Android SpeechRecognizer, iOS Speech) | Only if implementing real voice |
| **Push Notifications** | Medication reminders | Firebase Cloud Messaging (FCM), APNs | Only if implementing reminders |
| **PDF Generation** | Stock report export | pdf (Flutter), iText, native frameworks | Only if keeping PDF export |
| **Analytics** | Usage tracking | Firebase Analytics, Mixpanel | Optional |
| **Crash Reporting** | Error monitoring | Firebase Crashlytics, Sentry | Recommended |

### 6.2 API Keys & Accounts Needed

| Service | Account Required | Free Tier Available? |
|---------|-----------------|---------------------|
| Google Cloud (Maps, Places, Vision) | Yes | Yes (limited) |
| Firebase | Yes | Yes (Spark plan) |
| AWS (Textract) | Yes | Yes (limited) |
| Google AI (Gemini) | Yes | Yes (rate-limited) |

### 6.3 Decisions Required

- [ MapSDK, places API, Push Noti, PDF Gen, Analytics, Crash Reporting] **Which third-party services will be used?** (based on §2 scope decisions)
- [ Developer ] **Who creates/owns the API accounts?**
- [ free tier only for now ] **Budget for paid API tiers?** (or strictly free tier?)

---

## 7. Asset Preparation

### 7.1 Current Assets

The web app has **7 PNG avatar images** + 1 logo PNG. These need adaptation for mobile.

### 7.2 Required Preparations

| Task | Details | Status |
|------|---------|--------|
| **App Icon** | Current logo is `Ingatkan_Teman_Logo.PNG`. Need proper icon sizes: Android (48-512dp), iOS (20-1024pt) | ❌ Need to generate |
| **Splash Screen** | Current web has FaceID animation. Need native splash/launch screen assets | ❌ Need to design |
| **Avatar Resolutions** | Current PNGs are single-resolution. Mobile needs 1x/2x/3x or vector equivalents | ⚠️ Check source resolution |
| **Adaptive Icons (Android)** | Android requires foreground + background layers for adaptive icons | ❌ Need to create |
| **Store Listing Assets** | Screenshots, feature graphic (Play Store), preview images (App Store) | ❌ Need to create |
| **Lottie Animations** | Consider replacing CSS animations (FaceID scan, typing indicator) with Lottie | 💡 Optional enhancement |

### 7.3 Decisions Required

- [ i think so ] **Are the current avatar PNGs high enough resolution for mobile?** (check dimensions)
- [ native css for now ] **Will CSS animations be recreated natively or replaced with Lottie?**
- [ keep current logo ] **App icon design — keep current logo or redesign?**
- [ nope ] **Need store listing assets for submission?**

---

## 8. Internationalization (i18n) Strategy

### 8.1 Current System

The web app uses a **custom IIFE i18n module** with:
- `translations.json` for UI strings (dot-path keys, EN + BM)
- `_BM` suffix pattern in data JSON files for inline bilingual content
- DOM attributes (`data-i18n`, `data-i18n-placeholder`, `data-i18n-title`)

### 8.2 Migration Considerations

| Current Pattern | Mobile Standard |
|----------------|-----------------|
| `translations.json` single file | Platform-specific: `.arb` files (Flutter), `strings.xml` (Android), `Localizable.strings` (iOS) |
| Dot-path keys (`home.welcome`) | Platform key format (varies) |
| `_BM` suffix in data files | Locale-aware data loading or locale-keyed maps |
| Runtime language switching | Platform locale management |
| `languageChanged` CustomEvent | State management / Provider pattern |

### 8.3 Decisions Required

- [ Platform ] **Use platform-native i18n or a custom solution?** (Platform-native recommended)
- [ auto ] **Convert `translations.json` to platform format automatically or manually?**
- [ transform it into flutter based language format] **How to handle the `_BM` suffix pattern in data files?** (Restructure to locale-keyed maps?)
- [ Mandarin Chinese ] **Add more languages beyond EN and BM?**

---

## 9. Development Environment & Tooling

### 9.1 Required Setup (Depends on Framework Choice)

#### If Flutter:
- [ / ] Flutter SDK (latest stable)
- [ ] Dart SDK (bundled with Flutter)
- [ / ] Android Studio + Android SDK
- [ ] Xcode (for iOS, macOS only)
- [ / ] VS Code with Flutter/Dart extensions
- [ ] Physical device(s) for testing elderly UX

#### If React Native:
- [ ] Node.js + npm/yarn
- [ ] React Native CLI or Expo
- [ ] Android Studio + Android SDK
- [ ] Xcode (for iOS)
- [ ] VS Code with React Native extensions

### 9.2 Team Readiness

- [ / ] **Does the team have experience with the chosen framework?**
- [ - ] **Training time needed?**
- [ Andriod only for now ] **Development machines available?** (macOS needed for iOS builds)

### 9.3 Decisions Required

- [ VSCode ] **IDE choice?** (Android Studio vs VS Code)
- [ Git ] **Version control branching strategy?** (feature branches? trunk-based?)
- [ Github actions ] **CI/CD pipeline?** (GitHub Actions, Codemagic, Bitrise?)

---

## 10. Testing Strategy

### 10.1 Elderly-Specific Testing Needs

This app targets users **age 70+**, requiring special attention to:

| Concern | Testing Approach |
|---------|-----------------|
| **Touch accuracy** | Test with actual elderly users; verify 56px min targets |
| **Font readability** | Test 18px minimum on various screen sizes/densities |
| **Contrast ratios** | Automated WCAG AAA checks |
| **Cognitive load** | Usability testing with elderly volunteers |
| **Accessibility** | Screen reader support (TalkBack / VoiceOver) |

### 10.2 Test Types

| Type | Scope | Tools |
|------|-------|-------|
| Unit Tests | Business logic, data models, utils | Platform test framework |
| Widget/UI Tests | Component rendering, interaction | Platform UI testing |
| Integration Tests | Full user flows | Appium, platform integration test |
| Accessibility Tests | Screen reader, contrast | Accessibility scanner |
| Manual/Usability | Elderly user testing | Physical devices |

### 10.3 Decisions Required

- [ 80% ] **Test coverage target?** (e.g., 80% unit test coverage)
- [ Andriod only for now ] **Devices for testing?** (which Android/iOS devices?)
- [ dont know yet ] **Access to elderly testers?**
- [ no need yet ] **Automated CI testing?**

---

## 11. Deployment & Distribution

### 11.1 App Store Requirements

#### Google Play Store
- [ ] Google Play Developer account ($25 one-time fee)
- [ ] App signing key
- [ ] Privacy policy URL
- [ ] Store listing (title, description, screenshots, feature graphic)
- [ ] Content rating questionnaire
- [ ] Target API level compliance

#### Apple App Store
- [ ] Apple Developer account ($99/year)
- [ ] App Store Connect setup
- [ ] Provisioning profiles + certificates
- [ ] App Review guidelines compliance
- [ ] Privacy labels

### 11.2 Alternatives to Store Distribution

| Option | Description | Pros | Cons |
|--------|-------------|------|------|
| **APK sideloading** | Distribute APK directly | Free, no review | Android only, no auto-updates |
| **Firebase App Distribution** | Beta testing distribution | Easy, both platforms | Not for production |
| **Internal testing tracks** | Play Store internal/closed testing | Real store flow, limited audience | Still needs Play Console |

### 11.3 Decisions Required

- [ sideloading for now ] **Distribution method?** (Play Store, App Store, sideloading, internal only?)
- [ not yet ] **Who owns the developer accounts?**
- [ public release, but it is in last phase] **Is this for university demo only or public release?**
- [ - ] **Privacy policy — who drafts it?**

---

## 12. Decision Summary Checklist

> **Complete this checklist before starting the Transformation Plan.**

### Critical Decisions (Must Decide)

| # | Decision | Options | Chosen |
|---|----------|---------|--------|
| 1 | Target framework | Flutter / React Native / Native | ___ |
| 2 | Target platforms | Android only / iOS only / Both | ___ |
| 3 | Scope level | MVP (simulated features) / Full (real features) | ___ |
| 4 | Backend approach | Local-only / Local + Firebase / Local + Custom | ___ |
| 5 | Authentication | Simulated / Local PIN / Biometrics / Cloud auth | ___ |
| 6 | AI proxy approach | Keep Worker / Firebase Functions / Direct SDK | ___ |
| 7 | Database | SQLite / Hive / Drift / Realm | ___ |
| 8 | Distribution | Play Store / App Store / Sideload / Demo only | ___ |

### Feature Scope Decisions (Mark ✅ Implement or ⏭️ Skip/Simulate)

| # | Feature | Decision |
|---|---------|----------|
| 9 | Real biometric auth | ✅ |
| 10 | Real OCR scanning | ⏭️ |
| 11 | Real voice input | ⏭️ |
| 12 | Real pharmacy map | ✅ |
| 13 | Push notifications | ✅ |
| 14 | Cloud data sync | ✅ |
| 15 | Health sensor integration | ⏭️ |
| 16 | PDF report export | ✅ |
| 17 | Offline support | ✅ |
| 18 | Multi-user profiles | ✅ |

### Preparation Tasks (Must Complete)

| # | Task | Status |
|---|------|--------|
| 19 | Generate app icon in all required sizes | ⏭️ |
| 20 | Verify avatar image resolutions for mobile | ✅ |
| 21 | Set up development environment | ✅ |
| 22 | Create API accounts (Google Cloud, Firebase, etc.) | ✅ |
| 23 | Set up project repository for mobile app | ✅ |
| 24 | Convert `translations.json` to platform i18n format | ✅ |
| 25 | Extract AI persona prompts into configurable constants | ⬜ |
| 26 | Design splash/launch screen | CSS |

---

*Fill in the "Chosen" and "Decision" columns above, then proceed to create the Transformation Plan.*
