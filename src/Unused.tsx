// The components here are unused but are useful to me for learning

import { TextField } from "@mui/material"

function CustomTextField ({height, width}: {height: string, width:string}) {
    return (
        <TextField
            variant='outlined'
            label="custom"
            sx={{
                '.MuiFormLabel-root': { 
                    top: "-10px"
                },
                '.MuiFormLabel-root.Mui-focused': { 
                    top: "3px"
                },
                '.MuiInputBase-input' : {paddingTop: "0px", paddingBottom: "0px"},
                height: height,
                width: width
            }}
            InputProps={{
                sx: {
                    height: height,
                    width: width,
                    fontSize: "12px"
                }
            }}
            InputLabelProps={{
                sx: {
                    fontSize: "12px"
                },
                disableAnimation: true
            }}
            
        />
    )
}