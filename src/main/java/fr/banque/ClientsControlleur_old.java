//package fr.banque;
//
//import fr.banque.Classes.Client;
//import fr.banque.service.ClientService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.ui.ModelMap;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.servlet.ModelAndView;
//
//import java.util.Optional;
//
//@RestController
//public class ClientsController_old {
//    @Autowired
//    private ClientService clientService;
//
//    @GetMapping("/client/lister")
//    public ModelAndView listeClient() {
//        return new ModelAndView("client/clients", "clients", clientService.getClients());
//    }
//
//    @GetMapping("client/lister/{id}")
//    public ModelAndView detailClient(@PathVariable("id") final Integer id) {
//        Optional<Client> client = clientService.getClient(id);
//        return new ModelAndView("client/detail", "client", client.orElse(null));
//    }
//
//    @GetMapping("/client/creer")
//    public ModelAndView creerClient() {
//        Client c= new Client();
//        return new ModelAndView("client/creer", "client", c);
//    }
//
//    @PostMapping("/client/creer")
//    public ModelAndView submit(@ModelAttribute("client") Client client, ModelMap model) {
//        model.addAttribute("nom", client.getNom());
//        model.addAttribute("prenom", client.getPrenom());
//        clientService.saveClient(client);
//
//        return new ModelAndView("redirect:/client/lister");
//    }
//
//    @GetMapping("/client/editer/{id}")
//    public ModelAndView editClient(@PathVariable("id") final Integer id) {
//        Optional<Client> client = clientService.getClient(id);
//        if(client.isPresent()) {
//            return new ModelAndView("client/editer", "client", client.get());
//        } else {
//            return new ModelAndView("error", "message", "Client not found");
//        }
//    }
//
//    @PostMapping("/client/editer")
//    public ModelAndView submitEdit(@ModelAttribute("client") Client clientForm, ModelMap model) {
//        Optional<Client> clientOpt = clientService.getClient(clientForm.getId());
//        if(clientOpt.isPresent()) {
//            Client client = clientOpt.get();
//            client.setNom(clientForm.getNom());
//            client.setPrenom(clientForm.getPrenom());
//            clientService.saveClient(client);
//        }
//        return new ModelAndView("redirect:/client/lister");
//    }
//
//    @GetMapping("/client/effacer/{id}")
//    public ModelAndView deleteClient(@PathVariable("id") final Integer id) {
//        Optional<Client> client = clientService.getClient(id);
//        if(client.isPresent()) {
//            return new ModelAndView("client/effacer", "client", client.get());
//        } else {
//            return new ModelAndView("error", "message", "Client not found");
//        }
//    }
//}