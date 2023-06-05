import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../login/login.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail]= useState ('');
    const [password, setPassword]= useState ('');
    const [error, setError]= useState ('');

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email.length == 0) {
            setError("Por favor, introduzca su email");
            return;
        }

        if (password.length == 0) {
            setError("Por favor, introduzca su contraseña");
            return;
        }

        axios.post("http://localhost:8080/login", {
                email: email,
                contrasena: password
        })
        .then(response => {
            localStorage.setItem('token', response.data);
            navigate("/");
            window.location.reload(true);
        }).catch(err => {
            if (err.response.status == 400) {
                setError("El usuario o la contraseña introducidos son incorrectos");
            }
        })
    }

    return(
        <div className="contenedorSesion">
            <h1>¡Bienvenido de vuelta!</h1>

            <form onSubmit={handleSubmit} className="formularioLogin">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" onChange={onChangeEmail}></input>

                <label for="contrasena">Contraseña:</label>
                <input type="password" id="contrasena" name="contrasena" onChange={onChangePassword}></input>

                <input type="submit"></input>
            </form>

            <p className="error-unirse">{error}</p>

            <p>¿Aun no tienes cuenta? <a href="/registro">Registrate aqui</a></p>
        </div>
    ); 
  }

export default Login;
