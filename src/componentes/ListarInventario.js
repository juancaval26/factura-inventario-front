import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Table } from 'react-bootstrap';

function ListarInventario() {
    const [inventario, setinventario] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [inventarioEditado, setinventarioEditado] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/inventario')
            .then(response => {
                setinventario(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleOpenModal = (inventario) => {
        setinventarioEditado(inventario);
        setShowModal(true);
    };

    const handleGuardarEdicion = async () => {
        try {
            await axios.put(`http://localhost:8000/api/inventario/${inventarioEditado.id}`, inventarioEditado);
            setShowModal(false);
            console.log('Cambios guardados exitosamente.');

            // Actualizar datos locales después de guardar cambios
            const response = await axios.get('http://localhost:8000/api/inventario');
            setinventario(response.data);
        } catch (error) {
            console.error('Error al guardar cambios:', error);
        }
    };

    return (
        <div>
            <h1>Inventario</h1>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nom.Producto</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {inventario.map(inventario => (
                        <tr key={inventario.id}>
                            <td>{inventario.codigo}</td>
                            <td>{inventario.producto.nombre}</td>
                            <td>{inventario.stock}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleOpenModal(inventario)}>Editar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>Editar inventario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {inventarioEditado && (
                        <Form>
                            <Form.Group controlId="formCodigo">
                                <Form.Label>Código</Form.Label>
                                <Form.Control type="text" value={inventarioEditado.codigo} onChange={(e) => setinventarioEditado({ ...inventarioEditado, codigo: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formStock">
                                <Form.Label>Stock</Form.Label>
                                <Form.Control type="number" value={inventarioEditado.stock} onChange={(e) => setinventarioEditado({ ...inventarioEditado, stock: e.target.value })} />
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

export default ListarInventario;
