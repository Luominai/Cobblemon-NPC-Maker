import { createContext } from "react"
import Pokemon from "../types/Pokemon"

const SelectedPokemonContext = createContext<{
    selectedPokemon: Pokemon | null,
    setSelectedPokemon: Function | null
}>({
    selectedPokemon: null,
    setSelectedPokemon: null
})

export default SelectedPokemonContext