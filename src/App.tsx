import PokemonTable from './PokemonTable'
import Pokedex from "./pokedex.json"

function App() {
    return (
        <>
            <PokemonTable listOfPokemon={Pokedex.pokemon}/>
        </>
    )
}

export default App
