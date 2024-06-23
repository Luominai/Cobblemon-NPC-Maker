import { Fragment } from "react/jsx-runtime";
import Pokemon from "./types/Pokemon";
import { Box, Input } from "@mui/material";

import PokemonCardNameAndImage from "./PokemonCardNameAndImage";
import PokemonCardLevelGenderShinyTypeAbility from "./PokemonCardLevelGenderShinyTypeAbility";
import PokemonCardMovesItem from "./PokemonCardMovesItem";
import PokemonCardStats from "./PokemonCardStats";
import PokemonCardImportExportPresetsNature from "./PokemonCardImportExportPresetsNature";


function PokemonCard({pokemon}: {pokemon: Pokemon|null}) {
    // if no pokemon is selected
    if (pokemon == null) {
        return (
            <Box display={"flex"} justifyContent={"space-evenly"} alignItems={"center"} marginTop={"10px"} marginBottom={"10px"}>
                {/* Name and Image */}
                <PokemonCardNameAndImage/>

                {/* Characteristics */}
                <PokemonCardLevelGenderShinyTypeAbility/>

                {/* Moves */}
                <PokemonCardMovesItem/>

                {/* Stats */}
                <PokemonCardStats/>

                {/* Other */}
                <PokemonCardImportExportPresetsNature/>
            </Box>
        )
    }
    return (
        <Fragment>

        </Fragment>
    )
}

export default PokemonCard