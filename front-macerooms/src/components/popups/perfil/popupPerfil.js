import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useRef } from 'react';
import '../perfil/popupPerfil.css'

const PopUpPerfil = ({isOpen, onClose, logged}) => {
    const navigate = useNavigate();
    const perfil = useRef(null);


    const handleClose = () => {
        onClose();
    }

    const onClickCerrarSesion = (e) => {
        e.preventDefault();

        localStorage.removeItem('token');
        window.location.reload(true);
        navigate("/");
    }

    /*Hook que cierra el popup cuando se clicka fuera*/
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (perfil.current && !perfil.current.contains(event.target)) {
            onClose();
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
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

                <div>Conviertete en anfitrión</div>
            </div>
            
            }
        </div>
    )
}

export default PopUpPerfil
