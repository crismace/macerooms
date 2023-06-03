import React from 'react';
import '../alojamientosBusqueda/alojamientobusqueda.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faPerson, faChildReaching, faToilet, faBed, faPersonShelter } from '@fortawesome/free-solid-svg-icons'

const AlojamientoBusqueda = (props) => {
  const navigate = useNavigate();

  const irAlojamiento = () => {
    navigate(`/alojamiento/${props.alojamiento.id}`);
  }

  return (
    <div className={"alojamientoContainer"}>

      <div className="alojamientoBusqueda prueba" onClick={irAlojamiento}>
        <div className='alojamientoPrincipalDatos'>
          <div className='imagenContainer'>
            <img className="alojamientoBusquedaImagen" src={props.alojamiento.imagenPortada} />
          </div>

          <div className='textoAlojamientoContainer'>
            <h2 className="alojamientoBusquedaTitulo">{props.alojamiento.titulo}</h2>
            <p className="alojamientoBusquedaDescripcion">{props.alojamiento.descripcion}</p>
          </div>
        </div>

        <div className='todasCaracteristicasContainer'>
          <div className='caracteristicasAlojamientoContainer'>
            <div className='caracteristicaContainer'>
              <FontAwesomeIcon className='iconoAlojamiento' icon={faMoneyBill} />
              <p className="alojamientoBusquedaCaracteristicas">{props.alojamiento.precio}€</p>
            </div>

            <div className='caracteristicaContainer'>
              <FontAwesomeIcon className='iconoAlojamientoAdulto' icon={faPerson} />
              <p className="alojamientoBusquedaCaracteristicas">{props.alojamiento.numMaxAdultos}</p>
            </div>

            <div className='caracteristicaContainer'>
              <FontAwesomeIcon className='iconoAlojamiento' icon={faChildReaching} />
              <p className="alojamientoBusquedaCaracteristicas">{props.alojamiento.numMaxNinhos}</p>
            </div>
          </div>

          <div className='caracteristicasAlojamientoContainer'>
            <div className='caracteristicaContainer'>
              <FontAwesomeIcon className='iconoAlojamiento' icon={faPersonShelter} />
              <p className="alojamientoBusquedaCaracteristicas">{props.alojamiento.numeroHabitaciones}</p>
            </div>

            <div className='caracteristicaContainer'>
              <FontAwesomeIcon className='iconoAlojamiento' icon={faBed} />
              <p className="alojamientoBusquedaCaracteristicas">{props.alojamiento.numeroCamas}</p>
            </div>

            <div className='caracteristicaContainer'>
              <FontAwesomeIcon className='iconoAlojamiento' icon={faToilet} />
              <p className="alojamientoBusquedaCaracteristicas">{props.alojamiento.numeroBanhos}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlojamientoBusqueda;
