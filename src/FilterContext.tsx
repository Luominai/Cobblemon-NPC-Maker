import { createContext } from "react"

const FilterContext = createContext<{
    name: string,
    type: string
    ability: string
    preset: string
    level: string
    setName: Function | null,
    setType: Function | null,
    setAbility: Function | null,
    setPreset: Function | null,
    setLevel: Function | null
}>({
    name: "",
    type: "",
    ability: "",
    preset: "",
    level: "",
    setName: null,
    setType: null,
    setAbility: null,
    setPreset: null,
    setLevel: null
})

export default FilterContext