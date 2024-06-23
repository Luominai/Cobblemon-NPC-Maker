import { Box, Input, Autocomplete, TextField, ListItemText } from "@mui/material"
import FilterContext from "./context/FilterContext"
import { useContext } from "react"
import {Moves} from "./data/showdown/moves"

const listOfMoves = Object.entries(Moves).map(([key, value]) => value)

function PokemonCardMovesItem() {
    const filters = useContext(FilterContext)
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
                    options={listOfMoves}
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option) => {
                        const title = [option.category, option.type, option.basePower].join(" ")
                        return (
                            <li {...props} title={title}>{option.name}</li>
                        )
                    }}
                    ListboxProps={{
                        style: {
                            maxHeight: "100px",
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
            <Input placeholder="item" sx={{height: "24px", fontSize:"14px"}}/>
        </Box>
    )
}

export default PokemonCardMovesItem