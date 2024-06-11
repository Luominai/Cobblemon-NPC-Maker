import json
import string

implemented_pokemon_file = "src/data/pokemon_implemented.json"
memoized_pokemon_output_file = "src/data/memoized_pokemon.json"

def memoize_pokemon():
    memoized = {}

    with open(implemented_pokemon_file, encoding="utf8") as read_file:
        data = json.load(read_file)
        for key, value in data.items():
            # add the pokemon under their first letter, ex: Hattrem goes under h
            # if the pokemon has multiple parts to its name (ex: Decidueye Hisui), then we also put the pokemon under the first letter of its other parts
            name = value["name"]
            parts = name.split()
            for i in range(len(parts)):
                part = parts[i]
                first_letter = part[0].lower()

                # create the dict if not exists
                if first_letter not in memoized.keys():
                    memoized[first_letter] = {
                        "matches_first_part": [],
                        "matches_other_part": []
                    }

                # add the pokemon to the array if its not there already
                if key not in memoized[first_letter]:
                    if i == 0:
                        memoized[first_letter]["matches_first_part"].append(name)
                    else:
                        memoized[first_letter]["matches_other_part"].append(name)

    # doing this creates a single list in which Haunter appears before Decidueye Hisui
    # both are memoized under h, but it makes more sense for Haunter to be first
    # print(memoized["a"])
    for key, value in memoized.items():
        value["matches_first_part"].sort()
        value["matches_other_part"].sort()
        memoized[key] = value["matches_first_part"] + value["matches_other_part"]

    with open(memoized_pokemon_output_file, "w") as write_file:
        json.dump(memoized, write_file, indent=4)

memoize_pokemon()

