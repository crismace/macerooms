import React from 'react';
import '../alojamientoAnfitrion/alojamientoAnfitrion.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AlojamientoAnfitrion = (props) => {
  const navigate = useNavigate();

  const irAlojamiento = () => {
    navigate("/alojamiento/" + props.alojamiento.id);
  }

  const editar = () => {
    navigate("/alojamientoEdicion/" + props.alojamiento.id);
  }

  const eliminar = () => {
    axios.delete('http://localhost:8080/borrarAlojamientoPorId/' + props.alojamiento.id, {
    })
      .then(response => {
        window.location.reload(true);
      })
  }


  return (
    <div className="alojamientoAnfitrion">
      <div className='datosAlojamiento'>
        <FontAwesomeIcon className='iconoAlojamientoAnfitrion' icon={faPenToSquare} onClick={editar} />
        <FontAwesomeIcon className='iconoAlojamientoAnfitrionBorrar' icon={faTrash} onClick={eliminar} />
      </div>
      <div className='datosAlojamiento' onClick={irAlojamiento}>
        <h2 className="alojamientoAnfitrionTitulo">{props.alojamiento.titulo}</h2>
        <img className="alojamientoAnfitrionImagen" src={props.alojamiento.imagenPortada} />
      </div>
    </div>
  );
};

export default AlojamientoAnfitrion;
