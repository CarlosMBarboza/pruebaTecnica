import { useEffect, useState  } from "react"

function usePokemones() {
    const [pokemones, setPokemones] = useState([])

    
    useEffect(() => {
        const getPokemones = async () => {
            const reponse = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0')
            const listaPokemones = await reponse.json()
            const { results } = listaPokemones

            const newPokemones = results.map(async (pokemon) => {
                const response = await fetch(pokemon.url)
                const poke = await response.json()

                // Detalles Pokemon
                const abilities = poke.abilities.map(a => a.ability.name)
                const stats = poke.stats.map(s =>{return {name: s.stat.name, base: s.base_stat}})
                const types = poke.types.map(t => t.type.name)

                return {
                    id: poke.id,
                    nombre: poke.name,
                    imagen: poke.sprites.other.dream_world.front_default,
                    altura: poke.weight,
                    peso: poke.height,
                    abilities,
                    stats,
                    types
                }
            })
            setPokemones(await Promise.all(newPokemones))
        }
        getPokemones()
    }, [])

    return {pokemones}
}

export default usePokemones
