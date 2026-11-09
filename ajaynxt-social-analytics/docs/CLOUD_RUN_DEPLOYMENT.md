# Google Cloud Run Deployment Guide (asia-south1 Mumbai)

This guide documents the production deployment of the AJAYNXT Social Analytics backend API to Google Cloud Run and frontend to Firebase Hosting.

> **Reminder:** Do not run deployment commands or incur costs without explicit project approval.

---

## 1. Google Cloud Project Setup

```bash
# 1. Set Project ID and Default Region (Mumbai)
export PROJECT_ID="ajaynxt-social-analytics"
export REGION="asia-south1"

gcloud config set project $PROJECT_ID
gcloud config set run/region $REGION

# 2. Enable Required Google Cloud APIs
gcloud services enable \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  secretmanager.googleapis.com \
  firestore.googleapis.com \
  cloudbuild.googleapis.com
```

---

## 2. Google Cloud Secret Manager

Store sensitive secrets in Secret Manager to avoid plaintext `.env` files:

```bash
# Store Master AES-256-GCM Encryption Key (64-hex characters)
echo -n "your_64_character_hex_master_key" | \
  gcloud secrets create ENCRYPTION_MASTER_KEY --data-file=-

# Store Meta App Secret
echo -n "your_meta_app_secret" | \
  gcloud secrets create META_APP_SECRET --data-file=-
```

---

## 3. Build & Deploy Backend Container to Cloud Run

```bash
cd ajaynxt-social-analytics/backend

# Submit build to Cloud Build / Artifact Registry
gcloud builds submit --tag gcr.io/$PROJECT_ID/ajaynxt-backend:v1.0.0

# Deploy to Cloud Run with strict cost & resource ceilings
gcloud run deploy ajaynxt-social-analytics-api \
  --image gcr.io/$PROJECT_ID/ajaynxt-backend:v1.0.0 \
  --region asia-south1 \
  --platform managed \
  --min-instances 0 \
  --max-instances 2 \
  --memory 512Mi \
  --cpu 1 \
  --timeout 30s \
  --concurrency 80 \
  --allow-unauthenticated \
  --set-env-vars NODE_ENV=production,GCP_REGION=asia-south1,META_API_VERSION=v21.0,META_APP_ID=your_app_id \
  --set-secrets ENCRYPTION_MASTER_KEY=ENCRYPTION_MASTER_KEY:latest,META_APP_SECRET=META_APP_SECRET:latest
```

---

## 4. Deploy Frontend to Firebase Hosting

```bash
cd ../frontend

# Build optimized production bundle
npm run build

# Deploy Hosting, Firestore rules, and indexes
cd ..
firebase deploy --only hosting,firestore
```

---

## 5. Verification & Health Check

```bash
# Health check ping
curl -s https://ajaynxt-social-analytics-api-xxxx.run.app/healthz
# Expected response: {"status":"OK","service":"AJAYNXT Social Analytics API","region":"asia-south1"}
```
