import json

# Function to decode ASCII symbols
def decode_ascii(text):
    try:
        return text.encode('utf-8').decode('latin1')
    except UnicodeDecodeError:
        return text

# Load the JSON file
with open("data.json", "r", encoding="utf-8") as file:
    data = json.load(file)

# Iterate over each item and fix the ASCII symbols
for item in data:
    if 'stop_name' in item:
        item['stop_name'] = decode_ascii(item['stop_name'])

# Save the fixed JSON data back to a file
with open("json1_fixed.json", "w", encoding="utf-8") as file:
    json.dump(data, file, ensure_ascii=False, indent=2)
