import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet'
import { Icon } from 'leaflet'
import AlojamientoBusqueda from "../../components/alojamientosBusqueda/alojamientobusqueda";
import '../busqueda/busqueda.css'

const Busqueda = (props) => {
    return (
        <div className="contBusqueda">
            <h1 className="titulo">Resultado de la busqueda:</h1>
            <div className="busqueda">
                <div className="alojamientosBusqueda">
                    {
                        ((props.resultado !== undefined && props.resultado.length > 0)
                            ? props.resultado.map((alojamiento, index) => (
                                <AlojamientoBusqueda key={index} alojamiento={alojamiento} />))
                            : <p class="busquedaNoResultado">No hay resultado, prueba a hacer otra busqueda, ¿quieres volver a inicio? <a href="/">Pulsa aqui</a></p>)
                    }
                </div>

                <div className='mapaBusqueda'>
                    <MapContainer center={[42.78, -7.41]} zoom={8} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {
                            (props.resultado !== undefined && props.resultado.length > 0)
                                ? props.resultado.map((alojamiento) => (
                                    <Marker  position={[alojamiento.latitud, alojamiento.longitud]}
                                        icon={
                                            new Icon(
                                                {
                                                    iconUrl: "/images/customMarker.png",
                                                    iconSize: [40, 20],
                                                }
                                            )
                                        }
                                    >
                                        <Popup>
                                            <img className="alojamientoMarkerImagen" src={alojamiento.imagenPortada}></img>
                                            <a href={"/alojamiento/"+alojamiento.id}>{alojamiento.titulo}</a>
                                        </Popup>
                                        <Tooltip
                                            permanent="true"
                                            direction="center"
                                            className="my-labels">
                                            {alojamiento.precio}€
                                        </Tooltip>
                                    </Marker>))
                                : ""
                        }
                    </MapContainer>
                </div>
            </div>
        </div>
    );
}

export default Busqueda;
