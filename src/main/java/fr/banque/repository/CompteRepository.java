package fr.banque.repository;

import fr.banque.Classes.Compte;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompteRepository extends JpaRepository<Compte, Integer> {
}
