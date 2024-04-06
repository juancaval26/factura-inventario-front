import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import 'font-awesome/css/font-awesome.min.css';
import $ from 'jquery';
import { Link } from 'react-router-dom';

function Inicio() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Función para manejar el colapso del menú lateral
    const handleSidebarCollapse = () => {
        $('#sidebar').toggleClass('active');
    };

    // Función para manejar el colapso de los submenús
    const handleSubMenuCollapse = (id) => {
        $(`#${id}`).toggleClass('collapse');
    };

    return (
        <div className={`wrapper d-flex align-items-stretch ${sidebarOpen ? 'toggled' : ''}`}>
            <nav id="sidebar" className={sidebarOpen ? 'active' : ''}>
                <div className="p-4 pt-5">
                    <ul className="list-unstyled components mb-5">
                        <li className="active">
                            <a href="#homeSubmenu" onClick={() => handleSubMenuCollapse('homeSubmenu')}>
                                CLIENTES
                            </a>
                            <ul id="homeSubmenu" className="collapse list-unstyled">
                                <Link to='./crearcliente'>Crear</Link>
                                <Link to='./listarclientes'>Listar</Link>
                                {/* <li><a href="#">Home 2</a></li>
                                <li><a href="#">Home 3</a></li> */}
                            </ul>
                        </li>
                        <li>
                            <a href="#" onClick={() => handleSubMenuCollapse('aboutSubmenu')}>
                                GASTOS
                            </a>
                            <ul id="aboutSubmenu" className="collapse list-unstyled">
                                <Link to='./creargasto'>Crear</Link>
                                <Link to='./listarGastos'>Listar</Link>
                            </ul>
                        </li>
                        <li>
                            <a href="#" onClick={() => handleSubMenuCollapse('pageSubmenu')}>
                                INVENTARIO
                            </a>
                            <ul id="pageSubmenu" className="collapse list-unstyled">
                                <Link to='./crearInventario'>Crear</Link>
                                <Link to='./listarInventario'>Listar</Link>
                            </ul>
                        </li>
                        <li>
                            <a href="#" onClick={() => handleSubMenuCollapse('devolucion')}>
                                DEVOLUCIONES
                            </a>
                            <ul id="devolucion" className="collapse list-unstyled">
                                <Link to='./creardevolucion'>Crear</Link>
                                <Link to='./listardevoluciones'>Listar</Link>
                            </ul>
                        </li>
                        <li>
                            <a href="#" onClick={() => handleSubMenuCollapse('facturas')}>
                                FACTURAS
                            </a>
                            <ul id="facturas" className="collapse list-unstyled">
                                <Link to='./crearfactura'>Crear</Link>
                                <Link to='./listarfacturas'>Listar</Link>
                            </ul>
                        </li>
                        <li>
                            <a href="#" onClick={() => handleSubMenuCollapse('entradas')}>
                                ENTRADAS
                            </a>
                            <ul id="entradas" className="collapse list-unstyled">
                                <Link to='./crearentrada'>Crear</Link>
                                <Link to='./listarentradas'>Listar</Link>
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
                            <span className="sr-only">Toggle Menu</span>
                        </button>
                        <a className="navbar-brand" href="#">
                            <img src="logo.png" alt="Logo" width="30" height="30" className="d-inline-block align-top" />
                            React App
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
            </div>
        </div>
    );
}

export default Inicio;
