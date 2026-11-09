# AJAYNXT Social Analytics – Multi-Tenant SaaS

A production-quality social media analytics SaaS inspired by Metricool's Instagram Evolution dashboard, engineered for multi-client marketing agencies, businesses, and creators.

![Region](https://img.shields.io/badge/GCP%20Region-asia--south1%20(Mumbai)-blue)
![Meta Graph API](https://img.shields.io/badge/Meta%20Graph%20API-v21.0%20Official-purple)
![Security](https://img.shields.io/badge/Security-AES--256--GCM%20Encrypted-success)
![Cost Ceiling](https://img.shields.io/badge/Monthly%20Budget%20Target-%E2%82%B91%2C000%20INR-emerald)

---

## 1. Project Overview & Architecture

AJAYNXT Social Analytics provides multi-tenant isolation where agencies can create isolated workspaces for each client brand, connect Instagram Professional accounts via official Meta OAuth, and monitor in-depth chronological evolution metrics.

### Technology Stack
- **Frontend**: React 18 + Vite + TypeScript, Tailwind CSS, Lucide icons, Recharts for analytics, Firebase Hosting.
- **Backend API**: Node.js + Express + TypeScript, Google Cloud Run in `asia-south1` (Mumbai).
- **Database & Auth**: Google Cloud Firestore with multi-tenant subcollections, Firebase Authentication (Email/Password & Google Sign-In).
- **Security & Secret Vault**: Google Cloud Secret Manager, AES-256-GCM token encryption, Firebase ID token verification, strict role-based access control.

---

## 2. Directory Structure

```text
ajaynxt-social-analytics/
├── .env.example                     # Environment template
├── firebase.json                    # Firebase hosting & rewrite configuration
├── firestore.rules                  # Multi-tenant zero-leak security rules
├── firestore.indexes.json           # Composite database indexes
├── README.md                        # Documentation and run instructions
├── docs/
│   ├── DATABASE_SCHEMA.md           # Firestore collection & subcollection definitions
│   ├── SECURITY.md                  # Cryptographic controls & threat model
│   ├── COST_OPTIMIZATION.md         # ₹1,000 monthly ceiling architecture
│   ├── META_OAUTH_SETUP.md          # Meta Developer App & v21.0 permissions
│   └── CLOUD_RUN_DEPLOYMENT.md      # Docker & Google Cloud Run deployment
├── frontend/
│   ├── index.html                   # HTML entry point
│   ├── package.json                 # Dependencies (React, Firebase, Recharts, Tailwind)
│   ├── vite.config.ts               # Vite configuration (port 3000)
│   ├── tailwind.config.js           # Theme and styling configuration
│   └── src/
│       ├── App.tsx                  # Root app with view routing
│       ├── main.tsx                 # Entry point
│       ├── config/firebase.ts       # Client Firebase Auth & Firestore setup
│       ├── services/firestoreService.ts # Client multi-tenant Firestore operations
│       ├── services/instagramOAuthService.ts # Meta OAuth client service
│       ├── context/                 # Auth, Workspace, and Theme Contexts
│       ├── data/demoData.ts         # High-fidelity Meta Graph API v21.0 fixtures
│       ├── components/
│       │   ├── layout/              # Sidebar, Topbar, AppShell
│       │   ├── common/              # MetricCard, DemoBadge, Modals, DateRangePicker
│       │   ├── dashboard/           # Overview, Evolution, Content, Reels, Stories, Engagement, Reports, ConnectedAccounts, WorkspaceSettings
│       │   ├── admin/               # Platform Super Admin portal & cost monitor
│       │   └── landing/             # Public landing page & pricing
│       └── utils/                   # Formatting utilities and styling helpers
└── backend/
    ├── Dockerfile                   # Multi-stage production container
    ├── package.json                 # Express, Firebase Admin, Helmet, Axios
    ├── tsconfig.json                # TypeScript NodeNext configuration
    └── src/
        ├── index.ts                 # Server entry point
        ├── app.ts                   # Express app with middleware & routing
        ├── config/                  # Environment and Firebase Admin setup
        ├── middleware/              # Auth, Tenant Isolation, Rate Limiting
        ├── controllers/             # Instagram OAuth controller with CSRF & Deauth
        ├── services/                # AES-256-GCM Encryption, Backend Firestore & Audit Logs, Meta API v21.0
        ├── utils/logger.ts          # Structured Cloud Logging helper
        ├── test/                    # Automated security and encryption unit tests
        └── routes/                  # Modular auth, workspace, instagram, analytics, report & admin APIs
```

---

## 3. Quickstart & Local Verification

### Frontend (React + Vite)
```bash
cd ajaynxt-social-analytics/frontend
npm install
npm run dev
```
Preview running on [http://localhost:3000](http://localhost:3000).

### Backend (Express + TypeScript + Tests)
```bash
cd ajaynxt-social-analytics/backend
npm install
npm test
npm run dev
```
API runs on [http://localhost:8080](http://localhost:8080).

---

## 4. Development Progress & Roadmap

- [x] **Phase 1**: Frontend structure, navigation, landing page, login, workspace UI and Evolution dashboard with clearly labelled demo fixtures.
- [x] **Phase 2**: Firebase Authentication & multi-tenant Cloud Firestore database architecture:
  - Client Firebase SDK initialization with `onAuthStateChanged`, email/password, and Google Login.
  - Multi-tenant Firestore subcollection structure (`workspaces/{id}/members`, `daily_metrics`, `media`, `subscriptions`, `usage`).
  - Server-side `BackendFirestoreService` with strict tenant validation and immutable audit logs.
- [x] **Phase 3**: Cloud Run backend & secure Meta OAuth integration:
  - CSRF protection using cryptographically random 32-byte state tokens with 10-minute TTL.
  - Two-stage OAuth exchange: code &rarr; short-lived token &rarr; 60-day Long-Lived Token.
  - Professional account verification (Business and Creator accounts linked to Facebook Pages).
  - AES-256-GCM encryption before token persistence in Firestore subcollection.
  - Zero token exposure to client JavaScript.
  - Meta deauthorization webhook and GDPR user data deletion handlers with HMAC-SHA256 signature verification.
  - Passing automated unit tests for signature validation, state entropy, and tamper prevention.
- [ ] **Phase 4**: Real Meta Graph API v21.0 Insights fetching & Firestore caching.
- [ ] **Phase 5**: White-label reports generation, automated monthly email dispatch, and payment gateway subscriptions.
- [ ] **Phase 6**: Security penetration testing, load testing, and production deployment.
