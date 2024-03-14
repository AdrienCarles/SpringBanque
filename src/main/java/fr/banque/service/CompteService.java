package fr.banque.service;

import org.springframework.beans.factory.annotation.Autowired;
import fr.banque.Classes.Compte;
import fr.banque.repository.CompteRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CompteService {
    @Autowired
    private CompteRepository compteRepository;

    public Optional<Compte> getCompte(final Integer id) {
        return compteRepository.findById(id);
    }

    public Iterable<Compte> getComptes() {
        return compteRepository.findAll();
    }

    public void deleteCompte(final Integer id) {
        compteRepository.deleteById(id);
    }

    public Compte saveCompte(Compte compte) {
        return compteRepository.save(compte);
    }
}