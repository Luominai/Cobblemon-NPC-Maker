import { Fragment } from "react/jsx-runtime";
import Pokemon from "./types/Pokemon";
import { Box, Grid, Input, Select, Stack, TextField, Typography, MenuItem, Autocomplete } from "@mui/material";
import { TypographyStyle } from "./styles/PokemonTableStyles";
import presetMap from "./other/PresetMap";
import PokemonCardInput from "./PokemonCardInput";
import PokemonCardSelect from "./PokemonCardSelect";
import FilterContext from "./FilterContext";
import { useContext } from "react";


function CustomInput({placeholder}: {placeholder: string}) {
    return <Input placeholder={placeholder} sx={{height: "24px", fontSize:"14px"}}/>
}

const CustomInputStyle = {height: "24px", fontSize:"14px"}

function PokemonCard({pokemon}: {pokemon: Pokemon|null}) {
    const filters = useContext(FilterContext)
    // if no pokemon is selected
    if (pokemon == null) {
        return (
            <Box display={"flex"} justifyContent={"space-evenly"} alignItems={"center"} margin={"3px"}>
                {/* Name and Image */}
                <Box display={"flex"} flexDirection={"column"} paddingLeft={"2px"} paddingRight={"2px"} width={"20%"}>
                    <Box height={"144px"}>

                    </Box>
                    <Input placeholder="name" size="small" sx={{fontSize:"14px"}} onChange={(event) => {
                        if (filters.setName) {
                            filters.setName(event.target.value)
                        }
                    }}/>
                </Box>

                {/* Characteristics */}
                <Box display={"flex"} flexDirection={"column"} paddingLeft={"2px"} paddingRight={"2px"} width={"20%"}>
                    <Input placeholder="name" size="small" sx={{fontSize:"14px"}}/>
                    <Input placeholder="name" size="small" sx={{fontSize:"14px"}}/>
                    <Input placeholder="name" size="small" sx={{fontSize:"14px"}}/>

                    <Box display={"flex"} padding={"auto"} justifyContent={"space-around"} height={"72px"} >
                        <Autocomplete
                        size="small"
                        renderInput={(params) => 
                        <TextField 
                            variant="standard" 
                            placeholder="typing" {...params}
                            inputProps={{
                                style: {
                                    fontSize:"14px"
                                }
                            }}
                        />}
                        options={[
                            { label: 'The Shawshank Redemption', year: 1994 },
                        ]}
                        >
                        </Autocomplete>
                    </Box>
                    <Input placeholder="name" size="small" sx={{fontSize:"14px"}}/>
                </Box>

                {/* Moves */}
                <Box display={"flex"} flexDirection={"column"} paddingLeft={"2px"} paddingRight={"2px"} width={"20%"}>
                    <Input placeholder="name" size="small" sx={{fontSize:"14px"}}/>
                    <Input placeholder="name" size="small" sx={{fontSize:"14px"}}/>
                    <Input placeholder="name" size="small" sx={{fontSize:"14px"}}/>
                    <Input placeholder="name" size="small" sx={{fontSize:"14px"}}/>

                    <Box display={"flex"} padding={"auto"} justifyContent={"right"} height={"48px"}>
                    </Box>
                    <Input placeholder="name" size="small" sx={{fontSize:"14px"}}/>
                </Box>

                {/* Stats */}
                <Box display={"flex"} paddingLeft={"2px"} paddingRight={"2px"} width={"20%"} justifyContent={"space-evenly"}>
                    <Box display={"flex"} flexDirection={"column"} width={"20%"} marginLeft={"2px"} marginRight={"2px"} justifyContent={"space-between"}> 
                        <Box textAlign={"center"} fontSize={"14px"} flexBasis={1} flexGrow={1}>
                            
                        </Box>
                        <Box textAlign={"center"} fontSize={"14px"}flexBasis={1}flexGrow={1}>
                            Hp
                        </Box>
                        <Box textAlign={"center"} fontSize={"14px"}flexBasis={1}flexGrow={1}>
                            Atk
                        </Box>
                        <Box textAlign={"center"} fontSize={"14px"}flexBasis={1}flexGrow={1}>
                            Def
                        </Box>
                        <Box  textAlign={"center"} fontSize={"14px"}flexBasis={1}flexGrow={1}>
                            SpA    
                        </Box>
                        <Box textAlign={"center"} fontSize={"14px"}flexBasis={1}flexGrow={1}>
                            SpD  
                        </Box>
                        <Box textAlign={"center"} fontSize={"14px"}flexBasis={1}flexGrow={1}>
                            Spe  
                        </Box>
                    </Box>

                    <Box display={"flex"} flexDirection={"column"} width={"20%"} marginLeft={"2px"} marginRight={"2px"}>
                        <Box textAlign={"center"} fontSize={"14px"}>
                            EVs
                        </Box>
                        <Input placeholder="" size="small" sx={{fontSize:"14px"}}/>
                        <Input placeholder="" size="small" sx={{fontSize:"14px"}}/>
                        <Input placeholder="" size="small" sx={{fontSize:"14px"}}/>
                        <Input placeholder="" size="small" sx={{fontSize:"14px"}}/>
                        <Input placeholder="" size="small" sx={{fontSize:"14px"}}/>
                        <Input placeholder="" size="small" sx={{fontSize:"14px"}}/>
                    </Box>

                    <Box display={"flex"} flexDirection={"column"} width={"20%"} marginLeft={"2px"} marginRight={"2px"}> 
                        <Box textAlign={"center"} fontSize={"14px"}>
                            IVs
                        </Box>
                        <Input placeholder="" size="small" sx={{fontSize:"14px"}}/>
                        <Input placeholder="" size="small" sx={{fontSize:"14px"}}/>
                        <Input placeholder="" size="small" sx={{fontSize:"14px"}}/>
                        <Input placeholder="" size="small" sx={{fontSize:"14px"}}/>
                        <Input placeholder="" size="small" sx={{fontSize:"14px"}}/>
                        <Input placeholder="" size="small" sx={{fontSize:"14px"}}/>
                    </Box>

                    <Box display={"flex"} flexDirection={"column"} width={"20%"} marginLeft={"2px"} marginRight={"2px"} justifyContent={"space-evenly"}> 
                        <Box textAlign={"center"} fontSize={"14px"}flexBasis={1} flexGrow={1}>
                            
                        </Box>
                        <Box textAlign={"center"} fontSize={"14px"}flexBasis={1} flexGrow={1}>
                            306
                        </Box>
                        <Box textAlign={"center"} fontSize={"14px"}flexBasis={1} flexGrow={1}>
                            306
                        </Box>
                        <Box textAlign={"center"} fontSize={"14px"}flexBasis={1} flexGrow={1}>
                            306
                        </Box>
                        <Box  textAlign={"center"} fontSize={"14px"}flexBasis={1} flexGrow={1}>
                            306    
                        </Box>
                        <Box textAlign={"center"} fontSize={"14px"}flexBasis={1} flexGrow={1}>
                            306  
                        </Box>
                        <Box textAlign={"center"} fontSize={"14px"}flexBasis={1} flexGrow={1}>
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
                                <img src={presetMap[preset]} style={{width:"24px", height:"24px"}} title={preset}/>
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