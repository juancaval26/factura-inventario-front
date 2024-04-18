import React, { useEffect, useState } from "react";
import Config from "./Config";
import axios from 'axios';
import { Button, Modal, Form, Table } from 'react-bootstrap';

function ListarFacturas(){
    const [facturas, setFacturas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [detallesFactura, setDetallesFactura] = useState(null);
    const [pagActual, setPagActual] = useState(1);
    const [sigPagina, setSigPagina] = useState(1);
    const [buscaTermino, setBuscaTermino] = useState('');

    useEffect(() => {
        fetchFacturas();
    }, [pagActual, buscaTermino]);

    const fetchFacturas = async () => {
        try {
            let url = `${Config}/api/facturas?page=${pagActual}`;
            if (buscaTermino) {
                const response = await axios.get(`${Config}/api/facturas/detalles`, {
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
            // Manejar errores de la API
            if (error.response && error.response.status === 404) {
                // Si la API devuelve un código de estado 404 (No encontrado)
                alert('No se encontraron facturas.');
            }
        }
    };
     
    const handleSearch = () => {
        setPagActual(1); // Resetear número de página al realizar una nueva búsqueda
        fetchFacturas();
    };

    const handleNextPage = () => {
        setPagActual(pagActual + 1);
    };

    const handlePrevPage = () => {
        setPagActual(pagActual - 1);
    };

    const handleOpenModal = (factura) => {
        setDetallesFactura(factura);
        setShowModal(true);
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

    return (
        <div>
            <h1>Facturas: {renderPaginationButtons()}
                <input type="search" value={buscaTermino} onChange={(e) => setBuscaTermino(e.target.value)} placeholder="Codigo" style={{ maxWidth: '250px', maxHeight: '50px' }}/>
                <Button variant="primary" onClick={handleSearch} style={{ marginLeft: '10px' }}>Buscar</Button>
            </h1>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Vendedor</th>
                        <th>Nom.Factura</th>
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
                                <Button variant="primary" onClick={() => handleOpenModal(factura)}>Detalles</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>Detalles Factura</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {detallesFactura && (
                        <Form>
                            <Form.Group controlId="formCodigo">
                                <Form.Label>Código</Form.Label>
                                <Form.Control type="number" readOnly value={detallesFactura.codigo} />
                            </Form.Group>
                            <Form.Group controlId="formVendedor">
                                <Form.Label>Vendedor</Form.Label>
                                <Form.Control type="text" value={detallesFactura.vendedor} />
                            </Form.Group>
                            <Form.Group controlId="formFactura">
                                <Form.Label>Nom.Factura</Form.Label>
                                <Form.Control type="text" value={detallesFactura.nom_Factura} />
                            </Form.Group>
                            <Form.Group controlId="formNegocio">
                                <Form.Label>Negocio</Form.Label>
                                <Form.Control type="text" value={detallesFactura.negocio} />
                            </Form.Group>
                            <Form.Group controlId="formDireccion">
                                <Form.Label>Dirección</Form.Label>
                                <Form.Control type="text" value={detallesFactura.direccion} />
                            </Form.Group>
                            <Form.Group controlId="formTelefono">
                                <Form.Label>Teléfono</Form.Label>
                                <Form.Control type="text" value={detallesFactura.telefono} />
                            </Form.Group>
                            <Form.Group controlId="formCorreo">
                                <Form.Label>Correo</Form.Label>
                                <Form.Control type="email" value={detallesFactura.correo} />
                            </Form.Group>
                            <Form.Group controlId="formFecha">
                                <Form.Label>Fecha</Form.Label>
                                <Form.Control type="date" value={detallesFactura.fecha} />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ListarFacturas;
