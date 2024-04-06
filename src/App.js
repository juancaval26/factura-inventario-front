import './App.css'; 
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import CrearCliente from './componentes/CrearCliente';
import ListarClientes from './componentes/ListarClientes';
import CrearGasto from './componentes/CrearGasto';
import ListarGastos from './componentes/ListarGastos';
import CrearInventario from './componentes/CrearInventario';
import ListarInventario from './componentes/ListarInventario';
import Inicio from './componentes/Inicio';
import CrearProducto from './componentes/CrearProducto';
import ListarProductos from './componentes/ListarProductos';
import CrearDevolucion from './componentes/CrearDevolucion';
import ListarDevoluciones from './componentes/ListarDevoluciones';
import CrearFactura from './componentes/CrearFactura';
import ListarFacturas from './componentes/ListarFacturas';
import CrearEntrada from './componentes/CrearEntrada';
import ListarEntradas from './componentes/ListarEntradas';

function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={<Inicio/>} />
          <Route  path="/crearcliente" element={<CrearCliente/>} />
          <Route  path="/listarclientes" element={<ListarClientes/>} />
          <Route  path="/creargasto" element={<CrearGasto/>} />
          <Route  path="/listargastos" element={<ListarGastos/>} />
          <Route  path="/crearinventario" element={<CrearInventario/>} />
          <Route  path="/listarinventario" element={<ListarInventario/>} />
          <Route  path="/crearproducto" element={<CrearProducto/>} />
          <Route  path="/listarproductos" element={<ListarProductos/>} />
          <Route  path="/creardevolucion" element={<CrearDevolucion/>} />
          <Route  path="/listardevoluciones" element={<ListarDevoluciones/>} />
          <Route  path="/crearfactura" element={<CrearFactura/>} />
          <Route  path="/listarfacturas" element={<ListarFacturas/>} />
          <Route  path="/crearentrada" element={<CrearEntrada/>} />
          <Route  path="/listarentradas" element={<ListarEntradas/>} />


      </Routes>
    </Router>
  );
}

export default App;
