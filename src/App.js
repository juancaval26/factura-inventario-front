import './App.css'; 
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import CrearCliente from './componentes/CrearCliente';
import ListarClientes from './componentes/ListarClientes';
import CrearGasto from './componentes/CrearGasto';
import ListarGastos from './componentes/ListarGastos';
import CrearInventario from './componentes/CrearInventario';
import ListarInventario from './componentes/ListarInventario';
import Inicio from './componentes/Inicio';

function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={<Inicio/>} />
          <Route  path="/crearcliente" element={<CrearCliente/>} />
          <Route  path="/listarclientes" element={<ListarClientes/>} />
          <Route  path="/creargasto" element={<CrearGasto/>} />
          <Route  path="/listarGastos" element={<ListarGastos/>} />
          <Route  path="/crearInventario" element={<CrearInventario/>} />
          <Route  path="/listarInventario" element={<ListarInventario/>} />

      </Routes>
    </Router>
  );
}

export default App;
