import urllib.request
import json
import re
from html.parser import HTMLParser

class WikiTableParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_table = False
        self.in_row = False
        self.in_cell = False
        self.table_count = 0
        self.rows = []
        self.current_row = []
        self.current_cell = ""
        self.cell_tag = ""

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        if tag == "table":
            # We want tables with class "wikitable"
            if "class" in attrs_dict and "wikitable" in attrs_dict["class"]:
                self.in_table = True
                self.table_count += 1
        elif self.in_table and tag == "tr":
            self.in_row = True
            self.current_row = []
        elif self.in_row and tag in ["td", "th"]:
            self.in_cell = True
            self.cell_tag = tag
            self.current_cell = ""

    def handle_endtag(self, tag):
        if tag == "table":
            self.in_table = False
        elif tag == "tr" and self.in_row:
            self.in_row = False
            if self.in_table:
                self.rows.append(self.current_row)
        elif tag in ["td", "th"] and self.in_cell:
            self.in_cell = False
            # Clean up content
            text = re.sub(r'\s+', ' ', self.current_cell).strip()
            # Remove wikipedia footnote brackets
            text = re.sub(r'\[\d+\]', '', text)
            self.current_row.append(text)

    def handle_data(self, data):
        if self.in_cell:
            self.current_cell += data

def get_subprefectures():
    url = "https://fr.wikipedia.org/wiki/Liste_des_sous-pr%C3%A9fectures_de_France"
    print("Scraping Wikipedia page for sub-prefectures...")
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as r:
            html = r.read().decode('utf-8')
            parser = WikiTableParser()
            parser.feed(html)
            
            # Find the rows from the wikitable
            # Let's inspect rows
            sub_prefectures = []
            for row in parser.rows:
                # The table columns are:
                # 0: Ville (Sub-prefecture)
                # 1: Département
                # 2: Arrondissement
                # ... etc.
                # Let's look for rows with at least 2 or 3 columns and where columns contain names
                if len(row) >= 3:
                    ville = row[0]
                    dept = row[1]
                    # Skip header rows
                    if "Ville" in ville or "Sous-préfecture" in ville or "Département" in dept:
                        continue
                    sub_prefectures.append({
                        "ville": ville,
                        "departement": dept
                    })
            print(f"Scraped {len(sub_prefectures)} sub-prefectures.")
            return sub_prefectures
    except Exception as e:
        print("Scraping error:", e)
        return []

if __name__ == "__main__":
    subs = get_subprefectures()
    if subs:
        print("Example:", subs[0])
        with open("subprefectures_wiki.json", "w", encoding="utf-8") as f:
            json.dump(subs, f, ensure_ascii=False, indent=2)
