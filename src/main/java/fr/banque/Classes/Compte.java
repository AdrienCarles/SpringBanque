package fr.banque.Classes;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
@Entity
@Table(name ="compte")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Compte
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "numero", length = 50)
    private Integer numero;

    @Column(name = "credit", length = 50)
    private Double credit;

    @Column(name = "decouvert", length = 50)
    private Double decouvert;

    @ManyToOne
    @JoinColumn(name = "idClient")
    private Client client;

    @Override
    public String toString() {
        return "Compte [id=" + id + ",numero=" + numero;
    }

    // Getters
    public Integer getId() {
        return id;
    }
    public Integer getNumero() {
        return numero;
    }
    public Double getCredit() {
        return credit;
    }
    public Double getDecouvert() {
        return decouvert;
    }

    public Client getClient() {
        return client;
    }

    // Setters
    public void setId(Integer id) {
        this.id = id;
    }
    public void setNumero(Integer numero) {
        this.numero = numero;
    }
    public void setCredit(Double credit) {
        this.credit = credit;
    }
    public void setDecouvert(Double decouvert) {
        this.decouvert = decouvert;
    }

    public void setClient(Client client) {
        this.client = client;
    }
}