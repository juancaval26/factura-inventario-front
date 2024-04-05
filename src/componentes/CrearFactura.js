import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import Inicio from './Inicio';

function CrearFactura() {
    const [successMessage, setSuccessMessage] = useState(null);
    const [datosFactura, setdatosFactura] = useState({
        negocio: '',
        direccion: '',
        telefono: '',
        nit: '',
        estado: '',
        correo: ''
    });

    const handleChange = e => {
        setdatosFactura({
            ...datosFactura,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            // const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            await axios.post('http://localhost:8000/api/factura', {...datosFactura});
            
            setSuccessMessage('Cliente creado con éxito'); // Establecer el mensaje de éxito
            // Limpiar los campos después de la creación exitosa
            setdatosFactura({
                id_cliente: 0, 
                codigo: 0,  
                fecha: '', 
            });
        } catch (error) {
            console.error('Error al crear cliente:', error);
            // Resto del código...
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <Form.Group controlId="Cliente">
                <Form.Label>nom.Cliente</Form.Label>
                <Form.Control type="text" name="cliente" value={datosFactura.cliente} onChange={handleChange} placeholder="cliente" />
            </Form.Group>

            <Form.Group controlId="codigo">
                <Form.Label>codigo</Form.Label>
                <Form.Control type="text" name="codigo" value={datosFactura.codigo} onChange={handleChange} placeholder="codigo" />
            </Form.Group>

            <Form.Group controlId="fecha">
                <Form.Label>fecha</Form.Label>
                <Form.Control type="date" name="fecha" value={datosFactura.fecha} onChange={handleChange} placeholder="fecha" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Crear Factura
            </Button>
        </Form>
    );
}

export default CrearFactura;
