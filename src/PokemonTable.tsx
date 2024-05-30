import { Table, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import PokemonTableRow from "./PokemonTableRow";
import { useState } from "react";
import { CellStyle } from "./PokemonTableStyles";
import Pokemon from "./types/Pokemon";

export default function PokemonTable({listOfPokemon}: {listOfPokemon: Array<Pokemon>}) {   
    const [page, setPage] = useState<number>(1)
    const pokemonPerPage = 8
    const pokemonOnThisPage = listOfPokemon.slice(pokemonPerPage * (page - 1), pokemonPerPage * page)
    
    return (
        <Table>
            {/* The labels for the table columns */}
            <TableHead>
                <TableRow>
                    {["Name", "Type", "Ability", "Hidden Ability", "Hp", "Atk", "Def", "SpA", "SpD", "Spe"].map((field) => {
                        return (
                            <>
                                <TableCell sx={CellStyle}>
                                    <Typography sx={{fontSize: "12px"}} textAlign={"center"}>{field}</Typography>
                                </TableCell>
                            </>
                        )
                    })}
                </TableRow>
            </TableHead>

            {/* Map each pokemon in the list to a TableCell containing the information */}
            {pokemonOnThisPage.map((pokemon) => <PokemonTableRow pokemon={pokemon}/>)}
        </Table>
    )
}
