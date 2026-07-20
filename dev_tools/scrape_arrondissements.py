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
        self.tables = []
        self.current_table = []
        self.current_row = []
        self.current_cell = ""

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        if tag == "table":
            if "class" in attrs_dict and "wikitable" in attrs_dict["class"]:
                self.in_table = True
                self.current_table = []
        elif self.in_table and tag == "tr":
            self.in_row = True
            self.current_row = []
        elif self.in_row and tag in ["td", "th"]:
            self.in_cell = True
            self.current_cell = ""

    def handle_endtag(self, tag):
        if tag == "table" and self.in_table:
            self.in_table = False
            self.tables.append(self.current_table)
        elif tag == "tr" and self.in_row:
            self.in_row = False
            self.current_table.append(self.current_row)
        elif tag in ["td", "th"] and self.in_cell:
            self.in_cell = False
            text = re.sub(r'\s+', ' ', self.current_cell).strip()
            text = re.sub(r'\[\d+\]', '', text)
            self.current_row.append(text)

    def handle_data(self, data):
        if self.in_cell:
            self.current_cell += data

def get_arrondissements():
    url = "https://fr.wikipedia.org/wiki/Liste_des_arrondissements_de_France"
    print("Scraping arrondissements page...")
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as r:
            html = r.read().decode('utf-8')
            parser = WikiTableParser()
            parser.feed(html)
            print(f"Parsed {len(parser.tables)} tables.")
            
            # Save the tables for inspection
            with open("tables_raw.json", "w", encoding="utf-8") as f:
                json.dump(parser.tables, f, ensure_ascii=False, indent=2)
            
            # The page typically has one main wikitable listing all arrondissements
            # Let's find the largest table
            largest_table = max(parser.tables, key=len, default=[])
            print(f"Largest table has {len(largest_table)} rows.")
            if largest_table:
                print("Header row:", largest_table[0])
                print("Example row:", largest_table[1] if len(largest_table) > 1 else "None")
    except Exception as e:
        print("Error:", e)

if __name__ == "__main__":
    get_arrondissements()
