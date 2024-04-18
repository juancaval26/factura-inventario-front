import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Config from './Config';

function CrearCliente() {
    const [successMessage, setSuccessMessage] = useState(null);
    const [datosCliente, setDatosCliente] = useState({
        nombre: '',
        negocio: '',
        direccion: '',
        telefono: '',
        nit: '',
        estado: 'A',
        correo: ''
    });

    const handleChange = e => {
        setDatosCliente({
            ...datosCliente,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post(`${Config}`, {...datosCliente});
            
            setSuccessMessage('Cliente creado con éxito');
            // Limpiar los campos después de la creación exitosa
            setDatosCliente({
                nombre: '',
                negocio: '',
                direccion: '',
                telefono: '',
                nit: '',
                estado: '',
                correo: ''
            });
        } catch (error) {
            alert('Error al crear cliente:', error);
            // Resto del código...
        }
    };

    return (
            <Container>
                <Form onSubmit={handleSubmit}>
                    <h1>Clientes</h1>
                    <Row>
                        <Col>
                            {successMessage && <Alert variant="success">{successMessage}</Alert>}
                        </Col>
                    </Row>
                    <Row>
                        <Form.Group as={Col} controlId="nombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control required type="text" name="nombre" value={datosCliente.nombre} onChange={handleChange} placeholder="Nombre" />
                        </Form.Group>
    
                        <Form.Group as={Col} controlId="negocio">
                            <Form.Label>Negocio</Form.Label>
                            <Form.Control required type="text" name="negocio" value={datosCliente.negocio} onChange={handleChange} placeholder="Negocio" />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} controlId="direccion">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control required type="text" name="direccion" value={datosCliente.direccion} onChange={handleChange} placeholder="Dirección" />
                        </Form.Group>
    
                        <Form.Group as={Col} controlId="telefono">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control required type="text" name="telefono" value={datosCliente.telefono} onChange={handleChange} placeholder="Teléfono" />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} controlId="nit">
                            <Form.Label>NIT</Form.Label>
                            <Form.Control type="text" name="nit" value={datosCliente.nit} onChange={handleChange} placeholder="NIT" />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} xs={6} controlId="correo">
                            <Form.Label>Correo</Form.Label>
                            <Form.Control type="email" name="correo" value={datosCliente.correo} onChange={handleChange} placeholder="Correo" />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Col>
                            <Button style={{ marginTop: '10px'}} variant="primary" type="submit">
                                Crear
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
    );
}

export default CrearCliente;
