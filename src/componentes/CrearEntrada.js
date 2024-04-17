import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Config from './Config';

function CrearEntrada() {
    const [successMessage, setSuccessMessage] = useState(null);
    const [entrada, setEntrada] = useState({
        id_inventario: 0,
        codigo: '',
        id_producto: 0,
        cantidad: 0,
        fecha: ''
    });
    const [stockInventario, setstockInventario] = useState({
        stock: 0
    });
    const [buscarProducto, setBuscarProducto] = useState('');
    const [productosEncontrados, setProductosEncontrados] = useState([]);
    const [buscarInventario, setBuscarInventario] = useState('');
    const [inventarioEncontrado, setInventarioEncontrado] = useState(null);
    const [noResultMessage, setNoResultMessage] = useState('');

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get(`${Config}/api/productos/buscar`, {
                    params: {
                        nombre: buscarProducto
                    }
                });
                setProductosEncontrados(response.data);
            } catch (error) {
                console.error('Error al buscar producto:', error);
                setProductosEncontrados([]);
            }
        };

        const fetchInventarioBuscar = async () => {
            try {
                const response = await axios.get(`${Config}/api/inventario/buscar`, {
                    params: {
                        codigo: buscarInventario
                    }
                });
                if (response.data.length > 0) {
                    setInventarioEncontrado(response.data[0]);
                    setstockInventario(response.data[0].stock);
                    console.log(response.data[0].stock);
                } else {
                    setInventarioEncontrado(null);
                    setNoResultMessage(`No se encontró ningún inventario con el código ${buscarInventario}`);
                }
            } catch (error) {
                console.error('Error al buscar inventario:', error);
                setInventarioEncontrado(null);
            }
        };

        if (buscarProducto.trim() !== '') {
            fetchProductos();
        } else {
            setProductosEncontrados([]);
        }

        if (buscarInventario.trim() !== '') {
            fetchInventarioBuscar();
        } else {
            setInventarioEncontrado(null);
            setNoResultMessage('');
        }
    }, [buscarProducto, buscarInventario]);

    const handleChangeProducto = e => {
        setBuscarProducto(e.target.value);
    };

    const handleChangeEntrada = e => {
        setEntrada({
            ...entrada,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if (!inventarioEncontrado) {
                setNoResultMessage(`No se encontró ningún inventario con el código ${buscarInventario}`);
                return;
            }

            const entradaData = {
                ...entrada,
                id_producto: productosEncontrados.length > 0 ? productosEncontrados[0].id : '',
                id_inventario: inventarioEncontrado.id
            };

            const response = await axios.post(`${Config}/api/entrada`, entradaData);

            // const stockEntrada = response.data.cantidad;
            const stockFinal = parseInt(stockInventario) + parseInt(response.data.cantidad);
            const inventarioData = {
                stock: stockFinal,
                id: inventarioEncontrado.id
            };
            
            await axios.put(`${Config}/api/inventario/${inventarioEncontrado.id}`, inventarioData);

            setSuccessMessage('Entrada creada con éxito');
            setEntrada({
                id_inventario: '',
                codigo: '',
                id_producto: '',
                cantidad: '',
                fecha: ''
            });
            setBuscarProducto('');
            setBuscarInventario('');
            setInventarioEncontrado(null);
            setNoResultMessage('');
        } catch (error) {
            console.error('Error al crear entrada:', error);
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <h1>Entradas</h1>
                <Row>
                    <Col>
                        {successMessage && <Alert variant="success">{successMessage}</Alert>}
                        {noResultMessage && <Alert variant="warning">{noResultMessage}</Alert>}
                    </Col>
                </Row>
                <Row>
                    <Form.Group as={Col} xs={4} controlId="buscarProducto">
                        <Form.Label>Buscar Producto</Form.Label>
                        <Form.Control required type="text" value={buscarProducto} onChange={handleChangeProducto} placeholder="Nombre Producto" />
                    </Form.Group>

                    <Form.Group  as={Col} xs={4} controlId="buscarInventario">
                        <Form.Label>Buscar Inventario</Form.Label>
                        <Form.Control required type="text" name="codigo" value={buscarInventario} onChange={e => setBuscarInventario(e.target.value)} placeholder="Código Inventario" />
                    </Form.Group>

                    <Form.Group as={Col} xs={4} controlId="codigoEntrada">
                    <Form.Label>Código de Entrada</Form.Label>
                    <Form.Control required type="text" name="codigo" value={entrada.codigo} onChange={handleChangeEntrada} placeholder="Código Entrada" />
                </Form.Group>
                </Row>

                <Row>
                <Form.Group as={Col} xs={6} controlId="cantidad">
                    <Form.Label>Cantidad</Form.Label>
                    <Form.Control required type="number" name="cantidad" value={entrada.cantidad} onChange={handleChangeEntrada} />
                </Form.Group>

                <Form.Group as={Col} xs={6} controlId="fecha">
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control required type="date" name="fecha" value={entrada.fecha} onChange={handleChangeEntrada} />
                </Form.Group>
                </Row>

                <Button style={{ marginTop: '10px'}} variant="primary" type="submit">
                    Crear Entrada
                </Button>
            </Form>
        </Container>
    );
}

export default CrearEntrada;
