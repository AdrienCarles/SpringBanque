import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

const CompteListe = () => {
    const [comptes, setComptes] = useState([]);

    useEffect(() => {
        fetch('/api/comptes')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setComptes(data);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div>
            <h1>Liste des Comptes</h1>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>ID Client</th>
                    <th>Numéro</th>
                    <th>Crédit</th>
                    <th>Découvert</th>
                </tr>
                </thead>
                <tbody>
                {comptes.map((compte) => (
                    <tr key={compte.id}>
                        <td>{compte.id}</td>
                        <td>{compte.client.id}</td>
                        <td>{compte.numero}</td>
                        <td>{compte.credit ? compte.credit : 'N/A'}</td>
                        <td>{compte.decouvert ? compte.decouvert : 'N/A'}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default CompteListe;