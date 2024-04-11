import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Table, Col, Row } from 'react-bootstrap';

function ListarGastos() {
    const [gastos, setgastos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalGasto, setShowModalGasto] = useState(false);

    const [gastoEditado, setgastoEditado] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [fechaInicial, setFechaInicial] = useState('');
    const [fechaFinal, setFechaFinal] = useState('');
    const [totalGasto, settotalGasto] = useState([]);

    useEffect(() => {
        fetchGastos();
    }, [currentPage]);

    const fetchGastos = async () => {
        try {
                const response = await axios.get(`http://localhost:8000/api/gastos?page=${currentPage}`);
                setgastos(response.data.data);
                setLastPage(response.data.last_page);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const fetchGastoTotal = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/gastos/total', {
                    params: {
                        fechaInicial: fechaInicial,
                        fechaFinal: fechaFinal
                    }
                });
                settotalGasto(response.data);
            } catch (error) {
                console.error('Error al obtener los gastos:', error);
            }
        };

        fetchGastoTotal();
    }, [fechaInicial, fechaFinal]);

    const handleOpenModal = (gasto) => {
        setgastoEditado(gasto);
        setShowModal(true);
    };

    const handleOpenModalGasto = (gasto) => {
        setShowModalGasto(true);
    };

    const handleCloseModal = () => setShowModal(false);
    const handleCloseModalGasto = () => setShowModalGasto(false);



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

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        buttons.push(
            <Button key="prev" variant="secondary" disabled={currentPage === 1} onClick={handlePrevPage}>
                Anterior
            </Button>
        );

        buttons.push(
            <Button key="next" style={{ margin: '5px' }} variant="secondary" disabled={currentPage === lastPage} onClick={handleNextPage}>
                Siguiente
            </Button>
        );
        return buttons;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:8000/api/pagos/total', {
                params: {
                    fechaInicial: fechaInicial,
                    fechaFinal: fechaFinal,
                }
            });
            settotalGasto(response.data);
        } catch (error) {
            console.error('Error al realizar la búsqueda:', error);
        }
    };

    // const handleClick = () => handleOpenModal();
    const handleClickGasto = () => handleOpenModalGasto();


    return (
        <div>
            <h1>gastos {renderPaginationButtons()}
            <Button variant="info" onClick={handleClickGasto}>
                GASTOS TOTALES
            </Button>
            </h1>
   
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col style={{ marginBottom: '10px'}}>
                        <Form.Group controlId="fechaInicial">
                            <Form.Label>Fecha Inicial</Form.Label>
                            <Form.Control type="date" value={fechaInicial} onChange={(e) => setFechaInicial(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="fechaFinal">
                            <Form.Label>Fecha Final</Form.Label>
                            <Form.Control type="date" value={fechaFinal} onChange={(e) => setFechaFinal(e.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Articulo</th>
                        <th>Motivo Gasto</th>
                        <th>Valor</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {gastos && gastos.map(gasto => (
                        <tr key={gasto.id}>
                            <td>{gasto.articulo}</td>
                            <td>{gasto.motivo_gasto}</td>
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
                                <Form.Control type="text" value={gastoEditado.articulo} onChange={(e) => setgastoEditado({ ...gastoEditado, articulo: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formGasto">
                                <Form.Label>Motivo Gasto</Form.Label>
                                <Form.Control type="text" value={gastoEditado.motivo_gasto} onChange={(e) => setgastoEditado({ ...gastoEditado, motivo_gasto: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formValor">
                                <Form.Label>Valor</Form.Label>
                                <Form.Control type="number" value={gastoEditado.valor} onChange={(e) => setgastoEditado({ ...gastoEditado, valor: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formFecha">
                                <Form.Label>Fecha</Form.Label>
                                <Form.Control type="date"  value={gastoEditado.fecha} onChange={(e) => setgastoEditado({ ...gastoEditado, fecha: e.target.value })} />
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
            <Modal show={showModalGasto} onHide={handleCloseModalGasto} size="md">
                <h1>Datos Gastos</h1>
                <Table bordered hover>
                <thead>
                    <tr>
                        <th>Total Gastos</th>
                    </tr>
                </thead>
                <tbody>
                    {totalGasto.map(totalGastos => (
                        <tr key={totalGastos.id}>
                            <td>{totalGastos.gasto_total}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalGasto}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ListarGastos;
