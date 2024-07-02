import { createContext } from "react"

const FilterContext = createContext<{
    name: string,
    type: Array<string>,
    // primaryType: string,
    // secondaryType: string,
    ability: string,
    moves: Array<string>
    preset: Array<string>,
    level: number,
    setName: Function | null,
    setType: Function | null
    // setPrimaryType: Function | null,
    // setSecondaryType: Function | null,
    setAbility: Function | null,
    setMoves: Function | null
    setPreset: Function | null,
    setLevel: Function | null
}>({
    name: "",
    type: [],
    // primaryType: "",
    // secondaryType: "",
    ability: "",
    moves: ["", "", "", ""],
    preset: [],
    level: 100,
    setName: null,
    setType: null,
    // setPrimaryType: null,
    // setSecondaryType: null,
    setMoves: null,
    setAbility: null,
    setPreset: null,
    setLevel: null
})

export default FilterContext