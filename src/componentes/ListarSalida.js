import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import Config from './Config';

function Listarsalidas() {
    const [salidas, setsalidas] = useState([]);

    useEffect(() => {
        axios.get(`${Config}/api/salida`)
            .then(response => {
                setsalidas(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <h1>salidas</h1>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Nom.Producto</th>
                        <th>Cod.Salida</th>
                        <th>Fecha Salida</th>
                        <th>Cantidad Ventas</th>
                        <th>Nom.Vendedor</th>
                        <th>Cod.Inventario</th>
                    </tr>
                </thead>
                <tbody>
                    {salidas.map(salida => (
                        <tr key={salida.id_salida}>
                            <td>{salida.nom_producto}</td>
                            <td>{salida.cod_salida}</td>
                            <td>{salida.fecha_salida}</td>
                            <td>{salida.cant_ventas}</td>
                            <td>{salida.vendedor}</td>
                            <td>{salida.cod_inventario}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Listarsalidas;
