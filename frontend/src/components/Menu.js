import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Accueil() {
    return (
        <Container>
            <Row className="mt-5">
                <Col md={{ span: 6, offset: 3 }} className="text-center">
                    <h1>Bienvenue à Votre Banque</h1>
                    <p>Bien gérer votre argent est plus simple que jamais.</p>
                    <div>
                        {/* Lien vers la liste des comptes - Assurez-vous que le chemin correspond à votre route */}
                        <Link to="/compteListe">
                            <Button variant="primary" className="m-2">Gestion des Comptes</Button>
                        </Link>
                        {/* Lien vers la liste des clients - Assurez-vous que le chemin correspond à votre route */}
                        <Link to="/clientListe">
                            <Button variant="secondary" className="m-2">Gestion des Clients</Button>
                        </Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
export default Accueil;
