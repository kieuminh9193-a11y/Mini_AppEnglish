"""
Deploy to Firebase Hosting via REST API using Service Account
"""
import json
import os
import hashlib
import gzip
import time
import urllib.request
import urllib.error
import urllib.parse
import base64
import io

SA_KEY_PATH = r"d:\OneDrive - SHINE GROUP\00.PHAT\900.CaNhan\DuAn\23.MiniGame\04.English_lesson\english-lesson-4-firebase-adminsdk-fbsvc-ca160d644d.json"
DEPLOY_DIR = r"d:\OneDrive - SHINE GROUP\00.PHAT\900.CaNhan\DuAn\23.MiniGame\04.English_lesson"
PROJECT_ID = "english-lesson-4"
SITE_ID = "english-lesson-4" 

def b64url(data):
    if isinstance(data, str):
        data = data.encode()
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode()

def get_access_token(sa_key):
    from cryptography.hazmat.primitives import hashes, serialization
    from cryptography.hazmat.primitives.asymmetric import padding

    now = int(time.time())
    header = b64url(json.dumps({"alg": "RS256", "typ": "JWT"}))
    payload = b64url(json.dumps({
        "iss": sa_key["client_email"],
        "scope": "https://www.googleapis.com/auth/firebase https://www.googleapis.com/auth/cloud-platform",
        "aud": "https://oauth2.googleapis.com/token",
        "iat": now,
        "exp": now + 3600
    }))
    unsigned = (header + "." + payload).encode()
    key = serialization.load_pem_private_key(sa_key["private_key"].encode(), password=None)
    sig = key.sign(unsigned, padding.PKCS1v15(), hashes.SHA256())
    jwt_token = unsigned.decode() + "." + b64url(sig)

    data = urllib.parse.urlencode({
        "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
        "assertion": jwt_token
    }).encode()
    req = urllib.request.Request("https://oauth2.googleapis.com/token", data=data)
    req.add_header("Content-Type", "application/x-www-form-urlencoded")
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read().decode())["access_token"]

def api(method, path, token, data=None, ct="application/json"):
    url = "https://firebasehosting.googleapis.com/v1beta1/" + path
    h = {"Authorization": "Bearer " + token}
    body = None
    if data is not None:
        if ct == "application/json":
            body = json.dumps(data).encode()
        else:
            body = data
        h["Content-Type"] = ct
    req = urllib.request.Request(url, data=body, headers=h, method=method)
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            txt = resp.read().decode()
            return json.loads(txt) if txt.strip() else {}
    except urllib.error.HTTPError as e:
        err = e.read().decode()
        print("  ERROR " + str(e.code) + ": " + err[:300])
        return None

def gz_compress(raw_bytes):
    buf = io.BytesIO()
    with gzip.GzipFile(fileobj=buf, mode='wb', mtime=0) as gz:
        gz.write(raw_bytes)
    return buf.getvalue()

# ──────────────────────────────────────────────
print("=" * 50)
print("Firebase Hosting Deploy - " + SITE_ID)
print("=" * 50)

# 1. Load key
print("\n1. Loading service account key...")
if not os.path.exists(SA_KEY_PATH):
    print(f"FATAL: Service account key not found at {SA_KEY_PATH}")
    exit(1)
    
with open(SA_KEY_PATH, "r") as f:
    sa_key = json.load(f)
print("  " + sa_key["client_email"])

# 2. Auth
print("\n2. Getting access token...")
token = get_access_token(sa_key)
print("  OK (length=" + str(len(token)) + ")")

# 3. Collect files
print("\n3. Collecting files...")
files = {}
for root, dirs, filenames in os.walk(DEPLOY_DIR):
    for fname in filenames:
        # Ignore python scripts, json keys, and some hidden folders
        if fname.endswith(".py") or fname.endswith(".json") or ".netlify" in root:
            continue
        fp = os.path.join(root, fname)
        rp = "/" + os.path.relpath(fp, DEPLOY_DIR).replace("\\", "/")
        with open(fp, "rb") as f:
            raw = f.read()
        compressed = gz_compress(raw)
        sha = hashlib.sha256(compressed).hexdigest()
        files[rp] = {"path": fp, "compressed": compressed, "hash": sha, "size": len(raw)}
        print("  " + rp + " (" + str(len(raw)) + "b -> " + str(len(compressed)) + "b)")
print("  Total: " + str(len(files)))

# 4. Create version
print("\n4. Creating version...")
# Try using SITE_ID first
ver = api("POST", "sites/" + SITE_ID + "/versions", token, {
    "config": {
        "rewrites": [{"glob": "**", "path": "/index.html"}],
        "headers": [
            {"glob": "/", "headers": {"Cache-Control": "no-cache, no-store, must-revalidate"}},
            {"glob": "/index.html", "headers": {"Cache-Control": "no-cache, no-store, must-revalidate"}},
            {"glob": "**/*.html", "headers": {"Cache-Control": "no-cache, no-store, must-revalidate"}},
            {"glob": "**/*.js", "headers": {"Cache-Control": "no-cache, no-store, must-revalidate"}},
            {"glob": "**/*.css", "headers": {"Cache-Control": "no-cache, no-store, must-revalidate"}}
        ]
    }
})

if not ver:
    print("\n  Deploy failed. The site ID '" + SITE_ID + "' might not exist in project '" + PROJECT_ID + "'.")
    print("  To deploy to a separate site, please create the site '" + SITE_ID + "' on your Firebase Console first.")
    exit(1)

vname = ver["name"]
print("  " + vname)

# 5. Populate
print("\n5. Populating files...")
fhashes = {rp: info["hash"] for rp, info in files.items()}
pop = api("POST", vname + ":populateFiles", token, {"files": fhashes})
if not pop:
    print("FAILED!"); exit(1)
upload_url = pop.get("uploadUrl", "")
needed = pop.get("uploadRequiredHashes", [])
print("  Need upload: " + str(len(needed)) + "/" + str(len(files)))

# 6. Upload
print("\n6. Uploading...")
h2info = {}
for rp, info in files.items():
    h2info[info["hash"]] = (rp, info)

ok = 0
fail = 0
for fh in needed:
    if fh in h2info:
        rp, info = h2info[fh]
        fname = os.path.basename(rp)
        up_url = upload_url + "/" + fh
        h = {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/octet-stream",
        }
        req = urllib.request.Request(up_url, data=info["compressed"], headers=h, method="POST")
        try:
            with urllib.request.urlopen(req, timeout=60) as resp:
                resp.read()
            ok += 1
            print("  [" + str(ok) + "] " + fname + " OK")
        except urllib.error.HTTPError as e:
            err = e.read().decode()
            fail += 1
            print("  FAIL " + fname + ": " + err[:100])

print("  Uploaded: " + str(ok) + ", Failed: " + str(fail))

if fail > 0:
    print("Some files failed. Aborting.")
    exit(1)

# 7. Finalize
print("\n7. Finalizing...")
fin = api("PATCH", vname + "?update_mask=status", token, {"status": "FINALIZED"})
if not fin:
    print("FAILED!"); exit(1)
print("  Status: " + fin.get("status", "?"))

# 8. Release
print("\n8. Publishing...")
rel = api("POST", "sites/" + SITE_ID + "/releases?versionName=" + vname, token)
if not rel:
    print("FAILED!"); exit(1)

print("\n" + "=" * 50)
print("DEPLOY THANH CONG!")
print("=" * 50)
print()
print("Game:  https://" + SITE_ID + ".web.app")
print("Alt:   https://" + SITE_ID + ".firebaseapp.com")
print("=" * 50)
