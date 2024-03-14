package fr.banque;

import fr.banque.Classes.Compte;
import fr.banque.service.CompteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/comptes")
public class ComptesController {
    @Autowired
    private CompteService compteService;

    @GetMapping
    public Iterable<Compte> getComptes() {
        return compteService.getComptes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Compte> getCompte(@PathVariable Integer id) {
        Optional<Compte> compte = compteService.getCompte(id);
        return compte.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Compte createCompte(@RequestBody Compte compte) {
        return compteService.saveCompte(compte);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Compte> updateCompte(@PathVariable Integer id, @RequestBody Compte compte) {
        Optional<Compte> existingCompte = compteService.getCompte(id);
        if(existingCompte.isPresent()) {
            compte.setId(id);
            return ResponseEntity.ok(compteService.saveCompte(compte));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public void deleteCompte(@PathVariable Integer id) {
        compteService.deleteCompte(id);
    }
}