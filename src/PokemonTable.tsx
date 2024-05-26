import { Table, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import Pokemon from "./Pokemon"
import settings from "./settings.json"

function PokemonTable({listOfPokemon}: {listOfPokemon: Array<Pokemon>}) {
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