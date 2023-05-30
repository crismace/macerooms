import { Routes, Route } from 'react-router-dom';
import NotFound from './screens/notFound/notFound';
import Inicio from './screens/inicio/inicio';
import Container from './screens/container/container';
import Login from './screens/login/login';
import Register from './screens/register/register';
import Alojamiento from './screens/alojamiento/alojamiento';

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
      <Route path='/' element={<Container/>}>
        <Route path="*" element={<NotFound/>}></Route>
        <Route index element={<Inicio/>}></Route>
        <Route path="login" element={<Login/>}></Route>
        <Route path="registro" element={<Register/>}></Route>
        <Route path="alojamiento/:alojamientoId" element={<Alojamiento/>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
