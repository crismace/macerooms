import React from 'react';
import { useNavigate } from 'react-router-dom';
import './reservaConfirmada.css';

const ReservaConfirmada = () => {
  const navigate = useNavigate();

  return (
    <div className="contConfirmada">
        <div>
            <h1>¡Enhorabuena!</h1>

            <h2>Tu reserva ha sido confirmada con exito</h2>

            <h3>Desde Macerooms esperamos que tu estancia sea maravillosa</h3>
            <h3>¡Disfruta de tu viaje</h3>

            <p>Para volver al inicio <a href='/'>pulsa aqui</a></p>
        </div>

        <div>
            <img src="/images/confirmada.jpg"></img>
        </div>
    </div>
  );
};

export default ReservaConfirmada;
