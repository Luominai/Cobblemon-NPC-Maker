import { Box, Pagination, Table, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import PokemonTableRow from "./PokemonTableRow";
import { Fragment, useEffect, useState } from "react";
import { CellStyle } from "./styles/PokemonTableStyles";
import Pokemon from "./types/Pokemon";

function PokemonTable({listOfPokemon}: {listOfPokemon: Array<Pokemon>}) {   
    const [page, setPage] = useState<number>(1)
    const pokemonPerPage = 8
    const pokemonOnThisPage = listOfPokemon.slice(pokemonPerPage * (page - 1), pokemonPerPage * page)

    // When the list of pokemon changes, set the page back to 1
    useEffect(() => {
        setPage(1)
    }, [listOfPokemon])
    
    return (
        <Box>
            <Table sx={{width: "100%", margin: "auto"}}>
                {/* The labels for the table columns */}
                <TableHead>
                    <TableRow>
                        {["Name", "Type", "Ability", "Hidden Ability", "Hp", "Atk", "Def", "SpA", "SpD", "Spe"].map((field) => {
                            return (
                            <Fragment key={field}>
                                <TableCell sx={CellStyle}>
                                    <Typography sx={{fontSize: "12px"}} textAlign={"center"}>{field}</Typography>
                                </TableCell>
                            </Fragment>
                            )
                        })}
                    </TableRow>
                </TableHead>

                {/* Map each pokemon in the list to a TableCell containing the information */}
                {pokemonOnThisPage.map((pokemon) => <PokemonTableRow pokemon={pokemon} key={pokemon.name}/>)}
            </Table>
            <Pagination 
            count={Math.ceil(listOfPokemon.length / pokemonPerPage)}
            onChange={(event, value) => {
                setPage(value)
            }}
            page={page}
            siblingCount={4}
            sx={{"button:focus": {outline: "none"}, padding: "auto"}}
            />
        </Box>
    )
}

export default PokemonTable