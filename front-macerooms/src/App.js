import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from './screens/notFound/notFound';
import Inicio from './screens/inicio/inicio';

function App() {
  /*const [usuario, setUsuario]= useState ('');

  useEffect(() => {
    axios.get('http://localhost:8080/hello')
  .then(response => {
    console.log(response.data);
    setUsuario(response.data);
  });
  }, []);

  return (
    <div>
      <p>Bienvenido, {usuario}</p>
    </div>
  );*/

  return (
    <Routes>
      <Route path="/" element={<Inicio/>}></Route>
      <Route path="/*" element={<NotFound/>}></Route>
    </Routes>
  );
}

export default App;
