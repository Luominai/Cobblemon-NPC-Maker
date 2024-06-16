import { Box, Input } from "@mui/material"
import FilterContext from "./context/FilterContext"
import { useContext } from "react"

function PokemonCardNameAndImage() {
    const filters = useContext(FilterContext)
    return (
        <Box display={"flex"} flexDirection={"column"} paddingLeft={"2px"} paddingRight={"2px"} width={"20%"}>
            <Box height={"144px"}>

            </Box>
            <Input placeholder="name" sx={{height: "24px", fontSize:"14px"}} onChange={(event) => {
                if (filters.setName) {
                    filters.setName(event.target.value)
                }
            }}/>
            {/* <PokemonCardInput placeholder="name" setStateFunction={filters.setName} filterType="name"/> */}
            {/* <CustomInput placeholder={"name"}/> */}
        </Box>
    )
}

export default PokemonCardNameAndImage