import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function CrearInventario() {
    const [successMessage, setSuccessMessage] = useState(null);
    const [datosInventario, setdatosInventario] = useState({
        codigo: 0, id_producto: '', stock: 0
    });

    const handleChange = e => {
        setdatosInventario({
            ...datosInventario,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            // const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            await axios.post('http://localhost:8000/api/inventario', {...datosInventario});
            
            setSuccessMessage('Inventario creado con éxito'); // Establecer el mensaje de éxito
            // Limpiar los campos después de la creación exitosa
            setdatosInventario({
                codigo: 0, id_producto: '', stock: 0, precioUnitario: 0
            });
        } catch (error) {
            console.error('Error al crear Inventario:', error);
            // Resto del código...
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <Form.Group controlId="codigo">
                <Form.Label>Código</Form.Label>
                <Form.Control type="number" name="codigo" value={datosInventario.codigo} onChange={handleChange}/>
            </Form.Group>

            <Form.Group controlId="producto">
                <Form.Label>Producto</Form.Label>
                <Form.Control type="text" name="producto" value={datosInventario.producto} onChange={handleChange} placeholder="producto" />
            </Form.Group>

            <Form.Group controlId="stock">
                <Form.Label>Stock</Form.Label>
                <Form.Control type="text" name="stock" value={datosInventario.stock} onChange={handleChange}/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Crear Inventario
            </Button>
        </Form>
    );
}

export default CrearInventario;
