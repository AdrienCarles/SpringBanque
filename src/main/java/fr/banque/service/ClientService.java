package fr.banque.service;

import org.springframework.beans.factory.annotation.Autowired;
import fr.banque.Classes.Client;
import fr.banque.repository.ClientRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ClientService {
    @Autowired
    private ClientRepository clientRepository;

    public Optional<Client> getClient(final Integer id) {
        return clientRepository.findById(id);
    }

    public Iterable<Client> getClients() {
        return clientRepository.findAll();
    }

    public void deleteClient(final Integer id) {
        clientRepository.deleteById(id);
    }

    public Client saveClient(Client client) {
        return clientRepository.save(client);
    }
}
