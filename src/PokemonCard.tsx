import { Fragment } from "react/jsx-runtime";
import Pokemon from "./types/Pokemon";
import { Box, Grid, Input, Stack, TextField } from "@mui/material";

function PokemonCard({pokemon}: {pokemon: Pokemon|null}) {
    // if no pokemon is selected
    if (pokemon == null) {
        return (
            <Box display={"flex"} justifyContent={"space-evenly"}>
                <Box display={"flex"} flexDirection={"column"} paddingLeft={"2px"} paddingRight={"2px"}>
                    <Input placeholder="name"/>
                    <Box height={"160px"}>

                    </Box>
                    <Input placeholder="ability"/>
                </Box>

                <Box display={"flex"} flexDirection={"column"} paddingLeft={"2px"} paddingRight={"2px"} width={"33.3%"}>
                    <Input placeholder="move1" />
                    <Input placeholder="move2" />
                    <Input placeholder="move3" />
                    <Input placeholder="move4" />
                    <Box height={"64px"} display={"flex"}>
                        <Input placeholder="type1" sx={{width: "50%"}}/>
                        <Input placeholder="type2" sx={{width: "50%"}}/>
                    </Box>
                    <Input placeholder="item" />
                </Box>

                <Box display={"flex"} flexDirection={"column"} paddingLeft={"2px"} paddingRight={"2px"}>
                    <Input placeholder="move1" />
                    <Input placeholder="move2" />
                    <Input placeholder="move3" />
                    <Input placeholder="move4" />
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