import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useMemo } from "react";
import { useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
import "leaflet/dist/leaflet.css";
import './anfitrionFormulario.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const AnfitrionFormulario = () => {
  const navigate = useNavigate();

  const params = useParams();

  const modoUpdate = params.alojamientoId != undefined;

  const [draggable, setDraggable] = useState(true)
  const [position, setPosition] = useState([42.78, -7.41])
  const markerRef = useRef(null)


  const [titulo, setTitulo] = useState();
  const [descripcion, setDescripcion] = useState();
  const [normas, setNormas] = useState();
  const [numMaxAdultos, setNumMaxAdultos] = useState();
  const [numMaxNinhos, setNumMaxNinhos] = useState();
  const [numeroBanhos, setNumeroBanhos] = useState();
  const [numeroCamas, setNumeroCamas] = useState();
  const [numeroHabitaciones, setNumeroHabitaciones] = useState();
  const [precio, setPrecio] = useState();
  const [gastosLimpieza, setGastosLimpieza] = useState();
  const [comision, setComision] = useState();
  const [provincia, setProvincia] = useState();


  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
        }
      },
    }),
    [],
  )


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let id;


    if (modoUpdate) {
      id = params.alojamientoId;
      var cambiar = false; 
      if(position[0]==null){
        cambiar = true;
      }

      await axios.put('http://localhost:8080/actualizarAlojamiento/'+params.alojamientoId,
        {
          "titulo": titulo,
          "descripcion": descripcion,
          "normas": normas,
          "latitud": cambiar?position.lat:position[0],
          "longitud": cambiar?position.lng:position[1],
          "numMaxAdultos": numMaxAdultos,
          "numMaxNinhos": numMaxNinhos,
          "numeroBanhos": numeroBanhos,
          "numeroCamas": numeroCamas,
          "numeroHabitaciones": numeroHabitaciones,
          "provincia": provincia,
          "precio": precio,
          "gastosLimpieza": gastosLimpieza,
          "comision": 123,
        },
      ).then(response => {
        console.log(response.data);
      })
    } else {
      let urlCrearAlojamiento = "";

      let esAnfitrion = await axios.post("http://localhost:8080/esAnfitrion",
        {
          token: localStorage.getItem("token")
        }).then(response => {
          return response.data;
        })

      if (esAnfitrion) {
        urlCrearAlojamiento = "http://localhost:8080/crearAlojamiento";
      } else {
        urlCrearAlojamiento = "http://localhost:8080/crearAlojamientoPrimeraVez";
      }

      id = await axios.post(urlCrearAlojamiento,
        {
          "titulo": titulo,
          "descripcion": descripcion,
          "normas": normas,
          "latitud": position.lat,
          "longitud": position.lng,
          "numMaxAdultos": numMaxAdultos,
          "numMaxNinhos": numMaxNinhos,
          "numeroBanhos": numeroBanhos,
          "numeroCamas": numeroCamas,
          "numeroHabitaciones": numeroHabitaciones,
          "provincia": provincia,
          "precio": precio,
          "gastosLimpieza": gastosLimpieza,
          "comision": 25,
        }, { headers: { "token": localStorage.getItem("token") } }
      ).then(response => {
        console.log(response.data);
        return response.data;
      })
        .catch(error => {
          console.error(error);
        });
    }

    const formData = new FormData();

    formData.append("imagenPortada", e.target.elements.imagenPortada.files[0]);
    formData.append("imagen1", e.target.elements.imagen1.files[0]);
    formData.append("imagen2", e.target.elements.imagen2.files[0]);
    formData.append("imagen3", e.target.elements.imagen3.files[0]);

    console.log(formData);

    await axios.post("http://localhost:8080/subirImagenes?id=" + id,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "true",
        },
      }
    ).then(response => {
      console.log(response.data);
    })
      .catch(error => {
        console.error(error);
      });
    navigate("/alojamiento/" + id);

  };

  const cargarDatosUpdate = () => {
    axios.get('http://localhost:8080/encontrarAlojamientoPorId/' + params.alojamientoId, {
    })
      .then(response => {
        setTitulo(response.data.titulo);
        setDescripcion(response.data.descripcion);
        setNormas(response.data.normas);
        setNumMaxAdultos(response.data.numMaxAdultos);
        setNumMaxNinhos(response.data.numMaxNinhos);
        setNumeroBanhos(response.data.numeroBanhos);
        setNumeroCamas(response.data.numeroCamas);
        setNumeroHabitaciones(response.data.numeroHabitaciones);
        setPrecio(response.data.precio);
        setGastosLimpieza(response.data.gastosLimpieza);
        setComision(response.data.comision);
        setProvincia(response.data.provincia);
        setPosition([response.data.latitud, response.data.longitud])
      }
    )
  }

  useEffect(() => {
    if (modoUpdate) {
      cargarDatosUpdate();
    }
  },[]);

  return (
    <div className="contFormulario">
      <h1 className="tituloAnfitrion">Formulario de {modoUpdate ? "edición de" : ""} alojamiento</h1>

      <form onSubmit={handleFormSubmit} className="formularioAnfitrion">
        <div className="separador1">
          <h2 className="subtituloAnfitrion">Datos del alojamiento</h2>
          <label className="etiquetaAnfitrion" for="titulo">Título:</label>
          <input className="inputAnfitrion" defaultValue={titulo} name="titulo" onChange={(e) => setTitulo(e.target.value)} type="text" id="titulo" required />

          <label className="etiquetaAnfitrion" for="descripcion">Descripción:</label>
          <textarea className="textareaAnfitrion" defaultValue={descripcion} name="descripcion" onChange={(e) => setDescripcion(e.target.value)} id="descripcion" required></textarea>

          <label className="etiquetaAnfitrion" for="normas">Normas:</label>
          <textarea className="textareaAnfitrion" defaultValue={normas} name="normas" onChange={(e) => setNormas(e.target.value)} id="normas" required></textarea>

          <label className="etiquetaAnfitrion" for="adultos">Número máximo permitido de adultos:</label>
          <input className="inputAnfitrion" defaultValue={numMaxAdultos} name="numMaxAdultos" onChange={(e) => setNumMaxAdultos(e.target.value)} min={0} type="number" id="adultos" required />

          <label className="etiquetaAnfitrion" for="ninos">Número máximo permitido de niños:</label>
          <input className="inputAnfitrion" defaultValue={numMaxNinhos} name="numMaxNinhos" onChange={(e) => setNumMaxNinhos(e.target.value)} min={0} type="number" id="ninos" required />

          <h2 className="subtituloAnfitrion">Características</h2>
          <div className="caracteristicasContainer">
            <label className="etiquetaAnfitrion" for="banos">Baños:</label>
            <input className="inputAnfitrion" defaultValue={numeroBanhos} name="numeroBanhos" onChange={(e) => setNumeroBanhos(e.target.value)} min={0} type="number" id="banos" required />

            <label className="etiquetaAnfitrion" for="camas">Camas:</label>
            <input className="inputAnfitrion" defaultValue={numeroCamas} name="numeroCamas" onChange={(e) => setNumeroCamas(e.target.value)} min={0} type="number" id="camas" required />

            <label className="etiquetaAnfitrion" for="habitaciones">Habitaciones:</label>
            <input className="inputAnfitrion" defaultValue={numeroHabitaciones} name="numeroHabitaciones" onChange={(e) => setNumeroHabitaciones(e.target.value)} min={0} type="number" id="habitaciones" required />
          </div>

          <h2 className="subtituloAnfitrion">Coste:</h2>
          <div className="dineroContainer">
            <label className="etiquetaAnfitrion" for="precio">Precio por noche:</label>
            <div className="inputDinero">
              <input className="inputAnfitrion" defaultValue={precio} name="precio" onChange={(e) => setPrecio(e.target.value)} type="number" min="0" step="1" placeholder="0.00" id="precio" required />
              <span className="simboloDinero">&nbsp;€</span>
            </div>

            <label className="etiquetaAnfitrion" for="gastosLimpieza">Gastos de limpieza:</label>
            <div className="inputDinero">
              <input className="inputAnfitrion" defaultValue={gastosLimpieza} name="gastosLimpieza" type="number" onChange={(e) => setGastosLimpieza(e.target.value)} min="0" step="1" placeholder="0.00" id="gastosLimpieza" required />
              <span className="simboloDinero">&nbsp;€</span>
            </div>
          </div>
        </div>

        <div className="separador2">
          <h2 className="subtituloAnfitrion">Ubicacion</h2>

          <label className="etiquetaAnfitrion" for="provincia">Provincia:</label>
          <select name="provincia" defaultValue={provincia} onChange={(e) => setProvincia(e.target.value)} className="selectAnfitrion" id="provincia" required>
            <option value="">Selecciona una provincia</option>
            <option value="A Coruña">A Coruña</option>
            <option value="Lugo">Lugo</option>
            <option value="Ourense">Oursense</option>
            <option value="Pontevedra">Pontevedra</option>
          </select>

          <div className="mapaAnfitrion">
            <MapContainer center={[42.78, -7.41]} zoom={8} minZoom={8} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                draggable={draggable}
                eventHandlers={eventHandlers}
                ref={markerRef}
                position={position}
                icon={
                  new Icon({
                    iconUrl: markerIconPng,
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                  })}
              >
                <Tooltip>¡Aquí está tu alojamiento!</Tooltip>
              </Marker>
            </MapContainer>
          </div>
        </div>

        <div className="restoFormulario">
            <h2 className="subtituloAnfitrion">Imágenes</h2>

            <label className="etiquetaAnfitrion" for="imagenPortada">Imagen portada:</label>
            <input className="inputAnfitrion" name="imagenPortada" type="file" id="imagenPortada" accept="image/*" required={!modoUpdate} />

            <label className="etiquetaAnfitrion" for="imagen1">Imagen 1:</label>
            <input className="inputAnfitrion" name="imagen1" type="file" id="imagen1" accept="image/*" required={!modoUpdate} />

            <label className="etiquetaAnfitrion" for="imagen2">Imagen 2:</label>
            <input className="inputAnfitrion" name="imagen2" type="file" id="imagen2" accept="image/*" required={!modoUpdate} />

            <label className="etiquetaAnfitrion" for="imagen3">Imagen 3:</label>
            <input className="inputAnfitrion" name="imagen3" type="file" id="imagen3" accept="image/*" required={!modoUpdate} />

            <button type="submit" className="submitButton">{modoUpdate ? "Actualizar alojamiento" : "Crear"}</button>
        </div> 
      </form>
    </div>
  );
}

export default AnfitrionFormulario;
