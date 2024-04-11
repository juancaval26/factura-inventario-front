import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Table } from 'react-bootstrap';

function ListarProductos() {
    const [productos, setProductos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [productoEditado, setProductoEditado] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/productos')
            .then(response => {
                setProductos(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleOpenModal = (producto) => {
        setProductoEditado(producto);
        setShowModal(true);
    };

    const handleGuardarEdicion = async () => {
        try {
            await axios.put(`http://localhost:8000/api/productos/${productoEditado.id}`, productoEditado);
            setShowModal(false);
            console.log('Cambios guardados exitosamente.');

            // Actualizar datos locales después de guardar cambios
            const response = await axios.get('http://localhost:8000/api/productos');
            setProductos(response.data);
        } catch (error) {
            console.error('Error al guardar cambios:', error);
        }
    };

    return (
        <div>
            <h1>Productos</h1>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Peso</th>
                        <th>Fecha</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(producto => (
                        <tr key={producto.id}>
                            <td>{producto.nombre}</td>
                            <td>{producto.descripcion}</td>
                            <td>{producto.peso}</td>
                            <td>{producto.fecha}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleOpenModal(producto)}>Editar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {productoEditado && (
                        <Form>
                            <Form.Group controlId="formNombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Nombre" value={productoEditado.nombre} onChange={(e) => setProductoEditado({ ...productoEditado, nombre: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formDescripcion">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control type="text" placeholder="Descripción" value={productoEditado.descripcion} onChange={(e) => setProductoEditado({ ...productoEditado, descripcion: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formPeso">
                                <Form.Label>Peso</Form.Label>
                                <Form.Control type="text" placeholder="Peso" value={productoEditado.peso} onChange={(e) => setProductoEditado({ ...productoEditado, peso: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formFecha">
                                <Form.Label>Fecha</Form.Label>
                                <Form.Control type="date" placeholder="Fecha" value={productoEditado.fecha} onChange={(e) => setProductoEditado({ ...productoEditado, fecha: e.target.value })} />
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

export default ListarProductos;
