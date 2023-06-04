import React from "react";
import { useNavigate } from "react-router-dom";
import './anfitrion.css';

const Anfitrion = () => {
    const navigate = useNavigate();

    const onClickFormulario = () => {

    }

    const onClickLogin = () => {
        navigate("/login");
    }

    return(
        <div className="contAnfitrion">
            <div>
                <h1>¿Quieres poner tu casa con nostros?</h1>
                <h2>Pon tu alojamiento con nostros y ayuda a otras personas a encontrar su hogar lejos de casa mientras exploran Galicia</h2>
                <h3>En Macerooms encontraras muchas facilidades a la hora de publicar y gestionar tus alojamientos, es muy sencillo, ¡pruebalo!</h3>
                <h3>Podras fomentar el turismo a la vez que ganas dinero. Es el momento</h3>

                {(localStorage.getItem("token")!=null)
                    ?<button onClick={onClickFormulario}>Conviertete en anfitrion</button>
                    :<button onClick={onClickLogin}>Conviertete en anfitrion</button>
                }
                
            </div>
            
            <div className="fotos">
                <img src="/images/holakarlos-wQWAswYAMes-unsplash.jpg"></img>
                <img src="/images/samantha-gades-BlIhVfXbi9s-unsplash.jpg"></img>
            </div>
        </div>
    ); 
  }

export default Anfitrion;
