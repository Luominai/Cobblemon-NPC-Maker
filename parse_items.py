import requests
import json

items_file = "src/data/showdown/items.json"
item_ids_file = "src/data/showdown/itemIDs.json"
output_file = "src/data/items.json"

def parse_items():
    data = {}
    # read the items
    with open(items_file, "r") as read_file:
        items = json.load(read_file)
        # copy the name and description of each item
        for key, value in items.items():
            icon_name = "-".join(value["name"].lower().split(" "))

            data[key] = {
                "name": value["name"],
                "description": value["desc"]
                # "icon": f"https://play.pokemonshowdown.com/sprites/itemicons/{icon_name}.png"
            }

    # read the itemIDs
    with open(item_ids_file, "r") as read_file:
        item_ids = json.load(read_file)
        # match each item_id to its item, and then assign the item an icon
        for key, value in item_ids.items():
            # get the item id
            id = value["sid"]
            # get all names 
            for name in value["names"]:
                # remove non-alphanumeric characters so the name matches our keys in data
                name = "".join(char for char in name.lower() if char.isalnum())
                # assign icon if the item is in our list
                if name in data.keys():
                    data[name]["icon"] = f"https://raw.githubusercontent.com/smogon/sprites/master/src/minisprites/items/{id}.png"
    
    with open(output_file, "w") as write_file:
        json.dump(data, write_file, indent=4)

# parse_items()