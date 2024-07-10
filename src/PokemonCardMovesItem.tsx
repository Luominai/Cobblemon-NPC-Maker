import { Box, Input, Autocomplete, TextField, ListItemText } from "@mui/material"
import FilterContext from "./context/FilterContext"
import { useContext } from "react"
import {Moves} from "./data/showdown/moves"
import itemsJson from "./data/items.json"
import SelectedPokemonContext from "./context/SelectedPokemonContext"

const listOfItems = Object.entries(itemsJson).map(([key, value]) => value)
const listOfMoves = Object.entries(Moves).map(([key, value]) => value)

function PokemonCardMovesItem() {
    const filters = useContext(FilterContext)
    const selectedPokemon = useContext(SelectedPokemonContext)

    let learnset = listOfMoves
    if (selectedPokemon.selectedPokemon != null) {
        const tm = selectedPokemon.selectedPokemon.moves.tm
        const tutor = selectedPokemon.selectedPokemon.moves.tutor
        const egg = selectedPokemon.selectedPokemon.moves.egg
        const levelup = selectedPokemon.selectedPokemon.moves.levelup.map((move) => move.name)

        // creates a new array of move names by spreading a set that is every array merged (this removes dupes), then maps each move name to its move
        learnset = [... new Set([...tm, ...tutor])].map((moveName) => Moves[moveName]) 

    }

    return (
        <Box display={"flex"} flexDirection={"column"} paddingLeft={"2px"} paddingRight={"2px"} width={"20%"}>
            {[0, 1, 2, 3].map((number) => {
                return (
                    <Autocomplete
                    autoHighlight
                    sx={{
                        width: "100%",
                        '& .MuiInputBase-root': {
                            height: "24px",
                            fontSize: "14px"
                        },
                        fontSize: "14px",
                        overflow: "hidden"
                    }}
                    renderInput={(params) => {
                        const placeholder = "move"
                        return (
                            <TextField // the params thing is passing on props from Input to the rendered Component
                            {...params} 
                            variant="standard" 
                            placeholder={placeholder}
                            /> 
                        )
                    }} 
                    renderTags={(values) => 
                        values.map(value => value.name).join(' / ') // this renders the tags as a comma separated string rather than using chips
                    }
                    options={learnset}
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option) => {
                        const title = [option.category, option.type, option.basePower].join(" ")
                        return (
                            <li {...props} title={title}>{option.name}</li>
                        )
                    }}
                    ListboxProps={{
                        style: {
                            maxHeight: "200px",
                        }
                    }}
                    slotProps={{
                        paper: {
                            style: {
                                fontSize: "14px"
                            }
                        }
                    }}
                    onChange={(event, value) => {
                        if (filters.setMoves) {
                            let currentMovesFilter = (filters.moves).map((move) => move)
                            currentMovesFilter[number] = value ? value.name : ""
                            console.log(currentMovesFilter)
                            filters.setMoves(currentMovesFilter)
                        }
                    }}
                    />
                )
            })}

            

            <Box display={"flex"} padding={"auto"} justifyContent={"right"} height={"48px"}>
            </Box>



            <Autocomplete
            autoHighlight
            sx={{
                width: "100%",
                '& .MuiInputBase-root': {
                    height: "24px",
                    fontSize: "14px"
                },
                fontSize: "14px",
                overflow: "hidden"
            }}
            renderInput={(params) => {
                const placeholder = "item"
                return (
                    <TextField // the params thing is passing on props from Input to the rendered Component
                    {...params} 
                    variant="standard" 
                    placeholder={placeholder}
                    /> 
                )
            }} 
            options={listOfItems}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => {
                return (
                    <li {...props}>
                        {option.name}
                        <img src={option.icon} style={{width:"24px", height:"24px", marginLeft: "4px"}}/>
                    </li>
                )
            }}
            ListboxProps={{
                style: {
                    maxHeight: "200px",
                }
            }}
            slotProps={{
                paper: {
                    style: {
                        fontSize: "14px"
                    }
                }
            }}
            // onChange={(event, value) => {
            //     if (filters.setMoves) {
            //         let currentMovesFilter = (filters.moves).map((move) => move)
            //         currentMovesFilter[number] = value ? value.name : ""
            //         console.log(currentMovesFilter)
            //         filters.setMoves(currentMovesFilter)
            //     }
            // }}
            />
        </Box>
    )
}

export default PokemonCardMovesItem