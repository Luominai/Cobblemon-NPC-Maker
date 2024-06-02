const exampleTrainerData = {
    "team": [
      {
        "species": "cobblemon:ribombee",
        "gender": "MALE",
        "level": 25,
        "nature": "cobblemon:timid",
        "ability": "shielddust",
        "moveset": [
          "pollenpuff",
          "drainingkiss",
          "stunspore",
          "fairywind"
        ],
        "ivs": {
          "hp": 31,
          "attack": 19,
          "defence": 31,
          "special_attack": 31,
          "special_defence": 31,
          "speed": 31
        },
        "evs": {
          "hp": 2,
          "attack": 14,
          "special_defence": 7
        },
        "shiny": false,
        "heldItem": "minecraft:air",
        "aspects": [
          "male"
        ]
      },
      {
        "species": "cobblemon:beedrill",
        "gender": "FEMALE",
        "level": 26,
        "nature": "cobblemon:relaxed",
        "ability": "swarm",
        "moveset": [
          "venoshock",
          "furyattack",
          "bugbite",
          "aerialace"
        ],
        "ivs": {
          "hp": 31,
          "attack": 31,
          "defence": 31,
          "special_attack": 11,
          "special_defence": 31,
          "speed": 31
        },
        "evs": {},
        "shiny": false,
        "heldItem": "minecraft:air",
        "aspects": []
      },
      {
        "species": "cobblemon:vespiquen",
        "gender": "FEMALE",
        "level": 25,
        "nature": "cobblemon:brave",
        "ability": "pressure",
        "moveset": [
          "fellstinger",
          "aerialace",
          "roost",
          "poisonsting"
        ],
        "ivs": {
          "hp": 31,
          "attack": 31,
          "defence": 31,
          "special_attack": 31,
          "special_defence": 31,
          "speed": 31
        },
        "evs": {},
        "shiny": false,
        "heldItem": "minecraft:air",
        "aspects": []
      }
    ],
    "winCommand": "tellraw %player% {\"text\": \"[Shelbee] It seems I've bee-n bee-aten!\"}",
    "lossCommand": "tellraw %player% {\"text\": \"[Shelbee] Come on, I bee-lieve you can do bee-tter than that!\"}",
    "canOnlyBeatOnce": false,
    "cooldownSeconds": 0,
    "partyMaximumLevel": 100,
    "defeatRequiredTrainers": []
  }

export default exampleTrainerData