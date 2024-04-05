import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function CrearGasto() {
    const [successMessage, setSuccessMessage] = useState(null);
    const [datosGastos, setdatosGastos] = useState({
        articulo: '',
        valor: 0, 
        fecha: ''
    });

    const handleChange = e => {
        setdatosGastos({
            ...datosGastos,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            // const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            await axios.post('http://localhost:8000/api/gastos', {...datosGastos});
            
            setSuccessMessage('Gasto creado con éxito'); // Establecer el mensaje de éxito
            // Limpiar los campos después de la creación exitosa
            setdatosGastos({
                articulo: '',
                valor: 0, 
                fecha: ''
            });
        } catch (error) {
            console.error('Error al crear Gasto:', error);
            // Resto del código...
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <Form.Group controlId="articulo">
                <Form.Label>Articulo</Form.Label>
                <Form.Control type="text" name="articulo" value={datosGastos.articulo} onChange={handleChange} placeholder="articulo" />
            </Form.Group>

            <Form.Group controlId="valor">
                <Form.Label>Valor</Form.Label>
                <Form.Control type="number" name="valor" value={datosGastos.valor} onChange={handleChange} placeholder="valor" />
            </Form.Group>

            <Form.Group controlId="fecha">
                <Form.Label>Fecha</Form.Label>
                <Form.Control type="date" name="fecha" value={datosGastos.fecha} onChange={handleChange} placeholder="fecha" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Crear Gasto
            </Button>
        </Form>
    );
}

export default CrearGasto;
