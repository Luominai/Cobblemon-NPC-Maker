import { Input, styled } from "@mui/material"
import React, { useContext } from "react"
import FilterContext from "./FilterContext"

interface PokemonCardInputProps {
    placeholder: string, 
    setStateFunction: Function | null, 
    filterType: string, 
    sx?: Record<any, any>}

function PokemonCardInput({placeholder, setStateFunction, filterType, sx={height: "24px", fontSize:"14px", paddingLeft:"3px"}}: PokemonCardInputProps) {
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
        sx={sx}/>
        </>
    )
}

// const StyledInput = styled(Input, {
//     shouldForwardProp: (prop) => prop !== "primary"
// })({
//     height: "24px",
//     fontSize: "14px",
//     paddingLeft: "3px"
// })

export default PokemonCardInput