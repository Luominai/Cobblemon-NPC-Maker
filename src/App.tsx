import { useState, useEffect} from 'react'
import implemented_pokemon_json from "./data/pokemon_implemented.json"
import PokemonTable from './PokemonTable'
import PokemonCard from './PokemonCard'
import { Box, Tab } from '@mui/material'
import { applyNameFilter, applyTypeFilter, applyAbilityFilter, applyMovesFilter, applyPresetsFilter, applyLevelFilter} from './FilterFunctions'
import Pokemon from './types/Pokemon'
import FilterContext from './context/FilterContext.tsx'
import SelectedPokemonContext from './context/SelectedPokemonContext.tsx'
import DisplayedPokemonContext from './context/DisplayedPokemonContext.tsx'
import TableOrderContext from './context/TableOrderContext.tsx'
import sort from './SortFunctions.tsx'

const implemented_pokemon: Record<string, Pokemon> = implemented_pokemon_json
const listOfPokemon = Object.values(implemented_pokemon)

function App() {
    const [nameFilter, setNameFilter] = useState<string>("")
    const [typeFilter, setTypeFilter] = useState<Array<string>>([])
    const [abilityFilter, setAbilityFilter] = useState<string>("")
    const [movesFilter, setMovesFilter] = useState<Array<string>>(["", "", "", ""])
    const [presetFilter, setPresetFilter] = useState<Array<string>>([])
    const [levelFilter, setLevelFilter] = useState<number>(100)

    const [displayedPokemon, setDisplayedPokemon] = useState<Array<Pokemon>>(listOfPokemon)
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon|null>(null)

    const [sortBy, setSortBy] = useState<string>("")
    const [order, setOrder] = useState<number>(0)

    useEffect(() => {
        let matchingPokemon = applyNameFilter(nameFilter, implemented_pokemon)
        matchingPokemon = applyTypeFilter(typeFilter, matchingPokemon)
        matchingPokemon = applyAbilityFilter(abilityFilter, matchingPokemon)
        matchingPokemon = applyMovesFilter(movesFilter, matchingPokemon)
        matchingPokemon = applyPresetsFilter(presetFilter, matchingPokemon)
        matchingPokemon = applyLevelFilter(levelFilter, matchingPokemon)
        matchingPokemon = sort(matchingPokemon, sortBy, order)

        setDisplayedPokemon(Object.values(matchingPokemon))
        
    }, [nameFilter, typeFilter, abilityFilter, movesFilter, presetFilter, levelFilter, sortBy, order])

    return (
        <FilterContext.Provider value={{
            name: nameFilter,
            type: typeFilter,
            ability: abilityFilter,
            moves: movesFilter,
            preset: presetFilter,
            level: levelFilter,
            setName: setNameFilter,
            setType: setTypeFilter,
            setAbility: setAbilityFilter,
            setMoves: setMovesFilter,
            setPreset: setPresetFilter,
            setLevel: setLevelFilter
        }}>
            <SelectedPokemonContext.Provider value={{
                selectedPokemon: selectedPokemon,
                setSelectedPokemon: setSelectedPokemon
            }}>
                <DisplayedPokemonContext.Provider value={{
                    displayedPokemon: displayedPokemon,
                    setDisplayedPokemon: setDisplayedPokemon
                }}>
                    <TableOrderContext.Provider value={{
                        sortBy: sortBy,
                        setSortBy: setSortBy,
                        order: order,
                        setOrder: setOrder
                    }}>
                        <Box height={"100vh"} width={"100vw"} display={"flex"} justifyContent={"center"}>
                            {/* ========== COLUMN 2 ==========*/}
                            <Box display={"flex"} flexDirection={"column"} width={"80%"}>
                                {/* ========== UPPER ========== */}
                                <Box minHeight={"48px"} width={"100%"} borderBottom={"1px solid gray"}>

                                </Box>

                                {/* ========== LOWER ========== */}
                                <Box display={"flex"} flexDirection={"column"} >
                                    <PokemonCard/>
                                    <PokemonTable listOfPokemon={displayedPokemon}/>
                                </Box>
                            </Box>
                        </Box>
                    </TableOrderContext.Provider>
                </DisplayedPokemonContext.Provider>
            </SelectedPokemonContext.Provider>
        </FilterContext.Provider>
    )
}

export default App
