import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import axios from 'axios';

function CrearCliente() {
    const [successMessage, setSuccessMessage] = useState(null);
    const [datosCliente, setDatosCliente] = useState({
        nombre: '',
        negocio: '',
        direccion: '',
        telefono: '',
        nit: '',
        estado: '',
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
            // const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            await axios.post('http://localhost:8000/api/clientes', {...datosCliente});
            
            setSuccessMessage('Cliente creado con éxito'); // Establecer el mensaje de éxito
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
            console.error('Error al crear cliente:', error);
            // Resto del código...
        }
    };

    return (
        <Container>
            <h1>Clientes</h1>
        <Form onSubmit={handleSubmit}>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <Form.Group controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" name="nombre" value={datosCliente.nombre} onChange={handleChange} placeholder="nombre" />
            </Form.Group>

            <Form.Group controlId="negocio">
                <Form.Label>Negocio</Form.Label>
                <Form.Control type="text" name="negocio" value={datosCliente.negocio} onChange={handleChange} placeholder="Negocio" />
            </Form.Group>

            <Form.Group controlId="direccion">
                <Form.Label>Dirección</Form.Label>
                <Form.Control type="text" name="direccion" value={datosCliente.direccion} onChange={handleChange} placeholder="Dirección" />
            </Form.Group>

            <Form.Group controlId="telefono">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control type="text" name="telefono" value={datosCliente.telefono} onChange={handleChange} placeholder="Teléfono" />
            </Form.Group>

            <Form.Group controlId="nit">
                <Form.Label>NIT</Form.Label>
                <Form.Control type="text" name="nit" value={datosCliente.nit} onChange={handleChange} placeholder="NIT" />
            </Form.Group>

            <Form.Group controlId="estado">
                <Form.Label>Estado</Form.Label>
                <Form.Control type="text" name="estado" value={datosCliente.estado} onChange={handleChange} placeholder="Estado" />
            </Form.Group>

            <Form.Group controlId="correo">
                <Form.Label>Correo</Form.Label>
                <Form.Control type="email" name="correo" value={datosCliente.correo} onChange={handleChange} placeholder="Correo electrónico"/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Crear Cliente
            </Button>
        </Form>
        </Container>
    );
}

export default CrearCliente;
