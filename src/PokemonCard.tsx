import { Fragment } from "react/jsx-runtime";
import Pokemon from "./types/Pokemon";
import { Box, Grid, Input, Stack, TextField, Typography } from "@mui/material";
import { TypographyStyle } from "./styles/PokemonTableStyles";
import presetMap from "./other/PresetMap";
import PokemonCardInput from "./PokemonCardInput";
import FilterContext from "./FilterContext";
import { useContext } from "react";


function CustomInput({placeholder}: {placeholder: string}) {
    return <Input placeholder={placeholder} sx={{height: "24px", fontSize:"14px", paddingLeft:"3px"}}/>
}

function PokemonCard({pokemon}: {pokemon: Pokemon|null}) {
    const filters = useContext(FilterContext)
    // if no pokemon is selected
    if (pokemon == null) {
        return (
            <Box display={"flex"} justifyContent={"space-evenly"} alignItems={"center"} marginTop={"10px"} marginBottom={"10px"}>
                {/* Name and Image */}
                <Box display={"flex"} flexDirection={"column"} paddingLeft={"2px"} paddingRight={"2px"} width={"20%"}>
                    <Box height={"144px"}>

                    </Box>
                    <PokemonCardInput placeholder="name" setStateFunction={filters.setName} filterType="name"/>
                    {/* <CustomInput placeholder={"name"}/> */}
                </Box>

                {/* Characteristics */}
                <Box display={"flex"} flexDirection={"column"} paddingLeft={"2px"} paddingRight={"2px"} width={"20%"}>
                    <CustomInput placeholder={"level"}/>
                    <CustomInput placeholder={"gender"}/>
                    <CustomInput placeholder={"shiny"}/>

                    <Box display={"flex"} padding={"auto"} justifyContent={"right"} height={"72px"}>
                        <Input placeholder="type1" sx={{height: "24px", fontSize:"14px", width: "30%", marginRight:"5px"}}/>
                        <Input placeholder="type2" sx={{height: "24px", fontSize:"14px", width: "30%"}}/>
                    </Box>
                    <Input placeholder="ability" sx={{height: "24px", fontSize:"14px"}}/>
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