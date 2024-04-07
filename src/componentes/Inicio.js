import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import 'font-awesome/css/font-awesome.min.css';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import CrearCliente from './CrearCliente';
import CrearDevolucion from './CrearDevolucion';
import CrearEntrada from './CrearEntrada';
import CrearFactura from './CrearFactura';
import CrearGasto from './CrearGasto';
import CrearInventario from './CrearInventario';
import CrearProducto from './CrearProducto';
import CrearSalida from './CrearSalida';
import Crearventa from './CrearVenta';
import ListarClientes from './ListarClientes';
import ListarDevoluciones from './ListarDevoluciones';
import ListarEntradas from './ListarEntradas';
import ListarFacturas from './ListarFacturas';
import ListarGastos from './ListarGastos';
import ListarInventario from './ListarInventario';
import ListarProductos from './ListarProductos';
import Listarsalidas from './ListarSalida';
import Listarventas from './ListarVentas';

function Inicio() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeComponent, setActiveComponent] = useState(null);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Función para manejar el colapso de los submenús
    const handleSubMenuCollapse = (id) => {
        $(`#${id}`).toggleClass('collapse');
    };

    // Función para manejar la selección del componente a mostrar
    const handleComponentSelection = (component) => {
        setActiveComponent(component);
    };

    // Mapa de nombres de componentes a sus componentes correspondientes
    const componentMap = {
        'crearCliente': <CrearCliente />,
        'crearDevolucion': <CrearDevolucion />,
        'crearEntrada': <CrearEntrada />,
        'crearFactura': <CrearFactura />,
        'crearGasto': <CrearGasto />,
        'crearInventario': <CrearInventario />,
        'crearProducto': <CrearProducto />,
        'crearSalida': <CrearSalida />,
        'crearVenta': <Crearventa />,
        'listarClientes': <ListarClientes />,
        'listarDevoluciones': <ListarDevoluciones />,
        'listarEntradas': <ListarEntradas />,
        'listarFacturas': <ListarFacturas />,
        'listarGastos': <ListarGastos />,
        'listarInventario': <ListarInventario />,
        'listarProductos': <ListarProductos />,
        'listarSalidas': <Listarsalidas />,
        'listarVentas': <Listarventas />,
    };

    return (
        <div className={`wrapper d-flex align-items-stretch ${sidebarOpen ? 'toggled' : ''}`}>
            <nav id="sidebar" className={sidebarOpen ? 'active' : ''}>
                <div className="p-4 pt-5">
                    <ul className="list-unstyled components mb-5">
                        <li className="active">
                            <a href="#" onClick={() => handleSubMenuCollapse('clientes')}>
                                CLIENTES
                            </a>
                            <ul id="clientes" className="collapse list-unstyled">
                                <Link onClick={() => handleComponentSelection('crearCliente')}>Crear</Link>
                                <Link onClick={() => handleComponentSelection('listarClientes')}>Listar</Link>
                            </ul>
                        </li>
                        <li className="active">
                            <a href="#" onClick={() => handleSubMenuCollapse('productos')}>
                                PRODUCTOS
                            </a>
                            <ul id="productos" className="collapse list-unstyled">
                                <Link onClick={() => handleComponentSelection('crearProducto')}>Crear</Link>
                                <Link onClick={() => handleComponentSelection('listarProductos')}>Listar</Link>
                            </ul>
                        </li>
                        <li>
                            <a href="#" onClick={() => handleSubMenuCollapse('gastos')}>
                                GASTOS
                            </a>
                            <ul id="gastos" className="collapse list-unstyled">
                                <Link onClick={() => handleComponentSelection('crearGastos')}>Crear</Link>
                                <Link onClick={() => handleComponentSelection('listarGastos')}>Listar</Link>
                            </ul>
                        </li>
                        <li>
                            <a href="#" onClick={() => handleSubMenuCollapse('inventario')}>
                                INVENTARIO
                            </a>
                            <ul id="inventario" className="collapse list-unstyled">
                                <Link onClick={() => handleComponentSelection('crearInventario')}>Crear</Link>
                                <Link onClick={() => handleComponentSelection('listarInventario')}>Listar</Link>
                            </ul>
                        </li>
                        <li>
                            <a href="#" onClick={() => handleSubMenuCollapse('devolucion')}>
                                DEVOLUCIONES
                            </a>
                            <ul id="devolucion" className="collapse list-unstyled">
                                <Link onClick={() => handleComponentSelection('crearDevolucion')}>Crear</Link>
                                <Link onClick={() => handleComponentSelection('listarDevoluciones')}>Listar</Link>
                            </ul>
                        </li>
                        <li>
                            <a href="#" onClick={() => handleSubMenuCollapse('facturas')}>
                                FACTURAS
                            </a>
                            <ul id="facturas" className="collapse list-unstyled">
                                <Link onClick={() => handleComponentSelection('crearFactura')}>Crear</Link>
                                <Link onClick={() => handleComponentSelection('listarFacturas')}>Listar</Link>
                            </ul>
                        </li>
                        <li>
                            <a href="#" onClick={() => handleSubMenuCollapse('ventas')}>
                                VENTAS
                            </a>
                            <ul id="ventas" className="collapse list-unstyled">
                                <Link onClick={() => handleComponentSelection('crearVenta')}>Crear</Link>
                                <Link onClick={() => handleComponentSelection('listarVentas')}>Listar</Link>
                            </ul>
                        </li>
                        <li>
                            <a href="#" onClick={() => handleSubMenuCollapse('entradas')}>
                                ENTRADAS
                            </a>
                            <ul id="entradas" className="collapse list-unstyled">
                                <Link onClick={() => handleComponentSelection('crearEntrada')}>Crear</Link>
                                <Link onClick={() => handleComponentSelection('listarEntradas')}>Listar</Link>
                            </ul>
                        </li>
                        <li>
                            <a href="#" onClick={() => handleSubMenuCollapse('salidas')}>
                                SALIDAS
                            </a>
                            <ul id="salidas" className="collapse list-unstyled">
                                <Link onClick={() => handleComponentSelection('crearSalida')}>Crear</Link>
                                <Link onClick={() => handleComponentSelection('listarSalidas')}>Listar</Link>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>

            <div id="content" className="p-4 p-md-5">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <button type="button" id="sidebarCollapse" className="btn btn-primary" onClick={toggleSidebar}>
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                        <a className="navbar-brand" href="#">
                            <img src="" alt="ke-rico" width="" height="30" className="d-inline-block align-top" />
                        </a>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Inicio</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Iniciar Sesión</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            <div id="componente">
                {activeComponent && componentMap[activeComponent]}

            </div>
                
            </div>
        </div>
    );
}

export default Inicio;
