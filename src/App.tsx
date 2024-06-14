import { useState, useEffect, useContext, createContext} from 'react'
import implemented_pokemon_json from "./data/pokemon_implemented.json"
import PokemonTable from './PokemonTable'
import PokemonCard from './PokemonCard'
import { Box, Grid, Stack, TextField, styled} from '@mui/material'
import exampleTrainerData from './other/ExampleTrainerData.tsx'
import { applyNameFilter, applyTypeFilter, applyAbilityFilter, applyMovesFilter } from './FilterFunctions'
import Pokemon from './types/Pokemon'
import FilterContext from './FilterContext'

const implemented_pokemon: Record<string, Pokemon> = implemented_pokemon_json
const listOfPokemon = Object.values(implemented_pokemon)

function App() {
    const [nameFilter, setNameFilter] = useState<string>("")
    // const [primaryTypeFilter, setPrimaryTypeFilter] = useState<string>("")
    // const [secondaryTypeFilter, setSecondaryTypeFilter] = useState<string>("")
    const [typeFilter, setTypeFilter] = useState<Array<string>>([])
    const [abilityFilter, setAbilityFilter] = useState<string>("")
    const [movesFilter, setMovesFilter] = useState<Array<string>>(["", "", "", ""])
    const [presetFilter, setPresetFilter] = useState<string>("")
    const [levelFilter, setLevelFilter] = useState<string>("")
    const [displayedPokemon, setDisplayedPokemon] = useState<Array<Pokemon>>(listOfPokemon)

    // console.log("rendering")

    useEffect(() => {
        let matchingPokemon = applyNameFilter(nameFilter, implemented_pokemon)
        matchingPokemon = applyTypeFilter(typeFilter, matchingPokemon)
        matchingPokemon = applyAbilityFilter(abilityFilter, matchingPokemon)
        matchingPokemon = applyMovesFilter(movesFilter, matchingPokemon)
        // displayedPokemon = applyPresetFilter(presetFilter, listOfPokemon)
        // displayedPokemon = applyLevelFilter(levelFilter, listOfPokemon)

        setDisplayedPokemon(Object.values(matchingPokemon))
        
    }, [nameFilter, typeFilter, abilityFilter, movesFilter, presetFilter, levelFilter])

    return (
        <FilterContext.Provider value={{
            name: nameFilter,
            type: typeFilter,
            // primaryType: primaryTypeFilter,
            // secondaryType: secondaryTypeFilter,
            ability: abilityFilter,
            moves: movesFilter,
            preset: presetFilter,
            level: levelFilter,
            setName: setNameFilter,
            setType: setTypeFilter,
            // setPrimaryType: setPrimaryTypeFilter,
            // setSecondaryType: setSecondaryTypeFilter,
            setAbility: setAbilityFilter,
            setMoves: setMovesFilter,
            setPreset: setPresetFilter,
            setLevel: setLevelFilter
        }}>
        <Box height={"100vh"} width={"100vw"} display={"flex"}>
            {/* ========== COLUMN 2 ==========*/}
            <Box display={"flex"} flexDirection={"column"}>
                {/* ========== UPPER ========== */}
                <Box minHeight={"48px"} width={"100%"} borderBottom={"1px solid gray"}>

                </Box>

                {/* ========== LOWER ========== */}
                <Box display={"flex"} flexDirection={"column"}>
                    <PokemonCard pokemon={null}/>
                    <PokemonTable listOfPokemon={displayedPokemon}/>
                </Box>
            </Box>


            {/*========== COLUMN 3 ==========*/}
            <Box display={"flex"} flexDirection={"column"} height={"100%"} flexGrow={1} sx={{overflow:"hidden"}}>
                {/* ========== UPPER ========== */}
                <Box minHeight={"48px"} width={"100%"} borderBottom={"1px solid gray"}>

                </Box>

                {/* ========== LOWER ========== */}
                <Box sx={{overflow:"scroll", borderLeft:"1px solid gray"}}>
                    <pre style={{margin: "0px"}}>
                        {JSON.stringify(exampleTrainerData, null, 2)}
                    </pre>
                </Box>
            </Box>
        </Box>
        </FilterContext.Provider>
    )
}

export default App
