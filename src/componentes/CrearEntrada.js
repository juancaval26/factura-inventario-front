import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function CrearEntrada() {
    const [successMessage, setSuccessMessage] = useState(null);
    const [entrada, setEntrada] = useState({
        id_inventario: '',
        codigo: '',
        id_producto: '',
        cantidad: '',
        fecha: ''
    });
    const [buscarProducto, setBuscarProducto] = useState('');
    const [productosEncontrados, setProductosEncontrados] = useState([]);
    const [buscarInventario, setBuscarInventario] = useState('');
    const [inventarioEncontrado, setInventarioEncontrado] = useState(null);
    const [noResultMessage, setNoResultMessage] = useState('');

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/productos/buscar`, {
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

        const fetchInventario = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/inventario/buscar`, {
                    params: {
                        codigo: buscarInventario
                    }
                });
                if (response.data.length > 0) {
                    setInventarioEncontrado(response.data[0]);
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
            fetchInventario();
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

            await axios.post('http://localhost:8000/api/entrada', entradaData);

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
        <div>
            <Form onSubmit={handleSubmit}>
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                {noResultMessage && <Alert variant="warning">{noResultMessage}</Alert>}
                <Form.Group controlId="buscarProducto">
                    <Form.Label>Buscar Producto</Form.Label>
                    <Form.Control type="text" value={buscarProducto} onChange={handleChangeProducto} placeholder="Nombre del Producto" />
                    <Form.Text className="text-muted">Seleccione un producto de la lista</Form.Text>
                    <ul>
                        {productosEncontrados.map(producto => (
                            <li key={producto.id}>{producto.nombre}</li>
                        ))}
                    </ul>
                </Form.Group>

                <Form.Group controlId="buscarInventario">
                    <Form.Label>Buscar Inventario</Form.Label>
                    <Form.Control type="text" name="codigo" value={buscarInventario} onChange={e => setBuscarInventario(e.target.value)} placeholder="Código del Inventario" />
                </Form.Group>

                <Form.Group controlId="codigoEntrada">
                    <Form.Label>Código de Entrada</Form.Label>
                    <Form.Control type="text" name="codigo" value={entrada.codigo} onChange={handleChangeEntrada} placeholder="Código de Entrada" />
                </Form.Group>

                <Form.Group controlId="cantidad">
                    <Form.Label>Cantidad</Form.Label>
                    <Form.Control type="text" name="cantidad" value={entrada.cantidad} onChange={handleChangeEntrada} placeholder="Cantidad" />
                </Form.Group>

                <Form.Group controlId="fecha">
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control type="date" name="fecha" value={entrada.fecha} onChange={handleChangeEntrada} placeholder="Fecha" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Crear Entrada
                </Button>
            </Form>
        </div>
    );
}

export default CrearEntrada;
