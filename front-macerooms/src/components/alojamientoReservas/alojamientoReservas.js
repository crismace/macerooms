import React from 'react';
import './alojamientoReservas.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AlojamientoReservas = (props) => {
    const navigate = useNavigate();

    const irAlojamiento = () => {
        navigate("/alojamiento/" + props.reserva.alojamiento.id);
    }

    const calculadorEstado = (estado) => {
        if (estado === "CREADA" || estado === "VALIDADA") {
            return "green";
        } else {
            return "red";
        }
    }
    const validarReserva = () => {
        axios.post('http://localhost:8080/validarReservaAnfitrion', {
            token: localStorage.getItem("token"),
            reservaId: props.reserva.id,
        })
            .then(response => {
                window.location.reload(true);
            });
    }

    const rechazarReserva = () => {
        axios.post('http://localhost:8080/rechazarReservaAnfitrion', {
            token: localStorage.getItem("token"),
            reservaId: props.reserva.id,
        })
            .then(response => {
                window.location.reload(true);
            });
    }

    const cancelarReserva = () => {
        axios.post('http://localhost:8080/cancelarReservaCliente', {
            token: localStorage.getItem("token"),
            reservaId: props.reserva.id,
        })
            .then(response => {
                window.location.reload(true);
            });
    }

    return (
        <div className='contReserva'>
            <p>Reserva: {props.reserva.id}</p>

            <p onClick={irAlojamiento}>Alojamiento: {props.reserva.alojamiento.titulo}</p>

            <img onClick={irAlojamiento} src={props.reserva.alojamiento.imagenPortada}></img>

            <p>Fechas: {props.reserva.desde} - {props.reserva.hasta}</p>

            <p>Número de adultos: {props.reserva.numeroAdultos}</p>

            <p>Número de niños: {props.reserva.numeroNinhos}</p>

            <p>Coste total: {props.reserva.costeTotal}</p>

            <p>Estado:&nbsp;<span className={calculadorEstado(props.reserva.estado)}>{props.reserva.estado}</span></p>

            <div className='botonesReservas'>
                {((props.reserva.estado === "CREADA" || props.reserva.estado === "VALIDADA")&& !props.esAnfitrion) ? <button onClick={cancelarReserva} className="cancelar">Cancelar</button> : ""}
                {(props.reserva.estado === "CREADA" && props.esAnfitrion) ? <button onClick={validarReserva} className="validar">Validar</button> : ""}
                {(props.reserva.estado === "CREADA" && props.esAnfitrion) ? <button onClick={rechazarReserva} className="rechazar">Rechazar</button> : ""}
            </div>
        </div>
    );
};

export default AlojamientoReservas;
