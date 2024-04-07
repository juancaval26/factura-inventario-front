import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function CrearSalida() {
    const [successMessage, setSuccessMessage] = useState(null);
    const [salida, setsalida] = useState({
        codigo: '',
        motivo: '',
        id_venta: '',
        id_inventario: '',
        fecha: ''
    });
    const [buscarVenta, setbuscarVenta] = useState('');
    const [ventaEncontrada, setventaEncontrada] = useState([]);
    const [buscarInventario, setBuscarInventario] = useState('');
    const [inventarioEncontrado, setInventarioEncontrado] = useState(null);
    const [noResultMessage, setNoResultMessage] = useState('');

    useEffect(() => {
        const fetchVentas = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/ventas/buscar`, {
                    params: {
                        codigo: buscarVenta
                    }
                });
                setventaEncontrada(response.data);
            } catch (error) {
                console.error('Error al buscar venta:', error);
                setventaEncontrada([]);
            }
        };

        const fetchInventario = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/inventario/buscar`, {
                    params: {
                        codigo: buscarInventario
                    }
                });
                if (response.data.length > 0) {
                    setInventarioEncontrado(response.data[0]);
                } else {
                    setInventarioEncontrado(null);
                    setNoResultMessage(`No se encontró ningún inventario con el código ${buscarInventario}`);
                }
            } catch (error) {
                console.error('Error al buscar inventario:', error);
                setInventarioEncontrado(null);
            }
        };

        if (buscarVenta.trim() !== '') {
            fetchVentas();
        } else {
            setventaEncontrada([]);
        }

        if (buscarInventario.trim() !== '') {
            fetchInventario();
        } else {
            setInventarioEncontrado(null);
            setNoResultMessage('');
        }
    }, [buscarVenta, buscarInventario]);

    const handleChangeVenta = e => {
        setbuscarVenta(e.target.value);
    };

    const handleChangesalida = e => {
        setsalida({
            ...salida,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if (!inventarioEncontrado) {
                setNoResultMessage(`No se encontró ningún inventario con el código ${buscarInventario}`);
                return;
            }

            const salidaData = {
                ...salida,
                id_venta: ventaEncontrada.length > 0 ? ventaEncontrada[0].id : '',
                id_inventario: inventarioEncontrado.id
            };

            await axios.post('http://localhost:8000/api/salida', salidaData);

            setSuccessMessage('salida creada con éxito');
            setsalida({
                codigo: '',
                motivo: '',
                id_venta: '',
                id_inventario: '',
                fecha: ''
            });
            setbuscarVenta('');
            setBuscarInventario('');
            setInventarioEncontrado(null);
            setNoResultMessage('');
        } catch (error) {
            console.error('Error al crear salida:', error);
        }
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                {noResultMessage && <Alert variant="warning">{noResultMessage}</Alert>}
                <Form.Group controlId="buscarVenta">
                    <Form.Label>Buscar Venta</Form.Label>
                    <Form.Control type="number" value={buscarVenta} onChange={handleChangeVenta} placeholder="Codigo Venta" />
                    <Form.Text className="text-muted">Venta encontrada</Form.Text>
                    <ul>
                        {ventaEncontrada.map(venta => (
                            <li key={venta.id}>{venta.codigo}</li>
                        ))}
                    </ul>
                </Form.Group>

                <Form.Group controlId="buscarInventario">
                    <Form.Label>Buscar Inventario</Form.Label>
                    <Form.Control type="text" name="codigo" value={buscarInventario} onChange={e => setBuscarInventario(e.target.value)} placeholder="Código del Inventario" />
                </Form.Group>

                <Form.Group controlId="codigosalida">
                    <Form.Label>Código de salida</Form.Label>
                    <Form.Control type="text" name="codigo" value={salida.codigo} onChange={handleChangesalida} placeholder="Código de salida" />
                </Form.Group>

                <Form.Group controlId="codigoMotivo">
                    <Form.Label>Motivo Salida</Form.Label>
                    <Form.Control type="text" name="motivo" value={salida.motivo} onChange={handleChangesalida} placeholder="motivo de salida" />
                </Form.Group>

                <Form.Group controlId="fecha">
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control type="date" name="fecha" value={salida.fecha} onChange={handleChangesalida} placeholder="Fecha" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Crear
                </Button>
            </Form>
        </div>
    );
}

export default CrearSalida;
