import { Box, Input } from "@mui/material"

function StatRow({stat, value}: {stat: string, value: number}) {
    return (
        <Box display={"flex"}>
            <Box textAlign={"center"} fontSize={"14px"}flexBasis={1}flexGrow={1} marginLeft={"1px"} marginRight={"1px"}>
                {stat}
            </Box>
            <Input placeholder="name" size="small" sx={{fontSize:"14px", marginLeft:"1px", marginRight:"1px"}}/>
            <Input placeholder="name" size="small" sx={{fontSize:"14px",marginLeft:"1px", marginRight:"1px"}}/>
            <Box textAlign={"center"} fontSize={"14px"}flexBasis={1}flexGrow={1} marginLeft={"1px"} marginRight={"1px"}>
                {value}
            </Box>
        </Box>
    )
}

function PokemonCardStats() {
    return (
        <Box display={"flex"} flexDirection={"column"} height={"100%"} width={"20%"}>
            <Box display={"flex"}>
                <Box display={"flex"}>

                </Box>
                <Box display={"flex"} textAlign={"center"} fontSize={"14px"}>
                    EVs
                </Box>
                <Box display={"flex"} textAlign={"center"} fontSize={"14px"}>
                    IVs
                </Box>
                <Box display={"flex"}>
                    
                </Box>
            </Box>

            {["Hp", "Atk", "Def", "SpA", "SpD", "Spe"].map((stat) => {
                return <StatRow stat={stat} value={306}/>
            })}
        </Box>
    )
}

export default PokemonCardStats