import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const RedirectToHome = () => {
    let navigate = useNavigate();
    let location = useLocation();

    useEffect(() => {
        // Redirige vers la page d'accueil seulement si l'utilisateur n'est pas déjà dessus
        if (location.pathname !== "/") {
            navigate("/");
        }
    }, []); // Le tableau de dépendances vide signifie que cet effet ne s'exécute qu'au montage

    return null;
};

export default RedirectToHome;
