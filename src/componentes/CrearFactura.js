import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function CrearFactura() {
    const [successMessage, setSuccessMessage] = useState(null);
    const [factura, setFactura] = useState({
        id_cliente: '',
        codigo: '',
        fecha: ''
    });
    const [buscarCliente, setBuscarCliente] = useState('');
    const [clientesEncontrados, setClientesEncontrados] = useState([]);
    const [noResultMessage, setNoResultMessage] = useState('');


    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/clientes/buscar`, {
                    params: {
                        // Realizar la búsqueda por nit o negocio según el valor proporcionado en el campo de búsqueda
                        nit: buscarCliente,
                        negocio: buscarCliente,
                    }
                    
                });
                setClientesEncontrados(response.data);
                setNoResultMessage('');
            } catch (error) {
                console.error('Error al buscar cliente:', error);
                setClientesEncontrados([]);
            }
        };

        // Realizar la búsqueda solo si hay texto en el campo de búsqueda
        if (buscarCliente.trim() !== '') {
            fetchClientes();
        } else {
            setClientesEncontrados([]);

        }
    }, [buscarCliente]);

    const handleChangeCliente = e => {
        setBuscarCliente(e.target.value);
    };

    const handleChangeFactura = e => {
        setFactura({
            ...factura,
            [e.target.name]: e.target.value
        });
        console.log(factura);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            // Obtener el cliente seleccionado de la lista de clientes encontrados
            const clienteUbicado = clientesEncontrados.find(cliente => cliente.negocio === buscarCliente || cliente.nit === buscarCliente);
            
            // Verificar si se encontró el cliente
            if (!clienteUbicado) {
                setNoResultMessage(`No se encontró ningún cliente con el negocio o NIT ${buscarCliente}`);
                return;
            }
            
            // Agregar el ID del cliente a los datos de la factura
            const facturaData = {
                ...factura,
                id_cliente: clienteUbicado.id
            };
    
            // Enviar la solicitud al servidor
            await axios.post('http://localhost:8000/api/factura', facturaData);
    
            setSuccessMessage('Factura creada con éxito');
            // Limpiar los campos después de la creación exitosa
            setFactura({
                id_cliente: '',
                codigo: '',
                fecha: ''
            });
            setBuscarCliente('');
        } catch (error) {
            console.error('Error al crear factura:', error);
            // Manejo de errores...
        }
    };
    

    return (
        <Form onSubmit={handleSubmit}>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {clientesEncontrados.length === 0 && buscarCliente.trim() !== '' && <Alert variant="warning">No se encontraron clientes con el negocio o NIT {buscarCliente}</Alert>}
            <Form.Group controlId="id_cliente">
                <Form.Label>Nom.Negocio/NIT Cliente</Form.Label>
                <div className="input-group">
                    <Form.Control type="text" name="id_cliente" value={buscarCliente} onChange={handleChangeCliente} placeholder="Negocio o NIT del Cliente" />
                </div>
                {clientesEncontrados.length > 0 &&
                    <ul>
                        {clientesEncontrados.map(cliente => (
                            <li key={cliente.id}>{cliente.negocio} - {cliente.nit}</li>
                        ))}
                    </ul>
                }
            </Form.Group>

            <Form.Group controlId="codigo">
                <Form.Label>Código</Form.Label>
                <Form.Control type="text" name="codigo" value={factura.codigo} onChange={handleChangeFactura} placeholder="Código" />
            </Form.Group>

            <Form.Group controlId="fecha">
                <Form.Label>Fecha</Form.Label>
                <Form.Control type="date" name="fecha" value={factura.fecha} onChange={handleChangeFactura} placeholder="Fecha" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Crear
            </Button>
        </Form>
    );
}

export default CrearFactura;
