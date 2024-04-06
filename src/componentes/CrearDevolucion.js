import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function CrearDevolucion() {
    const [successMessage, setSuccessMessage] = useState(null);
    const [devolucion, setDevolucion] = useState({
        id_venta: '',
        fecha: '',
        cantidad: ''
    });
    const [buscarVenta, setBuscarVenta] = useState('');
    const [ventaEncontrada, setVentaEncontrada] = useState(null);
    const [noResultMessage, setNoResultMessage] = useState('');

    useEffect(() => {
        if (buscarVenta.trim() !== '') {
            const fetchVenta = async () => {
                try {
                    const response = await axios.get(`http://localhost:8000/api/ventas/buscar`, {
                        params: {
                            codigo: buscarVenta
                        }
                    });
                    const venta = response.data[0];
                    if (venta) {
                        setVentaEncontrada(venta);
                        setDevolucion(prevState => ({ ...prevState, id_venta: venta.id }));
                        setNoResultMessage('');
                    } else {
                        setVentaEncontrada(null);
                        setDevolucion(prevState => ({ ...prevState, id_venta: '' }));
                        setNoResultMessage(`No se encontraron ventas con el código ${buscarVenta}`);
                    }
                } catch (error) {
                    console.error('Error al buscar venta:', error);
                    setVentaEncontrada(null);
                }
            };

            fetchVenta();
        } else {
            setVentaEncontrada(null);
            setDevolucion(prevState => ({ ...prevState, id_venta: '' }));
            setNoResultMessage('');
        }
    }, [buscarVenta]);

    const handleChangeVenta = e => {
        setBuscarVenta(e.target.value);
    };

    const handleChangeDevolucion = e => {
        setDevolucion({
            ...devolucion,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/devolucion', { ...devolucion });

            setSuccessMessage('Devolución creada con éxito');
            // Limpiar los campos después de la creación exitosa
            setDevolucion({
                id_venta: '',
                fecha: '',
                cantidad: ''
            });
            setVentaEncontrada(null);
            setBuscarVenta('');
        } catch (error) {
            console.error('Error al crear devolución:', error);
            // Manejo de errores...
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {noResultMessage && <Alert variant="warning">{noResultMessage}</Alert>}
            <Form.Group controlId="id_venta">
                <Form.Label>Código de Venta</Form.Label>
                <div className="input-group">
                    <Form.Control type="text" name="id_venta" value={buscarVenta} onChange={handleChangeVenta} placeholder="Código de Venta" />
                </div>
                {ventaEncontrada &&
                    <p>venta encontrada código: {ventaEncontrada.codigo}</p>
                }
            </Form.Group>

            <Form.Group controlId="fecha">
                <Form.Label>Fecha</Form.Label>
                <Form.Control type="date" name="fecha" value={devolucion.fecha} onChange={handleChangeDevolucion} placeholder="Fecha" />
            </Form.Group>

            <Form.Group controlId="cantidad">
                <Form.Label>Cantidad</Form.Label>
                <Form.Control type="text" name="cantidad" value={devolucion.cantidad} onChange={handleChangeDevolucion} placeholder="Cantidad" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Crear Devolución
            </Button>
        </Form>
    );
}

export default CrearDevolucion;
