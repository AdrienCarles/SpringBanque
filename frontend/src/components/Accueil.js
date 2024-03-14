import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import { useRole } from '../context/RoleContext';

function Accueil() {
    const { setRole } = useRole();

    return (
        <Container>
            <Row className="mt-5">
                <Col md={{ span: 6, offset: 3 }} className="text-center">
                    <h1>Bienvenue à Votre Banque</h1>
                    <p>Veillez choisir votre rôle</p>
                    <Formik
                        initialValues={{ role: '' }}
                        onSubmit={(values) => {
                            setRole(values.role);
                        }}
                    >
                        {({ handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <div role="group" aria-labelledby="radio-group">
                                    <label className="me-2">
                                        <Field type="radio" name="role" value="banquier" className="m-2"/>
                                        Banquier
                                    </label>
                                    <label className="ms-2">
                                        <Field type="radio" name="role" value="client" className="m-2"/>
                                        Client
                                    </label>
                                </div>
                                <Button type="submit" variant="primary" className="mt-2">Confirmer</Button>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
        </Container>
    );
}
export default Accueil;
