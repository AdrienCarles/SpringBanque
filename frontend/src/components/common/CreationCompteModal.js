import React from 'react';
import { Button, Modal, Row } from 'react-bootstrap';
import { Field, Form, Formik } from "formik";
import { useNavigate } from 'react-router-dom';

const CreationCompteModal = ({ showModal, setShowModal, clients, onAccountCreated }) => {
    const navigate = useNavigate();
    const handleSave = (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        //Route API de création d'un nouveau compte
        fetch('/api/comptes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                numero: values.numero,
                credit: values.credit,
                decouvert: values.decouvert,
                client: { id: values.idClient }
            }),
        })
            .then(response => response.json())
            .then(data => {
                onAccountCreated(data);
                navigate(`/clientDetail/${values.idClient}`);
                resetForm();
                setShowModal(false);
            })
            .catch(error => console.error('Error:', error))
            .finally(() => setSubmitting(false));
    };

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Ajouter un nouveau compte</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{ numero: '', credit: '', decouvert: '', idClient: clients.length === 1 ? clients[0].id : '' }}
                    onSubmit={handleSave}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Row className="mb-3 mx-1">
                                <label htmlFor="credit" className="form-label">Crédit</label>
                                <Field name="credit" type="number" className="form-control" />
                            </Row>
                            <Row className="mb-3 mx-1">
                                <label htmlFor="decouvert" className="form-label">Découvert Autorisée</label>
                                <Field name="decouvert" type="number" className="form-control" />
                            </Row>
                            {clients.length > 1 && (
                                <Row className="mb-3 mx-1">
                                    <label htmlFor="idClient" className="form-label">Sélectionner un utilisateur</label>
                                    <Field as="select" name="idClient" className="form-select">
                                        <option value="">Sélectionner un utilisateur</option>
                                        {clients.map(client => (
                                            <option key={client.id} value={client.id}>
                                                {client.nom} {client.prenom}
                                            </option>
                                        ))}
                                    </Field>
                                </Row>
                            )}
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setShowModal(false)}>Fermer</Button>
                                <Button type="submit" variant="primary" disabled={isSubmitting}>Sauvegarder</Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
}

export default CreationCompteModal;