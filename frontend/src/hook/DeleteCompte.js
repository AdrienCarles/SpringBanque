const useDeleteCompte = (setClient, setShowDeleteModal) => {
    const handleDelete = (compteToDelete) => {
        fetch(`/api/comptes/${compteToDelete.id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    // Mise à jour de l'état local après la suppression
                    setClient(currentClient => ({
                        ...currentClient,
                        comptes: currentClient.comptes.filter(compte => compte.id !== compteToDelete.id)
                    }));
                    setShowDeleteModal(false); // Fermer le modal
                } else {
                    console.error('Erreur:', response);
                }
            })
            .catch(error => console.error('Erreur:', error));
    };

    return handleDelete;
};

export default useDeleteCompte;