import { TextField } from "@mui/material";
import Pokemon from "./types/Pokemon";
import { Fragment, useEffect, useState } from "react";

function Filter({listOfPokemon, setDisplayedPokemon}: {listOfPokemon: Array<Pokemon>, setDisplayedPokemon: Function}) {
    const [nameFilter, setNameFilter] = useState<string>("")
    const [typeFilter, setTypeFilter] = useState<string>("")
    const [abilityFilter, setAbilityFilter] = useState<string>("")

    useEffect(() => {
        let matchingPokemon = applyNameFilter(nameFilter, listOfPokemon)
        setDisplayedPokemon(matchingPokemon)
        
    }, [nameFilter, typeFilter, abilityFilter])
    
    return (
        <Fragment>
            <TextField 
            onChange={(event) => {
                setNameFilter(event.target.value)
            }}/>
            <TextField 
            onChange={(event) => {
                setTypeFilter(event.target.value)
            }}/>
            <TextField 
            onChange={(event) => {
                setAbilityFilter(event.target.value)
            }}/>
        </Fragment>
    )
}

function applyNameFilter(name: string, listOfPokemon: Array<Pokemon>) {
    // if no filter, do nothing
    if (name.trim() == "") {
        return listOfPokemon
    }

    let matchFirstPart = []
    let matchOtherParts = []
    for (let i = 0; i < listOfPokemon.length; i++) {
        const pokemon = listOfPokemon[i]
        const searchName = name.toLowerCase().replace(/[^a-z0-9]/gi, '')
        const parts = pokemon.name.split(" ")

        for (let j = 0; j < parts.length; j++) {
            const part = parts[j].toLowerCase().replace(/[^a-z0-9]/gi, '')
            if (part.startsWith(searchName)) {
                if (j == 0) {
                    matchFirstPart.push(pokemon)
                } else {
                    matchOtherParts.push(pokemon)
                }
                break
            }
        }
    }
    return matchFirstPart.concat(matchOtherParts)
}

export default Filter