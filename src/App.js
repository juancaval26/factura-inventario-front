import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom'; // Importa Navigate
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
import CrearEntrada from './componentes/CrearEntrada';
import ListarEntradas from './componentes/ListarEntradas';
import ListarSalida from './componentes/ListarSalida';
import CrearVenta from './componentes/CrearVenta';
import ListarVentas from './componentes/ListarVentas';
import GenerarPagos from './componentes/GenerarPagos';
import ListarFacturas from './componentes/ListarFacturas';
import Login from './componentes/Login';
import CrearRemision from './componentes/CrearRemision';
import ListarRemisiones from './componentes/ListarRemisiones';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Verificar si el usuario está autenticado al cargar la aplicación
    const userLoggedIn = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(userLoggedIn == 'true');
  }, []);
  
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
          <Route  path="/crearentrada" element={<CrearEntrada/>} />
          <Route  path="/listarentradas" element={<ListarEntradas/>} />
          <Route  path="/listarsalidas" element={<ListarSalida/>} />
          <Route  path="/crearventa" element={<CrearVenta/>} />
          <Route  path="/listarventas" element={<ListarVentas/>} />
          <Route  path="/listarfacturas" element={<ListarFacturas/>} />
          <Route  path="/generarpagos" element={<GenerarPagos/>} />
          <Route  path="/crearremision" element={<CrearRemision/>} />
          <Route  path="/listarremisiones" element={<ListarRemisiones/>} />

      </Routes>
    </Router>
  );
}

export default App;
