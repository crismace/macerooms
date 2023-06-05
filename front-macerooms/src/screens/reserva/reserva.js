import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './reserva.css';

const Reserva = (props) => {
  const navigate = useNavigate();
  const ivaCalculo = (props.datosReserva.alojamiento.precio*props.datosReserva.alojamiento.iva)/100;
  const totalCalculo = ((props.datosReserva.alojamiento.precio + ivaCalculo) * props.datosReserva.diferenciaDias) + props.datosReserva.alojamiento.gastosLimpieza + props.datosReserva.alojamiento.comision;
 
  const confirmarReserva = () => {
    axios.post("http://localhost:8080/crearReserva",
    {
      numeroAdultos: props.datosReserva.numeroAdultos,
      numeroNinhos: props.datosReserva.numeroNinhos ,
      desde: props.datosReserva.fechaDesde,
      hasta: props.datosReserva.fechaHasta
    },
    {
      params: {
        token: localStorage.getItem('token'),
        idAlojamiento: props.datosReserva.idAlojamiento,
        costeTotal: totalCalculo
      }
    }
  ).then(response => {
      console.log(response.data);
      navigate("confirmada");
    })
  }

  return (
    <div className="contConfirmarReserva">
      <h1>Desglose de la reserva:</h1>

      <div className='confirmar'>
        <div className='confirmarDatos'>
          <p><span className='confirmarTitulo'>Alojamiento:</span> {props.datosReserva.alojamiento.titulo}</p>

          <div className='confirmarFila'>
            <p><span className='confirmarTitulo'>Numero de adultos:</span> {props.datosReserva.numeroAdultos}</p>
            <p><span className='confirmarTitulo'>Numero de niños:</span> {props.datosReserva.numeroNinhos}</p>
          </div>

          <div className='confirmarFila'>
            <p><span className='confirmarTitulo'>Fechas:</span> {props.datosReserva.fechaDesde} - {props.datosReserva.fechaHasta}</p>
            <p><span className='confirmarTitulo'>Total de noches:</span> {props.datosReserva.diferenciaDias}</p>
          </div>

          <div className='confirmarFila'>
            <p><span className='confirmarTitulo'>Precio x noche:</span> {props.datosReserva.alojamiento.precio} €</p>
            <p><span className='confirmarTitulo'>IVA - {props.datosReserva.alojamiento.iva}%:</span> {ivaCalculo} €</p>
          </div>

          <p><span className='confirmarTitulo'>Gastos de limpieza:</span> {props.datosReserva.alojamiento.gastosLimpieza} €</p>

          <p><span className='confirmarTitulo'>Comisión:</span> {props.datosReserva.alojamiento.comision} €</p>

          <p><span className='confirmarTitulo'>Total:</span> {totalCalculo.toFixed(2)} €</p>

          <button onClick={confirmarReserva}>Confirmar reserva</button>
        </div>

        <div>
          <img src={props.datosReserva.alojamiento.imagenPortada}></img>
        </div>
      </div>
    </div>
  );
};

export default Reserva;
