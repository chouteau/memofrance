import json
import urllib.request
import urllib.parse
import time

def fetch_commune_name(insee_code):
    if not insee_code:
        return None
    url = f"https://geo.api.gouv.fr/communes/{insee_code}?fields=nom"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as r:
            data = json.loads(r.read().decode('utf-8'))
            return data.get("nom")
    except Exception as e:
        print(f"Error fetching commune {insee_code}: {e}")
        return None

def main():
    # 1. Load departments raw data
    with open("departments_raw_chef.json", "r", encoding="utf-8") as f:
        depts_raw = json.load(f)
        
    print(f"Loaded {len(depts_raw)} departments.")
    
    # 2. Resolve prefecture names (chefLieu)
    print("Resolving prefecture names from geo.api.gouv.fr...")
    resolved_prefectures = {}
    for idx, dept in enumerate(depts_raw):
        code = dept["code"]
        chef_insee = dept.get("chefLieu")
        
        pref_name = None
        if chef_insee:
            pref_name = fetch_commune_name(chef_insee)
            # Add a tiny delay to be polite to the API
            time.sleep(0.05)
            
        resolved_prefectures[code] = pref_name
        print(f"[{idx+1}/{len(depts_raw)}] Dept {code} -> Prefecture: {pref_name}")

    # 3. Load arrondissements from scraped Wikipedia tables
    with open("tables_raw.json", "r", encoding="utf-8") as f:
        tables = json.load(f)
        
    # The first table is the largest wikitable we scraped
    largest_table = max(tables, key=len, default=[])
    print(f"Using arrondissements table with {len(largest_table)} rows.")
    
    # Map department code to all its arrondissement chief-lieux
    # Columns in Wikipedia: ['Dép.', 'CodeInsee', 'Arrondissement', 'Chef-lieu', ...]
    dept_arr_chiefs = {}
    for row in largest_table[1:]: # Skip header
        if len(row) >= 4:
            dept_code = row[0].strip()
            chief_lieu = row[3].strip()
            
            # Pad single-digit department codes with a leading zero if necessary
            if len(dept_code) == 1 and dept_code.isdigit():
                dept_code = "0" + dept_code
                
            if dept_code not in dept_arr_chiefs:
                dept_arr_chiefs[dept_code] = []
            if chief_lieu not in dept_arr_chiefs[dept_code]:
                dept_arr_chiefs[dept_code].append(chief_lieu)

    # 4. Combine everything into final department objects
    final_departments = []
    
    # Specific DOM-TOM or special collectivités that might not be in the standard list
    # Let's verify all departments in departments_raw_chef.json
    for dept in depts_raw:
        code = dept["code"]
        name = dept["nom"]
        region = dept["region"]["nom"]
        
        prefecture = resolved_prefectures.get(code)
        
        # Get all chief-lieux of arrondissements in this department
        all_chiefs = dept_arr_chiefs.get(code, [])
        
        # Subprefectures are the chief-lieux that are NOT the prefecture
        sub_prefectures = [c for c in all_chiefs if c.lower() != (prefecture or "").lower()]
        
        # Fallbacks/Manual additions for DOM/TOM and special departments
        if code == "75": # Paris
            prefecture = "Paris"
            sub_prefectures = []
        elif code == "976": # Mayotte
            prefecture = "Mamoudzou"
            sub_prefectures = []
        elif code == "973" and not prefecture:
            prefecture = "Cayenne"
        elif code == "974" and not prefecture:
            prefecture = "Saint-Denis"
            
        final_departments.append({
            "code": code,
            "name": name,
            "prefecture": prefecture or "Inconnue",
            "subprefectures": sub_prefectures,
            "region": region
        })

    # Save to a Javascript file we can load directly
    js_content = f"const DEPARTMENTS_DATA = {json.dumps(final_departments, ensure_ascii=False, indent=2)};"
    with open("departments.js", "w", encoding="utf-8") as f:
        f.write(js_content)
        
    print(f"Saved {len(final_departments)} departments to departments.js")

if __name__ == "__main__":
    main()
