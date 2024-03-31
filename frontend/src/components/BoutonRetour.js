import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const BoutonRetour = () => {
    const navigate = useNavigate();

    return (
        <Button variant="dark" onClick={() => navigate(-1)}>Retour</Button>
    );
};

export default BoutonRetour;
