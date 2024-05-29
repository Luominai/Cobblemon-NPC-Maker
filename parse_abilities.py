import requests
import json

abilities_file = "src/data/showdown/abilities.json"
output_file = "src/data/abilities.json"

def parse_abilities():
    data = {}

    # read the abilities
    with open(abilities_file, "r") as read_file:
        abilities = json.load(read_file)
        # copy the name and description of each ability
        for key, value in abilities.items():
            data[key] = {
                "name": value["name"],
                "description": value["shortDesc"]
            }
    # dump the data into the output file
    with open(abilities_file, "w") as write_file:
        json.dump(data, write_file, indent=4)

# parse_abilities()