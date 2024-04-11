import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal } from 'react-bootstrap';

function Listarventas() {
    const [ventas, setventas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [ventaEditada, setventaEditada] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/ventas')
            .then(response => {
                setventas(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleOpenModal = (producto) => {
        setventaEditada(producto);
        setShowModal(true);
    };

    const handleGuardarEdicion = async () => {
        try {
            await axios.put(`http://localhost:8000/api/ventas/${ventaEditada.id}`, ventaEditada);
            setShowModal(false);
            console.log('Cambios guardados exitosamente.');

            // Actualizar datos locales después de guardar cambios
            const response = await axios.get('http://localhost:8000/api/ventas');
            setventas(response.data);
        } catch (error) {
            console.error('Error al guardar cambios:', error);
        }
    };

    return (
        <div>
            <h1>ventas</h1>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Nom.Vendedor</th>
                        <th>Cod.Venta</th>
                        <th>Negocio</th>
                        <th>Nom.Cliente</th>
                        <th>Nom.Producto</th>
                        <th>Cantidad</th>
                        <th>Descripción</th>
                        <th>Valor.Total</th>
                        <th>Fecha.Venta</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map(venta => (
                        <tr key={venta.id_venta}>
                            <td>{venta.vendedor}</td>
                            <td>{venta.cod_venta}</td>
                            <td>{venta.negocio}</td>
                            <td>{venta.nom_cliente}</td>
                            <td>{venta.nom_producto}</td>
                            <td>{venta.cantidad}</td>
                            <td>{venta.descripcion}</td>
                            <td>{venta.valor_total}</td>
                            <td>{venta.fecha_venta}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleOpenModal(venta)}>Editar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Venta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {ventaEditada && (
                        <Form>
                            <Form.Group controlId="formVendedor">
                                <Form.Label>Vendedor</Form.Label>
                                <Form.Control type="text" value={ventaEditada.vendedor} onChange={(e) => setventaEditada({ ...ventaEditada, vendedor: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formCantidad">
                                <Form.Label>Cantidad</Form.Label>
                                <Form.Control type="text" value={ventaEditada.cantidad} onChange={(e) => setventaEditada({ ...ventaEditada, cantidad: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formPeso">
                                <Form.Label>Código</Form.Label>
                                <Form.Control type="text" value={ventaEditada.cod_venta} onChange={(e) => setventaEditada({ ...ventaEditada, cod_venta: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formDescripcion">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control type="text" value={ventaEditada.descripcion} onChange={(e) => setventaEditada({ ...ventaEditada, descripcion: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formPrecio">
                                <Form.Label>Precio</Form.Label>
                                <Form.Control type="text" value={ventaEditada.precio} onChange={(e) => setventaEditada({ ...ventaEditada, precio: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formFecha">
                                <Form.Label>Fecha</Form.Label>
                                <Form.Control type="date" value={ventaEditada.fecha_venta} onChange={(e) => setventaEditada({ ...ventaEditada, fecha_venta: e.target.value })} />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleGuardarEdicion}>
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Listarventas;
