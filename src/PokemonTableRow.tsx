import { TableRow, TableCell, Typography } from "@mui/material"
import settings from "./settings.json"
import Pokemon from "./Pokemon"
import { CellStyle } from "./PokemonTableStyles"

const statsMap: {[key: string]: string} = {
    "hp": "Hp",
    "attack": "Atk",
    "defence": "Def",
    "special_attack": "SpA",
    "special_defence": "SpD",
    "speed": "Spe"
}

export default function PokemonTableRow({pokemon}: {pokemon: Pokemon}) {
    return (
        <>
            <TableRow>
                <TableCell sx={CellStyle}>
                    <Typography fontSize={settings.smallFont}>
                        <img src={pokemon.minisprite} style={{verticalAlign: "middle"}}/>
                        <span style={{textAlign: "center", margin: "auto", display: "flex"}}>
                            {pokemon.name}
                        </span>
                    </Typography>
                </TableCell>
                <TableCell sx={CellStyle}>
                    <Typography fontSize={settings.smallFont}>
                        {Object.entries(pokemon.typing).map(([key, value]) => {
                            if (key == "secondaryType" && value != "") {
                                return ("/" + value)
                            }
                            return value
                        })}
                    </Typography>
                </TableCell>
                <TableCell sx={CellStyle}>
                    <Typography fontSize={settings.smallFont}>
                        {pokemon.abilities.primaryAbility}
                        <br></br>
                        {pokemon.abilities.secondaryAbility}
                    </Typography>
                </TableCell>
                <TableCell sx={CellStyle}>
                    <Typography fontSize={settings.smallFont}>{pokemon.abilities.hiddenAbility}</Typography>
                </TableCell>
                {Object.entries(pokemon.baseStats).map(([stat, value]) => {
                    return (
                        <>
                            <TableCell sx={CellStyle}>
                                <Typography fontSize={10} color={"lightgray"}>{statsMap[stat]}</Typography>
                                <Typography fontSize={settings.smallFont}>{value}</Typography>
                            </TableCell>
                        </>
                    )
                })}
            </TableRow>
        </>
    )
}