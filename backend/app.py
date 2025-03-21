from flask import Flask, request, jsonify
import os
import time
import re
import requests
import pandas as pd
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
GOOGLE_SAFE_BROWSING_API_KEY = os.getenv("GOOGLE_SAFE_BROWSING_API_KEY")

if not GOOGLE_SAFE_BROWSING_API_KEY:
    raise ValueError("❌ Missing Google Safe Browsing API key. Set it in the .env file.")

SAFE_BROWSING_URL = f"https://safebrowsing.googleapis.com/v4/threatMatches:find?key={GOOGLE_SAFE_BROWSING_API_KEY}"

# Dataset Path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATASETS_DIR = os.path.join(BASE_DIR, "datasets", "csv")

def find_csv_file(directory):
    """Finds the first CSV file in the directory."""
    if os.path.exists(directory):
        csv_files = [f for f in os.listdir(directory) if f.endswith(".csv")]
        if csv_files:
            return os.path.join(directory, csv_files[0])  # Load first CSV file found
    return None

CSV_PATH = find_csv_file(DATASETS_DIR)

df = None
if CSV_PATH:
    try:
        df = pd.read_csv(CSV_PATH)
        print(f"✅ Dataset '{os.path.basename(CSV_PATH)}' loaded successfully!")
    except Exception as e:
        print(f"⚠️ Error loading dataset: {e}")
else:
    print(f"⚠️ No CSV file found in {DATASETS_DIR}. Check your dataset folder.")

app = Flask(__name__)
CORS(app, resources={r"/detect": {"origins": "*"}})

# Phishing detection regex patterns
phishing_patterns = [
    r"https?://[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+",  # IP-based URLs
    r"https?://.*@.*",  # '@' in URL
    r"https?://.*\.(zip|exe|apk|scr|iso|rar|7z|dmg)",  # Suspicious extensions
    r"https?://.*(free|secure|banking|login|verify|update|password|signin|account|confirm|webscr)",  # Phishing keywords
    r"https?://(bit\.ly|tinyurl\.com|t\.co|is\.gd|goo\.gl|shorte\.st|adf\.ly|ow\.ly|buff\.ly|cutt\.ly).*",  # Shortened URLs
    r"https?://.*-secure.*",  # Hyphenated subdomain trick
    r"https?://.*\.(xyz|top|tk|ml|ga|cf|gq)",  # Suspicious TLDs
]

def is_valid_url(url):
    """Check if the input is a valid URL."""
    return re.match(r"https?://[^\s/$.?#].[^\s]*", url) is not None

def is_phishing_by_regex(url):
    """Check URL against regex patterns."""
    return any(re.search(pattern, url, re.IGNORECASE) for pattern in phishing_patterns)

def is_phishing_by_google(url):
    """Check URL using Google Safe Browsing API."""
    payload = {
        "client": {"clientId": "phishing-detector", "clientVersion": "1.0"},
        "threatInfo": {
            "threatTypes": ["MALWARE", "SOCIAL_ENGINEERING"],
            "platformTypes": ["ANY_PLATFORM"],
            "threatEntryTypes": ["URL"],
            "threatEntries": [{"url": url}]
        }
    }

    for attempt in range(3):  # Retry up to 3 times
        try:
            response = requests.post(SAFE_BROWSING_URL, json=payload, timeout=10)
            response.raise_for_status()
            response_json = response.json()

            print(f"🔍 Google API Response: {response_json}")  # Debugging output

            if response_json.get("matches"):
                return True  # URL flagged as phishing
            return False  # URL safe

        except requests.exceptions.RequestException as e:
            print(f"⚠️ Error contacting Google API (Attempt {attempt + 1}/3): {e}")
            time.sleep(2)

    return False  # Assume safe if API fails

def is_phishing_by_dataset(url):
    """Check URL against the phishing dataset."""
    if df is not None and "url" in df.columns:
        return url in df["url"].values
    return False

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "✅ Phishing Detection API is running!"})

@app.route("/detect", methods=["POST"])
def detect():
    data = request.json
    url = data.get("url", "").strip()

    if not url:
        return jsonify({"error": "❌ URL is required"}), 400

    if not is_valid_url(url):
        return jsonify({"error": "❌ Invalid URL format"}), 400

    # Step 1: Google Safe Browsing API
    if is_phishing_by_google(url):
        return jsonify({"url": url, "is_phishing": True, "source": "Google Safe Browsing"})
    
    # Step 2: Check against dataset
    if is_phishing_by_dataset(url):
        return jsonify({"url": url, "is_phishing": True, "source": "Dataset"})
    
    # Step 3: Regex-based detection
    if is_phishing_by_regex(url):
        return jsonify({"url": url, "is_phishing": True, "source": "Regex"})
    
    return jsonify({"url": url, "is_phishing": False, "source": "None"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
 