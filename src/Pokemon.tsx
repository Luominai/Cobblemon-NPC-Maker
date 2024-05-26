type Pokemon = {
    name: string,
    nationalPokedexNumber: number,
    primaryType: string,
    secondaryType: string,
    abilities: {
        ability1: string,
        ability2: string,
        hidden: string
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
                movename: string,
                level: number
            }
        >,
        tm: Array<string>,
        tutor: Array<string>,
        egg: Array<string>
    },
    form: string
}

export default Pokemon