import '../Style/PokeApi.css';
import  { useState } from 'react';
import usePokemones from '../hooks/usePokemones';
import DetallePokemon from './DetallePokemon';

function Pokemon( {id, imagen, nombre, peso, altura, verPokemon }) {
    return (
        <div className="card" onClick={verPokemon} key={id}>
            <img src={imagen} alt={nombre} />
            <p className="card-titulo">
                <span>{nombre}</span>
                <span>#{id}</span>
            </p>
            <p className="card-description">
                <span>Peso: {peso}</span>
                <span>Altura: {altura}</span>
            </p>
        </div>
    );
}

const PokeApi = () => {
    const { pokemones } = usePokemones();
    const [mostrar, setMostrar] = useState({ mostrar: false, pokemon: {} });

    const verPokemon = (pokemon) => setMostrar({ mostrar: true, pokemon });
    const noVerPokemon = () => setMostrar({ mostrar: false, pokemon: {} });

    return (
        <>
            <DetallePokemon {...mostrar} cerrar={noVerPokemon} />
            <div>
                <h1 className="titulo">Pokedex</h1>
                <section className="container">
                    {pokemones.map(pokemon => <Pokemon {...pokemon} key={pokemon.id} verPokemon={() => verPokemon(pokemon)} />)}
                </section>
            </div>
        </>
    );
};

export default PokeApi;
