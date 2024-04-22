import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Button, Modal, Table, Container } from 'react-bootstrap';
import Config from "./Config";

function ListarFacturas() {
    const [facturas, setFacturas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [pagActual, setPagActual] = useState(1);
    const [sigPagina, setSigPagina] = useState(1);
    const [buscaTermino, setBuscaTermino] = useState('');
    const [showDetalle, setShowDetalle] = useState(false);
    const [codigoFactura, setCodigoFactura] = useState('');
    const [facturaEnc, setFacturaEnc] = useState({});
    const [facturaDet, setFacturaDet] = useState([]);

    const handleCloseModal = () => {
        setShowModal(false);
        setShowDetalle(false);
    };

    const handleOpenDetalles = async (codigo) => {
        setCodigoFactura(codigo);
        try {
            const response = await axios.get(`${Config}/api/facturas/detalles?codigo=${codigo}`);
            setFacturaEnc(response.data.facturaEnc);
            setFacturaDet(response.data.facturaDet);
            setShowDetalle(true);
        } catch (error) {
            console.error('Error al obtener detalles de factura:', error);
        }
    };

    useEffect(() => {
        fetchFacturas();
    }, [pagActual, buscaTermino]);

    const fetchFacturas = async () => {
        try {
            let url = `${Config}/api/facturas?page=${pagActual}`;
            if (buscaTermino) {
                const response = await axios.get(`${Config}/api/facturas/buscar`, {
                    params: {
                        codigo: buscaTermino
                    }
                });
                setFacturas(response.data);
                setSigPagina(response.data.last_page);
            } else {
                const response = await axios.get(url);
                setFacturas(response.data.data);
                setSigPagina(response.data.last_page);
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                alert('No se encontraron facturas.');
            }
        }
    };

    const handleSearch = () => {
        setPagActual(1);
        fetchFacturas();
    };

    const handleNextPage = () => {
        setPagActual(pagActual + 1);
    };

    const handlePrevPage = () => {
        setPagActual(pagActual - 1);
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        buttons.push(
            <Button key="prev" variant="secondary" disabled={pagActual === 1} onClick={handlePrevPage}>
                Anterior
            </Button>
        );

        buttons.push(
            <Button key="next" style={{ margin: '5px' }} variant="secondary" disabled={pagActual === sigPagina} onClick={handleNextPage}>
                Siguiente
            </Button>
        );
        return buttons;
    };
    let totalProductos = 0;

    return (
        <div>
            <h1>Facturas: {renderPaginationButtons()}
                <input type="search" value={buscaTermino} onChange={(e) => setBuscaTermino(e.target.value)} placeholder="Codigo" style={{ maxWidth: '250px', maxHeight: '50px' }} />
                <Button variant="primary" onClick={handleSearch} style={{ marginLeft: '10px' }}>Buscar</Button>
            </h1>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Vendedor</th>
                        <th>Nom.Cliente</th>
                        <th>Negocio</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                        <th>Correo</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {facturas && facturas.map(factura => (
                        <tr key={factura.id}>
                            <td>{factura.codigo}</td>
                            <td>{factura.vendedor}</td>
                            <td>{factura.nom_cliente}</td>
                            <td>{factura.negocio}</td>
                            <td>{factura.direccion}</td>
                            <td>{factura.telefono}</td>
                            <td>{factura.correo}</td>
                            <td>{factura.fecha}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleOpenDetalles(factura.codigo)}>Detalles</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={showDetalle} onHide={handleCloseModal} size="lg">
                <Modal.Body>
                    {facturaEnc && (
                        <Container fluid>
                            <h3>Factura de Venta</h3>
                            <div className="table-responsive">
                                <Table bordered>
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Fecha</th>
                                            <th>Vendedor</th>
                                            <th>Nombre Cliente</th>
                                            <th>Negocio</th>
                                            <th>Dirección</th>
                                            <th>Teléfono</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{facturaEnc.codigo}</td>
                                            <td>{facturaEnc.fecha}</td>
                                            <td>{facturaEnc.vendedor}</td>
                                            <td>{facturaEnc.nom_cliente}</td>
                                            <td>{facturaEnc.negocio}</td>
                                            <td>{facturaEnc.direccion}</td>
                                            <td>{facturaEnc.telefono}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            <h3>Detalles</h3>
                            <div className="table-responsive">
                                <Table bordered>
                                    <thead>
                                        <tr>
                                            <th>Nombre Producto</th>
                                            <th>Cantidad</th>
                                            <th>Precio</th>
                                            <th>Sub Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {facturaDet && facturaDet.map((detalle, index) => (
                                            <tr key={index}>
                                                <td>{detalle.nom_producto}</td>
                                                <td>{detalle.cantidad}</td>
                                                <td>{detalle.precio}</td>
                                                <td>{detalle.total_producto}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    {facturaDet.forEach(detalle => {
                                        totalProductos += parseInt(detalle.total_producto);
                                    })}
                                    <label style={{ marginLeft: '210%' }}><strong>Total:{totalProductos}</strong></label>
                                </Table>
                            </div>
                        </Container>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ListarFacturas;
