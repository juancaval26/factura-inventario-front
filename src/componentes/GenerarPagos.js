import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Row, Col, Modal } from 'react-bootstrap';

function GenerarPagos() {
    const [ventas, setVentas] = useState([]);
    const [fechaInicial, setFechaInicial] = useState('');
    const [fechaFinal, setFechaFinal] = useState('');
    const [totalPago, settotalPagar] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        const fetchVentas = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/ventas/total', {
                    params: {
                        fechaInicial: fechaInicial,
                        fechaFinal: fechaFinal
                    }
                });
                setVentas(response.data);
            } catch (error) {
                console.error('Error al obtener las ventas:', error);
            }
        };

        fetchVentas();
    }, [fechaInicial, fechaFinal]);

    useEffect(() => {
        const fetchPagos = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/ventas/pago', {
                    params: {
                        fechaInicial: fechaInicial,
                        fechaFinal: fechaFinal
                    }
                });
                settotalPagar(response.data);
            } catch (error) {
                console.error('Error al obtener los pagos:', error);
            }
        };

        fetchPagos();
    }, [fechaInicial, fechaFinal]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:8000/api/ventas/total', {
                params: {
                    fechaInicial: fechaInicial,
                    fechaFinal: fechaFinal,
                }
            });
            setVentas(response.data);
        } catch (error) {
            console.error('Error al realizar la búsqueda:', error);
        }

        try {
            const totalPagar = await axios.get('http://localhost:8000/api/ventas/pago', {
                params: {
                    fechaInicial: fechaInicial,
                    fechaFinal: fechaFinal
                }
            });
            settotalPagar(totalPagar.data);
        } catch (error) {
            console.error('Error al obtener el total a pagar:', error);
        }
    };

    const handleClick = () => handleOpenModal();
    
    return (
        <div>
            <h1>GANANCIAS - PAGOS
            <Button style={{ margin: '10px'}} variant="primary" onClick={handleClick}>
                VER PAGO POR FECHAS
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
                        <th>Nom.Vendedor</th>
                        <th>Valor.Total</th>
                        <th>Valor.Costo</th>
                        <th>Ganancia</th>
                        <th>ganancia 40</th>
                        <th>ganancia 60</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map(venta => (
                        <tr key={venta.id}>
                            <td>{venta.vendedor}</td>
                            <td>{venta.valor_total}</td>
                            <td>{venta.total_costo}</td>
                            <td>{venta.ganancia}</td>
                            <td>{venta.ganancia_40}</td>
                            <td>{venta.ganancia_60}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={handleCloseModal} size="lg" centered scrollable>
                <h1>Datos del pago</h1>
                <Table bordered hover>
                <thead>
                    <tr>
                        <th>Valor.Total</th>
                        <th>Valor.Costo</th>
                        <th>Ganancia</th>
                        <th>ganancia 40</th>
                        <th>ganancia 60</th>
                    </tr>
                </thead>
                <tbody>
                    {totalPago.map(totalPagos => (
                        <tr key={totalPagos.id}>
                            <td>{totalPagos.valor_total}</td>
                            <td>{totalPagos.costo_total}</td>
                            <td>{totalPagos.ganancia_final}</td>
                            <td>{totalPagos.ganancia_total_40}</td>
                            <td>{totalPagos.ganancia_total_60}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default GenerarPagos;
