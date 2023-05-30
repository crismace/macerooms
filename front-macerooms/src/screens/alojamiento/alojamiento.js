import React from 'react';
import { useState } from "react";
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DatePicker from "react-datepicker";
import { addDays, subDays } from 'date-fns';
import { MapContainer, TileLayer, useMap, Marker, Popup, Tooltip } from 'react-leaflet'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
import PopUpViajeros2 from '../../components/popups/viajeros2/popupviajeros2';
import "leaflet/dist/leaflet.css";
import './alojamiento.css';

const Alojamiento = () => {
  const params = useParams();

  const [titulo, setTitulo] = useState();
  const [descripcion, setDescripcion] = useState();
  const [habitaciones, setHabitaciones] = useState();
  const [banos, setBanos] = useState();
  const [position, setPosition] = useState([0, 0]);
  const [anfitrionNombre, setAnfitrionNombre] = useState();
  const [anfitrionApellido, setAnfitrionApellido] = useState();
  const [normas, setNormas] = useState();
  const [precio, setPrecio] = useState();
  const [limpieza, setLimpieza] = useState();
  const [comision, setComision] = useState();
  const [fotoPortada, setFotoPortada] = useState();
  const [foto1, setFoto1] = useState();
  const [foto2, setFoto2] = useState();
  const [foto3, setFoto3] = useState();
  const [numMaxAdultos, setNumMaxAdultos] = useState();
  const [numMaxNinos, setNumMaxNinos] = useState();
  const [emailAnfitrion, setEmailAnfitrion] = useState();

  var fecha = new Date()
  fecha.setDate(fecha.getDate() + 5);

  const [dateRange, setDateRange] = useState([new Date(), fecha]);
  const [startDate, endDate] = dateRange;
  const [adultos, setAdultos] = useState(0);
  const [ninos, setNinos] = useState(0);
  const [showPopUpViajeros2, setShowPopUpViajeros2] = useState(false);

  const onChangeFecha = (date) => {
    setDateRange(date);
  }

  const onCloseViajeros2 = () => {
    setShowPopUpViajeros2(false);
  }

  const onClickListaMas = () => {
    document.getElementById("imagen1").style.transform = "translateX(-770px)";
    document.getElementById("imagen2").style.transform = "translateX(-770px)";
    document.getElementById("imagen3").style.transform = "translateX(-770px)";
    document.getElementById("imagen4").style.transform = "translateX(-770px)";
  }

  const onClickListaMenos = () => {
    document.getElementById("imagen1").style.transform = "translateX(0px)";
    document.getElementById("imagen2").style.transform = "translateX(0px)";
    document.getElementById("imagen3").style.transform = "translateX(0px)";
    document.getElementById("imagen4").style.transform = "translateX(0px)";
  }

  useEffect(() => {
    axios.get("http://localhost:8080/encontrarAlojamientoPorId/" + params.alojamientoId)
      .then(response => {
        console.log(response.data);
        setTitulo(response.data.titulo);
        setDescripcion(response.data.descripcion);
        setHabitaciones(response.data.numeroHabitaciones);
        setBanos(response.data.numeroBanhos);
        setPosition([response.data.latitud, response.data.longitud]);
        setAnfitrionNombre(response.data.anfitrion.nombre);
        setAnfitrionApellido(response.data.anfitrion.apellidos);
        setNormas(response.data.normas);
        setPrecio(response.data.precio);
        setLimpieza(response.data.gastosLimpieza);
        setComision(response.data.comision);
        setFotoPortada(response.data.imagenPortada);
        setFoto1(response.data.imagen1);
        setFoto2(response.data.imagen2);
        setFoto3(response.data.imagen3);
        setNumMaxAdultos(response.data.numMaxAdultos);
        setNumMaxNinos(response.data.numMaxNinhos);
        setEmailAnfitrion(response.data.anfitrion.email);
      }
      )
  }, []);

  const diferenciaDias = () => {
    if (endDate !== null && startDate !== null) {
      return (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
    } else {
      return 0;
    }
  }

  return (
    <div className="alojamiento">
      <h1 className="alojamientoTitulo">{titulo}</h1>

      <div className='alojamientoInfo'>
        <div className='alojamientoIzquierda'>
          <div className="carrusel">
            <img src={fotoPortada} />
            <img src={foto1} />
            <img src={foto2} />
            <img src={foto3} />
          </div>

          <div className="listaImagenes">
            <button onClick={onClickListaMenos}>&lt;</button>
            <img id="imagen1" src={fotoPortada} />
            <img id="imagen2" src={foto1} />
            <img id="imagen3" src={foto2} />
            <img id="imagen4" src={foto3} />
            <button onClick={onClickListaMas}>&gt;</button>
          </div>

          <div>
            <h2>Descripción:</h2>
            <p>{descripcion}</p>

            <h2>Caracteristicas:</h2>
            <div className='carteles'>
              <div>{habitaciones} habitacion/es</div>
              <div>3 camas</div>
              <div>{banos} baño/s</div>
            </div>

            <h2>Calendario:</h2>
            <DatePicker dateFormat="dd/MM/yyyy" todayButton="Hoy" shouldCloseOnSelect={false} selected={startDate} onChange={onChangeFecha}
              minDate={new Date()} showDisabledMonthNavigation startDate={startDate} endDate={endDate} monthsShown={2}
              selectsRange={true} isClearable={true} placeholderText="Inserta fecha" showIcon locale="es" inline
              excludeDateIntervals={[{ start: subDays(new Date("2023-06-15"), 0), end: addDays(new Date("2023-06-18"), 0) },
              { start: subDays(new Date("2023-06-25"), 0), end: addDays(new Date("2023-06-28"), 0) }]} />

            <h2>Mapa:</h2>
            <div className='mapa'>
              <MapContainer center={[42.78, -7.41]} zoom={8} scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
                  <Popup>{titulo}</Popup>
                  <Tooltip>{titulo}</Tooltip>
                </Marker>
              </MapContainer>
            </div>

            <h2>Anfitrion: {anfitrionNombre} {anfitrionApellido}</h2>
            <button className='contacto' onClick={() => window.location = `mailto:${emailAnfitrion}`}>Contacta con el anfitrion</button>

            <h2>Normas:</h2>
            <p>{normas}</p>
            <p>Numero maximo de adultos: {numMaxAdultos}</p>
            <p>Numero maximo de niños: {numMaxNinos}</p>
          </div>
        </div>

        <div className='alojamientoDerecha'>
          <div className='reserva'>
            <p>Precio: {precio}€</p>
            <button className='botonReserva'>Reservar</button>
          </div>

          <div className='contDerechaAlojamiento'>
            <div className='calculadora'>
              <DatePicker id="paquito" className='paquito' dateFormat="dd/MM/yyyy" todayButton="Hoy" shouldCloseOnSelect={true} onChange={onChangeFecha}
                minDate={new Date()} showDisabledMonthNavigation startDate={startDate} endDate={endDate} monthsShown={2}
                selectsRange={true} isClearable={true} showIcon locale="es" />

              <button className="boton" onClick={() => setShowPopUpViajeros2(true)}>
                Adultos: {adultos}
                &nbsp;Niños: {ninos}
              </button>
              <PopUpViajeros2 numMaxAdultos={numMaxAdultos} numMaxNinos={numMaxNinos} adultos={adultos} setAdultos={setAdultos} ninos={ninos} setNinos={setNinos} isOpen={showPopUpViajeros2} onClose={onCloseViajeros2}></PopUpViajeros2>

              <hr></hr>

              <div>
                <p>Precio x {diferenciaDias()} dias: {diferenciaDias() * precio}€</p>
                <p>Gastos de limpieza: {limpieza}€</p>
                <p>Comision: {comision}€</p>
              </div>
            </div>

            <hr></hr>

            <p>Total:{(diferenciaDias() * precio) + limpieza + comision} €</p>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Alojamiento;
