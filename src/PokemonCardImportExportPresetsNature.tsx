import { Box, Input } from "@mui/material"
import FilterContext from "./context/FilterContext"
import { useContext } from "react"
import presetMap from "./other/PresetMap"

function PokemonCardImportExportPresetsNature() {
    const filters = useContext(FilterContext)
    return (
        <Box display={"flex"} flexDirection={"column"} paddingLeft={"2px"} paddingRight={"2px"} width={"20%"}>
            <Box display={"flex"} justifyContent={"space-around"}>
                <Box height={"24px"} textAlign={"center"} fontSize={"14px"}>
                    Import
                </Box>
                <Box height={"24px"} textAlign={"center"} fontSize={"14px"}>
                    Export
                </Box>
            </Box>
            <Input placeholder={"presets"} sx={{height: "24px", fontSize:"14px"}}/>

            <Box display={"flex"} justifyContent={"center"} height={"96px"} flexWrap={"wrap"}>
                {["natural", "wild", "ancient_city", "trail_ruins", "pink_flowers"].map((preset) => {
                    return (
                        <img src={presetMap[preset]} style={{width:"24px", height:"24px"}} title={preset} key={preset}/>
                    )
                })}
            </Box>
            <Input placeholder="nature" sx={{height: "24px", fontSize:"14px"}}/>
        </Box>
    )
}

export default PokemonCardImportExportPresetsNature
