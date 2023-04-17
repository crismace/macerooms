import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

function App() {
  const [usuario, setUsuario]= useState ('');

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
  );
}

export default App;
