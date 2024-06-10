import { Input } from "@mui/material"
import React, { useContext } from "react"
import FilterContext from "./FilterContext"

function PokemonCardInput({placeholder, setStateFunction, filterType}: {placeholder: string, setStateFunction: Function | null, filterType: string}) {
    const filters = useContext(FilterContext)
    return (
        <>
        <Input 
        placeholder={placeholder} 
        onChange={(event) => {
            if (setStateFunction) {
                setStateFunction(event.target.value)
            }
        }}
        sx={{height: "24px", fontSize:"14px", paddingLeft:"3px"}}/>
        </>
    )
}

export default PokemonCardInput