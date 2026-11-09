# Meta Developer App & Instagram Graph API Configuration Guide

This guide describes how to configure the official Meta Developer Application to enable Instagram Login for AJAYNXT Social Analytics.

---

## 1. Prerequisites
- A Facebook Personal Account with Administrator rights.
- An Instagram Professional Account (Business or Creator). Personal accounts **cannot** query Instagram Insights.
- A Facebook Page linked to your Instagram Professional Account.

---

## 2. Create the Meta Developer App
1. Go to [developers.facebook.com](https://developers.facebook.com/) and click **My Apps** &rarr; **Create App**.
2. Select **Other** as the use case &rarr; Choose **Business** as the app type.
3. App Name: `AJAYNXT Social Analytics`
4. Associate with your Meta Business Account.

---

## 3. Add Products
Add the following products to your Meta App:
1. **Facebook Login for Business**
2. **Instagram Graph API**

---

## 4. Configure OAuth Redirect URIs
In the Meta App Dashboard under **Facebook Login for Business** &rarr; **Settings**:
1. Enable **Client OAuth Login** and **Web OAuth Login**.
2. Add the following **Valid OAuth Redirect URIs**:
   - `http://localhost:3000/api/instagram/callback` (for local development)
   - `https://app.ajaynxt.com/api/instagram/callback` (for production)
3. Set **Deauthorize Callback URL**:
   - `https://api.ajaynxt.com/api/instagram/deauth`
4. Set **Data Deletion Request URL**:
   - `https://api.ajaynxt.com/api/instagram/data-deletion`

---

## 5. Required Permissions (Scopes)
Request only the minimum permissions necessary:
- `instagram_basic`: Read profile details, username, profile photo, and media list.
- `instagram_manage_insights`: Access reach, views, engagement rates, follower counts.
- `pages_show_list`: Discover linked Facebook Pages managed by the user.
- `pages_read_engagement`: Verify page authorization and read page-level engagement metrics.

### Access Levels:
- **Standard Access (Default)**: Immediately available for all App Administrators, Developers, and Registered Test Users. Use this during testing and local development.
- **Advanced Access (Public SaaS)**: Required before public customers can log in. Submit your app for **App Review** with screencast recordings demonstrating:
  1. The login button initiating OAuth dialog.
  2. The permissions requested screen.
  3. The resulting Evolution analytics dashboard.

---

## 6. Environment Variables Setup
In your server's `.env` or Google Cloud Secret Manager:
```env
META_API_VERSION=v21.0
META_APP_ID=123456789012345
META_APP_SECRET=your_secret_from_app_settings_basic
META_REDIRECT_URI=https://app.ajaynxt.com/api/instagram/callback
```
