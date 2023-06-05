import { Routes, Route } from 'react-router-dom';
import NotFound from './screens/notFound/notFound';
import Inicio from './screens/inicio/inicio';
import Container from './screens/container/container';
import Login from './screens/login/login';
import Register from './screens/register/register';
import Alojamiento from './screens/alojamiento/alojamiento';
import Perfil from './screens/perfil/perfil';
import Anfitrion from './screens/anfitrion/anfitrion';
import AnfitrionFormulario from './screens/anfitrionFormulario/anfitrionFormulario';
import Reserva from './screens/reserva/reserva';
import Busqueda from './screens/busqueda/busqueda';
import ReservaConfirmada from './screens/reservaConfirmada/reservaConfirmada';
import { useState } from 'react';
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
  
  const [resultado,setResultado] = useState();
  const [datosReserva,setDatosReserva] = useState();


  return (
    <Routes>
      <Route path='/' element={<Container resultado={resultado} setResultado={setResultado}/>}>
        <Route path="*" element={<NotFound/>}></Route>
        <Route index element={<Inicio/>}></Route>
        <Route path="login" element={<Login/>}></Route>
        <Route path="registro" element={<Register/>}></Route>
        <Route path="alojamiento/:alojamientoId" element={<Alojamiento datosReserva={datosReserva} setDatosReserva={setDatosReserva}/>}></Route>
        <Route path="perfil" element={<Perfil/>}></Route>
        <Route path="anfitrion" element={<Anfitrion/>}></Route>
        <Route path="anfitrion/formulario" element={<AnfitrionFormulario/>}></Route>
        <Route path="crearAlojamiento" element={<AnfitrionFormulario/>}></Route>
        <Route path="alojamientoEdicion/:alojamientoId" element={<AnfitrionFormulario/>}></Route>
        <Route path="busqueda" element={<Busqueda resultado={resultado} setResultado={setResultado}/>}></Route>
        <Route path="reserva" element={<Reserva datosReserva={datosReserva} setDatosReserva={setDatosReserva}/>}></Route>
        <Route path="reserva/confirmada" element={<ReservaConfirmada/>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
