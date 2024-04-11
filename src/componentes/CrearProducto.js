import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
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
        <Container>
            <Form onSubmit={handleSubmit}>
                <h1>Producto</h1>
                <Row>
                    <Col>
                        {successMessage && <Alert variant="success">{successMessage}</Alert>}
                    </Col>
                </Row>
                <Row>
                <Form.Group as={Col} xs={6} controlId="nombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control required type="text" name="nombre" value={productoData.nombre} onChange={handleChange} placeholder="Nombre" />
                </Form.Group>

                <Form.Group as={Col} xs={6} controlId="descripcion">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control as="textarea" rows={3} name="descripcion" value={productoData.descripcion} onChange={handleChange} placeholder="Descripción" />
                </Form.Group>
                </Row>
                <Row>
                <Form.Group as={Col} xs={6} controlId="peso">
                    <Form.Label>Peso</Form.Label>
                    <Form.Control required type="texto" name="peso" value={productoData.peso} onChange={handleChange} placeholder="Peso" />
                </Form.Group>

                <Form.Group as={Col} xs={6} controlId="fecha">
                    <Form.Label>Fecha Ingreso</Form.Label>
                    <Form.Control required type="date" name="fecha" value={productoData.fecha} onChange={handleChange} />
                </Form.Group>
                </Row>
                <Button style={{ marginTop: '10px'}} variant="primary" type="submit">
                    Crear
                </Button>
            </Form>
        </Container>
    );
}

export default CrearProducto;
