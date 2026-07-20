import urllib.request
import json

url = "https://geo.api.gouv.fr/departements?fields=nom,code,region,chefLieu"

try:
    print("Fetching departments with chefLieu...")
    req = urllib.request.Request(
        url, 
        headers={'User-Agent': 'Mozilla/5.0'}
    )
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        print(f"Successfully fetched {len(data)} departments.")
        print("Example item:", data[0])
        
        with open("departments_raw_chef.json", "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
except Exception as e:
    print("Error:", e)
