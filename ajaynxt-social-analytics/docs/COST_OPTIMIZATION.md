# AJAYNXT Social Analytics – Cloud Cost Optimization Architecture

**Monthly Spending Ceiling Target: ₹1,000 INR (approx. $12 USD)**

> **Important Notice:** In Google Cloud Platform, Billing Budget Alerts provide threshold email notifications at specified milestones. They do **not** automatically terminate compute instances or halt billing. Application-level throttling and serverless scale-to-zero configurations are the primary safeguards against unexpected cost spikes.

---

## 1. Google Cloud Architecture Configuration

| Component | Setting | Rationale | Cost Impact |
| :--- | :--- | :--- | :--- |
| **Cloud Run Instances** | Min: `0` / Max: `2` | Scale to zero when traffic is idle; prevent cold runner accumulation | ₹0 during idle hours |
| **Cloud Run Memory** | `512 MiB` | Sufficient for Express API and Meta token exchange | Within free tier allowance (2M requests/month) |
| **Region** | `asia-south1` (Mumbai) | Lowest network latency for Indian businesses | Minimal egress |
| **Firestore Database** | Spark / Standard Pay-as-you-go | Up to 50k reads, 20k writes, 1 GB storage per day in free tier | ₹0 under standard agency workloads |
| **Firebase Hosting** | Global CDN (Static) | Serves React Vite bundle; free tier includes 10 GB storage and 360 MB/day transfer | ₹0 for typical traffic |
| **Secret Manager** | 6 active versions | Stores master AES keys and Meta app secrets | Within GCP free allowance (6 secret versions free) |

---

## 2. Application-Level Cost Control Measures

1. **Daily Insights Sync Limit**:
   - Each connected Instagram account is automatically synced at most **once per 24-hour cycle**.
   - Aggregated daily snapshots are stored in `workspaces/{workspaceId}/daily_metrics/{YYYY-MM-DD}`. Subsequent dashboard page visits query Firestore cached documents rather than hitting Meta Graph APIs.
2. **Manual Refresh Cooldown**:
   - A strict 15-minute cooldown is enforced on the frontend and backend `/api/analytics/sync` endpoint.
   - Prevents users from repeatedly triggering redundant API calls.
3. **Zero Media Video Downloads**:
   - AJAYNXT stores only Instagram CDN URLs (`permalink`, `thumbnail_url`).
   - We **never** download, process, or re-host high-resolution video reels or stories on GCP Cloud Storage, avoiding multi-gigabyte egress and storage bills.
4. **Deferred Heavy Services**:
   - No BigQuery data warehouses or Cloud Dataflow streaming pipelines are deployed in Phase 1-5.
   - Firestore document subcollections satisfy all analytical query needs without high hourly cluster overhead.

---

## 3. Google Cloud Billing Alerts Setup

Set up budget alerts in the Google Cloud Console:
1. Navigate to **Billing** &rarr; **Budgets & alerts** &rarr; **Create budget**.
2. Target: `₹1,000 INR / month` (Reset on the 1st of every calendar month).
3. Set alert thresholds:
   - **50% of budget (₹500 INR)** &rarr; Early notification
   - **75% of budget (₹750 INR)** &rarr; Advisory alert
   - **90% of budget (₹900 INR)** &rarr; High priority warning
   - **100% of budget (₹1,000 INR)** &rarr; Critical action notification
4. Assign email notifications to workspace owners and Platform Super Admins.
