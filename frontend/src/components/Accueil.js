import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../context/RoleContext';

function Accueil() {
    const { setRole } = useRole();
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        role: Yup.string().required('Vous devez choisir un rôle.'),
    });

    return (
        <Container>
            <Row className="mt-5">
                <Col md={{ span: 6, offset: 3 }} className="text-center">
                    <h1>Bienvenue sur Votre Banque</h1>
                    <p>Veillez choisir votre rôle</p>
                    <Formik
                        initialValues={{ role: '' }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            setRole(values.role);
                            navigate('/menu');
                        }}
                    >
                        {({ handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <ErrorMessage name="role" component="div" className="text-danger" />
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
