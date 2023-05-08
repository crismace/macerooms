import React from "react";
import { useNavigate } from "react-router-dom";
import '../notFound/notFound.css'

const NotFound = () => {
    const navigate = useNavigate();

    const onClick = () => {
        navigate("/");
    }

    return(
        <div>
            <div className="contNotFound">
                <h1>Ups</h1>

                <p>No encontramos lo que buscas</p>

                <button onClick={onClick}>Volver a inicio</button>
            </div>
            <img src="images/not-found.jpg" className="fotoNotFound"></img>
        </div>
    ); 
  }

export default NotFound;
