import re

with open("barometre-numerique-svg-map-fr-iso3166-2/map-fr-iso3166-2.svg", "r", encoding="utf-8") as f:
    content = f.read()

ids = re.findall(r'id="(FR-[^"]+)"', content)
print("Found IDs in SVG:")
print(", ".join(sorted(ids)))
