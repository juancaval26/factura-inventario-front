import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Table } from 'react-bootstrap';

function ListarGastos() {
    const [gastos, setgastos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [gastoEditado, setgastoEditado] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/gastos')
            .then(response => {
                setgastos(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleOpenModal = (gasto) => {
        setgastoEditado(gasto);
        setShowModal(true);
    };

    const handleGuardarEdicion = async () => {
        try {
            await axios.put(`http://localhost:8000/api/gastos/${gastoEditado.id}`, gastoEditado);
            setShowModal(false);
            console.log('Cambios guardados exitosamente.');

            // Actualizar datos locales después de guardar cambios
            const response = await axios.get('http://localhost:8000/api/gastos');
            setgastos(response.data);
        } catch (error) {
            console.error('Error al guardar cambios:', error);
        }
    };

    return (
        <div>
            <h1>gastos</h1>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Articulo</th>
                        <th>Valor</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {gastos.map(gasto => (
                        <tr key={gasto.id}>
                            <td>{gasto.articulo}</td>
                            <td>{gasto.valor}</td>
                            <td>{gasto.fecha}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleOpenModal(gasto)}>Editar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>Editar gasto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {gastoEditado && (
                        <Form>
                            <Form.Group controlId="formArticulo">
                                <Form.Label>Articulo</Form.Label>
                                <Form.Control type="text" placeholder="articulo" value={gastoEditado.articulo} onChange={(e) => setgastoEditado({ ...gastoEditado, articulo: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formValor">
                                <Form.Label>Valor</Form.Label>
                                <Form.Control type="text" placeholder="valor" value={gastoEditado.valor} onChange={(e) => setgastoEditado({ ...gastoEditado, valor: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formFecha">
                                <Form.Label>Fecha</Form.Label>
                                <Form.Control type="date" placeholder="fecha" value={gastoEditado.fecha} onChange={(e) => setgastoEditado({ ...gastoEditado, fecha: e.target.value })} />
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

export default ListarGastos;
