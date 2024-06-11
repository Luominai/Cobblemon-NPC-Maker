import { TextField } from "@mui/material";
import Pokemon from "./types/Pokemon";
import { Fragment, useEffect, useState } from "react";
import memoized_pokemon_json from "./data/memoized_pokemon.json"
import implemented_pokemon_json from "./data/pokemon_implemented.json"

const memoized_pokemon: Record<string, Array<string>> = memoized_pokemon_json
const implemented_pokemon: Record<string, Pokemon> = implemented_pokemon_json
const listOfPokemon: Array<Pokemon> = Object.values(implemented_pokemon)

function applyNameFilter(name: string, dictOfPokemon: Record<string, Pokemon>) {
    // if no name given, do nothing
    if (name.trim() == "") {
        return listOfPokemon
    }

    // first, get the first character of the input string and return the list of pokemon memoized under that letter
    const firstLetter = name.toLowerCase().replace(/[^a-z0-9]/gi, '').substring(0,1)
    const firstPass = memoized_pokemon[firstLetter]

    // now search for pokemon matching the rest of the input substring
    const input = name.toLowerCase().replace(/[^a-z0-9]/gi, '')
    const secondPass = firstPass.filter((pokemonName) => {
        const parts = pokemonName.split(" ")
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i].toLowerCase().replace(/[^a-z0-9]/gi, '')
            if (part.startsWith(input)) {
                return true
            }
        }
        return false
    })

    let matchingPokemon = []
    for(let i = 0; i < secondPass.length; i++) {
        // conver the name to the corresponding key in implemented_pokemon
        const key = secondPass[i].toLowerCase().replace(/[^a-z0-9]/gi, '')
        // keep only the pokemon if they are in the pokemonDict passed into this function
        if (dictOfPokemon[key]) {
            matchingPokemon.push(dictOfPokemon[key])
        }
    }
    console.log(matchingPokemon)

    return matchingPokemon
}



export {applyNameFilter}