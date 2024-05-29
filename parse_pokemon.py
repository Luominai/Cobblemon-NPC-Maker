import json
import os
import requests

cobblemon_species_data_folder = "src/data/cobblemon-species"
accepted_forms = ["Hisui", "Alola", "Galar", "Paldea", "Roaming"]
implemented_pokemon_output_file = "src/data/pokemon_implemented.json"
unimplemented_pokemon_output_file = "src/data/pokemon_unimplemented.json"
ignored_pokemon_output_file = "src/data/pokemon_ignored.json"
species_ids_file = "src/data/showdown/speciesIDs.json"

reduced_json_size = True   # eliminates indents

def parse_pokemon():
    implemented_pokemon = {}
    unimplemented_pokemon = {}
    ignored_pokemon = {}

    for (root, dirs, files) in os.walk(cobblemon_species_data_folder):
        for file in files:
            with open(f"{root}/{file}", "r", encoding="utf8") as read_file:
                # read the file data
                pokemon = json.load(read_file)
                forms = pokemon["forms"] if "forms" in pokemon.keys() else []

                # add the pokemon to the right list
                if "implemented" in pokemon.keys():
                    add_pokemon(pokemon, implemented_pokemon)
                    # add all the forms we want
                    for form in forms: 
                        if form["name"] in accepted_forms:
                            add_pokemon(form, implemented_pokemon, pokemon)
                        else:
                            add_pokemon(form, ignored_pokemon, pokemon)
                else:
                    add_pokemon(pokemon, unimplemented_pokemon)

    add_icons(implemented_pokemon)
    add_icons(unimplemented_pokemon)
    add_icons(ignored_pokemon)

    with open(implemented_pokemon_output_file, "w") as write_file:
        json.dump(implemented_pokemon, write_file) if reduced_json_size else json.dump(implemented_pokemon, write_file, indent=4)

    with open(unimplemented_pokemon_output_file, "w") as write_file:
        json.dump(unimplemented_pokemon, write_file) if reduced_json_size else json.dump(unimplemented_pokemon, write_file, indent=4)

    with open(ignored_pokemon_output_file, "w") as write_file:
        json.dump(ignored_pokemon, write_file) if reduced_json_size else json.dump(ignored_pokemon, write_file, indent=4)


def add_pokemon(pokemon, dict, base_form=None):
    if base_form != None:
        name = base_form["name"] + " " + pokemon["name"]
        national_pokedex_number = base_form["nationalPokedexNumber"]
        primary_type = pokemon["primaryType"] if "primaryType" in pokemon.keys() else base_form["primaryType"]
        secondary_type = pokemon["secondaryType"] if "secondaryType" in pokemon.keys() else (pokemon["secondaryType"] if "secondaryType" in pokemon else "")
        abilities = pokemon["abilities"] if "abilities" in pokemon.keys() else base_form["abilities"]
        base_stats = pokemon["baseStats"] if "baseStats" in pokemon.keys() else base_form["baseStats"]
    else:
        name = pokemon["name"]
        national_pokedex_number = pokemon["nationalPokedexNumber"]
        primary_type = pokemon["primaryType"]
        secondary_type = pokemon["secondaryType"] if "secondaryType" in pokemon.keys() else ""
        abilities = pokemon["abilities"]
        base_stats = pokemon["baseStats"]

    data = {
        "name" : name,
        "minisprite" : "",
        "nationalPokedexNumber": national_pokedex_number,
        "typing" : {
            "primaryType": primary_type,
            "secondaryType": secondary_type,
        },
        "abilities": {
            "primaryAbility": abilities[0],
            "secondaryAbility": abilities[1] if len(abilities) > 1 and abilities[1][:2] != "h" else "",
            "hiddenAbility": abilities[-1][2:] if abilities[-1][:2] == "h:" else "",
        },  
        "baseStats": base_stats,
        "moves": add_moves(pokemon) if "moves" in pokemon.keys() else ""
    }

    dict[name] = data

def add_moves(pokemon):
    levelup, tm, tutor, egg = [], [], [], []
    # loop over each move to grab the data we want
    for move in (pokemon["moves"]):
        # if the move is learned by tm
        if move[:2] == "tm":
            tm.append(move[move.index(":")+1:])
        # if the move is learned by tutor
        elif move[:5] == "tutor":
            tutor.append(move[move.index(":")+1:])
        # if the move is learned by egg
        elif move[:3] == "egg":
            egg.append(move[move.index(":")+1:])
        # if the move is learned by levelup
        elif (move[:move.index(":")]).isdigit():
            levelup.append({
                "name": move[move.index((":"))+1:],
                "level": move[:move.index(":")]
            })
    
    return {
        "levelup": levelup,
        "tm": tm,
        "tutor": tutor,
        "egg": egg
    }

def add_icons(dict):
    with open(species_ids_file, "r", encoding="utf8") as read_file:
        species_ids = json.load(read_file)
        for key, value in species_ids.items():
            name = value["base"] + " " + value["forme"] if len(value["forme"]) > 0 else value["base"]
            id = value["sid"]
            if name in dict.keys():
                print(name)
                img_link = f"https://raw.githubusercontent.com/smogon/sprites/master/src/minisprites/pokemon/gen6/{id}.png"
                if requests.get(img_link).status_code == 404:
                    dict[name]["minisprite"] = f"https://raw.githubusercontent.com/smogon/sprites/master/src/minisprites/pokemon/gen6/{id}-vsmogon.png"
                else:
                    dict[name]["minisprite"] = img_link
                        
# parse_pokemon()


                    
                    
                        

