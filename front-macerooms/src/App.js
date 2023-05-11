import './App.css';
import { Routes, Route } from 'react-router-dom';
import NotFound from './screens/notFound/notFound';
import Inicio from './screens/inicio/inicio';
import Container from './screens/container/container';

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
      </Route>
    </Routes>
  );
}

export default App;
