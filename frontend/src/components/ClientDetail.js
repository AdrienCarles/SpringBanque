import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {Container, Table} from 'react-bootstrap';
import BoutonRetour from './BoutonRetour';

function ClientDetail() {
    const { id } = useParams();
    const [client, setClient] = useState(null);

    useEffect(() => {
        fetch(`/api/clients/${id}`)
            .then(response => response.json())
            .then(data => setClient(data))
            .catch(error => console.error('Error:', error));
    }, [id]);
    console.log(client)
    // Utilisation d'un guard clause pour afficher "Chargement..."
    if (!client) {
        return <Container>Chargement des informations du client...</Container>;
    }

    // Cette ligne ne sera exécutée que si `client` n'est pas `null`
    return (
        <Container>
            <h1>Information du compte de {client.nom} {client.prenom}</h1>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                </tr>
                </thead>
                <tbody>
                    <tr key={client.id} >
                        <td>{client.id}</td>
                        <td>{client.nom}</td>
                        <td>{client.prenom}</td>
                    </tr>
                </tbody>
            </Table>
            <h2>Comptes liées au client</h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Numero</th>
                    <th>Credit du compte</th>
                    <th>Découvert autorisée</th>
                </tr>
                </thead>
                <tbody>
                {client.comptes.map(compte => (
                    <tr key={compte.id} /*onClick={() => navigate(`/clientDetail/${client.id}`)} style={{ cursor: 'pointer' }}*/>
                        <td>{compte.numero}</td>
                        <td>{compte.credit}</td>
                        <td>{compte.decouvert}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <BoutonRetour />
        </Container>
    );
}

export default ClientDetail;
