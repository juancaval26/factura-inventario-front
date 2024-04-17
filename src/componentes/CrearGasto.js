import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Config from './Config';

function CrearGasto() {
    const [successMessage, setSuccessMessage] = useState(null);
    const [datosGastos, setdatosGastos] = useState({
        articulo: '',
        motivo_gasto: '',
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
            await axios.post(`${Config}/api/gastos`, { ...datosGastos });

            setSuccessMessage('Gasto creado con éxito'); // Establecer el mensaje de éxito
            // Limpiar los campos después de la creación exitosa
            setdatosGastos({
                articulo: '',
                motivo_gasto: '',
                valor: 0,
                fecha: ''
            });
        } catch (error) {
            console.error('Error al crear Gasto:', error);
            // Resto del código...
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <h1>Gastos</h1>
                <Row>
                    <Col>
                        {successMessage && <Alert variant="success">{successMessage}</Alert>}
                    </Col>
                </Row>
                <Row>
                    <Form.Group as={Col} xs={4} controlId="articulo">
                        <Form.Label>Articulo</Form.Label>
                        <Form.Control required type="text" name="articulo" value={datosGastos.articulo} onChange={handleChange} placeholder="Articulo" />
                    </Form.Group>

                    <Form.Group as={Col} xs={4} controlId="valor">
                        <Form.Label>Valor</Form.Label>
                        <Form.Control required type="number" name="valor" value={datosGastos.valor} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group as={Col} xs={4}controlId="formGasto">
                        <Form.Label>Motivo Gasto</Form.Label>
                        <Form.Control required as="textarea" rows={3} value={datosGastos.motivo_gasto} onChange={handleChange} placeholder="Motivo Gasto"/>
                    </Form.Group>

                    <Form.Group as={Col} xs={4} controlId="fecha">
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control required type="date" name="fecha" value={datosGastos.fecha} onChange={handleChange} placeholder="Fecha" />
                    </Form.Group>
                </Row>
                <Button style={{ marginTop: '10px' }} variant="primary" type="submit">
                    Crear
                </Button>
            </Form>
        </Container>
    );
}

export default CrearGasto;
