import { Box, Autocomplete, TextField, Input } from "@mui/material"
import FilterContext from "./context/FilterContext"
import { useContext } from "react"
import abilitiesJson from "./data/abilities.json"
import Ability from "./types/Ability"
const abilities = abilitiesJson as Record<string, Ability>
const listOfAbilities = Object.entries(abilities).map(([key, value]) => value)

function PokemonCardLevelGenderShinyTypeAbilty() {
    const filters = useContext(FilterContext)
    return (
        <Box display={"flex"} flexDirection={"column"} paddingLeft={"2px"} paddingRight={"2px"} width={"20%"}>
            <Input placeholder={"level"} sx={{height: "24px", fontSize:"14px", paddingLeft:"3px"}}/>
            <Input placeholder={"gender"} sx={{height: "24px", fontSize:"14px", paddingLeft:"3px"}}/>
            <Input placeholder={"shiny"} sx={{height: "24px", fontSize:"14px", paddingLeft:"3px"}}/>

            <Box display={"flex"} padding={"auto"} justifyContent={"center"} height={"24px"} marginBottom={"48px"}>
                <Autocomplete
                autoHighlight
                filterSelectedOptions
                multiple
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
                    const placeholder = (filters.type.length === 0) ? "type" : ""
                    return <TextField {...params} variant="standard" placeholder={placeholder}/> // the params thing is passing on props from Input to the rendered Component
                }} 
                renderTags={(values) => 
                    values.map(value => value.label).join(' ') // this renders the tags as a space separated string rather than using chips
                }
                options={[
                    {label: "fire"},{label: "flying"},{label: "ghost"},{label: "bug"},{label: "dark"},{label: "dragon"},
                    {label: "electric"},{label: "fairy"},{label: "fighting"},{label: "grass"},{label: "ground"},{label: "ice"},
                    {label: "normal"},{label: "poison"},{label: "psychic"},{label: "rock"},{label: "steel"},{label: "water"},
                ]}
                getOptionLabel={(option) => {
                    // adding a space to the option means you can enter whitespace and still have options show up, ex: " fire" still shows the option for fire
                    // the whitespace also doesn't shift the label over
                    return " " + option.label 
                }} 
                ListboxProps={{
                    style: {
                        maxHeight: "100px"
                    }
                }}
                slotProps={{
                    paper: {
                        style: {
                            fontSize: "14px"
                        }
                    }
                }}
                getOptionDisabled={(option) => {
                    // console.log(option)
                    return (filters.type.length >= 2 || filters.type.includes(option.label))
                }}
                onChange={(event, value) => {
                    if (filters.setType) {
                        filters.setType(value.map((type) => type.label))
                    }
                }}
                isOptionEqualToValue={(value1, value2) => {
                    return value1.label == value2.label
                }}
                />
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
                const placeholder = (filters.ability === "") ? "ability" : ""
                return <TextField {...params} variant="standard" placeholder={placeholder}/> // the params thing is passing on props from Input to the rendered Component
            }} 
            renderTags={(values) => 
                values.map(value => value.name).join(' / ') // this renders the tags as a comma separated string rather than using chips
            }
            options={listOfAbilities}
            getOptionLabel={(option) => option.name}
            ListboxProps={{
                style: {
                    maxHeight: "100px"
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
                if (filters.setAbility) {
                    filters.setAbility(value?.name?? "")
                }
            }}
            />
        </Box>
    )
}

export default PokemonCardLevelGenderShinyTypeAbilty