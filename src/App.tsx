import { useState } from 'react'
import PokemonTable from './PokemonTable'
import pokedex from "./data/pokemon_implemented.json"
import Filter from './Filter'

const listOfPokemon = Object.values(pokedex)

function App() {
    const [displayedPokemon, setDisplayedPokemon] = useState(listOfPokemon)

    return (
        <>
            <Filter listOfPokemon={listOfPokemon} setDisplayedPokemon={setDisplayedPokemon}/>
            <PokemonTable listOfPokemon={displayedPokemon}/>
        </>
    )
}

export default App
