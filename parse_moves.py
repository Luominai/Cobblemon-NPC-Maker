import requests
import json

moves_file = "src/data/showdown/moves.json"
moves_text_file = "src/data/showdown/movesText.json"
output_file = "src/data/moves.json"
implemented_pokemon_file = "src/data/pokemon_implemented.json"
memoized_output_file = "src/data/moves_memoized.json"

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
        json.dump(data, write_file, indent=4)

def memoize_moves():
    data = {}

    # loop through the pokemon file, make a list of every move learned
    with open(implemented_pokemon_file) as read_file:
        pokemon_data = json.load(read_file)
        for key, pokemon in pokemon_data.items():
            # for every move, add it to data as key if not exists
            # then update the value to be an array containing a list of pokemon names that learn the move

            for levelup_move in pokemon["moves"]["levelup"]:
                if (levelup_move["name"] not in data.keys()):
                    data[levelup_move["name"]] = []

                data[levelup_move["name"]].append(key)

            for tm_move in pokemon["moves"]["tm"]:
                if (tm_move not in data.keys()):
                    data[tm_move] = []

                data[tm_move].append(key)

            for tutor_move in pokemon["moves"]["tutor"]:
                if (tutor_move not in data.keys()):
                    data[tutor_move] = []

                data[tutor_move].append(key)

            for egg_move in pokemon["moves"]["egg"]:
                if (egg_move not in data.keys()):
                    data[egg_move] = []     

                data[egg_move].append(key)


    with open(memoized_output_file, "w") as write_file:
        json.dump(data, write_file, indent=4, sort_keys=True)

    # the final result should be a dictionary with move names as the key, and a list of pokemon that learn the move as value


# fetch_move_data()
# parse_moves()
memoize_moves()