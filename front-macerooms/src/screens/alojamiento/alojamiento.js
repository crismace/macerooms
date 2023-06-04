import React from 'react';
import { useState } from "react";
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import DatePicker from "react-datepicker";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
import PopUpViajeros2 from '../../components/popups/viajeros2/popupviajeros2';
import "leaflet/dist/leaflet.css";
import './alojamiento.css';

const Alojamiento = (props) => {
  const navigate = useNavigate();
  const params = useParams();

  /*Variables a guardar del alojamiento*/
  const [alojamiento, setAlojamiento] = useState();
  const [titulo, setTitulo] = useState();
  const [descripcion, setDescripcion] = useState();
  const [habitaciones, setHabitaciones] = useState();
  const [banos, setBanos] = useState();
  const [camas, setCamas] = useState();
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

  /*Suma de 5 dias despues del dia de hoy para mostrar una fecha de reserva*/
  var fecha = new Date()
  fecha.setDate(fecha.getDate() + 5);

  const [dateRange, setDateRange] = useState([new Date(), fecha]);
  const [startDate, endDate] = dateRange;
  const [adultos, setAdultos] = useState(0);
  const [ninos, setNinos] = useState(0);
  const [showPopUpViajeros2, setShowPopUpViajeros2] = useState(false);
  const [arrayDatePicker, setArrayDatePicker] = useState([]);
  const [datosValidos, setDatosValidos] = useState();

  const onChangeFecha = (date) => {
    setDateRange(date);
  }

  const onCloseViajeros2 = () => {
    setShowPopUpViajeros2(false);
  }

  /*Funcionamiento de los botones de mostrar las fotos*/
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

  /*Llamada al api para recoger los datos del alojamiento y para recoger las fechas que tiene reservadas*/
  useEffect(() => {
    axios.get("http://localhost:8080/encontrarAlojamientoPorId/" + params.alojamientoId)
      .then(response => {
        console.log(response.data);
        setTitulo(response.data.titulo);
        setDescripcion(response.data.descripcion);
        setHabitaciones(response.data.numeroHabitaciones);
        setBanos(response.data.numeroBanhos);
        setCamas(response.data.numeroCamas);
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
        setAlojamiento(response.data);
      }
    )

    axios.get("http://localhost:8080/fechasReservadasAlojamiento/" + params.alojamientoId)
    .then(response => {
      console.log(response.data);
      var datePickerIntermedio = [];
      for (let i = 0; i < response.data.length; i++){
        datePickerIntermedio.push({start: new Date(parsearFecha(response.data[i].desde)), end: new Date(parsearFecha(response.data[i].hasta))});
        console.log(response.data);
      }
      setArrayDatePicker(datePickerIntermedio);
    })
  }, []);

  /*Para meter la fecha en el datepicker tiene que estar en un formato en concreto y esta funcion lo adapta*/
  const parsearFecha = (fecha) => {
    let partes = fecha.split('/');
    let dia = parseInt(partes[0], 10);
    let mes = parseInt(partes[1], 10) - 1;
    let anio = parseInt(partes[2], 10);
  
    let fechaParseada = new Date(anio, mes, dia);
  
    return fechaParseada;
  }

  /*Funcion que realiza la resta de los dias para calcular cuantos dias son la reserva*/
  const diferenciaDias = () => {
    if (endDate !== null && startDate !== null) {
      var diferencia = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);

      if (diferencia != 1) {
        return diferencia - 1;
      } else {
        return diferencia;
      }

    } else {
      return 0;
    }
  }

  /*Llamada al api para poder realizar la reserva mandando los datos necesarios*/
  const reservar = () => {
    if((startDate != null && endDate != null) && adultos > 0){
      axios.post("http://localhost:8080/sePuedeReservar", 
      {
        idAlojamiento: params.alojamientoId,
        fechaDesde: startDate.toISOString(),
        fechaHasta: endDate.toISOString()
      })
      .then(response => {
        if(response.data == true){
          props.setDatosReserva({
            idAlojamiento: params.alojamientoId,
            fechaDesde: startDate.getDate()+"/"+(startDate.getMonth()+1)+"/"+startDate.getFullYear(),
            fechaHasta: endDate.getDate()+"/"+(endDate.getMonth()+1)+"/"+endDate.getFullYear(),
            diferenciaDias: diferenciaDias(),
            numeroAdultos:adultos,
            numeroNinhos:ninos,
            alojamiento:alojamiento
          });
          navigate("/reserva");
        }
      })
    } else {
      setDatosValidos("Selecciona datos de reserva validos, por favor");
    }
  }

  /*Llevar al usuario a iniciar sesion en el caso de que no lo este*/
  const login = () => {
    navigate("/login");
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
              <div>{camas} camas</div>
              <div>{banos} baño/s</div>
            </div>

            <h2>Calendario:</h2>
            <DatePicker dateFormat="dd/MM/yyyy" todayButton="Hoy" shouldCloseOnSelect={false} selected={startDate} onChange={onChangeFecha}
              minDate={new Date()} showDisabledMonthNavigation startDate={startDate} endDate={endDate} monthsShown={2}
              selectsRange={true} isClearable={true} placeholderText="Inserta fecha" showIcon locale="es" inline
              excludeDateIntervals={(arrayDatePicker!=[])?arrayDatePicker:[]} />

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
            {(localStorage.getItem("token")!=null)
            ?<button onClick={reservar} className='botonReserva'>Reservar</button>
            :<button onClick={login} className='botonReservaNoLogin'>Para poder reservar un alojamiento debes tener la sesion iniciada</button>}
            <p className='datosValidos'>{datosValidos}</p>
          </div>

          <div className='contDerechaAlojamiento'>
            <div className='calculadora'>
              <DatePicker dateFormat="dd/MM/yyyy" todayButton="Hoy" shouldCloseOnSelect={true} onChange={onChangeFecha}
                minDate={new Date()} showDisabledMonthNavigation startDate={startDate} endDate={endDate} monthsShown={2}
                selectsRange={true} isClearable={true} showIcon locale="es" />

              <button className="boton" onClick={() => setShowPopUpViajeros2(true)}>
                Adultos: {adultos}
                &nbsp;Niños: {ninos}
              </button>
              <PopUpViajeros2 numMaxAdultos={numMaxAdultos} numMaxNinos={numMaxNinos} adultos={adultos} setAdultos={setAdultos} ninos={ninos} setNinos={setNinos} isOpen={showPopUpViajeros2} onClose={onCloseViajeros2}></PopUpViajeros2>

              <hr></hr>

              <div>
                <p>Precio x {diferenciaDias()} noches: {diferenciaDias() * precio}€</p>
                <p>Gastos de limpieza: {limpieza}€</p>
                <p>Comision: {comision}€</p>
              </div>
            </div>

            <hr></hr>

            <p>Total: {(diferenciaDias() * precio) + limpieza + comision} €</p>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Alojamiento;
