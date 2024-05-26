import json
import os
import sqlite3

delineator = ","
accepted_features = ["hisuian", "alolan", "galarian", "paldean", "roaming"]
ignored_forms = ["valencian", "=", "shulker"]
accepted_forms = ["Hisui", "Alola", "Galar", "Paldea", "Roaming"]

feature_to_form = {
    "hisuian" : "Hisui",
    "alolan" : "Alola",
    "galarian" : "Galar",
    "paldean" : "Paldea",
    "roaming" : "Roaming"
}

form_to_feature = {
    "Hisui" : "hisuian",
    "Alola" : "alolan",
    "Galar" : "galarian",
    "Paldea" : "paldean",
    "Roaming" : "roaming"
}

manual_additions = [
    {
        "name": "gimmighoul",
        "national_pokedex_number": 999,
        "form": "",
        "min_spawn_level": 5,
        "max_spawn_level": 30
    }
]

connection = sqlite3.connect("src/pokedex.db")
cursor = connection.cursor()
cursor.execute("DROP TABLE pokemon")
cursor.execute("""
               CREATE TABLE IF NOT EXISTS pokemon (
                    name TEXT PRIMARY KEY, 
                    nationalPokedexNumber INTEGER,
                    primaryType TEXT, secondaryType TEXT,
                    primaryAbility TEXT, secondaryAbility TEXT, hiddenAbility TEXT,
                    hp INTEGER, attack INTEGER, defence INTEGER, specialAttack INTEGER, specialDefence INTEGER, speed INTEGER,
                    levelup TEXT, tm TEXT, tutor TEXT, egg TEXT,
                    form TEXT,
                    minSpawnLevel INTEGER, maxSpawnLevel INTEGER)
               """)

# gimmighoul-chest is a static spawn, so it's not included in the spawn pool data.
# it's data is included in the species data though, so we just need to manually add its spawn data
def manually_add():
    for pokemon in manual_additions:
        cursor.execute(f"""
                        INSERT OR IGNORE INTO pokemon(name, nationalPokedexNumber, form, minSpawnLevel, maxSpawnLevel) 
                        VALUES (?, ?, ?, ?, ?)
                        """, (pokemon["name"], pokemon["national_pokedex_number"], pokemon["form"], pokemon["min_spawn_level"], pokemon["max_spawn_level"]))
        connection.commit()


def parse_spawn_pools():
    for (root, dirs, files) in os.walk("src/cobblemon-spawn_pool_world"):
        for file in files:
            with open(f"{root}/{file}", "r", encoding="utf8") as read_file:
                # read the spawn data
                pokemon = json.load(read_file)
                spawns = pokemon["spawns"]
                for spawn in spawns:
                    # get the data we want
                    min_spawn_level = spawn["level"][:spawn["level"].index("-")]
                    max_spawn_level = spawn["level"][spawn["level"].index("-")+1:]
                    national_pokedex_number = int(file[:file.index("_")])
                    name = spawn["pokemon"]
                    # ignore valencian / region_bias / alt skins
                    if not any(form in name for form in ignored_forms):
                        form = name[name.rfind(" ")+1:] if (name.rfind(" ") > 0 and name[name.rfind(" ")+1:] in accepted_forms) else ""

                        cursor.execute(f"""
                                    INSERT OR IGNORE INTO pokemon(name, nationalPokedexNumber, form, minSpawnLevel, maxSpawnLevel) 
                                    VALUES (?, ?, ?, ?, ?)
                                    """, (name, national_pokedex_number, form, min_spawn_level, max_spawn_level))
                        connection.commit()

def parse_species():
    for (root, dirs, files) in os.walk("src/cobblemon-species"):
        for file in files:
            with open(f"{root}/{file}", "r", encoding="utf8") as read_file:
                pokemon = json.load(read_file)
                add_pokemon(pokemon)

# adds a pokemon and recursively adds its other forms too
def add_pokemon(pokemon, original_species_name=""):
    # the pokemon is not implemented, and it's not a variant
    if "implemented" not in pokemon.keys() and len(original_species_name) == 0:
        return

    # get all the information
    # name is a form if the current pokemon is a form of another
    if pokemon["name"] in accepted_forms:
        form = pokemon["name"]
        feature = form_to_feature[pokemon["name"]]
        name = original_species_name
    else:
        form = ""
        feature = ""
        name = pokemon["name"]

    display_name = name + "-" + form if len(form) > 0 else name
    # if the pokemon are Nidoran-F and Nidoran-M, we need to change them to nidoranf and nidoranm because of name differences
    # Farfetch'd, Mr. Mime, Mime. Jr, Porygon-Z, Jangmo-o, Hakamo-o, Kommo-o, Sirfetch'd all need their special characters removed
    search_name = (remove_non_alnum(name) + " " + feature).lower() if len(feature) > 0 else remove_non_alnum(name).lower()

    print(display_name + " / " + search_name)

    # string_value = "alphanumeric@123__"
    # s = "".join(filter(str.isalnum, string_value))
    # print(s)

    primary_type, secondary_type = parse_types(pokemon)
    primary_ability, secondary_ability, hidden_ability = parse_abilities(pokemon)
    hp, attack, defence, special_attack, special_defence, speed = parse_base_stats(pokemon)
    levelup, tm, tutor, egg = parse_moves(pokemon)

    # search for the pokemon by name and then update its data
    # changes display name from "ninetails alolan" to "Ninetails-Alola"
    cursor.execute(f""" 
                   UPDATE pokemon 
                   SET primaryType=?, secondaryType=?,
                       primaryAbility=?, secondaryAbility=?, hiddenAbility=?,
                       hp=?, attack=?, defence=?, specialAttack=?, specialDefence=?, speed=?,
                       levelup=?, tm=?, tutor=?, egg=?, 
                       name=?, form=?
                   WHERE name=?
                   """,(primary_type, secondary_type, 
                        primary_ability, secondary_ability, hidden_ability,
                        hp, attack, defence, special_attack, special_defence, speed,
                        levelup, tm, tutor, egg,
                        display_name, feature,
                        search_name))
    connection.commit()

    # recurse on additional forms
    if "forms" in pokemon.keys():
        # print(name)
        for form in pokemon["forms"]:
            if form["name"] in accepted_forms:
                # print(name)
                add_pokemon(form, name)

def remove_non_alnum(string):
    return "".join(filter(str.isalnum, string))


def parse_moves(pokemon):
    levelup, tm, tutor, egg = "", "", "", ""
    # loop over each move to grab the data we want
    for move in (pokemon["moves"]):
        # if the move is learned by tm
        if move[:2] == "tm":
            tm += (move[move.index(":")+1:])
            tm += delineator
        # if the move is learned by tutor
        elif move[:5] == "tutor":
            tutor += (move[move.index(":")+1:])
            tutor += delineator
        # if the move is learned by egg
        elif move[:3] == "egg":
            egg += (move[move.index(":")+1:])
            egg += delineator
        # if the move is learned by levelup
        elif (move[:move.index(":")]).isdigit():
            levelup += move
            levelup += delineator
    
    # remove trailing delineator commas
    levelup, tm, tutor, egg = levelup[:-len(delineator)], tm[:-len(delineator)], tutor[:-len(delineator)], egg[:-len(delineator)]
    return levelup, tm, tutor, egg

def parse_base_stats(pokemon):
    hp = pokemon["baseStats"]["hp"]
    attack = pokemon["baseStats"]["attack"]
    defence = pokemon["baseStats"]["defence"]
    special_attack = pokemon["baseStats"]["special_attack"]
    special_defence = pokemon["baseStats"]["special_defence"]
    speed = pokemon["baseStats"]["speed"]

    return hp, attack, defence, special_attack, special_defence, speed

def parse_types(pokemon):
    return pokemon["primaryType"], pokemon["secondaryType"] if "secondaryType" in pokemon.keys() else ""

def parse_abilities(pokemon):
    return pokemon["abilities"][0], pokemon["abilities"][1] if len(pokemon["abilities"]) > 1 and ":" not in pokemon["abilities"][1] else "", pokemon["abilities"][-1][2:] if len(pokemon["abilities"]) > 1 and ":" in pokemon["abilities"][-1] else ""





# def add_pokemon(pokemon):
#     if "implemented" not in pokemon.keys():
#         return

#     # type, ability, stats, moves
#     primary_type = pokemon["primaryType"]
#     secondary_type = pokemon["secondaryType"] if "secondaryType" in pokemon.keys() else ""
#     primary_ability = pokemon["abilities"][0]
#     secondary_ability = pokemon["abilities"][1] if len(pokemon["abilities"]) > 1 and ":" not in pokemon["abilities"][1] else ""
#     hidden_ability = pokemon["abilities"][-1][2:] if len(pokemon["abilities"]) > 1 and ":" in pokemon["abilities"][-1] else ""
#     hp = pokemon["baseStats"]["hp"]
#     attack = pokemon["baseStats"]["attack"]
#     defence = pokemon["baseStats"]["defence"]
#     special_attack = pokemon["baseStats"]["special_attack"]
#     special_defence = pokemon["baseStats"]["special_defence"]
#     speed = pokemon["baseStats"]["speed"]
#     levelup, tm, tutor, egg = parse_moves(pokemon)
#     name = pokemon["name"]
#     # these two keys are ones we add to indicate that the current pokemon is a variant we want to add
#     # for non-variants, this does nothing
#     feature = " " + pokemon["feature"] if "feature" in pokemon.keys() else "" 
#     feature_suffix = "-" + pokemon["feature_suffix"] if "feature_suffix" in pokemon.keys() else ""

#     if "feature" in pokemon.keys():
#         print(name + feature)
    
#     # search for the pokemon by name and then update its data
#     # changes display name from "ninetails alolan" to "Ninetails-Alola"
#     cursor.execute(f""" 
#                    UPDATE pokemon 
#                    SET primaryType=?, secondaryType=?,
#                        primaryAbility=?, secondaryAbility=?, hiddenAbility=?,
#                        hp=?, attack=?, defence=?, specialAttack=?, specialDefence=?, speed=?,
#                        levelup=?, tm=?, tutor=?, egg=?, 
#                        name=?, form=?
#                    WHERE name=?
#                    """,(primary_type, secondary_type, 
#                         primary_ability, secondary_ability, hidden_ability,
#                         hp, attack, defence, special_attack, special_defence, speed,
#                         levelup, tm, tutor, egg,
#                         (name + feature_suffix), feature,
#                         (name + feature).lower()))
#     connection.commit()

#     # add additional forms if they are accepted
#     forms = pokemon["forms"] if "forms" in pokemon.keys() else []
#     for form in forms:
#         if form["name"] in accepted_form_suffixes:
#             # change their name to include their full name, since form["name"] is only the form suffix
#             # get the feature by converting the feature_suffix by matching the index (needs cleaning up)
#             form["feature"] = accepted_forms[accepted_form_suffixes.index(form["name"])]    # pass the feature (" galarian", " alolan", ...)
#             form["feature_suffix"] = form["name"]                                           # pass the feature_suffix("-Galar", "-Alola", ...)
#             form["name"] = name + form["feature"]                                           # change the name
#             # print(form.keys())                                       
#             add_pokemon(form)



parse_spawn_pools()
manually_add()
parse_species()

connection.close()