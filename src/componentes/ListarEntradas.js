import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

function ListarEntradas() {
    const [entradas, setEntradas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [entradaEditada, setEntradaEditada] = useState(null);

    useEffect(() => {
        const fetchEntradas = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/entrada');
                setEntradas(response.data);
            } catch (error) {
                console.error('Error al obtener las entradas:', error);
            }
        };

        fetchEntradas();
    }, []);

    const handleOpenModal = (entrada) => {
        setEntradaEditada(entrada);
        setShowModal(true);
    };

    const handleGuardarEdicion = async () => {
        try {
            await axios.put(`http://localhost:8000/api/entrada/${entradaEditada.id}`, {
                codigo: entradaEditada.codigo,
                cantidad: entradaEditada.cantidad,
                fecha: entradaEditada.fecha
            });
            setShowModal(false);
            console.log('Cambios guardados exitosamente.');

            // Actualizar datos locales después de guardar cambios
            const response = await axios.get('http://localhost:8000/api/entrada');
            setEntradas(response.data);
        } catch (error) {
            console.error('Error al guardar cambios:', error);
        }
    };

    return (
        <div>
            <h1>Listado de Entradas</h1>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Código de Entrada</th>
                        <th>Código de Inventario</th>
                        <th>Nombre Producto</th>
                        <th>Cantidad Entradas</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {entradas.map(entrada => (
                        <tr key={entrada.id}>
                            <td>{entrada.codigo}</td>
                            <td>{entrada.inventario.codigo}</td>
                            <td>{entrada.inventario.producto.nombre}</td>
                            <td>{entrada.cantidad}</td>
                            <td>{entrada.fecha}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleOpenModal(entrada)}>Editar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Entrada</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {entradaEditada && (
                        <Form>
                            <Form.Group controlId="codigoEntrada">
                                <Form.Label>Código de Entrada</Form.Label>
                                <Form.Control type="text" name="codigo" value={entradaEditada.codigo}  onChange={(e) => setEntradaEditada({ ...entradaEditada, codigo: e.target.value })} />
                            </Form.Group>

                            <Form.Group controlId="cantidad">
                                <Form.Label>Cantidad</Form.Label>
                                <Form.Control type="text" name="cantidad" value={entradaEditada.cantidad} onChange={(e) => setEntradaEditada({ ...entradaEditada, cantidad: e.target.value })} />
                            </Form.Group>

                            <Form.Group controlId="fecha">
                                <Form.Label>Fecha</Form.Label>
                                <Form.Control type="date" name="fecha" value={entradaEditada.fecha} onChange={(e) => setEntradaEditada({ ...entradaEditada, fecha: e.target.value })} />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
                    <Button variant="primary" onClick={handleGuardarEdicion}>Guardar Cambios</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ListarEntradas;
