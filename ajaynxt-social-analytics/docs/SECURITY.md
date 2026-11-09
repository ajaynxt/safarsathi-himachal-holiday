# AJAYNXT Social Analytics – Security Architecture & Threat Model

This document outlines the security controls, cryptographic standards, and tenant isolation policies implemented in AJAYNXT Social Analytics.

---

## 1. Zero-Knowledge Tenant Isolation

1. **Authorization at Every Hop**: Every private endpoint requires:
   - Valid Firebase ID token.
   - Verification of membership in `workspaces/{workspaceId}/members/{uid}`.
2. **Denial of Direct Browser Access**:
   - Sensitive collections (like `connections`, `daily_metrics`, and `audit_logs`) have `allow write: if false` in `firestore.rules`.
   - All mutations occur via the Node.js Cloud Run backend operating under Firebase Admin SDK credentials.
3. **Super Admin Guardrails**:
   - Super Admins can monitor global tenant health, usage counts, and system metrics.
   - Super Admins **cannot** query or view decrypted customer Instagram tokens, passwords, or private media.

---

## 2. Token Security & Cryptography

1. **No Plaintext Tokens**:
   - Meta access tokens are never stored as plaintext in Firestore or memory caches.
   - All tokens are encrypted using **AES-256-GCM** with a unique 96-bit initialization vector (IV) and a 128-bit authentication tag per encryption operation.
2. **Master Encryption Key Management**:
   - The master 256-bit encryption key is managed via **Google Cloud Secret Manager** (`projects/${PROJECT_ID}/secrets/ENCRYPTION_MASTER_KEY/versions/latest`).
   - The secret is never committed to Git and is injected as an environment variable into Cloud Run instances at runtime.
3. **No Browser Exposure**:
   - Client applications never receive Instagram access tokens or the Meta App Secret.
   - Client queries request aggregated analytics summaries, never direct Meta Graph credentials.

---

## 3. Meta OAuth & CSRF Protection

1. **Cryptographically Secure State Tokens**:
   - The `/api/instagram/connect` endpoint generates a 24-byte random hex string using `crypto.randomBytes(24)`.
   - The state is tied to the requesting workspace and user UID with a strict 10-minute time-to-live (TTL).
2. **State Validation on Callback**:
   - The `/api/instagram/callback` endpoint verifies that the incoming `state` parameter exists in the active cache and matches the session before exchanging the authorization code.
   - Single-use state tokens prevent replay attacks.
3. **Meta Deauthorization & Data Deletion**:
   - `/api/instagram/deauth` handles signed requests when users deauthorize the app from Facebook settings.
   - `/api/instagram/data-deletion` generates compliant confirmation codes and status URLs per Meta Platform Terms.

---

## 4. API Hardening & Rate Limiting

1. **Helmet HTTP Headers**: Enforces `Content-Security-Policy`, `X-Frame-Options`, `Strict-Transport-Security`, and `X-Content-Type-Options`.
2. **Strict CORS**: Only origins explicitly defined in `CORS_ALLOWED_ORIGINS` can execute cross-origin requests.
3. **IP & Tenant Rate Limiting**: In-memory and serverless rate limiters prevent denial-of-service and brute force requests.
