import { Box, Input } from "@mui/material"
import FilterContext from "./context/FilterContext"
import { useContext, useEffect, useState } from "react"
import SelectedPokemonContext from "./context/SelectedPokemonContext"
import DisplayedPokemonContext from "./context/DisplayedPokemonContext"

function PokemonCardNameAndImage() {
    const selected = useContext(SelectedPokemonContext)
    const displayed = useContext(DisplayedPokemonContext)
    const filters = useContext(FilterContext)

    // if a pokemon is selected, we should display the name of the pokemon, and reset the name filter back to nothing
    // we can have a useeffect connected to the selected pokemon
    useEffect(() => {
        if (filters.setName) {
            filters.setName("")
        }
        if (selected.selectedPokemon) {
            setSelectedName(selected.selectedPokemon.name)
        }
    }, [selected.selectedPokemon])

    const [selectedName, setSelectedName] = useState(filters.name)

    return (
        <Box display={"flex"} flexDirection={"column"} paddingLeft={"2px"} paddingRight={"2px"} width={"20%"}>
            <Box height={"144px"}>
                <img src={selected.selectedPokemon?.minisprite}/>
            </Box>
            <Input 
            placeholder="name" 
            sx={{height: "24px", fontSize:"14px"}} 
            value={selectedName} 
            onChange={(event) => {
                if (filters.setName) {
                    filters.setName(event.target.value)
                }
                setSelectedName(event.target.value)
            }}
            onKeyDown={(event) => {
                if (event.key == "Enter") {
                    // on enter we want to grab the first pokemon in the table
                    // console.log(displayed.displayedPokemon[0])
                    if (displayed.displayedPokemon[0] != null && selected.setSelectedPokemon != null) {
                        selected.setSelectedPokemon(displayed.displayedPokemon[0])
                    }
                }
            }}
            />
        </Box>
    )

}

export default PokemonCardNameAndImage