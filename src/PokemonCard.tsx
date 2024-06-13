import { Fragment } from "react/jsx-runtime";
import Pokemon from "./types/Pokemon";
import { Autocomplete, Box, Grid, Input, Stack, TextField, Typography } from "@mui/material";
import { TypographyStyle } from "./styles/PokemonTableStyles";
import presetMap from "./other/PresetMap";
import FilterContext from "./FilterContext";
import { useContext, useState } from "react";
import abilitiesJson from "./data/abilities.json"
import Ability from "./types/Ability";

const abilities = abilitiesJson as Record<string, Ability>
const listOfAbilities = Object.entries(abilities).map(([key, value]) => value)
// console.log(listOfAbilities[5])

function CustomInput({placeholder}: {placeholder: string}) {
    return <Input placeholder={placeholder} sx={{height: "24px", fontSize:"14px", paddingLeft:"3px"}}/>
}

function PokemonCard({pokemon}: {pokemon: Pokemon|null}) {
    // const [selectedTypes, setSelectedTypes] = useState<Array<Record<any, string>>>([])

    const filters = useContext(FilterContext)
    // if no pokemon is selected
    if (pokemon == null) {
        return (
            <Box display={"flex"} justifyContent={"space-evenly"} alignItems={"center"} marginTop={"10px"} marginBottom={"10px"}>
                {/* Name and Image */}
                <Box display={"flex"} flexDirection={"column"} paddingLeft={"2px"} paddingRight={"2px"} width={"20%"}>
                    <Box height={"144px"}>

                    </Box>
                    <Input placeholder="name" sx={{height: "24px", fontSize:"14px"}} onChange={(event) => {
                        if (filters.setName) {
                            filters.setName(event.target.value)
                        }
                    }}/>
                    {/* <PokemonCardInput placeholder="name" setStateFunction={filters.setName} filterType="name"/> */}
                    {/* <CustomInput placeholder={"name"}/> */}
                </Box>

                {/* Characteristics */}
                <Box display={"flex"} flexDirection={"column"} paddingLeft={"2px"} paddingRight={"2px"} width={"20%"}>
                    <CustomInput placeholder={"level"}/>
                    <CustomInput placeholder={"gender"}/>
                    <CustomInput placeholder={"shiny"}/>

                    <Box display={"flex"} padding={"auto"} justifyContent={"center"} height={"24px"} marginBottom={"48px"}>
                        <Autocomplete
                        disableClearable
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
                        renderInput={(params) => 
                            <TextField {...params} variant="standard"/>
                        } // the params thing is passing on props from Input to the rendered Component
                        renderTags={(values) => 
                            values.map(value => value.label).join(' ') // this renders the tags as a space separated string rather than using chips
                        }
                        options={[
                            {label: "fire"},{label: "flying"},{label: "ghost"},{label: "bug"},{label: "dark"},{label: "dragon"},
                            {label: "electric"},{label: "fairy"},{label: "fighting"},{label: "grass"},{label: "ground"},{label: "ice"},
                            {label: "normal"},{label: "poison"},{label: "psychic"},{label: "rock"},{label: "steel"},{label: "water"},
                        ]}
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
                                filters.setType( value.map((type) => type.label))
                            }
                        }}
                        isOptionEqualToValue={(value1, value2) => {
                            return value1.label == value2.label
                        }}
                        />
                    </Box>
                    <Autocomplete
                    sx={{
                        width: "100%",
                        '& .MuiInputBase-root': {
                            height: "24px",
                            fontSize: "14px"
                        },
                        fontSize: "14px",
                        overflow: "hidden"
                    }}
                    renderInput={(params) => 
                        <TextField {...params} sx={{overflow:"hidden"}} variant="standard"/>
                    } // the params thing is passing on props from Input to the rendered Component
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

                {/* Moves */}
                <Box display={"flex"} flexDirection={"column"} paddingLeft={"2px"} paddingRight={"2px"} width={"20%"}>
                    <CustomInput placeholder={"move"}/>
                    <CustomInput placeholder={"move"}/>
                    <CustomInput placeholder={"move"}/>
                    <CustomInput placeholder={"move"}/>

                    <Box display={"flex"} padding={"auto"} justifyContent={"right"} height={"48px"}>
                    </Box>
                    <Input placeholder="item" sx={{height: "24px", fontSize:"14px"}}/>
                </Box>

                {/* Stats */}
                <Box display={"flex"} paddingLeft={"2px"} paddingRight={"2px"} width={"20%"} justifyContent={"space-around"}>
                    <Box display={"flex"} flexDirection={"column"} marginLeft={"2px"} marginRight={"2px"}>
                        <Box height={"24px"} textAlign={"center"}>
                        </Box>
                        <Box height={"24px"} textAlign={"center"} fontSize={"14px"}>
                            Hp
                        </Box>
                        <Box height={"24px"} textAlign={"center"} fontSize={"14px"}>
                            Atk
                        </Box>
                        <Box height={"24px"} textAlign={"center"} fontSize={"14px"}>
                            Def
                        </Box>
                        <Box height={"24px"} textAlign={"center"} fontSize={"14px"}>
                            SpA
                        </Box>
                        <Box height={"24px"} textAlign={"center"} fontSize={"14px"}>
                            SpD
                        </Box>
                        <Box height={"24px"} textAlign={"center"} fontSize={"14px"}>
                            Spe
                        </Box>
                    </Box>

                    <Box display={"flex"} flexDirection={"column"} width={"20%"} marginLeft={"2px"} marginRight={"2px"}>
                        <Box height={"24px"} textAlign={"center"} fontSize={"14px"}>
                            EVs
                        </Box>
                        <CustomInput placeholder={""}/>
                        <CustomInput placeholder={""}/>
                        <CustomInput placeholder={""}/>
                        <CustomInput placeholder={""}/>
                        <CustomInput placeholder={""}/>
                        <CustomInput placeholder={""}/>
                    </Box>

                    <Box display={"flex"} flexDirection={"column"} width={"20%"} marginLeft={"2px"} marginRight={"2px"}> 
                        <Box height={"24px"} textAlign={"center"} fontSize={"14px"}>
                            IVs
                        </Box>
                        <CustomInput placeholder={""}/>
                        <CustomInput placeholder={""}/>
                        <CustomInput placeholder={""}/>
                        <CustomInput placeholder={""}/>
                        <CustomInput placeholder={""}/>
                        <CustomInput placeholder={""}/>
                    </Box>

                    <Box display={"flex"} flexDirection={"column"} width={"20%"} marginLeft={"2px"} marginRight={"2px"}> 
                        <Box height={"24px"} textAlign={"center"} fontSize={"14px"}>
                            
                        </Box>
                        <Box height={"24px"} textAlign={"center"} fontSize={"14px"}>
                            306
                        </Box>
                        <Box height={"24px"} textAlign={"center"} fontSize={"14px"}>
                            306
                        </Box>
                        <Box height={"24px"} textAlign={"center"} fontSize={"14px"}>
                            306
                        </Box>
                        <Box height={"24px"} textAlign={"center"} fontSize={"14px"}>
                            306    
                        </Box>
                        <Box height={"24px"} textAlign={"center"} fontSize={"14px"}>
                            306  
                        </Box>
                        <Box height={"24px"} textAlign={"center"} fontSize={"14px"}>
                            306  
                        </Box>
                    </Box>
                </Box>

                {/* Other */}
                <Box display={"flex"} flexDirection={"column"} paddingLeft={"2px"} paddingRight={"2px"} width={"20%"}>
                    <Box display={"flex"} justifyContent={"space-around"}>
                        <Box height={"24px"} textAlign={"center"} fontSize={"14px"}>
                            Import
                        </Box>
                        <Box height={"24px"} textAlign={"center"} fontSize={"14px"}>
                            Export
                        </Box>
                    </Box>
                    <CustomInput placeholder={"presets"}/>

                    <Box display={"flex"} justifyContent={"center"} height={"96px"} flexWrap={"wrap"}>
                        {["natural", "wild", "ancient_city", "trail_ruins", "pink_flowers"].map((preset) => {
                            return (
                                <img src={presetMap[preset]} style={{width:"24px", height:"24px"}} title={preset} key={preset}/>
                            )
                        })}
                    </Box>
                    <Input placeholder="nature" sx={{height: "24px", fontSize:"14px"}}/>
                </Box>
            </Box>
        )
    }
    return (
        <Fragment>

        </Fragment>
    )
}

export default PokemonCard