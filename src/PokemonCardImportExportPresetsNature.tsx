import { Box, Input, Autocomplete, TextField } from "@mui/material"
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
            <Autocomplete
                autoHighlight
                filterSelectedOptions
                multiple
                sx={{
                    width: "100%",
                    '& .MuiInputBase-root': {
                        height: "24px",
                        fontSize: "14px"
                    },
                    fontSize: "14px",
                    overflow: "hidden"
                }}
                renderInput={(params) => {
                    return <TextField {...params} variant="standard" placeholder={"presets"}/> // the params thing is passing on props from Input to the rendered Component
                }} 
                renderTags={() => null} // disable tag rendering so we can render it our own way
                options={Object.entries(presetMap).map(([preset, img_link]) => {
                    return {label: preset, img_link: img_link}
                })}
                renderOption={(props, option) => {
                    return (
                        <li {...props}>
                            {option.label}
                            <img src={option.img_link} style={{width:"24px", height:"24px", marginLeft: "4px"}}/>
                        </li>
                    )
                }}
                getOptionLabel={(option) => {
                    // adding a space to the option means you can enter whitespace and still have options show up, ex: " fire" still shows the option for fire
                    // the whitespace also doesn't shift the label over
                    return " " + option.label 
                }} 
                ListboxProps={{
                    style: {
                        maxHeight: "200px"
                    }
                }}
                slotProps={{
                    paper: {
                        style: {
                            fontSize: "14px"
                        }
                    }
                }}
                getOptionDisabled={() => {
                    return filters.preset.length >= 7
                }}
                onChange={(event, value) => {
                    if (filters.setPreset) {
                        filters.setPreset(value.map((type) => type.label))
                    }
                }}
                isOptionEqualToValue={(value1, value2) => {
                    return value1.label == value2.label
                }}
                />

            <Box display={"flex"} justifyContent={"center"} height={"96px"} flexWrap={"wrap"} flexGrow={0}>
                {filters.preset.map((preset) => {
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
