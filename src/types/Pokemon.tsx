type Pokemon = {
    name: string,
    minisprite: string,
    nationalPokedexNumber: number,
    typing: {
        primaryType: string,
        secondaryType: string,
    },
    abilities: {
        primaryAbility: string,
        secondaryAbility: string,
        hiddenAbility: string
    },
    baseStats: {
        hp: number, 
        attack: number,
        defence: number,
        special_attack: number,
        special_defence: number,
        speed: number
    },
    presets: Array<string>,
    moves: {
        levelup: Array<
            {
                name: string,
                level: number
            }
        >,
        tm: Array<string>,
        tutor: Array<string>,
        egg: Array<string>
    },
    minSpawnLevel: number | null
    // form: string
}

export default Pokemon