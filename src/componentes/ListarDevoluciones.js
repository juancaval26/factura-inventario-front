import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

function ListarDevoluciones() {
    const [devoluciones, setDevoluciones] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/devolucion')
            .then(response => {
                setDevoluciones(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <h1>Devoluciones</h1>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Cantidad</th>
                        <th>Nombre del Producto</th>
                        <th>Descripción del Producto</th>
                        <th>Nombre Cliente</th>
                    </tr>
                </thead>
                <tbody>
                    {devoluciones.map(devolucion => (
                        <tr key={devolucion.id}>
                            <td>{devolucion.fecha}</td>
                            <td>{devolucion.cantidad}</td>
                            <td>{devolucion.venta.producto.nombre}</td>
                            <td>{devolucion.venta.producto.descripcion}</td>
                            <td>{devolucion.venta.factura.cliente.negocio}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default ListarDevoluciones;
