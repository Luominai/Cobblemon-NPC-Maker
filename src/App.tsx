import { useState } from 'react'
import PokemonTable from './PokemonTable'
import pokedex from "./data/pokemon_implemented.json"
import Pokemon from './types/Pokemon'
import Filter from './Filter'

function App() {
    const listOfPokemon = Object.values(pokedex)
    const [nameFilter, setNameFilter] = useState<string>("")
    const [typeFilter, setTypeFilter] = useState<string>("")
    const [abilityFilter, setAbilityFilter] = useState<string>("")

    let pokemonMatchingFilters = applyNameFilter(nameFilter, listOfPokemon)

    return (
        <>
            <Filter setNameFilter={setNameFilter} setTypeFilter={setTypeFilter} setAbilityFilter={setAbilityFilter}/>
            <PokemonTable listOfPokemon={pokemonMatchingFilters}/>
        </>
    )
}

function applyNameFilter(name: string, listOfPokemon: Array<Pokemon>) {
    // if no filter, do nothing
    if (name.trim() == "") {
        return listOfPokemon
    }

    let matchFirstPart = []
    let matchOtherParts = []
    for (let i = 0; i < listOfPokemon.length; i++) {
        const pokemon = listOfPokemon[i]
        const searchName = name.toLowerCase().replace(/[^a-z0-9]/gi, '')
        const parts = pokemon.name.split(" ")

        for (let j = 0; j < parts.length; j++) {
            const part = parts[j].toLowerCase().replace(/[^a-z0-9]/gi, '')
            if (part.startsWith(searchName)) {
                if (j == 0) {
                    matchFirstPart.push(pokemon)
                } else {
                    matchOtherParts.push(pokemon)
                }
            }
        }
    }
    return matchFirstPart.concat(matchOtherParts)
}

export default App
