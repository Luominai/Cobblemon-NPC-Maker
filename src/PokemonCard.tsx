import { Fragment } from "react/jsx-runtime";
import Pokemon from "./types/Pokemon";
import { Box, Grid, Input, Stack, TextField } from "@mui/material";

function PokemonCard({pokemon}: {pokemon: Pokemon|null}) {
    // if no pokemon is selected
    if (pokemon == null) {
        return (
            <Box display={"flex"} justifyContent={"space-evenly"} alignItems={"center"}>
                <Box display={"flex"} flexDirection={"column"} paddingLeft={"2px"} paddingRight={"2px"} width={"30%"}>
                    {/* <Input placeholder="name"/> */}
                    <Box height={"128px"}>

                    </Box>
                    <Input placeholder="name"/>
                </Box>

                <Box display={"flex"} flexDirection={"column"} paddingLeft={"2px"} paddingRight={"2px"} width={"30%"}>
                    <Input placeholder="move1" />
                    <Input placeholder="move2" />
                    <Input placeholder="move3" />
                    <Input placeholder="move4" />
                    <Box height={"32px"} display={"flex"} padding={"auto"}>
                        <Input placeholder="type1" sx={{height:"32px", marginLeft: "2px", marginRight: "2px"}}/>
                        <Input placeholder="type2" sx={{height:"32px", marginLeft: "2px", marginRight: "2px"}}/>
                    </Box>
                    {/* <Input placeholder="item" /> */}
                </Box>

                <Box display={"flex"} flexDirection={"column"} paddingLeft={"2px"} paddingRight={"2px"} width={"30%"}>
                    <Input placeholder="a" />
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