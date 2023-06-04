import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import axios from 'axios';
import '../perfil/popupPerfil.css'

const PopUpPerfil = ({isOpen, onClose, logged}) => {
    const navigate = useNavigate();
    const perfil = useRef(null);
    const [anfitrion, setAnfitrion] = useState(false);


    const handleClose = () => {
        onClose();
    }

    const onClickCerrarSesion = (e) => {
        e.preventDefault();

        localStorage.removeItem('token');
        navigate("/");
        window.location.reload(true);
    }

    /*Hook que cierra el popup cuando se clicka fuera*/
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (perfil.current && !perfil.current.contains(event.target)) {
            onClose();
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);

        if (localStorage.getItem('token') != null) {
            axios.post("http://localhost:8080/esAnfitrion", { token: localStorage.getItem('token')})
            .then(response => {
                setAnfitrion(response.data);
                console.log(response.data);
            }
            )
        }
    }, []);

    return(
        <div ref={perfil}>
            {isOpen && 
            
            <div className="perfil">
                <a onClick={handleClose} className='cerrar'>Cerrar</a>
                <hr></hr>

                <div>
                    <div hidden={logged} onClick={() => navigate("/login")}>Iniciar sesión</div>
                    <div hidden={!logged} onClick={() => navigate("/perfil")}>Mi perfil</div>
                </div>

                <div className='registro'>
                    <div hidden={logged} onClick={() => navigate("/registro")}>Regístrate</div>
                    <div hidden={!logged} onClick={onClickCerrarSesion}>Cerrar sesión</div>
                </div>

                <div className='anfitrion'>
                    <div hidden={anfitrion} onClick={() => navigate("/anfitrion")}>Conviertete en anfitrión</div>
                    <div hidden={!anfitrion} onClick={() => navigate("/crearAlojamiento")}>Crear alojamiento</div>
                </div>

            </div>
            
            }
        </div>
    )
}

export default PopUpPerfil
