import { Box, Input } from "@mui/material"

function PokemonCardMoves() {
    return (
        <Box display={"flex"} flexDirection={"column"} paddingLeft={"2px"} paddingRight={"2px"} width={"20%"}>
            <Input placeholder="name" size="small" sx={{fontSize:"14px"}}/>
            <Input placeholder="name" size="small" sx={{fontSize:"14px"}}/>
            <Input placeholder="name" size="small" sx={{fontSize:"14px"}}/>
            <Input placeholder="name" size="small" sx={{fontSize:"14px"}}/>

            <Box display={"flex"} padding={"auto"} justifyContent={"right"} height={"48px"}>
            </Box>
            <Input placeholder="name" size="small" sx={{fontSize:"14px"}}/>
        </Box>
    )
}

export default PokemonCardMoves