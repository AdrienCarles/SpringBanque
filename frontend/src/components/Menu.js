import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BoutonRetour from './BoutonRetour';
import { useRole } from '../context/RoleContext';

function Accueil() {
    const { role } = useRole();

    return (
        <Container>
            <Row className="mt-5">
                <Col md={{ span: 6, offset: 3 }} className="text-center">
                    <h1>Bienvenue à Votre Banque</h1>
                    {role === 'banquier' &&
                        (
                            <>
                                <p>Bienvenue, banquier ! Voici vos options.</p>
                                <div>
                                    <Link to="/compteListe">
                                        <Button variant="primary" className="m-2">Gestion des Comptes</Button>
                                    </Link>
                                    <Link to="/clientListe">
                                        <Button variant="success" className="m-2">Gestion des Clients</Button>
                                    </Link>
                                </div>
                            </>
                        )
                    }
                    {role === 'client' &&
                        <>
                            <p>Bienvenue, client ! Voici vos services.</p>
                            <div>
                                <Link to="/clientListe">
                                    <Button variant="success" className="m-2">Liste des clients</Button>
                                </Link>
                            </div>
                        </>
                    }
                </Col>
            </Row>
            <Row className="justify-content-center align-items-center h-100">
                <Col xs={12} md={6} className="text-center">
                    <BoutonRetour/>
                </Col>
            </Row>
        </Container>
    );
}

export default Accueil;
