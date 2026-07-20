import os

def build():
    template_path = "index_template.html"
    svg_path = "barometre-numerique-svg-map-fr-iso3166-2/map-fr-iso3166-2.svg"
    output_path = "../index.html"
    
    if not os.path.exists(template_path):
        print(f"Error: {template_path} not found.")
        return
        
    if not os.path.exists(svg_path):
        print(f"Error: {svg_path} not found.")
        return

    print("Reading HTML template...")
    with open(template_path, "r", encoding="utf-8") as f:
        template = f.read()

    print("Reading SVG map...")
    with open(svg_path, "r", encoding="utf-8") as f:
        svg_content = f.read()

    # Inject the class "france-map" into the SVG tag
    # e.g., replace <svg xmlns="http://www.w3.org/2000/svg"
    # with <svg class="france-map" xmlns="http://www.w3.org/2000/svg"
    print("Modifying SVG tag with france-map class...")
    svg_content = svg_content.replace(
        '<svg xmlns="http://www.w3.org/2000/svg"',
        '<svg class="france-map" xmlns="http://www.w3.org/2000/svg"'
    )

    # Replace placeholder in template
    print("Merging SVG into template...")
    output_content = template.replace("{{MAP_SVG}}", svg_content)

    print(f"Writing output to {output_path}...")
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(output_content)

    print("Build complete! index.html generated successfully.")

if __name__ == "__main__":
    build()
