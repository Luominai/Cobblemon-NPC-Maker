import { createContext } from "react"
import Pokemon from "../types/Pokemon"

const DisplayedPokemonContext = createContext<{
    displayedPokemon: Array<Pokemon>,
    setDisplayedPokemon: Function |null
}>({
    displayedPokemon: [],
    setDisplayedPokemon: null
})

export default DisplayedPokemonContext