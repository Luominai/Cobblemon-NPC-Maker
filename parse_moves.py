import requests
import json

moves_file = "src/data/showdown/moves.json"
moves_text_file = "src/data/showdown/movesText.json"
output_file = "src/data/moves.json"

def fetch_move_data():
    id = 1
    data = {}

    resp = requests.get(f"https://pokeapi.co/api/v2/move/{id}")
    while resp.status_code == 200:
        api_data = json.loads(resp.content)

        name = "".join(char for char in api_data["name"] if char.isalnum())
        data[name] = {
            "power": api_data["power"],
            "category": api_data["damage_class"]["name"],
            "type": api_data["type"]["name"],
            "accuracy": api_data["accuracy"],
            "pp": api_data["pp"]
        }
        print(id)
        id += 1
        resp = requests.get(f"https://pokeapi.co/api/v2/move/{id}")

    with open(moves_file, "w") as write_file:
        json.dump(data, write_file, indent=4)

def parse_moves():
    data = {}

    with open(moves_file, "r") as stats:
        data = json.load(stats)

    with open(moves_text_file, "r") as descriptions:
        descriptions = json.load(descriptions)
        for key, value in descriptions.items():
            if key not in data.keys():
                key = (key + "special" if key + "special" in data.keys() else key + "physical")

            if key in data.keys():
                data[key]["description"] = value["shortDesc"]
                data[key]["name"] = value["name"] 


    with open(output_file, "w") as write_file:
        data = json.dump(data, write_file, indent=4)

# fetch_move_data()
# parse_moves()