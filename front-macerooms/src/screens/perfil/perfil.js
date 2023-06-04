import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import AlojamientoAnfitrion from "../../components/alojamientoAnfitrion/alojamientoAnfitrion";
import AlojamientoReservas from "../../components/alojamientoReservas/alojamientoReservas";
import './perfil.css';

const Perfil = () => {
    const [anfitrion, setAnfitrion] = useState(false);

    const [reservasUsuario, setReservasUsuario] = useState();
    const [noHayReservasUsuario,setNoHayReservasUsuario] = useState((reservasUsuario));

    const [reservasAnfitrion, setReservasAnfitrion] = useState();
    const [noHayReservasAnfitrion,setNoHayReservasAnfitrion] = useState((reservasAnfitrion));

    const [alojamientosAnfitrion, setAlojamientosAnfitrion] = useState();
    const [noHayAlojamientosAnfitrion,setNoHayAlojamientosAnfitrion] = useState((alojamientosAnfitrion));


    const [contrasenaAntigua, setContrasenaAntigua]= useState ('');
    const [contrasenaNueva, setContrasenaNueva]= useState ('');
    const [contrasenaNueva2, setContrasenaNueva2]= useState ('');
    const [error, setError]= useState ('');

    const onChangePassword = (e) => {
        setContrasenaAntigua(e.target.value);
    }

    const onChangePassword1 = (e) => {
        setContrasenaNueva(e.target.value);
    }

    const onChangePassword2 = (e) => {
        setContrasenaNueva2(e.target.value);
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        if (contrasenaAntigua.length == 0) {
            setError("Por favor, introduzca su contraseña");
            return;
        }
        if (contrasenaNueva.length == 0) {
            setError("Por favor, introduzca su contraseña nueva");
            return;
        }
        if (contrasenaNueva2.length == 0) {
            setError("Por favor, introduzca su contraseña nueva de nuevo");
            return;
        }

        if (contrasenaNueva2 !== contrasenaNueva) {
            setError("La nueva contraseña debe coincidir");
            return;
        }

        axios.post("http://localhost:8080/cambiarClave", {
            token: localStorage.getItem("token"),
            claveAntigua: contrasenaAntigua,
            claveNueva: contrasenaNueva,
            claveNueva2: contrasenaNueva2
        })
        .then(response => {
            if(response.data == true){
                console.log("se cambia")
            }
        }).catch(err => {
            if (err.response.status == 400) {
                setError("El usuario o la contraseña introducidos son incorrectos");
            }
        })
    }

    const onClickReservas = () => {
        document.getElementById("reservas").style.display = "grid";
        document.getElementById("reservasAnfitrion").style.display = "none";
        document.getElementById("alojamientos").style.display = "none";
        document.getElementById("ajustes").style.display = "none";
    }

    const onClickReservasAnfitrion = () => {
        document.getElementById("reservas").style.display = "none";
        document.getElementById("reservasAnfitrion").style.display = "grid";
        document.getElementById("alojamientos").style.display = "none";
        document.getElementById("ajustes").style.display = "none";
    }

    const onClickAlojamientos = () => {
        document.getElementById("reservas").style.display = "none";
        document.getElementById("reservasAnfitrion").style.display = "none";
        document.getElementById("alojamientos").style.display = "grid";
        document.getElementById("ajustes").style.display = "none";
    }

    const onClickAjustes = () => {
        document.getElementById("reservas").style.display = "none";
        document.getElementById("reservasAnfitrion").style.display = "none";
        document.getElementById("alojamientos").style.display = "none";
        document.getElementById("ajustes").style.display = "block";
    }

    useEffect(() => {

        async function esAnfitrion() {
            await axios.post("http://localhost:8080/esAnfitrion", { token: localStorage.getItem('token') })
                .then(response => {
                    setAnfitrion(response.data);
                    console.log(response.data);
                    return response.data;
                }
                )
        }

        axios.post("http://localhost:8080/obtenerReservasParaUsuario", { token: localStorage.getItem('token') })
            .then(response => {
                setReservasUsuario(response.data);
                setNoHayReservasUsuario(response.data.length > 0);
            }
        )

        if (esAnfitrion()) {
            axios.post("http://localhost:8080/obtenerReservasParaAnfitrion", { token: localStorage.getItem('token') })
                .then(response => {
                    setReservasAnfitrion(response.data);
                    setNoHayReservasAnfitrion(response.data.length > 0);
                })

            axios.get("http://localhost:8080/encontrarAlojamientoDelAnfitrion", { headers: { token: localStorage.getItem('token') } })
                .then(response => {
                    setAlojamientosAnfitrion(response.data);
                    setNoHayAlojamientosAnfitrion(response.data.length > 0);
                })
        }


    }, []);

    return (
        <div className="contPerfil">
            <h1>Perfil</h1>

            <div className="contenido">
                <div className="menuVertical">
                    <h2 onClick={onClickReservas}>Mis reservas</h2>
                    <h2 hidden={!anfitrion} onClick={onClickReservasAnfitrion}>Panel reservas</h2>
                    <h2 hidden={!anfitrion} onClick={onClickAlojamientos}>Alojamientos</h2>
                    <h2 onClick={onClickAjustes}>Ajustes</h2>
                </div>

                <div className="opciones">
                    <div id="reservas">
                        {reservasUsuario?.map((reserva, index) => (
                            <AlojamientoReservas key={index} reserva={reserva} />
                        ))}
                        {noHayReservasUsuario?"":"No se encontraron reservas para el usuario"}
                    </div>

                    <div id="reservasAnfitrion">
                        {reservasAnfitrion?.map((reserva, index) => (
                            <AlojamientoReservas key={index} esAnfitrion={anfitrion} reserva={reserva} />
                        ))}
                        {noHayReservasAnfitrion?"":"No se encontraron reservas para el anfitrión"}
                    </div>

                    <div id="alojamientos">
                        {alojamientosAnfitrion?.map((alojamiento, index) => (
                            <AlojamientoAnfitrion key={index} alojamiento={alojamiento} />
                        ))}
                        {noHayAlojamientosAnfitrion?"":"No se encontraron alojamientos para el anfitrión"}
                    </div>

                    <div id="ajustes">
                        <form onSubmit={handleSubmit} className="formularioCambiar">
                            <label for="contrasenaAntigua">Contraseña antigua:</label>
                            <input type="password" id="contrasenaAntigua" name="contrasenaAntigua" onChange={onChangePassword}></input>

                            <label for="contrasenaNueva">Contraseña nueva:</label>
                            <input type="password" id="contrasenaNueva" name="contrasenaNueva" onChange={onChangePassword1}></input>

                            <label for="contrasenaNueva2">Repite contraseña nueva:</label>
                            <input type="password" id="contrasenaNueva2" name="contrasenaNueva2" onChange={onChangePassword2}></input>

                            <input type="submit"></input>
                        </form>
                        <p className="error-unirse">{error}</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Perfil;
