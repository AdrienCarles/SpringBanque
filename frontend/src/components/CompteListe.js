import React, { useState, useEffect } from 'react';
import {Button, Container, Modal, Table} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BsTrash, BsExclamationTriangle } from 'react-icons/bs';
import { useRole } from '../context/RoleContext'
import useDeleteCompte from '../hook/DeleteCompte';
import CreationCompteModal from './common/CreationCompteModal';

const CompteListe = () => {
    const { role } = useRole();
    const [comptes, setComptes] = useState([]);
    const [clients, setClients] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeletModal, setShowDeletModal] = useState(false);
    const navigate = useNavigate(); // Pour la navigation
    const handleDelete = useDeleteCompte(setClients, showDeletModal);


    //Recupération des clients depuis le backend
    useEffect(() => {
        fetch('/api/clients')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setClients(data);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    //Recupération des comptes depuis le backend
    useEffect(() => {
        fetch('/api/comptes')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Pour chaque compte, trouvez le client correspondant et ajoutez-le au compte
                const comptesAvecClients = data.map(compte => {
                    const client = clients.find(client => client.comptes.some(c => c.id === compte.id));
                    return { ...compte, client };
                });
                setComptes(comptesAvecClients);
            })
            .catch(error => console.error('Error:', error));
    }, [clients]); // Ajoutez clients comme dépendance pour que l'effet se déclenche à nouveau lorsque les clients sont mis à jour

    // Utilisation d'un guard clause pour afficher "Chargement..."
    if (!comptes) {
        return <Container>Chargement des informations des comptes...</Container>;
    }

    return (
        <div>
            <h1>Liste des Comptes</h1>
            <Table striped bordered hover>
                <thead>
                <tr className="text-center">
                    <th>Numéro</th>
                    <th>Nom du Client</th>
                    <th>Crédit</th>
                    <th>Découvert</th>
                    {role === 'banquier' &&
                        (
                            <th>Action</th>
                        )
                    }
                </tr>
                </thead>
                <tbody>
                {comptes.map((compte) => (
                    <tr key={compte.id}>
                        <td onClick={() => navigate(`/clientDetail/${compte.client.id}`)} style={{ cursor: 'pointer' }}>{compte.id}</td>
                        <td onClick={() => navigate(`/clientDetail/${compte.client.id}`)} style={{ cursor: 'pointer' }}>{compte.client ? compte.client.nom : 'N/A'}</td>
                        <td onClick={() => navigate(`/clientDetail/${compte.client.id}`)} style={{ cursor: 'pointer' }}>{compte.credit ? compte.credit : 'N/A'}</td>
                        <td onClick={() => navigate(`/clientDetail/${compte.client.id}`)} style={{ cursor: 'pointer' }}>{compte.decouvert ? compte.decouvert : 'N/A'}</td>
                        {role === 'banquier' &&
                            (
                                <td className="text-center">
                                    <BsTrash style={{ cursor: 'pointer', color: 'red' }} onClick={() => setShowDeletModal(compte)}/>
                                </td>
                            )
                        }
                    </tr>
                ))}
                </tbody>
            </Table>
            {role === 'banquier' &&
                (
                    <Button variant="primary" onClick={() => setShowModal(true)}>Ajouter un compte</Button>
                )
            }
            <CreationCompteModal
                showModal={showModal}
                setShowModal={setShowModal}
                clients={clients}
            />
            <Modal show={showDeletModal} onHide={() => setShowDeletModal(false)}>
                <Modal.Header closeButton style={{ backgroundColor: 'red', color: 'white' }}>
                    <Modal.Title><BsExclamationTriangle /> Attention !!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>Etes vous sûre de vouloir supprimmer ce compte ? Cette action est irréversible !</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Fermer</Button>
                    <Button type="submit" variant="danger" onClick={() => handleDelete(showDeletModal)}>Supprimmer</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CompteListe;
