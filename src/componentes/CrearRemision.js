import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Modal, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import Config from './Config';

function CrearRemision() {
    const [showModal, setShowModal] = useState(false);
    const [buscarCliente, setBuscarCliente] = useState('');
    const [clienteEncontrado, setClienteEncontrado] = useState([]);
    const [selectedCliente, setSelectedCliente] = useState([]);

    const [remision, setRemision] = useState({
        detalles: '',
        fecha: ''
    });
    
    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleChangeCliente = async e => {
        setBuscarCliente(e.target.value);
        try {
            const response = await axios.get(`${Config}/api/clientes/buscar`, {
                params: {
                    nombre: e.target.value
                }
            });
            setClienteEncontrado(response.data);
        } catch (error) {
            alert('Error al buscar cliente:', error);
            setClienteEncontrado([]);
        }
    };

    const handleChangeRemision = e => {
        setRemision({
            ...remision,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            if (!selectedCliente) {
                alert('Por favor selecciona un cliente.');
                return;
            }
            const datosRemision = {
                id_cliente: clienteEncontrado[0].id, // Usar el ID del cliente seleccionado
                ...remision
            };
    
            // Guardar la remisión en la base de datos
            await axios.post(`${Config}/api/remisiones`, datosRemision);
            alert('Remisión creada exitosamente');
    
            // Restablecer el estado después de crear la remisión
            setRemision({
                detalles: '',
                fecha: ''
            });
            setBuscarCliente('');
            setClienteEncontrado([]); // Limpiar la lista de clientes encontrados
            setSelectedCliente(null); // Limpiar el cliente seleccionado
        } catch (error) {
            alert('Error al crear Remisión:', error);
        }
    };
    

    const handleSelectCliente = cliente => {
        setSelectedCliente(cliente.id);
        setBuscarCliente(cliente.nombre); // Mostrar el nombre del cliente seleccionado en el input
        setShowModal(false); // Cerrar el modal después de seleccionar un cliente
    };

    return (
        <Container>
            <Form>
                <h1>Remisión</h1>
                <Row>
                    <Form.Group as={Col} xs={4} controlId="buscarCliente">
                        <Form.Label>Buscar Cliente</Form.Label>
                        <Form.Control required type="text" value={buscarCliente} onChange={handleChangeCliente} placeholder="Nom.Cliente" />
                        <Button variant="primary" style={{ marginTop: '10px' }} onClick={openModal}>Buscar</Button>
                    </Form.Group>
                    <Form.Group as={Col} xs={4} controlId="detalles">
                        <Form.Label>Detalles</Form.Label>
                        <Form.Control required as='textarea' name="detalles" value={remision.detalles} onChange={handleChangeRemision} placeholder="detalles" />
                    </Form.Group>
                    <Form.Group as={Col} xs={4} controlId="fecha">
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control required type="date" name="fecha" value={remision.fecha} onChange={handleChangeRemision} />
                    </Form.Group>
                </Row>
                <Button style={{ marginTop: '10px', marginLeft: '10px' }} variant="primary" onClick={handleSubmit}>
                    Guardar
                </Button>
            </Form>
            {/* Modal para mostrar la lista de clientes */}
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Seleccionar Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {clienteEncontrado.map(cliente => (
                            <ListGroup.Item key={cliente.id} action onClick={() => handleSelectCliente(cliente)}>
                                {cliente.nombre}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default CrearRemision;
