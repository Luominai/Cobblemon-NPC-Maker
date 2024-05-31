import { useState } from 'react'
import pokedex from "./data/pokemon_implemented.json"
import PokemonTable from './PokemonTable'
import Filter from './Filter'
import PokemonCard from './PokemonCard'
import { Box, Grid, Stack, TextField, styled} from '@mui/material'
import { GridStyle } from './styles/Grid'

const listOfPokemon = Object.values(pokedex)

function App() {
    const [displayedPokemon, setDisplayedPokemon] = useState(listOfPokemon)

    return (
        <Box height={"100vh"} width={"100vw"} display={"flex"}>
            {/*========== COLUMN 1 ==========*/}
            <Box display={"flex"} flexDirection={"column"} width={"256px"} height={"100%"}>
                {/* ========== UPPER ========== */}
                <Box height={"50%"} width={"100%"} borderRight={"1px solid gray"} borderBottom={"1px solid gray"}>

                </Box>

                {/* ========== LOWER ========== */}
                <Box height={"50%"} width={"100%"} borderRight={"1px solid gray"}>

                </Box>
            </Box>


            {/* ========== COLUMN 2 ==========*/}
            <Box display={"flex"} width={"100%"}>
                {/* ========== LEFT ========== */}
                <Box display={"flex"} flexDirection={"column"} width={"50%"} >
                    {/* ========== UPPER ========== */}
                    <Box minHeight={"48px"} width={"100%"} borderBottom={"1px solid gray"}>

                    </Box>

                    {/* ========== LOWER ========== */}
                    <Box>
                        <PokemonCard pokemon={null}/>
                        <PokemonTable listOfPokemon={displayedPokemon}/>
                    </Box>
                </Box>
                
                {/* ========== RIGHT ========== */}
                <Box display={"flex"} flexDirection={"column"} width={"50%"} >
                    {/* ========== UPPER ========== */}
                    <Box minHeight={"48px"} width={"100%"} borderBottom={"1px solid gray"}>

                    </Box>

                    {/* ========== LOWER ========== */}
                    <Box margin={"auto"}>
                        {/* <PokemonTable listOfPokemon={displayedPokemon}/> */}
                    </Box>
                </Box>
            </Box>


            {/*========== COLUMN 3 ==========*/}
            {/* <Box display={"flex"} flexDirection={"column"} width={"192px"} height={"100%"}> */}
                {/* ========== UPPER ========== */}
                {/* <Box minHeight={"48px"} width={"100%"} borderBottom={"1px solid gray"}>

                </Box> */}

                {/* ========== LOWER ========== */}
                {/* <Box height={"100%"} borderLeft={"1px solid gray"}>

                </Box> */}
            {/* </Box> */}
        </Box>
    )
}

export default App
