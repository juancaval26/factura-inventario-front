import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function Crearventa() {
    const [successMessage, setSuccessMessage] = useState(null);
    const [venta, setventa] = useState({
        id_factura: 0,
        id_producto: 0,
        cantidad: 0,
        codigo: '',
        descripcion: '',
        valor_total: 0,
        devolucion: '',
        vendedor: '',
        fecha: '',
    });
    const [buscarFactura, setbuscarFactura] = useState('');
    const [facturaEncontrada, setfacturaEncontrada] = useState([]);
    const [buscarProducto, setbuscarProducto] = useState('');
    const [productoEncontrado, setproductoEncontrado] = useState(null);
    const [noResultMessage, setNoResultMessage] = useState('');

    useEffect(() => {
        const fetchVentas = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/factura/buscar`, {
                    params: {
                        codigo: buscarFactura
                    }
                });
                setfacturaEncontrada(response.data);
            } catch (error) {
                console.error('Error al buscar venta:', error);
                setfacturaEncontrada([]);
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

        if (buscarFactura.trim() !== '') {
            fetchVentas();
        } else {
            setfacturaEncontrada([]);
        }

        if (buscarProducto.trim() !== '') {
            fetchProducto();
        } else {
            setproductoEncontrado(null);
            setNoResultMessage('');
        }
    }, [buscarFactura, buscarProducto]);

    const handleChangeVenta = e => {
        setbuscarFactura(e.target.value);
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

            const ventaData = {
                ...venta,
                id_factura: facturaEncontrada.length > 0 ? facturaEncontrada[0].id : '',
                id_producto: productoEncontrado.id
            };

            await axios.post('http://localhost:8000/api/ventas', ventaData);

            setSuccessMessage('venta creada');
            setventa({
                id_factura: 0,
                id_producto: 0,
                cantidad: 0,
                codigo: '',
                descripcion: '',
                valor_total: 0,
                devolucion: '',
                vendedor: '',
                fecha: '',
            });
            setbuscarFactura('');
            setbuscarProducto('');
            setproductoEncontrado(null);
            setNoResultMessage('');
        } catch (error) {
            console.error('Error al crear venta:', error);
        }
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                {noResultMessage && <Alert variant="warning">{noResultMessage}</Alert>}
                <Form.Group controlId="buscarFactura">
                    <Form.Label>Buscar Factura</Form.Label>
                    <Form.Control type="text" value={buscarFactura} onChange={handleChangeVenta} placeholder="Codigo Factura" />
                    <Form.Text className="text-muted">Factura encontrada</Form.Text>
                    <ul>
                        {facturaEncontrada.map(factura => (
                            <li key={factura.id}>{factura.codigo}</li>
                        ))}
                    </ul>
                </Form.Group>

                <Form.Group controlId="buscarProducto">
                    <Form.Label>Buscar Producto</Form.Label>
                    <Form.Control type="text" name="producto" value={buscarProducto} onChange={e => setbuscarProducto(e.target.value)} placeholder="Código Producto" />
                </Form.Group>

                <Form.Group controlId="cantidad">
                    <Form.Label>Cantidad</Form.Label>
                    <Form.Control type="number" name="cantidad" value={venta.cantidad} onChange={handleChangeventa} placeholder="Cantidad" />
                </Form.Group>

                <Form.Group controlId="codigo">
                    <Form.Label>Código</Form.Label>
                    <Form.Control type="text" name="codigo" value={venta.codigo} onChange={handleChangeventa} placeholder="Código" />
                </Form.Group>

                <Form.Group controlId="descripcion">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type="texto" name="descripcion" value={venta.descripcion} onChange={handleChangeventa} placeholder="Descripción" />
                </Form.Group>

                <Form.Group controlId="valor">
                    <Form.Label>Valor Total</Form.Label>
                    <Form.Control type="number" name="valor_total" value={venta.valor_total} onChange={handleChangeventa} placeholder="Valor Total" />
                </Form.Group>

                <Form.Group controlId="devolucion">
                    <Form.Label>Devolución</Form.Label>
                    <Form.Control type="text" name="devolucion" value={venta.devolucion} onChange={handleChangeventa} placeholder="Devolución" />
                </Form.Group>

                <Form.Group controlId="vendedor">
                    <Form.Label>Vendedor</Form.Label>
                    <Form.Control type="text" name="vendedor" value={venta.vendedor} onChange={handleChangeventa} placeholder="Vendedor" />
                </Form.Group>

                <Form.Group controlId="fecha">
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control type="date" name="fecha" value={venta.fecha} onChange={handleChangeventa} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Crear
                </Button>
            </Form>
        </div>
    );
}

export default Crearventa;
