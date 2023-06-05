import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../register/register.css';

const Register = () => {
    const navigate = useNavigate();

    const [nombre, setNombre]= useState ('');
    const [apellido, setApellido]= useState ('');
    const [email, setEmail]= useState ('');
    const [password, setPassword]= useState ('');
    const [error, setError]= useState ('');


    const onChangeNombre = (e) => {
        setNombre(e.target.value);
    }

    const onChangeApellido = (e) => {
        setApellido(e.target.value);
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (nombre.length == 0) {
            setError("Por favor, introduzca su nombre");
            return;
        }

        if (apellido.length == 0) {
            setError("Por favor, introduzca su/s apellido/s");
            return;
        }

        if (email.length == 0) {
            setError("Por favor, introduzca su email");
            return;
        }

        if (password.length == 0) {
            setError("Por favor, introduzca su contraseña");
            return;
        }

        axios.post("http://localhost:8080/registro", {
                nombre: nombre,
                apellidos: apellido,
                email: email,
                contrasena: password
        })
        .then(response => {
            localStorage.setItem('token', response.data);
            navigate("/");
            window.location.reload(true);
        }).catch(err => {
            if (err.response.status == 400) {
                setError("Faltan parámetros");
            }

            if (err.response.status == 409) {
                setError("Ya existe un usuario con estos datos");
            }
        })
    }

    return(
        <div className="contenedorRegistro">
            <h1>¡Bienvenido!</h1>

            <form onSubmit={handleSubmit} className="formularioRegistro">
                <label for="nom">Nombre:</label>
                <input type="text" id="nom" name="nom" onChange={onChangeNombre}></input>

                <label for="ape">Apellido/s:</label>
                <input type="text" id="ape" name="ape" onChange={onChangeApellido}></input>
                
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" onChange={onChangeEmail}></input>

                <label for="pass">Contraseña:</label>
                <input type="password" id="pass" name="pass" onChange={onChangePassword}></input>

                <input type="submit"></input>
            </form>

            <p className="error-unirse">{error}</p>

            <p>¿Ya tienes cuenta? <a href="/login">Inicia sesion aqui</a></p>
        </div>
    ); 
  }

export default Register;
