import { Fragment } from "react/jsx-runtime";
import Pokemon from "./types/Pokemon";
import { Autocomplete, Box, Grid, Input, Stack, TextField, Typography } from "@mui/material";
import { TypographyStyle } from "./styles/PokemonTableStyles";
import presetMap from "./other/PresetMap";
import PokemonCardInput from "./PokemonCardInput";
import FilterContext from "./FilterContext";
import { useContext } from "react";


const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
  ];

  interface FilmOptionType {
    title: string;
    year: number;
  }

const defaultProps = {
    options: top100Films,
    getOptionLabel: (option: FilmOptionType) => option.title,
  };
  const flatProps = {
    options: top100Films.map((option) => option.title),
  };



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

                    <Box display={"flex"} padding={"auto"} justifyContent={"center"} height={"72px"}>
                        <Autocomplete
                        sx={{
                            width: "100%",
                            '& .MuiInputBase-root': {
                                height: "24px",
                                fontSize: "14px"
                            },
                            fontSize: "14px"
                        }}
                        renderInput={(params) => <TextField {...params} variant="standard"/>}
                        options={[
                            {label: "fire"},
                            {label: "flying"},
                            {label: "ghost"},
                            {label: "c"},
                            {label: "d"}
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
                        />
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