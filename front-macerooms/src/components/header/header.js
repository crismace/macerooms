import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import PopUpLugar from "../popups/lugar/popuplugar";
import PopUpViajeros from "../popups/viajeros/popupviajeros";
import PopUpPerfil from "../popups/perfil/popupPerfil";
import { registerLocale } from "react-datepicker";

import es from 'date-fns/locale/es';
import '../header/header.css';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

registerLocale('es', es)

const Header = (props) => {
    const navigate = useNavigate();

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [showPopUpLugar, setShowPopUpLugar] = useState(false);
    const [showPopUpViajeros, setShowPopUpViajeros] = useState(false);
    const [showPopUpPerfil, setShowPopUpPerfil] = useState(false);
    const [provincia, setProvincia] = useState("pendiente");
    const [adultos, setAdultos] = useState(0);
    const [ninos, setNinos] = useState(0);


    const onChangeFecha = (date) => {
        setDateRange(date);

        console.log(dateRange);
    }

    const onClosePerfil = () => {
        setShowPopUpPerfil(false);
    }

    const onCloseLugar = () => {
        setShowPopUpLugar(false);
    }

    const onCloseViajeros = () => {
        setShowPopUpViajeros(false);
    }

    const onClickBuscar = () => {
        axios.get('http://localhost:8080/buscarAlojamientos', {
            params: {
                fechaDesde: startDate,
                fechaHasta: endDate,
                provincia: provincia,
                numeroAdultos: adultos,
                numeroNinhos: ninos
            }
        }).then(response => {
            if (response.data.length > 0) {
                props.setResultado(response.data);
                navigate("busqueda");
            } else {
                props.setResultado("");
                navigate("busqueda");
            }
        }).catch(error => {
            console.error(error);
        });
    }

    return (
        <div className="contHeader">
            <div className="info">
                <a href="/"><img className="logo" src="/images/logo.png"></img></a>

                <div className="usuario" >
                    <img src="/images/icono-casa.png" onClick={() => setShowPopUpPerfil(true)}></img>
                    <PopUpPerfil isOpen={showPopUpPerfil} onClose={onClosePerfil} logged={props.logged}></PopUpPerfil>
                </div>

            </div>

            <div className="buscador">
                <button className="boton" onClick={() => setShowPopUpLugar(true)}>Provincia: {provincia}</button>
                <PopUpLugar provincia={provincia} setProvincia={setProvincia} isOpen={showPopUpLugar} onClose={onCloseLugar}></PopUpLugar>

                <DatePicker dateFormat="dd/MM/yyyy" todayButton="Hoy" shouldCloseOnSelect={false} selected={startDate} onChange={onChangeFecha}
                    minDate={new Date()} showDisabledMonthNavigation startDate={startDate} endDate={endDate} monthsShown={2}
                    selectsRange={true} isClearable={true} placeholderText="Inserta fecha" showIcon locale="es" />

                <button className="boton" onClick={() => setShowPopUpViajeros(true)}>
                    Adultos: {adultos}
                    &nbsp;Niños: {ninos}
                </button>
                <PopUpViajeros adultos={adultos} setAdultos={setAdultos} ninos={ninos} setNinos={setNinos} isOpen={showPopUpViajeros} onClose={onCloseViajeros}></PopUpViajeros>

                <button className="boton botonBuscar" onClick={onClickBuscar}>Buscar</button>
            </div>
        </div>
    );
}

export default Header;
