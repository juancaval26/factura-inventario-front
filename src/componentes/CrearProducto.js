import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function CrearProducto() {
    const [successMessage, setSuccessMessage] = useState(null);
    const [productoData, setProductoData] = useState({
        nombre: '',
        descripcion: '',
        peso: 0,
        fecha: '',
    });

    const handleChange = e => {
        setProductoData({
            ...productoData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/productos', { ...productoData });
            
            setSuccessMessage('Producto creado con éxito');
            setProductoData({
                nombre: '',
                descripcion: '',
                peso: 0,
                fecha: '',
            });
        } catch (error) {
            console.error('Error al crear Producto:', error);
            // Resto del código...
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <Form.Group controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" name="nombre" value={productoData.nombre} onChange={handleChange} placeholder="Nombre" />
            </Form.Group>

            <Form.Group controlId="descripcion">
                <Form.Label>Descripción</Form.Label>
                <Form.Control type="text" name="descripcion" value={productoData.descripcion} onChange={handleChange} placeholder="Descripción" />
            </Form.Group>

            <Form.Group controlId="peso">
                <Form.Label>Peso</Form.Label>
                <Form.Control type="texto" name="peso" value={productoData.peso} onChange={handleChange} placeholder="Peso" />
            </Form.Group>

            <Form.Group controlId="fecha">
                <Form.Label>Fecha Ingreso</Form.Label>
                <Form.Control type="date" name="fecha" value={productoData.fecha} onChange={handleChange} placeholder="Fecha" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Crear Producto
            </Button>
        </Form>
    );
}

export default CrearProducto;
