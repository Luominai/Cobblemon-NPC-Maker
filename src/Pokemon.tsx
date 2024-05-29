type Pokemon = {
    name: string,
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
    // form: string
}

export default Pokemon