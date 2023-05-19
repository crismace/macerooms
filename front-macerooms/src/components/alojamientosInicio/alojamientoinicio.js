import React from 'react';
import '../alojamientosInicio/alojamientoinicio.css'

const Alojamiento = (props) => {
  return (
    <div className="alojamiento">
      <h2 className="alojamientoTitulo">{props.alojamiento.titulo}</h2>
      <img className="alojamientoImagen" src={props.alojamiento.imagenBase64} />
    </div>
  );
};

export default Alojamiento;
