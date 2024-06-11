import { Autocomplete, Input, Select, styled, TextField } from "@mui/material"
import React, { useContext } from "react"
import FilterContext from "./FilterContext"

interface PokemonCardInputProps {
    placeholder: string, 
    setStateFunction: Function | null, 
    filterType: string, 
    sx?: Record<any, any>}

function PokemonCardSelect({placeholder, setStateFunction, filterType, sx={height: "24px", fontSize:"14px", paddingLeft:"3px"}}: PokemonCardInputProps) {
    const filters = useContext(FilterContext)
    return (
        <>
        <Select
        sx={sx}
        />
        </>
    )
}

export default PokemonCardSelect