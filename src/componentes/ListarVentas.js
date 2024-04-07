import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

function Listarventas() {
    const [ventas, setventas] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/ventas')
            .then(response => {
                setventas(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <h1>ventas</h1>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Nom.Vendedor</th>
                        <th>Cod.Factura</th>
                        <th>Cod.Venta</th>
                        <th>Negocio</th>
                        <th>Nom.Cliente</th>
                        <th>Nom.Producto</th>
                        <th>Cantidad</th>
                        <th>Descripción</th>
                        <th>Valor.Total</th>
                        <th>Fecha.Venta</th>
                        <th>Fecha.Factura</th>
                        <th>Devolución</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map(venta => (
                        <tr key={venta.id_venta}>
                            <td>{venta.vendedor}</td>
                            <td>{venta.cod_factura}</td>
                            <td>{venta.cod_venta}</td>
                            <td>{venta.negocio}</td>
                            <td>{venta.nom_cliente}</td>
                            <td>{venta.nom_producto}</td>
                            <td>{venta.cantidad}</td>
                            <td>{venta.descripcion}</td>
                            <td>{venta.valor_total}</td>
                            <td>{venta.fecha_venta}</td>
                            <td>{venta.elab_factura}</td>
                            <td>{venta.devolucion}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Listarventas;
