import json
import os
import requests
import string

cobblemon_species_data_folder = "src/data/cobblemon-species"
cobblemon_spawns_data_folder = "src/data/cobblemon-spawns"
accepted_forms = ["Hisui", "Alola", "Galar", "Paldea", "Roaming"]
forms_map = {
    "hisuian" : "Hisui",
    "alolan" : "Alola",
    "galarian" : "Galar",
    "paldean" : "Paldea"
}
special_cases = ["Gholdengo", "Gimmighoul", "Porygon", "Porygon2", "Porygon-Z", "Arctovish", "Arctozolt", "Dracovish", "Dracozolt"]
implemented_pokemon_output_file = "src/data/pokemon_implemented.json"
unimplemented_pokemon_output_file = "src/data/pokemon_unimplemented.json"
ignored_pokemon_output_file = "src/data/pokemon_ignored.json"
species_ids_file = "src/data/showdown/speciesIDs.json"

reduced_json_size = False   # eliminates indents

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

    # add_icons(implemented_pokemon)
    # add_icons(unimplemented_pokemon)
    # add_icons(ignored_pokemon)

    add_presets(implemented_pokemon, unimplemented_pokemon, ignored_pokemon)
    remove_unimplemented_forms(implemented_pokemon, unimplemented_pokemon)
    add_icons(implemented_pokemon)

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
            "secondaryAbility": abilities[1] if len(abilities) > 1 and abilities[1][:2] != "h:" else "",
            "hiddenAbility": abilities[-1][2:] if abilities[-1][:2] == "h:" else "",
        },  
        "baseStats": base_stats,
        "presets": [],
        "moves": add_moves(pokemon) if "moves" in pokemon.keys() else ""
    }

    search_name = "".join(char.lower() for char in name if char.isalnum())
    dict[search_name] = data

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
                "level": int(move[:move.index(":")])
            })
    
    return {
        "levelup": levelup,
        "tm": tm,
        "tutor": tutor,
        "egg": egg
    }

def add_icons(dict):
    keys = dict.keys()
    with open(species_ids_file, "r", encoding="utf8") as read_file:
        species_ids = json.load(read_file)
        for key, value in species_ids.items():
            # put the name to lowercase and remove non-alphanumeric
            name = value["base"].lower() + value["forme"].lower() if len(value["forme"]) > 0 else value["base"].lower()
            name = "".join(char for char in name if char.isalnum())
            id = value["sid"]
            if name in keys:
                print(name)
                img_link = f"https://raw.githubusercontent.com/smogon/sprites/master/src/minisprites/pokemon/gen6/{id}.png"
                if requests.get(img_link).status_code == 404:
                    dict[name]["minisprite"] = f"https://raw.githubusercontent.com/smogon/sprites/master/src/minisprites/pokemon/gen6/{id}-vsmogon.png"
                else:
                    dict[name]["minisprite"] = img_link
    # print("===================icons done===================")
                        
def add_presets(implemented, unimplemented, ignored):
    keys_implemented = implemented.keys()
    keys_unimplemented = unimplemented.keys()
    keys_ignored = ignored.keys()
    keys_forms = forms_map.keys()

    for root, dirs, files in os.walk(cobblemon_spawns_data_folder):
        for file in files:
            with open(f"{root}/{file}", "r", encoding="utf8") as read_file:
                spawn_data = json.load(read_file) 
                for spawn in spawn_data["spawns"]:
                    pokemon_name = spawn["pokemon"]
                    if "presets" not in spawn.keys():
                        print("skipped " + id)
                        continue
                    presets = spawn["presets"]
                    id = spawn["id"]
                    
                    # process the pokemon name to make it match the keys
                    pokemon_name = pokemon_name.split(" ")
                    processed_parts = []
                    for part in pokemon_name:
                        if "=" in part:
                            if any(form.lower() in part for form in accepted_forms):
                                removed_part = part[:part.index("=")+1]
                                part = part[part.index("=")+1:]
                                print("removed " + removed_part + " from " + str(pokemon_name))
                            else:
                                print("ignoring " + part + " from " + str(pokemon_name))
                                continue
                        if part in keys_forms:
                            part = forms_map[part]
                        part = "".join(char.lower() for char in part if char.isalnum())
                        processed_parts.append(part)
                    pokemon_name = "".join(processed_parts)

                    # put the biome data in the right place
                    # print(pokemon_name)
                    if pokemon_name in keys_implemented:
                        implemented[pokemon_name]["presets"] = list(set(implemented[pokemon_name]["presets"]).union(set(presets)))
                        # print(pokemon_name + " has presets " + str(implemented[pokemon_name]["presets"]))
                    elif pokemon_name in keys_unimplemented:
                        unimplemented[pokemon_name]["presets"] = list(set(unimplemented[pokemon_name]["presets"]).union(set(presets)))
                    elif pokemon_name in keys_ignored:
                        ignored[pokemon_name]["presets"] = list(set(ignored[pokemon_name]["presets"]).union(set(presets)))

           
def remove_unimplemented_forms(implemented, unimplemented):
    for key, value in list(implemented.items()):
        if len(value["presets"]) == 0 and value["name"] not in special_cases:
            unimplemented[key] = value
            del implemented[key]
            print("deleted " + value["name"] + " because its presets are empty")

                
        
parse_pokemon()


                    
                    
                        

