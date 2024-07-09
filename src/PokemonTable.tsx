import { Box, Pagination, Table, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import PokemonTableRow from "./PokemonTableRow";
import { Fragment, useContext, useEffect, useState } from "react";
import { CellStyle } from "./styles/PokemonTableStyles";
import Pokemon from "./types/Pokemon";
import TableOrderContext from "./context/TableOrderContext";

function PokemonTable({listOfPokemon}: {listOfPokemon: Array<Pokemon>}) {   
    const [page, setPage] = useState<number>(1)
    const pokemonPerPage = 8
    const pokemonOnThisPage = listOfPokemon.slice(pokemonPerPage * (page - 1), pokemonPerPage * page)

    // When the list of pokemon changes, set the page back to 1
    useEffect(() => {
        setPage(1)
    }, [listOfPokemon])

    const tableOrder = useContext(TableOrderContext)
    
    return (
        <Box display={"flex"} flexDirection={"column"}>
            <Table>
                {/* The labels for the table columns */}
                <TableHead>
                    <TableRow>
                        {[["Level", "40px"], ["Name", "120px"], ["Type", "60px"], ["Ability", "100px"], ["Hidden Ability", "100px"],
                        ["Hp", "25px"], ["Atk", "25px"], ["Def", "25px"], ["SpA", "25px"], ["SpD", "25px"], ["Spe", "25px"], 
                        ["Presets", "168px"]].map(([field, width]) => {
                            return (
                            <Fragment key={field}>
                                <TableCell 
                                sx={CellStyle} 
                                onClick={() => {
                                    // if this field is the current sortBy, update order
                                    if (tableOrder.sortBy == field.toLowerCase()) {
                                        if (tableOrder.setOrder) {
                                            tableOrder.setOrder(((tableOrder.order + 2) % 3) - 1) // the order cycles between -1, 0, 1
                                        }
                                    }
                                    // if this field is not the current sortBy, update sortBy
                                    else {
                                        if (tableOrder.setSortBy && tableOrder.setOrder) {
                                            tableOrder.setSortBy(field.toLowerCase())
                                            tableOrder.setOrder(1)
                                        }
                                    }
                                }}
                                >
                                    <Typography sx={{fontSize: "12px"}} textAlign={"center"} width={width} margin={"auto"}>{field}</Typography>
                                </TableCell>
                            </Fragment>
                            )
                        })}
                    </TableRow>
                </TableHead>

                {/* Map each pokemon in the list to a TableCell containing the information */}
                {pokemonOnThisPage.map((pokemon) => <PokemonTableRow pokemon={pokemon} key={pokemon.name}/>)}
            </Table>
            <Box margin={"auto"}>
                <Pagination 
                count={Math.ceil(listOfPokemon.length / pokemonPerPage)}
                onChange={(event, value) => {
                    setPage(value)
                }}
                page={page}
                siblingCount={6}
                sx={{"button:focus": {outline: "none"}, margin: "auto", width:"100%"}}
                />
            </Box>
        </Box>
    )
}

export default PokemonTable