import { Fragment } from "react/jsx-runtime";
import Pokemon from "./types/Pokemon";
import { Box, Grid, Input, Stack, TextField } from "@mui/material";

function PokemonCard({pokemon}: {pokemon: Pokemon|null}) {
    // if no pokemon is selected
    if (pokemon == null) {
        return (
            <Box>
                <Grid container margin={"5px"} padding={"5px"} border={"1px solid black"} borderRadius={"10px"}>
                    <Stack marginLeft={"3px"} marginRight={"3px"}>
                        <Input placeholder="name"/>
                        <Box height={"160px"}>

                        </Box>
                        <Input placeholder="ability"/>
                    </Stack>

                    <Stack marginLeft={"3px"} marginRight={"3px"}>
                        <Input placeholder="move1" />
                        <Input placeholder="move2" />
                        <Input placeholder="move3" />
                        <Input placeholder="move4" />
                        <Box height={"64px"}>

                        </Box>
                        <Input placeholder="item" />
                    </Stack>

                    <Stack>
                        
                    </Stack>
                </Grid>
            </Box>
        )
    }
    return (
        <Fragment>

        </Fragment>
    )
}

export default PokemonCard