import { Box, Input } from "@mui/material"

function PokemonCardStats() {
    return (
        <Box display={"flex"} paddingLeft={"2px"} paddingRight={"2px"} width={"20%"} justifyContent={"space-around"}>
            <Box display={"flex"} flexDirection={"column"} marginLeft={"2px"} marginRight={"2px"}>
                <Box height={"24px"} textAlign={"center"}>
                </Box>
                <Box height={"24px"} textAlign={"center"} fontSize={"14px"}>
                    Hp
                </Box>
                <Box height={"24px"} textAlign={"center"} fontSize={"14px"}>
                    Atk
                </Box>
                <Box height={"24px"} textAlign={"center"} fontSize={"14px"}>
                    Def
                </Box>
                <Box height={"24px"} textAlign={"center"} fontSize={"14px"}>
                    SpA
                </Box>
                <Box height={"24px"} textAlign={"center"} fontSize={"14px"}>
                    SpD
                </Box>
                <Box height={"24px"} textAlign={"center"} fontSize={"14px"}>
                    Spe
                </Box>
            </Box>

            <Box display={"flex"} flexDirection={"column"} width={"20%"} marginLeft={"2px"} marginRight={"2px"}>
                <Box height={"24px"} textAlign={"center"} fontSize={"14px"}>
                    EVs
                </Box>
                <Input placeholder={""} sx={{height: "24px", fontSize:"14px", paddingLeft:"3px"}}/>
                <Input placeholder={""} sx={{height: "24px", fontSize:"14px", paddingLeft:"3px"}}/>
                <Input placeholder={""} sx={{height: "24px", fontSize:"14px", paddingLeft:"3px"}}/>
                <Input placeholder={""} sx={{height: "24px", fontSize:"14px", paddingLeft:"3px"}}/>
                <Input placeholder={""} sx={{height: "24px", fontSize:"14px", paddingLeft:"3px"}}/>
                <Input placeholder={""} sx={{height: "24px", fontSize:"14px", paddingLeft:"3px"}}/>
            </Box>

            <Box display={"flex"} flexDirection={"column"} width={"20%"} marginLeft={"2px"} marginRight={"2px"}> 
                <Box height={"24px"} textAlign={"center"} fontSize={"14px"}>
                    IVs
                </Box>
                <Input placeholder={""} sx={{height: "24px", fontSize:"14px", paddingLeft:"3px"}}/>
                <Input placeholder={""} sx={{height: "24px", fontSize:"14px", paddingLeft:"3px"}}/>
                <Input placeholder={""} sx={{height: "24px", fontSize:"14px", paddingLeft:"3px"}}/>
                <Input placeholder={""} sx={{height: "24px", fontSize:"14px", paddingLeft:"3px"}}/>
                <Input placeholder={""} sx={{height: "24px", fontSize:"14px", paddingLeft:"3px"}}/>
                <Input placeholder={""} sx={{height: "24px", fontSize:"14px", paddingLeft:"3px"}}/>
            </Box>

            <Box display={"flex"} flexDirection={"column"} width={"20%"} marginLeft={"2px"} marginRight={"2px"}> 
                <Box height={"24px"} textAlign={"center"} fontSize={"14px"}>
                    
                </Box>
                <Box height={"24px"} textAlign={"center"} fontSize={"14px"}>
                    306
                </Box>
                <Box height={"24px"} textAlign={"center"} fontSize={"14px"}>
                    306
                </Box>
                <Box height={"24px"} textAlign={"center"} fontSize={"14px"}>
                    306
                </Box>
                <Box height={"24px"} textAlign={"center"} fontSize={"14px"}>
                    306    
                </Box>
                <Box height={"24px"} textAlign={"center"} fontSize={"14px"}>
                    306  
                </Box>
                <Box height={"24px"} textAlign={"center"} fontSize={"14px"}>
                    306  
                </Box>
            </Box>
        </Box>
    )
}

export default PokemonCardStats