import { useState, useEffect, useContext, createContext} from 'react'
import implemented_pokemon from "./data/pokemon_implemented.json"
import PokemonTable from './PokemonTable'
import PokemonCard from './PokemonCard'
import { Box, Grid, Stack, TextField, styled} from '@mui/material'
import exampleTrainerData from './other/ExampleTrainerData.tsx'
import { applyNameFilter } from './FilterFunctions'
import Pokemon from './types/Pokemon'
import FilterContext from './FilterContext'

const listOfPokemon = Object.values(implemented_pokemon)

function App() {
    const [nameFilter, setNameFilter] = useState<string>("")
    const [typeFilter, setTypeFilter] = useState<string>("")
    const [abilityFilter, setAbilityFilter] = useState<string>("")
    const [presetFilter, setPresetFilter] = useState<string>("")
    const [levelFilter, setLevelFilter] = useState<string>("")
    const [displayedPokemon, setDisplayedPokemon] = useState<Array<Pokemon>>(listOfPokemon)

    useEffect(() => {
        let matchingPokemon = applyNameFilter(nameFilter, listOfPokemon)
        // displayedPokemon = applyTypeFilter(typeFilter, listOfPokemon)
        // displayedPokemon = applyAbilityFilter(abilityFilter, listOfPokemon)
        // displayedPokemon = applyPresetFilter(presetFilter, listOfPokemon)
        // displayedPokemon = applyLevelFilter(levelFilter, listOfPokemon)

        setDisplayedPokemon(matchingPokemon)
        
    }, [nameFilter, typeFilter, abilityFilter])

    return (
        <FilterContext.Provider value={{
            name: nameFilter,
            type: typeFilter,
            ability: abilityFilter,
            preset: presetFilter,
            level: levelFilter,
            setName: setNameFilter,
            setType: setTypeFilter,
            setAbility: setAbilityFilter,
            setPreset: setPresetFilter,
            setLevel: setLevelFilter
        }}>
        <Box height={"100vh"} width={"100vw"} display={"flex"}>
            {/*========== COLUMN 1 ==========*/}
            <Box display={"flex"} flexDirection={"column"} width={"192px"} height={"100%"} flexShrink={0}>
                {/* ========== UPPER ========== */}
                <Box height={"48px"} width={"100%"} borderRight={"1px solid gray"} borderBottom={"1px solid gray"}>

                </Box>
                <Box flexGrow={1} width={"100%"} borderRight={"1px solid gray"} borderBottom={"1px solid gray"}>

                </Box>

                {/* ========== LOWER ========== */}
                <Box height={"48px"} width={"100%"} borderRight={"1px solid gray"} borderBottom={"1px solid gray"}>

                </Box>
                <Box flexGrow={1} width={"100%"} borderRight={"1px solid gray"} borderBottom={"1px solid gray"}>

                </Box>
            </Box>


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
