import '../Style/PokeApi.css'
import { useEffect, useState  } from "react"
import DetallePokemon from "./DetallePokemon"



const PokeApi = () => {
    const [pokemones, setPokemones] = useState([])
    const [mostrar, setMostrar] = useState({mostrar:false, pokemon:{} })
    
    const verPokemon = (pokemon)=> setMostrar({mostrar:true, pokemon })

    const noVerPokemon = ()=> setMostrar({mostrar:false, pokemon:{} })




    useEffect(() => {
        const getPokemones = async () => {
            const reponse = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0')
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
                    name: poke.name,
                    img: poke.sprites.other.dream_world.front_default,
                    weight: poke.weight,
                    height: poke.height,
                    abilities,
                    stats,
                    types
                }
            })
            setPokemones(await Promise.all(newPokemones))
        }
        getPokemones()
    }, [])
    return (
        <>
            <DetallePokemon {...mostrar} cerrar = {noVerPokemon}/>
            <div>
            <h1 className="titulo">Pokedex</h1>

            <div className="container">
                
                {
                    pokemones.map(pokemon => {
                        return (
                            <div onClick={verPokemon} className="card" key={pokemon.id}>
                                <img src={pokemon.img} alt={pokemon.name} />
                                <p className="card-titulo">
                                <span >{pokemon.name}</span>
                                <span>#{pokemon.id}</span>
                                </p>
                                <p className="card-description">
                                <span>Peso: {pokemon.weight}</span>
                                <span>Atura: {pokemon.height}</span>
                                </p>
                            </div>
                            
                        )
                    })
                    
                }
            </div>
        </div>
        </>
    )
}

export default PokeApi
