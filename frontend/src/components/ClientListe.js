import React, { useState, useEffect } from 'react';
import {Button, Container, Modal, Table} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { BsTrash, BsExclamationTriangle } from 'react-icons/bs';
import { useRole } from '../context/RoleContext';

// Schéma de validation avec Yup
const validationSchema = Yup.object().shape({
    nom: Yup.string().required('Le nom est obligatoire'),
    prenom: Yup.string().required('Le prénom est obligatoire'),
});

const ClientListe = () => {
    const { role } = useRole();
    const [clients, setClients] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeletModal, setShowDeletModal] = useState(false);
    const navigate = useNavigate(); // Pour la navigation

    useEffect(() => {
        fetch('/api/clients')
            .then(response => response.json())
            .then(data => setClients(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const handleSave = (values, { setSubmitting, resetForm }) => {
        fetch('/api/clients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then(response => response.json())
            .then(data => {
                setClients([...clients, data]);
                setShowModal(false);
                resetForm();
            })
            .catch(error => console.error('Error:', error))
            .finally(() => setSubmitting(false));
    };

    const handleDelete = (clientToDelete) => {
        fetch(`/api/clients/${clientToDelete.id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    // Supprimez le client de l'état local pour que la liste soit à jour
                    setClients(clients.filter(client => client.id !== clientToDelete.id));
                    setShowDeletModal(false);
                } else {
                    console.error('Error:', response);
                }
            })
            .catch(error => console.error('Error:', error));
    };

    // Utilisation d'un guard clause pour afficher "Chargement..."
    if (!clients) {
        return <Container>Chargement des informations des clients...</Container>;
    }

    return (
        <div>
            <h2>Liste des Clients</h2>
            <Table striped bordered hover>
                <thead>
                <tr className="text-center">
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    {role === 'banquier' &&
                        (
                            <th>Action</th>
                        )
                    }
                </tr>
                </thead>
                <tbody>
                {clients.map(client => (
                    <tr key={client.id}>
                        <td onClick={() => navigate(`/clientDetail/${client.id}`)} style={{ cursor: 'pointer' }}>{client.id}</td>
                        <td onClick={() => navigate(`/clientDetail/${client.id}`)} style={{ cursor: 'pointer' }}>{client.nom}</td>
                        <td onClick={() => navigate(`/clientDetail/${client.id}`)} style={{ cursor: 'pointer' }}>{client.prenom}</td>
                        {role === 'banquier' &&
                            (
                                <td className="text-center">
                                    <BsTrash style={{ cursor: 'pointer', color: 'red' }} onClick={() => setShowDeletModal(client)}/>
                                </td>
                            )
                        }
                    </tr>
                ))}
                </tbody>
            </Table>
            <Button variant="primary" onClick={() => setShowModal(true)}>Ajouter un client</Button>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter un nouveau client</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{ nom: '', prenom: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSave}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form>
                                <div className="mb-3">
                                    <label htmlFor="nom" className="form-label">Nom</label>
                                    <Field name="nom" type="text" className={`form-control ${touched.nom && errors.nom ? "is-invalid" : ""}`} />
                                    {touched.nom && errors.nom ? (<div className="invalid-feedback">{errors.nom}</div>) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="prenom" className="form-label">Prénom</label>
                                    <Field name="prenom" type="text" className={`form-control ${touched.prenom && errors.prenom ? "is-invalid" : ""}`} />
                                    {touched.prenom && errors.prenom ? (<div className="invalid-feedback">{errors.prenom}</div>) : null}
                                </div>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => setShowModal(false)}>Fermer</Button>
                                    <Button type="submit" variant="primary" disabled={isSubmitting}>Sauvegarder</Button>
                                </Modal.Footer>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
            <Modal show={showDeletModal} onHide={() => setShowDeletModal(false)}>
                <Modal.Header closeButton style={{ backgroundColor: 'red', color: 'white' }}>
                    <Modal.Title><BsExclamationTriangle /> Attention !!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>Etes vous sûre de vouloir supprimmer ce client et tous ses comptes associes ? Cette action est irréversible !</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Fermer</Button>
                    <Button type="submit" variant="danger" onClick={() => handleDelete(showDeletModal)}>Supprimmer</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ClientListe;