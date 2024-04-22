import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Table } from 'react-bootstrap';

import Config from './Config';

function ListarRemisiones() {
    const [remisiones, setRemisiones] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [remisionEditada, setRemisionEditada] = useState(null);
    const [pagActual, setpagActual] = useState(1);
    const [sigPagina, setsigPagina] = useState(1);
    const [buscaTermino, setbuscaTermino] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [remisionAEliminar, setRemisionAEliminar] = useState(null);

    useEffect(() => {
        fetchRemisiones();
    }, [pagActual, buscaTermino]);

    const fetchRemisiones = async () => {
        try {
            let url = `${Config}/api/remisiones?page=${pagActual}`;
            if (buscaTermino) {
                const response = await axios.get(`${Config}/api/remisiones/buscar`, {
                    params: {
                        nombre: buscaTermino
                    }
                });
                setRemisiones(response.data);
                setsigPagina(response.data.last_page);
            } else {
                // Si no hay un término de búsqueda, obtener todos los clientes
                const response = await axios.get(url);
                setRemisiones(response.data.data);
                setsigPagina(response.data.last_page);
            }
        } catch (error) {
            alert('No hay coincidencias:', error);
        }
    };

    const handleOpenModal = (remision) => {
        setRemisionEditada(remision);
        setShowModal(true);
    };

    const handleSearch = () => {
        setpagActual(1); // Reset page number when performing a new search
        fetchRemisiones();
    };

    const handleNextPage = () => {
        setpagActual(pagActual + 1);
    };

    const handlePrevPage = () => {
        setpagActual(pagActual - 1);
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        buttons.push(
            <Button key="prev" variant="secondary" disabled={pagActual === 1} onClick={handlePrevPage}>
                Anterior
            </Button>
        );

        buttons.push(
            <Button key="next" style={{ margin: '5px' }} variant="secondary" disabled={pagActual === sigPagina} onClick={handleNextPage}>
                Siguiente
            </Button>
        );
        return buttons;
    };

    const handleChangeRemision = e => {
        const value = e.target.value || '';
        setbuscaTermino(value);
    };

    const handleGuardarEdicion = async () => {
        try {
            await axios.put(`${Config}/api/remisiones/${remisionEditada.id}`, remisionEditada);
            setShowModal(false);
            alert('Cambios guardados exitosamente.');

            // Actualizar datos locales después de guardar cambios
            fetchRemisiones();
        } catch (error) {
            alert('Error al guardar cambios:', error);
        }
    };

    const handleEliminar = (remision) => {
        setRemisionAEliminar(remision);
        setShowConfirmModal(true);
    };

    const handleEliminarConfirmed = async () => {
        try {
            await axios.delete(`${Config}/api/remisiones/${remisionAEliminar.id}`);
            setShowConfirmModal(false);
            alert('Remisión eliminada exitosamente.');
            fetchRemisiones();
        } catch (error) {
            alert('Error al eliminar la remisión:', error);
        }
    };

    return (
        <div>
            <h1>Remisiones {renderPaginationButtons()}
                <input type="search" value={buscaTermino} onChange={handleChangeRemision} placeholder="nombre" style={{ maxWidth: '300px', maxHeight: '45px' }}/>
                <Button variant="primary" onClick={handleSearch} style={{ marginLeft: '10px' }}>Buscar</Button>
            </h1>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Nom.Cliente</th>
                        <th>Cod.Remisión</th>
                        <th>Cod.Venta</th>
                        <th>Detalles</th>
                        <th>Fecha</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {remisiones && remisiones.map(remision => (
                        <tr key={remision.id}>
                            <td>{remision.cliente.nombre}</td>
                            <td>{remision.codigo}</td>
                            <td>{remision.cod_venta}</td>
                            <td>{remision.detalles}</td>
                            <td>{remision.fecha}</td>
                            <td>
                                <Button variant="warning" className='m-2' onClick={() => handleOpenModal(remision)}>Editar</Button>
                                <Button variant="danger" onClick={() => handleEliminar(remision)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Remisión</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {remisionEditada && (
                        <Form>
                            <Form.Group controlId="formNombre">
                                <Form.Label>Cliente</Form.Label>
                                <Form.Control type="text" readOnly value={remisionEditada.cliente.nombre} onChange={(e) => setRemisionEditada({ ...remisionEditada, nombre: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formDetalles">
                                <Form.Label>Detalles</Form.Label>
                                <Form.Control type="text" value={remisionEditada.detalles} onChange={(e) => setRemisionEditada({ ...remisionEditada, detalles: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formVenta">
                                <Form.Label>Cod.Venta</Form.Label>
                                <Form.Control type="text" placeholder="Cod.Venta" value={remisionEditada.cod_venta} onChange={(e) => setRemisionEditada({ ...remisionEditada, cod_venta: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formFecha">
                                <Form.Label>Fecha</Form.Label>
                                <Form.Control readOnly type="date" placeholder="Fecha" value={remisionEditada.fecha} onChange={(e) => setRemisionEditada({ ...remisionEditada, fecha: e.target.value })} />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        salir
                    </Button>
                    <Button variant="primary" onClick={handleGuardarEdicion}>
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas eliminar esta remisión?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleEliminarConfirmed}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ListarRemisiones;
