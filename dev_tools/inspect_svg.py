with open("barometre-numerique-svg-map-fr-iso3166-2/map-fr-iso3166-2.svg", "r", encoding="utf-8") as f:
    lines = f.readlines()

print(f"Total lines: {len(lines)}")
# Find lines with "2A" or "2B" or "Corse" or "20"
for idx, line in enumerate(lines):
    if "2A" in line or "2B" in line or "Corse" in line or "20" in line or "Ajaccio" in line or "Bastia" in line:
        print(f"Line {idx+1}: {line[:120]}...")
