import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Alert, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Config from './Config';

function Crearventa() {
    const [successMessage, setSuccessMessage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const [productos, setProductos] = useState([]);
    const [buscarCliente, setBuscarCliente] = useState('');
    const [clienteEncontrado, setClienteEncontrado] = useState([]);

    const [venta, setventa] = useState({
        id_cliente: 0,
        id_producto: 0,
        cantidad: 0,
        codigo: 0,
        precio: 0,
        vendedor: '',
        fecha: ''
    });

    const [ultimoIdVenta, setUltimoIdVenta] = useState(0);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get(`${Config}/api/productos`);
                setProductos(response.data);
            } catch (error) {
                console.error('Error al obtener la lista de productos:', error);
            }
        };

        const fetchUltimoIdVenta = async () => {
            try {
                const response = await axios.get(`${Config}/api/ventas/ultimoId`);
                setUltimoIdVenta(response.data[0].id);
                console.log(response.data[0].id);
            } catch (error) {
                console.error('Error al obtener el último ID de venta:', error);
            }
        };

        fetchProductos();
        fetchUltimoIdVenta();
    }, []);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleChangeCliente = async e => {
        setBuscarCliente(e.target.value);
        try {
            const response = await axios.get('http://localhost:8000/api/clientes/buscar', {
                params: {
                    nombre: e.target.value
                }
            });
            setClienteEncontrado(response.data);
        } catch (error) {
            console.error('Error al buscar cliente:', error);
            setClienteEncontrado([]);
        }
    };

    const handleChangeventa = e => {
        setventa({
            ...venta,
            [e.target.name]: e.target.value
        });
    };

    const handleAddProduct = async () => {
        const selectedProduct = productos.find(producto => producto.id === parseInt(venta.id_producto));
        if (selectedProduct) {
            console.log("selectedProduct",selectedProduct.id);
            const stock = await fetchStock(selectedProduct.id);
            if (venta.cantidad > stock) {
                alert('La cantidad seleccionada supera el stock disponible');
                return;
            }
    
            // Restar la cantidad seleccionada del stock del producto
            const nuevoStock = stock - venta.cantidad;
            console.log("nuevoStock",selectedProduct.id);
            await actualizarStock(selectedProduct.id, nuevoStock);
            console.log(nuevoStock);
    
            const ventaToAdd = {
                ...venta,
                id_cliente: clienteEncontrado[0].id,
                nombre: selectedProduct.nombre,
            };
            setSelectedProducts(prevProducts => [...prevProducts, ventaToAdd]);
            closeModal(); // Cierra el modal después de agregar el producto
        }
    };

    const fetchStock = async id_producto => {
        try {
            const response = await axios.get(`${Config}/api/inventario/buscar`, {
                params: {
                    id_producto: id_producto
                }
            });
            console.log(response.data[0].stock);
            return response.data[0].stock;
        } catch (error) {
            console.error('Error al obtener el stock del producto:', error);
            return 0;
        }
    };

    const actualizarStock = async (id_producto, nuevoStock) => {
        try {
            await axios.put(`${Config}/api/inventario/${id_producto}`, { stock: nuevoStock });
        } catch (error) {
            console.error('Error al actualizar el stock del producto:', error);
        }
    };
    
    

    const handleSubmit = async () => {
        try {
            // Validar que se haya seleccionado al menos un producto
            if (selectedProducts.length === 0) {
                console.error('Debe seleccionar al menos un producto');
                return;
            }

            // Incrementar el último ID de venta para obtener el nuevo código
            const nuevoCodigoVenta = ultimoIdVenta + 1;
            // Añadir el código de venta a cada producto seleccionado
            const ventasConCodigo = selectedProducts.map(producto => ({
                ...producto,
                codigo: nuevoCodigoVenta
            }));
            // Llamar a la API para guardar la venta
            await axios.post(`${Config}/api/ventas`, ventasConCodigo);

            setSuccessMessage('Ventas creadas exitosamente');
            // Restablecer el estado después de crear las ventas
            setventa({
                id_cliente: 0,
                vendedor: '',
                codigo: 0,
                fecha: '',
            });
            setBuscarCliente('');
            setSelectedProducts([]);
        } catch (error) {
            console.error('Error al crear ventas:', error);
        }
    };


    return (
        <Container>
            <Form>
                <h1>Venta</h1>
                <Row>
                    <Col>
                        {successMessage && <Alert variant="success">{successMessage}</Alert>}
                    </Col>
                </Row>
                <Row>
                    <Form.Group as={Col} xs={4} controlId="buscarCliente">
                        <Form.Label>Buscar Cliente</Form.Label>
                        <Form.Control required type="text" value={buscarCliente} onChange={handleChangeCliente} placeholder="Nom.Cliente" />
                    </Form.Group>
                    <Form.Group as={Col} xs={4} controlId="vendedor">
                        <Form.Label>Vendedor</Form.Label>
                        <Form.Control required type="text" name="vendedor" value={venta.vendedor} onChange={handleChangeventa} placeholder="Vendedor" />
                    </Form.Group>
                    <Form.Group as={Col} xs={4} controlId="fecha">
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control required type="date" name="fecha" value={venta.fecha} onChange={handleChangeventa} />
                    </Form.Group>
                    <Form.Group as={Col} xs={4} controlId="codigo">
                        <Form.Label>Código</Form.Label>
                        <Form.Control readOnly type="number" name="codigo" value={ultimoIdVenta} />
                    </Form.Group>

                </Row>
                <Button style={{ marginTop: '10px' }} variant="primary" onClick={openModal}>
                    Ingresar Productos
                </Button>
                <Button style={{ marginTop: '10px', marginLeft: '10px' }} variant="primary" onClick={handleSubmit}>
                    Guardar Ventas
                </Button>
                <Container style={{ marginTop: '20px' }}>
                    <h2>Productos Seleccionados</h2>
                    {selectedProducts.map((producto, index) => (
                        <div key={index}>
                            <p>Nombre: {producto.nombre}</p>
                            <p>Cantidad: {producto.cantidad}</p>
                            <p>Precio: {producto.precio}</p>
                            <hr />
                        </div>
                    ))}
                    {selectedProducts.length > 0 && (
                        <Button variant="danger" onClick={() => setSelectedProducts([])}>Limpiar Productos</Button>
                    )}
                </Container>
            </Form>

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="id_producto">
                            <Form.Label>ID Producto</Form.Label>
                            <Form.Control as="select" onChange={handleChangeventa} name="id_producto">
                                <option value="">Seleccionar Producto</option>
                                {productos.map(producto => (
                                    <option key={producto.id} value={producto.id}>{producto.id}{producto.nombre}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="cantidad">
                            <Form.Label>Cantidad</Form.Label>
                            <Form.Control type="number" value={venta.cantidad} onChange={handleChangeventa} name="cantidad" />
                        </Form.Group>
                        <Form.Group controlId="precio">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control type="number" value={venta.precio} onChange={handleChangeventa} name="precio" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleAddProduct}>
                        Agregar a la venta
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default Crearventa;
