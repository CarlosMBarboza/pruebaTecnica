import '../Style/Detalle.css'

function DetallePokemon (mostrar, pokemon, cerrar)  {
    return (
        <div className='modal-container' onClick={cerrar} style ={{display: mostrar ? 'grid' : 'none'}}>
            
        </div>
    )
}

export default DetallePokemon
