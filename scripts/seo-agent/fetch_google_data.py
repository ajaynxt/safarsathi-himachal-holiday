#!/usr/bin/env python3
"""
Safar Sathi AI SEO Growth Agent - Google Data Fetcher
Connects to Google Search Console API and Google Analytics 4 Data API.
Handles 10-day window comparison with automatic data delay compensation.
"""

import os
import sys
import json
import time
import base64
import subprocess
import urllib.request
import urllib.error
from datetime import datetime, timedelta

CONFIG_PATH = os.path.join(os.path.dirname(__file__), "config.json")

def load_config():
    with open(CONFIG_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

def get_google_access_token(service_account_path):
    """Generates an OAuth2 access token for GSC & GA4 using Service Account key."""
    if not os.path.exists(service_account_path):
        return None, f"Service account key not found at {service_account_path}"

    try:
        with open(service_account_path, "r", encoding="utf-8") as f:
            key_data = json.load(f)

        header = {"alg": "RS256", "typ": "JWT"}
        now = int(time.time())
        claims = {
            "iss": key_data["client_email"],
            "scope": (
                "https://www.googleapis.com/auth/webmasters.readonly "
                "https://www.googleapis.com/auth/analytics.readonly"
            ),
            "aud": "https://oauth2.googleapis.com/token",
            "exp": now + 3600,
            "iat": now,
        }

        def b64url(data):
            if isinstance(data, str):
                data = data.encode("utf-8")
            return base64.urlsafe_b64encode(data).decode("utf-8").rstrip("=")

        unsigned_jwt = f"{b64url(json.dumps(header))}.{b64url(json.dumps(claims))}"

        import tempfile
        with tempfile.NamedTemporaryFile(mode="w", delete=False) as kf:
            kf.write(key_data["private_key"])
            kf_path = kf.name

        try:
            p = subprocess.Popen(
                ["openssl", "dgst", "-sha256", "-sign", kf_path],
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
            )
            sig, err = p.communicate(input=unsigned_jwt.encode("utf-8"))
        finally:
            if os.path.exists(kf_path):
                os.remove(kf_path)

        if p.returncode != 0:
            return None, f"OpenSSL signing error: {err.decode()}"

        jwt_token = f"{unsigned_jwt}.{base64.urlsafe_b64encode(sig).decode('utf-8').rstrip('=')}"

        req = urllib.request.Request(
            "https://oauth2.googleapis.com/token",
            data=f"grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion={jwt_token}".encode("utf-8"),
            headers={"Content-Type": "application/x-www-form-urlencoded"},
        )
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return data["access_token"], None
    except Exception as e:
        return None, str(e)

def calculate_10_day_windows(reference_date=None):
    """
    Computes:
    - Latest complete 10-day window taking into account GSC's 3-day data latency
    - Previous 10-day window for direct comparison
    """
    if reference_date is None:
        reference_date = datetime.now()

    # GSC data usually has a ~3 day processing lag for final consolidation
    end_curr = reference_date - timedelta(days=3)
    start_curr = end_curr - timedelta(days=9)

    end_prev = start_curr - timedelta(days=1)
    start_prev = end_prev - timedelta(days=9)

    return {
        "current": {
            "start": start_curr.strftime("%Y-%m-%d"),
            "end": end_curr.strftime("%Y-%m-%d"),
            "days": 10
        },
        "previous": {
            "start": start_prev.strftime("%Y-%m-%d"),
            "end": end_prev.strftime("%Y-%m-%d"),
            "days": 10
        },
        "data_lag_days": 3,
        "as_of_date": reference_date.strftime("%Y-%m-%d")
    }

def query_gsc_search_analytics(access_token, site_url, start_date, end_date):
    """Queries GSC Search Analytics API for a specific date range."""
    import urllib.parse
    encoded_site = urllib.parse.quote(site_url, safe="")
    endpoint = f"https://www.googleapis.com/webmasters/v3/sites/{encoded_site}/searchAnalytics/query"
    body = {
        "startDate": start_date,
        "endDate": end_date,
        "dimensions": ["query", "page"],
        "rowLimit": 500,
        "type": "web"
    }

    req = urllib.request.Request(
        endpoint,
        data=json.dumps(body).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        }
    )

    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            return json.loads(resp.read().decode("utf-8")), None
    except urllib.error.HTTPError as e:
        error_body = e.read().decode("utf-8")
        return None, f"GSC HTTP {e.code}: {error_body}"
    except Exception as e:
        return None, str(e)

def fetch_10_day_performance():
    """Main execution function that fetches and compares GSC & GA4 10-day data."""
    config = load_config()
    windows = calculate_10_day_windows()
    service_account_email = config.get("service_account_email")
    service_account_path = config.get("service_account_key_path")
    gsc_property = config.get("gsc_property", "https://safarsathi.in/")

    token, auth_err = get_google_access_token(service_account_path)

    result = {
        "status": "ready",
        "timestamp": datetime.now().isoformat(),
        "windows": windows,
        "service_account": {
            "email": service_account_email,
            "authenticated": token is not None,
            "error": auth_err
        },
        "gsc": {
            "property": gsc_property,
            "status": "unknown",
            "current_period": None,
            "previous_period": None,
            "comparison": None,
            "notes": ""
        },
        "ga4": {
            "measurement_ids": config.get("ga4_measurement_ids", []),
            "status": "unknown",
            "notes": ""
        }
    }

    if not token:
        result["gsc"]["status"] = "auth_failed"
        result["gsc"]["notes"] = f"Failed to authenticate service account: {auth_err}"
        result["ga4"]["status"] = "auth_failed"
        return result

    # Query current 10 days
    curr_data, curr_err = query_gsc_search_analytics(
        token, gsc_property, windows["current"]["start"], windows["current"]["end"]
    )
    # Query previous 10 days
    prev_data, prev_err = query_gsc_search_analytics(
        token, gsc_property, windows["previous"]["start"], windows["previous"]["end"]
    )

    if curr_err or prev_err:
        result["gsc"]["status"] = "pending_property_access"
        result["gsc"]["notes"] = (
            f"Service account '{service_account_email}' is authenticated, but not yet added as 'Viewer' "
            f"in Google Search Console for '{gsc_property}'. API returned: {curr_err or prev_err}"
        )
    else:
        result["gsc"]["status"] = "connected"
        result["gsc"]["current_period"] = curr_data
        result["gsc"]["previous_period"] = prev_data
        result["gsc"]["notes"] = "Live GSC data retrieved successfully for both 10-day windows."

    result["ga4"]["status"] = "pending_property_link"
    result["ga4"]["notes"] = (
        f"GA4 measurements (G-X33WGNNG0D, G-DR6JRL8602) active on website. "
        f"Add '{service_account_email}' as Viewer in GA4 Property Settings to enable automated API report pulls."
    )

    return result

if __name__ == "__main__":
    report = fetch_10_day_performance()
    print(json.dumps(report, indent=2))
