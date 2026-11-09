# AJAYNXT Social Analytics – Multi-Tenant Database Schema

This document details the multi-tenant architecture designed for Google Cloud Firestore.

## Architectural Principles
1. **Tenant Isolation**: Every workspace acts as a strictly bounded tenant. All analytics data, connection metadata, and media items reside under `workspaces/{workspaceId}/*`.
2. **Subcollection Segregation**: We use Firestore subcollections to naturally prevent cross-tenant queries.
3. **Server-Side Guardrails**: Sensitive fields such as OAuth access tokens and client secrets are **never** stored in client-accessible collections without AES-256-GCM encryption.

---

## 1. Schema Hierarchy

```text
users/{uid}
├── profile fields (email, displayName, isSuperAdmin, activeWorkspaceId)

workspaces/{workspaceId}
├── metadata (name, slug, ownerUid, plan, createdAt)
│
├── members/{uid}
│   └── (email, role: 'workspace_owner' | 'workspace_admin' | 'workspace_member', joinedAt)
│
├── connections/{connectionId}
│   └── (instagramUserId, username, accountType, encryptedAccessToken, iv, authTag, tokenExpiresAt, status)
│
├── daily_metrics/{YYYY-MM-DD}
│   └── (totalFollowers, followersGained, followersLost, netFollowers, reach, views, accountsEngaged, totalInteractions)
│
├── media/{mediaId}
│   └── (caption, mediaType, publishedAt, permalink, thumbnailUrl, reach, views, likes, comments, saves, shares, engagementRate)
│
└── reports/{reportId}
    └── (reportType, dateRange, status, downloadUrl, generatedAt)

subscriptions/{workspaceId}
└── (plan: 'starter' | 'pro_agency' | 'enterprise', status: 'ACTIVE' | 'PAST_DUE', billingCycle, nextBillingDate)

usage/{workspaceId}
└── (monthlySyncsUsed, monthlySyncQuota, lastResetAt)

audit_logs/{logId}
└── (timestamp, actorUid, actorEmail, workspaceId, action, ipAddress, status, details)
```

---

## 2. Collection Details & Types

### `users/{uid}`
- `uid`: string (Firebase Auth UID)
- `email`: string
- `displayName`: string
- `photoURL`: string (optional)
- `isSuperAdmin`: boolean (defaults to `false`)
- `activeWorkspaceId`: string
- `createdAt`: ISO 8601 string

### `workspaces/{workspaceId}`
- `workspaceId`: string (unique slug / timestamped hash)
- `name`: string (e.g., "Acme Media Agency")
- `slug`: string (e.g., "acme-media")
- `ownerUid`: string (reference to `users/{uid}`)
- `plan`: 'starter' | 'pro_agency' | 'enterprise'
- `createdAt`: ISO 8601 string
- `settings`: object (timezone, default currency)

### `workspaces/{workspaceId}/members/{uid}`
- `uid`: string
- `email`: string
- `displayName`: string
- `role`: 'workspace_owner' | 'workspace_admin' | 'workspace_member'
- `joinedAt`: ISO 8601 string

### `workspaces/{workspaceId}/connections/{connectionId}`
- `connectionId`: string
- `instagramUserId`: string (Meta IG User ID)
- `username`: string
- `accountType`: 'BUSINESS' | 'CREATOR'
- `facebookPageId`: string
- `facebookPageName`: string
- `encryptedTokenPayload`: string (`iv:authTag:ciphertext` encrypted with AES-256-GCM)
- `tokenExpiresAt`: ISO 8601 string (60-day lifecycle)
- `status`: 'ACTIVE' | 'EXPIRED' | 'REVOKED'
- `scopes`: array of strings

### `workspaces/{workspaceId}/daily_metrics/{metricId}`
- `metricId`: string (formatted as `YYYY-MM-DD`)
- `date`: string (YYYY-MM-DD)
- `totalFollowers`: number
- `followersGained`: number
- `followersLost`: number
- `netFollowers`: number
- `reach`: number
- `views`: number
- `accountsEngaged`: number
- `totalInteractions`: number
- `likes`: number
- `comments`: number
- `saves`: number
- `shares`: number
- `engagementRate`: number (calculated percentage)

### `workspaces/{workspaceId}/media/{mediaId}`
- `mediaId`: string (Instagram Media ID)
- `caption`: string
- `mediaType`: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM' | 'REEL' | 'STORY'
- `publishedAt`: ISO 8601 string
- `permalink`: string
- `thumbnailUrl`: string
- `reach`: number
- `views`: number
- `likes`: number
- `comments`: number
- `saves`: number
- `shares`: number
- `engagementRate`: number
- `durationSeconds`: number (optional)

### `audit_logs/{logId}`
- `id`: string
- `timestamp`: ISO 8601 string
- `actorUid`: string
- `actorEmail`: string
- `actorRole`: string
- `workspaceId`: string
- `action`: string (e.g., `INSTAGRAM_OAUTH_CONNECT`, `EXPORT_REPORT`, `INVITE_MEMBER`)
- `details`: string
- `ipAddress`: string
- `status`: 'SUCCESS' | 'FAILED' | 'WARNING'
