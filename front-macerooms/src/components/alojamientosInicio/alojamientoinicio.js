import React from 'react';
import '../alojamientosInicio/alojamientoinicio.css';
import { useNavigate } from 'react-router-dom';

const AlojamientoInicio = (props) => {
  const navigate = useNavigate();

  const irAlojamiento = () => {
    navigate(`/alojamiento/${props.alojamiento.id}`);
  }
  
  return (
    <div className="alojamientoInicio" onClick={irAlojamiento}>
      <h2 className="alojamientoInicioTitulo">{props.alojamiento.titulo}</h2>
      <img className="alojamientoInicioImagen" src={props.alojamiento.imagenPortada} />
    </div>
  );
};

export default AlojamientoInicio;
