package fr.banque;

import fr.banque.Classes.Client;
import fr.banque.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/clients")
public class ClientsController {
    @Autowired
    private ClientService clientService;

    @GetMapping
    public Iterable<Client> getClients() {
        return clientService.getClients();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Client> getClient(@PathVariable Integer id) {
        Optional<Client> client = clientService.getClient(id);
        return client.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Client createClient(@RequestBody Client client) {
        return clientService.saveClient(client);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Client> updateClient(@PathVariable Integer id, @RequestBody Client client) {
        Optional<Client> existingClient = clientService.getClient(id);
        if(existingClient.isPresent()) {
            client.setId(id);
            return ResponseEntity.ok(clientService.saveClient(client));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public void deleteClient(@PathVariable Integer id) {
        clientService.deleteClient(id);
    }
}