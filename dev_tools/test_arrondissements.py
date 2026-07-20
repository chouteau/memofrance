import urllib.request
import json

url = "https://geo.api.gouv.fr/departements/01/arrondissements"

try:
    print("Fetching arrondissements for Ain...")
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as r:
        data = json.loads(r.read().decode())
        print("Success:", data)
except Exception as e:
    print("Error:", e)
