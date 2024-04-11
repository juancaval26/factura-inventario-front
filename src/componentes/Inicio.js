import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import 'font-awesome/css/font-awesome.min.css';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import CrearCliente from './CrearCliente';
import CrearDevolucion from './CrearDevolucion';
import CrearEntrada from './CrearEntrada';
import CrearGasto from './CrearGasto';
import CrearInventario from './CrearInventario';
import CrearProducto from './CrearProducto';
import CrearVenta from './CrearVenta';
import ListarClientes from './ListarClientes';
import ListarDevoluciones from './ListarDevoluciones';
import ListarEntradas from './ListarEntradas';
import ListarGastos from './ListarGastos';
import ListarInventario from './ListarInventario';
import ListarProductos from './ListarProductos';
import ListarSalidas from './ListarSalida';
import ListarVentas from './ListarVentas';
import GenerarPagos from './GenerarPagos';
import logo from '../img/logo.jpeg';

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
        'crearGasto': <CrearGasto />,
        'crearInventario': <CrearInventario />,
        'crearProducto': <CrearProducto />,
        'crearVenta': <CrearVenta />,
        'listarClientes': <ListarClientes />,
        'listarDevoluciones': <ListarDevoluciones />,
        'listarEntradas': <ListarEntradas />,
        'listarGastos': <ListarGastos />,
        'listarInventario': <ListarInventario />,
        'listarProductos': <ListarProductos />,
        'listarSalidas': <ListarSalidas />,
        'listarVentas': <ListarVentas />,
        'generarPagos': <GenerarPagos />,

    };

    return (
        <div className={`wrapper d-flex align-items-stretch ${sidebarOpen ? 'toggled' : ''}`}>
            <nav id="sidebar" className={sidebarOpen ? 'active' : ''}>
                <div className="p-4 pt-4">
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
                                <Link onClick={() => handleComponentSelection('crearGasto')}>Crear</Link>
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
                            <a href="#" onClick={() => handleSubMenuCollapse('ventas')}>
                                VENTAS
                            </a>
                            <ul id="ventas" className="collapse list-unstyled">
                                <Link onClick={() => handleComponentSelection('crearVenta')}>Crear</Link>
                                <Link onClick={() => handleComponentSelection('listarVentas')}>Listar</Link>
                                <Link onClick={() => handleComponentSelection('generarPagos')}>pagos</Link>

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
                                <Link onClick={() => handleComponentSelection('listarSalidas')}>Listar</Link>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>

            <div id="content" className="p-md-2">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <button type="button" id="sidebarCollapse" className="btn btn-primary" onClick={toggleSidebar}>
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">
                            <img src={logo} alt="ke-rico" style={{ borderRadius: '50%', width: '50%', margin: '20   px' }} className="d-inline-block align-top" />
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
