import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Table } from 'react-bootstrap';

function ListarFacturas({ id_cliente, codigo, fecha }) {
    const [facturas, setFacturas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [facturaEditada, setFacturaEditada] = useState(null);

    useEffect(() => {
        const fetchFacturas = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/factura');
                setFacturas(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchFacturas();
    }, []);

    const handleOpenModal = (factura) => {
        setFacturaEditada(factura);
        setShowModal(true);
    };

    const handleGuardarEdicion = async () => {
        try {
            await axios.put(`http://localhost:8000/api/factura/${facturaEditada.id}`, facturaEditada);
            setShowModal(false);
            console.log('Cambios guardados exitosamente.');

            // Actualizar datos locales después de guardar cambios
            const response = await axios.get('http://localhost:8000/api/factura');
            setFacturas(response.data);
        } catch (error) {
            console.error('Error al guardar cambios:', error);
        }
    };

    return (
        <div>
            <h1>Listado de Facturas</h1>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Nombre Cliente</th>
                        <th>Código</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {facturas.map(factura => (
                        <tr key={factura.id}>
                            <td>{factura.cliente.nombre}</td>
                            <td>{factura.codigo}</td>
                            <td>{factura.fecha}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleOpenModal(factura)}>Editar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Factura</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {facturaEditada && (
                        <Form>
                            <Form.Group controlId="formIdCliente">
                                <Form.Label>Nombre Cliente</Form.Label>
                                <Form.Control type="text" placeholder="Nombre Cliente" value={facturaEditada.cliente.nombre} onChange={(e) => setFacturaEditada({ ...facturaEditada, id_cliente: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formCodigo">
                                <Form.Label>Código</Form.Label>
                                <Form.Control type="text" placeholder="Código" value={facturaEditada.codigo} onChange={(e) => setFacturaEditada({ ...facturaEditada, codigo: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formFecha">
                                <Form.Label>Fecha</Form.Label>
                                <Form.Control type="date" placeholder="Fecha" value={facturaEditada.fecha} onChange={(e) => setFacturaEditada({ ...facturaEditada, fecha: e.target.value })} />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleGuardarEdicion}>
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ListarFacturas;
