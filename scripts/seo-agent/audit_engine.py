#!/usr/bin/env python3
"""
Safar Sathi AI SEO Growth Agent - Complete Site Audit Engine
Audits technical SEO, mobile metadata, indexing, schema, internal links,
image alt tags, and identifies structural content gaps.
"""

import os
import re
import json
import glob
from urllib.parse import urlparse

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../.."))
PUBLIC_DIR = os.path.join(BASE_DIR, "public")
INDEX_HTML = os.path.join(BASE_DIR, "index.html")
SITEMAP_PATH = os.path.join(PUBLIC_DIR, "sitemap.xml")
ROBOTS_PATH = os.path.join(PUBLIC_DIR, "robots.txt")
LLMS_PATH = os.path.join(PUBLIC_DIR, "llms.txt")

def audit_html_file(file_path, route_url):
    """Parses and checks an HTML file for SEO best practices."""
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    issues = []
    strengths = []

    # 1. Title Tag
    title_match = re.search(r"<title>(.*?)</title>", content, re.IGNORECASE | re.DOTALL)
    title = title_match.group(1).strip() if title_match else None
    if not title:
        issues.append({"severity": "CRITICAL", "type": "Missing Title", "detail": "Page lacks a <title> tag."})
    else:
        title_len = len(title)
        if title_len < 30:
            issues.append({"severity": "WARNING", "type": "Short Title", "detail": f"Title is only {title_len} chars: '{title}'"})
        elif title_len > 65:
            issues.append({"severity": "WARNING", "type": "Long Title", "detail": f"Title is {title_len} chars (may truncate in SERP): '{title}'"})
        else:
            strengths.append(f"Title is optimal ({title_len} chars): '{title}'")

    # 2. Meta Description
    desc_match = re.search(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']', content, re.IGNORECASE | re.DOTALL)
    description = desc_match.group(1).strip() if desc_match else None
    if not description:
        issues.append({"severity": "HIGH", "type": "Missing Meta Description", "detail": "Page lacks a meta description."})
    else:
        desc_len = len(description)
        if desc_len < 70:
            issues.append({"severity": "WARNING", "type": "Short Description", "detail": f"Description is only {desc_len} chars."})
        elif desc_len > 165:
            issues.append({"severity": "WARNING", "type": "Long Description", "detail": f"Description is {desc_len} chars."})
        else:
            strengths.append(f"Meta description is well-calibrated ({desc_len} chars).")

    # 3. Canonical Tag
    canon_match = re.search(r'<link\s+rel=["\']canonical["\']\s+href=["\'](.*?)["\']', content, re.IGNORECASE)
    canonical = canon_match.group(1).strip() if canon_match else None
    if not canonical:
        issues.append({"severity": "HIGH", "type": "Missing Canonical", "detail": "Page lacks a canonical link tag."})
    elif canonical != route_url:
        issues.append({"severity": "MEDIUM", "type": "Canonical Mismatch", "detail": f"Canonical '{canonical}' does not match route '{route_url}'."})
    else:
        strengths.append(f"Canonical URL matches route: '{canonical}'")

    is_utility_page = any(u in route_url for u in ["/privacy", "/404"])

    # 4. Robots Tag
    robots_match = re.search(r'<meta\s+name=["\']robots["\']\s+content=["\'](.*?)["\']', content, re.IGNORECASE)
    robots = robots_match.group(1).strip() if robots_match else None
    if not robots:
        if not is_utility_page:
            issues.append({"severity": "MEDIUM", "type": "Missing Robots Meta", "detail": "No explicit meta robots tag found."})
    elif "noindex" in robots.lower():
        if is_utility_page:
            strengths.append(f"Meta robots intentionally set to '{robots}' for legal/utility page.")
        else:
            issues.append({"severity": "CRITICAL", "type": "Noindex Present", "detail": f"Page contains noindex directive: '{robots}'."})
    else:
        strengths.append(f"Meta robots set to '{robots}'.")

    # 5. Headings Hierarchy
    h1s = re.findall(r"<h1[^>]*>(.*?)</h1>", content, re.IGNORECASE | re.DOTALL)
    h2s = re.findall(r"<h2[^>]*>(.*?)</h2>", content, re.IGNORECASE | re.DOTALL)
    h3s = re.findall(r"<h3[^>]*>(.*?)</h3>", content, re.IGNORECASE | re.DOTALL)

    clean_h1s = [re.sub(r"<[^>]+>", "", h).strip() for h in h1s]
    clean_h2s = [re.sub(r"<[^>]+>", "", h).strip() for h in h2s]

    if len(clean_h1s) == 0:
        if file_path == INDEX_HTML:
            issues.append({"severity": "HIGH", "type": "Client-Rendered H1", "detail": "Home page H1 is rendered by React client-side rather than in static HTML root."})
        else:
            issues.append({"severity": "HIGH", "type": "Missing H1", "detail": "Page has no <h1> heading tag."})
    elif len(clean_h1s) > 1:
        issues.append({"severity": "MEDIUM", "type": "Multiple H1s", "detail": f"Page has {len(clean_h1s)} H1 headings: {clean_h1s}."})
    else:
        strengths.append(f"Single H1 heading: '{clean_h1s[0]}'")

    # 6. Schema Markup (JSON-LD)
    schemas = re.findall(r'<script\s+type=["\']application/ld\+json["\']>(.*?)</script>', content, re.IGNORECASE | re.DOTALL)
    parsed_schemas = []
    for s in schemas:
        try:
            parsed_schemas.append(json.loads(s.strip()))
        except Exception as e:
            issues.append({"severity": "HIGH", "type": "Broken JSON-LD", "detail": f"JSON-LD syntax error: {str(e)}"})

    schema_types = []
    for ps in parsed_schemas:
        if isinstance(ps, dict):
            st = ps.get("@type")
            if st: schema_types.append(st)
            if "@graph" in ps:
                for item in ps["@graph"]:
                    if isinstance(item, dict) and "@type" in item:
                        schema_types.append(item["@type"])

    if len(parsed_schemas) == 0:
        if not is_utility_page:
            issues.append({"severity": "HIGH", "type": "No Structured Data", "detail": "Page does not implement any Schema.org JSON-LD markup."})
    else:
        strengths.append(f"Schema types present: {', '.join(schema_types)}")

    # 7. Images and Alt Attributes
    img_tags = re.findall(r"<img\s+[^>]*>", content, re.IGNORECASE)
    missing_alt = 0
    total_imgs = len(img_tags)
    for img in img_tags:
        alt_match = re.search(r'alt=["\'](.*?)["\']', img, re.IGNORECASE)
        if not alt_match or not alt_match.group(1).strip():
            missing_alt += 1

    if missing_alt > 0:
        issues.append({"severity": "MEDIUM", "type": "Missing Alt Text", "detail": f"{missing_alt} of {total_imgs} images are missing descriptive alt text."})
    elif total_imgs > 0:
        strengths.append(f"All {total_imgs} images have alt attributes.")

    # 8. Internal Links
    links = re.findall(r'<a\s+[^>]*href=["\'](.*?)["\']', content, re.IGNORECASE)
    internal_links = [l for l in links if l.startswith("/") or "safarsathi.in" in l]

    return {
        "file": os.path.relpath(file_path, BASE_DIR),
        "url": route_url,
        "title": title,
        "description": description,
        "canonical": canonical,
        "h1": clean_h1s,
        "h2_count": len(clean_h2s),
        "h2_samples": clean_h2s[:5],
        "schema_types": schema_types,
        "images_count": total_imgs,
        "images_missing_alt": missing_alt,
        "internal_links_count": len(internal_links),
        "issues": issues,
        "strengths": strengths,
    }

def run_site_audit():
    """Runs a complete site audit across all pages and technical configurations."""
    # Discover routes from sitemap.xml and local files dynamically
    routes_to_audit = [
        {"path": INDEX_HTML, "url": "https://safarsathi.in/"},
    ]

    # Read sitemap to get registered URLs
    sitemap_status = {"exists": os.path.exists(SITEMAP_PATH), "urls": []}
    if sitemap_status["exists"]:
        with open(SITEMAP_PATH, "r", encoding="utf-8") as f:
            s_content = f.read()
        sitemap_status["urls"] = re.findall(r"<loc>(.*?)</loc>", s_content)

    # Map sitemap URLs to file paths
    for u in sitemap_status["urls"]:
        if u.strip() == "https://safarsathi.in/":
            continue
        parsed = urlparse(u)
        rel_path = parsed.path.strip("/")
        if rel_path:
            target_file = os.path.join(PUBLIC_DIR, rel_path, "index.html")
            if os.path.exists(target_file):
                routes_to_audit.append({"path": target_file, "url": u})

    # Also include any remaining public index.html files not yet in list
    for idx_file in glob.glob(os.path.join(PUBLIC_DIR, "**/index.html"), recursive=True):
        rel = os.path.relpath(os.path.dirname(idx_file), PUBLIC_DIR)
        url = f"https://safarsathi.in/{rel}/"
        if not any(r["path"] == idx_file for r in routes_to_audit):
            routes_to_audit.append({"path": idx_file, "url": url})

    page_audits = []
    all_issues = []

    for r in routes_to_audit:
        if os.path.exists(r["path"]):
            pa = audit_html_file(r["path"], r["url"])
            page_audits.append(pa)
            for iss in pa["issues"]:
                all_issues.append({"page": r["url"], **iss})

    # Robots check
    robots_status = {"exists": os.path.exists(ROBOTS_PATH), "has_sitemap": False, "ai_bots_allowed": False}
    if robots_status["exists"]:
        with open(ROBOTS_PATH, "r", encoding="utf-8") as f:
            r_content = f.read()
        robots_status["has_sitemap"] = "sitemap:" in r_content.lower()
        robots_status["ai_bots_allowed"] = "perplexitybot" in r_content.lower() and "chatgpt-user" in r_content.lower()

    # Content gaps analysis
    destination_gaps = []
    sitemap_set = set(sitemap_status["urls"])

    # Check Ladakh
    if "https://safarsathi.in/ladakh-tour-packages/" not in sitemap_set:
        destination_gaps.append({
            "topic": "Ladakh / Leh Ladakh Tour Packages",
            "search_intent": "Commercial High-Ticket Travel",
            "opportunity": "High commercial intent (₹25,000–₹45,000 package). Top searched in summer/autumn.",
            "recommended_url": "/ladakh-tour-packages/",
            "target_keywords": ["Leh Ladakh tour packages", "Ladakh bike trip package", "Leh Ladakh 6 days itinerary", "Nubra Pangong tour plan"]
        })

    # Check Honeymoon
    if "https://safarsathi.in/shimla-manali-honeymoon-package/" not in sitemap_set:
        destination_gaps.append({
            "topic": "Shimla Manali Honeymoon Package",
            "search_intent": "Commercial Honeymoon Travel",
            "opportunity": "Very high search volume in North India (candlelight dinner, flower decoration, private cab).",
            "recommended_url": "/shimla-manali-honeymoon-package/",
            "target_keywords": ["Shimla Manali honeymoon package", "Himachal honeymoon package for couple", "Shimla Manali romantic tour"]
        })

    # Check Himachal Taxi Service
    if "https://safarsathi.in/himachal-taxi-service/" not in sitemap_set:
        destination_gaps.append({
            "topic": "Himachal Taxi Service & Private Cabs",
            "search_intent": "High-Intent Transport Booking",
            "opportunity": "Safar Sathi has a fleet of Dzire, Ertiga, Innova Crysta, Tempo Traveller. Huge local search demand.",
            "recommended_url": "/himachal-taxi-service/",
            "target_keywords": ["Himachal taxi service", "Chandigarh to Manali taxi", "Delhi to Shimla taxi cab", "Innova Crysta hire Himachal"]
        })

    # Summarize severity
    severity_counts = {"CRITICAL": 0, "HIGH": 0, "MEDIUM": 0, "WARNING": 0}
    for iss in all_issues:
        sev = iss.get("severity", "MEDIUM")
        severity_counts[sev] = severity_counts.get(sev, 0) + 1

    return {
        "status": "success",
        "total_pages_audited": len(page_audits),
        "severity_counts": severity_counts,
        "sitemap_status": sitemap_status,
        "robots_status": robots_status,
        "pages": page_audits,
        "all_issues": all_issues,
        "content_gaps": destination_gaps,
    }

if __name__ == "__main__":
    report = run_site_audit()
    print(json.dumps(report, indent=2))
