import { TextField } from "@mui/material";


export default function Filter({setNameFilter, setTypeFilter, setAbilityFilter}: {setNameFilter: Function, setTypeFilter: Function, setAbilityFilter: Function}) {
    return (
        <>
            <TextField onChange={(event) => {
                setNameFilter(event.target.value)
            }}>
            </TextField>
        </>
    )
}