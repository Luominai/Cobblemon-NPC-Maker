import requests
import json

abilities_file = "src/data/showdown/abilities.json"
implemented_pokemon_file = "src/data/pokemon_implemented.json"
output_file = "src/data/abilities.json"

def parse_abilities():
    data = {}

    existing_abilities = []
    # get the name of every ability that currently exists in cobblemon
    with open(implemented_pokemon_file, "r") as read_file: 
        pokemon = json.load(read_file)
        for key, value in pokemon.items():
            abilities = [
                value["abilities"]["primaryAbility"],
                value["abilities"]["secondaryAbility"],
                value["abilities"]["hiddenAbility"]
            ]
            for ability in abilities:
                if not ability == "" and ability not in existing_abilities:
                    existing_abilities.append(ability)


    # read the abilities
    with open(abilities_file, "r") as read_file:
        abilities = json.load(read_file)
        for ability in existing_abilities:
            value = abilities[ability]
            data[ability] = {
                "name": value["name"],
                "description": value["shortDesc"]
            }

        # # copy the name and description of each ability
        # for key, value in abilities.items():
        #     data[key] = {
        #         "name": value["name"],
        #         "description": value["shortDesc"]
        #     }
        

    # dump the data into the output file
    with open(output_file, "w") as write_file:
        json.dump(data, write_file, indent=4, sort_keys=True)

parse_abilities()