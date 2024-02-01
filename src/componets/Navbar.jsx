
import { useState, useEffect } from "react";
import { Luna, Sol, Logo  } from "./Icons";
import '../Style/NavBar.css'

const Navbar = () => {
    const [tema, setTema] = useState('claro')

    const handleChange = (e) => setTema(e.target.checked ? 'oscuro' : 'claro')

    useEffect(() => {
        document.body.setAttribute('data-tema', tema)
    }, [tema])
    return (
        <nav className="nav">

            <Logo />
            <h1 className="nav-titulo">Prueba Tecnica FooTalent</h1>
            <div className="switch">
                <Sol />
                <label>
                <input type="checkbox" className="check-switch" onChange={handleChange} hidden />
                <span className="slider"></span>
                </label>
                
                <Luna />
            </div>
        </nav>
    )
}

export default Navbar;