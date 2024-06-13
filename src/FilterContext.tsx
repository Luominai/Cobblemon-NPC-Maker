import { createContext } from "react"

const FilterContext = createContext<{
    name: string,
    type: Array<string>,
    // primaryType: string,
    // secondaryType: string,
    ability: string,
    preset: string,
    level: string,
    setName: Function | null,
    setType: Function | null
    // setPrimaryType: Function | null,
    // setSecondaryType: Function | null,
    setAbility: Function | null,
    setPreset: Function | null,
    setLevel: Function | null
}>({
    name: "",
    type: [],
    // primaryType: "",
    // secondaryType: "",
    ability: "",
    preset: "",
    level: "",
    setName: null,
    setType: null,
    // setPrimaryType: null,
    // setSecondaryType: null,
    setAbility: null,
    setPreset: null,
    setLevel: null
})

export default FilterContext