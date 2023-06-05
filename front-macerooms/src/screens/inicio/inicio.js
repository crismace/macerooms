import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import AlojamientoInicio from "../../components/alojamientosInicio/alojamientoinicio";
import '../inicio/inicio.css'

const Inicio = () => {
    
    const [alojamientos,setAlojamientos] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8080/buscarAlojamientosInicio")
            .then(response => {
                setAlojamientos(response.data);
            }
        )
    }, []);


    return (
        <div>
            <h1 className="titulo">Inicio</h1>
            <div className="alojamientos">
                {alojamientos.map((alojamiento, index) => (
                    <AlojamientoInicio key={index} alojamiento={alojamiento} />
                ))}
            </div>
        </div>
    );
}

export default Inicio;
