import { Fragment } from "react/jsx-runtime";
import { Box, Input } from "@mui/material";

import PokemonCardNameAndImage from "./PokemonCardNameAndImage";
import PokemonCardLevelGenderShinyTypeAbility from "./PokemonCardLevelGenderShinyTypeAbility";
import PokemonCardMovesItem from "./PokemonCardMovesItem";
import PokemonCardStats from "./PokemonCardStats";
import PokemonCardImportExportPresetsNature from "./PokemonCardImportExportPresetsNature";
import SelectedPokemonContext from "./context/SelectedPokemonContext";
import { useContext } from "react";


function PokemonCard() {
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

export default PokemonCard