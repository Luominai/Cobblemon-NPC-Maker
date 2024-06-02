import { useState } from 'react'
import pokedex from "./data/pokemon_implemented.json"
import PokemonTable from './PokemonTable'
import PokemonCard from './PokemonCard'
import { Box, Grid, Stack, TextField, styled} from '@mui/material'
import exampleTrainerData from './other/ExampleTrainerData'

const listOfPokemon = Object.values(pokedex)

function App() {
    const [displayedPokemon, setDisplayedPokemon] = useState(listOfPokemon)

    return (
        <Box height={"100vh"} width={"100vw"} display={"flex"}>
            {/*========== COLUMN 1 ==========*/}
            <Box display={"flex"} flexDirection={"column"} width={"256px"} height={"100%"} flexShrink={0}>
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
    )
}

export default App
