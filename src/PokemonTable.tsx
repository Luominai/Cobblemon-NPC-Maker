import { Table, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import PokemonTableRow from "./PokemonTableRow";
import { useState } from "react";
import Pokedex from "./Pokedex";
import { HeadStyle } from "./PokemonTableStyles";


// function query({filters}: {filters: {name: string, type: string, ability: string, move: string}}) {
    
// }

export default function PokemonTable({listOfPokemon}: {listOfPokemon: Pokedex}) {   
    const [page, setPage] = useState<number>(1)

    
    return (
        <Table>
            {/* The labels for the table columns */}
            <TableHead>
                <TableRow>
                    {["Name", "Type", "Ability", "Hidden Ability", "Hp", "Atk", "Def", "SpA", "SpD", "Spe"].map((field) => {
                        return (
                            <>
                                <TableCell sx={HeadStyle}>
                                    <Typography sx={{fontSize: "12px"}}>{field}</Typography>
                                </TableCell>
                            </>
                        )
                    })}
                </TableRow>
            </TableHead>

            {/* Map each pokemon in the list to a TableCell containing the information */}
            {Object.entries(listOfPokemon).map(([name, data]) => <PokemonTableRow pokemon={data}/>)}
        </Table>
    )
}
