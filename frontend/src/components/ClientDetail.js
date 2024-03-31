import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {Button, Container, Modal, Table, Col, Row} from 'react-bootstrap';
import { Formik, Field, Form } from 'formik';
import BoutonRetour from './BoutonRetour';
import {BsExclamationTriangle, BsTrash, BsPlus} from "react-icons/bs";
import {useRole} from "../context/RoleContext";
import useDeleteCompte from '../hook/DeleteCompte';
import CreationCompteModal from './common/CreationCompteModal';

function ClientDetail() {
    const { role } = useRole();
    const { id } = useParams();
    const [client, setClient] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeletAccountModal, setShowDeletAccountModal] = useState(false);
    const [afficherModalRetrait, setAfficherModalRetrait] = useState(false);
    const [afficherModalVirement, setAfficherModalVirement] = useState(false);
    const [compteSelectionne, setCompteSelectionne] = useState(null);
    const handleDelete = useDeleteCompte(setClient, setShowDeletAccountModal);

    useEffect(() => {
        fetch(`/api/clients/${id}`)
            .then(response => response.json())
            .then(data => setClient(data))
            .catch(error => console.error('Error:', error));
    }, [id]);

    const handleAccountCreated = (newAccount) => {
        setClient(prevClient => {
            const updatedClient = { ...prevClient };
            if (!updatedClient.comptes) {
                updatedClient.comptes = [];
            }
            updatedClient.comptes.push(newAccount);
            return updatedClient;
        });
    };

    const gererRetrait = (montant) => {
        // Calculer le solde disponible en tenant compte du découvert autorisé
        const soldeDisponible = compteSelectionne.credit + compteSelectionne.decouvert;

        if (compteSelectionne && montant <= soldeDisponible) {
            // Calculer le nouveau crédit après le retrait
            const creditMisAJour = compteSelectionne.credit - montant;

            // Préparer l'objet avec la nouvelle valeur de crédit pour la mise à jour
            const donneesMiseAJour = {
                credit: creditMisAJour
            };

            // Effectuer la requête API pour mettre à jour le compte
            fetch(`/api/comptes/${compteSelectionne.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(donneesMiseAJour),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('La mise à jour a échoué.');
                    }
                    return response.json();
                })
                .then(data => {
                    setAfficherModalRetrait(false); // Fermer la modale après l'opération réussie
                    setCompteSelectionne(data);
                    setClient(prevClient => ({
                        ...prevClient,
                        comptes: prevClient.comptes.map(compte => compte.id === data.id ? { ...compte, credit: data.credit } : compte
                        )
                    }));
                })
                .catch(error => {
                    alert("Une erreur s'est produite lors de la mise à jour du compte.");
                });
        } else {
            alert("Solde insuffisant pour effectuer cette opération.");
        }
    };

    const gererVirement = (montant, idCompteCible) => {
        const soldeDisponible = compteSelectionne.credit + compteSelectionne.decouvert;
        if (compteSelectionne && compteSelectionne.credit >= soldeDisponible) {
            console.log(`Transfert de ${montant} vers le compte ${idCompteCible}`);
            setAfficherModalVirement(false); // Fermer la modale après l'opération
        } else {
            alert("Solde insuffisant pour effectuer cette opération.");
        }
    };

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
            <Row>
                <Col>
                    <h2>Comptes liées au client</h2>
                </Col>
                {role === 'banquier' &&
                    (
                        <Col className="text-right">
                            <Button variant="primary" onClick={() => setShowModal(true)}>
                                <BsPlus size="1.5em" />
                            </Button>
                        </Col>
                    )
                }
            </Row>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Numero</th>
                    <th>Credit du compte</th>
                    <th>Découvert autorisée</th>
                    <th>Opération</th>
                    {role === 'banquier' &&
                        (
                            <th>Action</th>
                        )
                    }
                </tr>
                </thead>
                <tbody>
                {client.comptes.map(compte => (
                    <tr key={compte.id}>
                        <td>{compte.id}</td>
                        <td>{compte.credit}</td>
                        <td>{compte.decouvert}</td>
                        <td className="text-center">
                            <Button onClick={() => { setCompteSelectionne(compte); setAfficherModalRetrait(true);}}>Retrait</Button>
                            <Button onClick={() => { setCompteSelectionne(compte); setAfficherModalVirement(true);}}>Virement</Button>
                        </td>
                        {role === 'banquier' &&
                            (
                                <td className="text-center">
                                    <BsTrash style={{cursor: 'pointer', color: 'red'}}
                                             onClick={() => setShowDeletAccountModal(compte)}/>
                                </td>
                            )
                        }
                    </tr>
                ))}
                </tbody>
            </Table>
            <BoutonRetour />
            <CreationCompteModal
                showModal={showModal}
                setShowModal={setShowModal}
                clients={Array.isArray(client) ? client : [client]}
                setClients={setClient}
                onAccountCreated={handleAccountCreated}
            />
            <Modal show={showDeletAccountModal} onHide={() => setShowDeletAccountModal(false)}>
                <Modal.Header closeButton style={{ backgroundColor: 'red', color: 'white' }}>
                    <Modal.Title><BsExclamationTriangle /> Attention !!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>Etes vous sûre de vouloir supprimmer ce compte ? Cette action est irréversible !</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeletAccountModal(false)}>Fermer</Button>
                    <Button type="submit" variant="danger" onClick={() => handleDelete(showDeletAccountModal)}>Supprimmer</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={afficherModalRetrait} onHide={() => setAfficherModalRetrait(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Retrait d'argent</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{ montant: '' }}
                        onSubmit={(values, { setSubmitting }) => {
                            gererRetrait(parseFloat(values.montant));
                            setSubmitting(false);
                        }}
                        // Ajoutez une validation si nécessaire
                    >
                        {({
                              values,
                              errors,
                              touched,
                              handleChange,
                              handleSubmit,
                              isSubmitting,
                          }) => (
                            <Form onSubmit={handleSubmit}>
                                <Row className="mb-3">
                                    <Col>
                                        <label htmlFor="montant" className="form-label">Montant du retrait</label>
                                        <Field
                                            type="number"
                                            name="montant"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={values.montant}
                                        />
                                        {errors.montant && touched.montant && errors.montant}
                                    </Col>
                                </Row>
                                <Button type="submit" variant="primary" disabled={isSubmitting}>
                                    Retirer
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>

            <Modal show={afficherModalVirement} onHide={() => setAfficherModalVirement(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Virement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{ montant: '', idCompteCible: '' }}
                        onSubmit={(values, { setSubmitting }) => {
                            gererVirement(parseFloat(values.montant), values.idCompteCible);
                            setSubmitting(false);
                        }}
                    >
                        {({
                              handleSubmit,
                              isSubmitting,
                          }) => (
                            <Form onSubmit={handleSubmit}>
                                <Row className="mb-3">
                                    <Col>
                                        <label htmlFor="montant" className="form-label">Montant</label>
                                        <Field
                                            type="number"
                                            name="montant"
                                            className="form-control"
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <label htmlFor="idCompteCible" className="form-label">ID Compte Cible</label>
                                        <Field
                                            type="text"
                                            name="idCompteCible"
                                            className="form-control"
                                        />
                                    </Col>
                                </Row>
                                <Button type="submit" variant="primary" disabled={isSubmitting}>
                                    Effectuer le virement
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default ClientDetail;
