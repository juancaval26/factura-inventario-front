import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

function Crearventa() {
    const [successMessage, setSuccessMessage] = useState(null);
    const [venta, setventa] = useState({
        id_cliente: 0,
        id_producto: 0,
        cantidad: 0,
        codigo: '',
        descripcion: '',
        precio: 0,
        vendedor: '',
        fecha: '',
    });
    const [buscarCliente, setbuscarCliente] = useState('');
    const [clienteEncontrado, setclienteEncontrado] = useState([]);
    const [buscarProducto, setbuscarProducto] = useState('');
    const [productoEncontrado, setproductoEncontrado] = useState(null);
    const [noResultMessage, setNoResultMessage] = useState('');

    useEffect(() => {
        const fetchVentas = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/clientes/buscar`, {
                    params: {
                        nombre: buscarCliente
                    }
                });
                setclienteEncontrado(response.data);
            } catch (error) {
                console.error('Error al buscar venta:', error);
                setclienteEncontrado([]);
            }
        };

        const fetchProducto = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/productos/buscar`, {
                    params: {
                        nombre: buscarProducto
                    }
                });
                if (response.data.length > 0) {
                    setproductoEncontrado(response.data[0]);
                } else {
                    setproductoEncontrado(null);
                    setNoResultMessage(`No se encontró ningún inventario con el código ${buscarProducto}`);
                }
            } catch (error) {
                console.error('Error al buscar inventario:', error);
                setproductoEncontrado(null);
            }
        };

        if (buscarCliente.trim() !== '') {
            fetchVentas();
        } else {
            setclienteEncontrado([]);
        }

        if (buscarProducto.trim() !== '') {
            fetchProducto();
        } else {
            setproductoEncontrado(null);
            setNoResultMessage('');
        }
    }, [buscarCliente, buscarProducto]);

    const handleChangeVenta = e => {
        setbuscarCliente(e.target.value);
    };

    const handleChangeventa = e => {
        setventa({
            ...venta,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if (!productoEncontrado) {
                setNoResultMessage(`No se encontró producto ${buscarProducto}`);
                return;
            }
    
            // Crear la venta
            const ventaData = {
                ...venta,
                id_cliente: clienteEncontrado.length > 0 ? clienteEncontrado[0].id : '',
                id_producto: productoEncontrado.id
            };
            
            const response = await axios.post('http://localhost:8000/api/ventas', ventaData);

            const ventaId = response.data.id;
    
            // Obtener el inventario del producto
            const inventarioResponse = await axios.get(`http://localhost:8000/api/inventario/buscar?id_producto=${productoEncontrado.id}`);
            const inventarioProducto = inventarioResponse.data;
    
            if (inventarioProducto.length === 0) {
                console.error('No se encontró inventario para el producto:', productoEncontrado.id);
                return;
            }
    
            const cantidadVendida = venta.cantidad;
            const nuevoStock = inventarioProducto[0].stock - cantidadVendida;
            
            // Actualizar el inventario
            const inventarioData = {
                id_producto: productoEncontrado.id,
                stock: nuevoStock
            };
            await axios.put(`http://localhost:8000/api/inventario/${inventarioProducto[0].id}`, inventarioData);


            const salidaData = {
                id_inventario: inventarioProducto[0].id,
                motivo: 'venta',
                codigo: venta.codigo,
                id_venta: ventaId,
                fecha: venta.fecha,
            };
            await axios.post(`http://localhost:8000/api/salida`, salidaData);

            // Actualizar el estado de éxito
            setSuccessMessage('Venta creada');
    
            // Limpiar los campos y restablecer los estados
            setventa({
                id_cliente: 0,
                id_producto: 0,
                cantidad: 0,
                codigo: '',
                descripcion: '',
                precio: 0,
                vendedor: '',
                fecha: '',
            });
            setbuscarCliente('');
            setbuscarProducto('');
            setproductoEncontrado(null);
            setNoResultMessage('');
        } catch (error) {
            console.error('Error al crear venta:', error);
        }
    };
    
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <h1>Venta</h1>
                <Row>
                    <Col>
                        {successMessage && <Alert variant="success">{successMessage}</Alert>}
                        {noResultMessage && <Alert variant="warning">{noResultMessage}</Alert>}
                    </Col>
                </Row>
                <Row>
                <Form.Group as={Col} xs={4} controlId="buscarCliente">
                    <Form.Label>Buscar Cliente</Form.Label>
                    <Form.Control required type="text" value={buscarCliente} onChange={handleChangeVenta} placeholder="Nom.Cliente" />
                </Form.Group>
                <Form.Group as={Col} xs={4} controlId="buscarProducto">
                    <Form.Label>Buscar Producto</Form.Label>
                    <Form.Control required type="text" name="producto" value={buscarProducto} onChange={e => setbuscarProducto(e.target.value)} placeholder="Código Producto" />
                </Form.Group>
                <Form.Group as={Col} xs={4} controlId="cantidad">
                    <Form.Label>Cantidad</Form.Label>
                    <Form.Control required type="number" name="cantidad" value={venta.cantidad} onChange={handleChangeventa}/>
                </Form.Group>
                </Row>
                <Row>
                <Form.Group as={Col} xs={4} controlId="codigo">
                    <Form.Label>Código</Form.Label>
                    <Form.Control required type="text" name="codigo" value={venta.codigo} onChange={handleChangeventa} placeholder="Código" />
                </Form.Group>

                <Form.Group as={Col} xs={8} controlId="descripcion">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control as="textarea" rows="3" name="descripcion" value={venta.descripcion} onChange={handleChangeventa} placeholder="Descripción" />
                </Form.Group>
                </Row>
                <Row>
                <Form.Group as={Col} xs={4} controlId="precio">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control required type="number" name="precio" value={venta.precio} onChange={handleChangeventa} />
                </Form.Group>

                <Form.Group as={Col} xs={4} controlId="vendedor">
                    <Form.Label>Vendedor</Form.Label>
                    <Form.Control required type="text" name="vendedor" value={venta.vendedor} onChange={handleChangeventa} placeholder="Vendedor" />
                </Form.Group>

                <Form.Group as={Col} xs={4} controlId="fecha">
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control required type="date" name="fecha" value={venta.fecha} onChange={handleChangeventa} />
                </Form.Group>
                </Row>

                <Button style={{ marginTop: '10px'}} variant="primary" type="submit">
                    Crear
                </Button>
            </Form>
        </Container>
    );
}

export default Crearventa;
