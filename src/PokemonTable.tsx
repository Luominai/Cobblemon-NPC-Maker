import { Table, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import Pokemon from "./Pokemon"
import settings from "./settings.json"
import initSqlJs, { Database } from "sql.js"
import { useEffect, useState } from "react";


// function query({filters}: {filters: {name: string, type: string, ability: string, move: string}}) {
    
// }

function PokemonTable({listOfPokemon}: {listOfPokemon: Array<Pokemon>}) {   
    const [db, setDb] = useState<Database|null>(null)

    useEffect(() => {
        const setup = async () => {
            // const SQL = await initSqlJs()
            const SQL = await initSqlJs({
                // Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
                // You can omit locateFile completely when running in node
                locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}`
            });
            // const database = new SQL.Database()
            const pokedexFile = new Uint8Array(await (await fetch('src/pokedex.db')).arrayBuffer());
            setDb(new SQL.Database(pokedexFile))
        }
        setup()
    }, [])

    const res = db?.exec("SELECT * FROM pokemon");
    console.log(res)

    return (
        <Table sx={{maxWidth: "50vw"}}>
            {/* The labels for the table columns */}
            <TableHead>
                <TableRow>
                    <TableCell>
                        <Typography fontSize={settings.smallFont}>No.</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography fontSize={settings.smallFont}>Name</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography fontSize={settings.smallFont}>Type</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography fontSize={settings.smallFont}>Abilities</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography fontSize={settings.smallFont}>Hidden Ability</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography fontSize={settings.smallFont}>Base Stats</Typography>
                    </TableCell>
                </TableRow>
            </TableHead>

            {/* Map each pokemon in the list to a TableCell containing the information */}
            {listOfPokemon.map((pokemon: Pokemon) => {
                return (
                    <TableRow>
                        <TableCell>
                            <Typography fontSize={settings.smallFont}>{pokemon.nationalPokedexNumber}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography fontSize={settings.smallFont}>{pokemon.name}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography fontSize={settings.smallFont}>{(pokemon.secondaryType == "") ? (pokemon.primaryType) : (pokemon.primaryType + '/' + pokemon.secondaryType)}</Typography>
                        </TableCell>
                        <TableCell sx={{paddingTop: 0, paddingBottom: 0}}>
                            <Typography fontSize={settings.smallFont}>
                                {pokemon.abilities.ability1}
                                <br></br>
                                {pokemon.abilities.ability2}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography fontSize={settings.smallFont}>
                                {pokemon.abilities.hidden}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography fontSize={settings.smallFont}>
                                {pokemon.baseStats.hp}
                            </Typography>
                        </TableCell>
                    </TableRow>
                )
            })}
        </Table>
    )
}

export default PokemonTable