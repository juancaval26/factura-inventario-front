import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import Config from './Config';

function ListarClientes() {
    const [clientes, setClientes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [clienteEditado, setClienteEditado] = useState(null);
    const [pagActual, setpagActual] = useState(1);
    const [sigPagina, setsigPagina] = useState(1);
    const [buscaTermino, setbuscaTermino] = useState('');

    useEffect(() => {
        fetchClientes();
    }, [pagActual, buscaTermino]);

    const fetchClientes = async () => {
        try {
            let url = `${Config}/api/clientes?page=${pagActual}`;
            if (buscaTermino) {
                const response = await axios.get(`${Config}/api/clientes/buscar`, {
                    params: {
                        nombre: buscaTermino
                    }
                });
                setClientes(response.data);
                setsigPagina(response.data.last_page);
            } else {
                // Si no hay un término de búsqueda, obtener todos los clientes
                const response = await axios.get(url);
                setClientes(response.data.data);
                setsigPagina(response.data.last_page);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    


    const handleOpenModal = (cliente) => {
        setClienteEditado(cliente);
        setShowModal(true);
    };

    const handleGuardarEdicion = async () => {
        try {
            await axios.put(`${Config}/api/clientes/${clienteEditado.id}`, clienteEditado);
            setShowModal(false);
            console.log('Cambios guardados exitosamente.');

            // Actualizar datos locales después de guardar cambios
            fetchClientes();
        } catch (error) {
            console.error('Error al guardar cambios:', error);
        }
    };

    const handleSearch = () => {
        setpagActual(1); // Reset page number when performing a new search
        fetchClientes();
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

    const handleChangeCliente = e => {
        const value = e.target.value || '';
        setbuscaTermino(value);
    };

    return (
        <div>
            <h1>Clientes: {renderPaginationButtons()}
                <input type="search" value={buscaTermino} onChange={handleChangeCliente} placeholder="nombre" style={{ maxWidth: '250px', maxHeight: '50px' }}/>
                <Button variant="primary" onClick={handleSearch} style={{ marginLeft: '10px' }}>Buscar</Button>
            </h1>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Nom.Contacto</th>
                        <th>Negocio</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                        <th>NIT</th>
                        <th>Estado</th>
                        <th>Correo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes && clientes.map(cliente => (
                        <tr key={cliente.id}>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.negocio}</td>
                            <td>{cliente.direccion}</td>
                            <td>{cliente.telefono}</td>
                            <td>{cliente.nit}</td>
                            <td>{cliente.estado}</td>
                            <td>{cliente.correo}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleOpenModal(cliente)}>Editar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {clienteEditado && (
                        <Form>
                            <Form.Group controlId="formNombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Nombre" value={clienteEditado.nombre} onChange={(e) => setClienteEditado({ ...clienteEditado, nombre: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formNegocio">
                                <Form.Label>Negocio</Form.Label>
                                <Form.Control type="text" placeholder="Negocio" value={clienteEditado.negocio} onChange={(e) => setClienteEditado({ ...clienteEditado, negocio: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formDireccion">
                                <Form.Label>Dirección</Form.Label>
                                <Form.Control type="text" placeholder="Dirección" value={clienteEditado.direccion} onChange={(e) => setClienteEditado({ ...clienteEditado, direccion: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formTelefono">
                                <Form.Label>Teléfono</Form.Label>
                                <Form.Control type="text" placeholder="Teléfono" value={clienteEditado.telefono} onChange={(e) => setClienteEditado({ ...clienteEditado, telefono: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formNit">
                                <Form.Label>NIT</Form.Label>
                                <Form.Control type="text" placeholder="NIT" value={clienteEditado.nit} onChange={(e) => setClienteEditado({ ...clienteEditado, nit: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formEstado">
                                <Form.Label>Estado</Form.Label>
                                <Form.Control type="text" placeholder="Estado" value={clienteEditado.estado} onChange={(e) => setClienteEditado({ ...clienteEditado, estado: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formCorreo">
                                <Form.Label>Correo</Form.Label>
                                <Form.Control type="email" placeholder="Correo" value={clienteEditado.correo} onChange={(e) => setClienteEditado({ ...clienteEditado, correo: e.target.value })} />
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

export default ListarClientes;
