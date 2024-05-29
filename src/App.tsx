import PokemonTable from './PokemonTable'
import pokedex from "./data/pokemon_implemented.json"

function App() {
    return (
        <>
            <PokemonTable listOfPokemon={pokedex}/>
        </>
    )
}

export default App
