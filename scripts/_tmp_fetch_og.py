import re
import urllib.request

URLS = {
    "ohio": "https://knowyourmeme.com/memes/ohio-final-boss",
    "deepfried": "https://knowyourmeme.com/memes/deep-fried-memes",
    "dictator": "https://knowyourmeme.com/memes/dictator-mbappe",
    "gigachad": "https://knowyourmeme.com/memes/gigachad",
    "philosoraptor": "https://knowyourmeme.com/memes/philosoraptor",
    "boromir": "https://knowyourmeme.com/memes/one-does-not-simply-walk-into-mordor",
}

UA = {"User-Agent": "Mozilla/5.0 (compatible; ICH-media-audit/1.0)"}

for key, url in URLS.items():
    try:
        req = urllib.request.Request(url, headers=UA)
        with urllib.request.urlopen(req, timeout=30) as resp:
            html = resp.read().decode("utf-8", "replace")
        m = re.search(
            r'property=["\']og:image["\'][^>]*content=["\']([^"\']+)["\']',
            html,
            re.I,
        ) or re.search(
            r'content=["\']([^"\']+)["\'][^>]*property=["\']og:image["\']',
            html,
            re.I,
        )
        print(f"{key}\t{m.group(1) if m else 'NO_OG'}")
    except Exception as e:
        print(f"{key}\tERR\t{e}")
