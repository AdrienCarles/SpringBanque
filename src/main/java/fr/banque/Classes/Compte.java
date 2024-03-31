package fr.banque.Classes;

import com.fasterxml.jackson.annotation.JsonBackReference;
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


    @Column(name = "credit", length = 50)
    private Double credit;

    @Column(name = "decouvert", length = 50)
    private Double decouvert;

    @ManyToOne
    @JoinColumn(name = "idClient")
    @JsonBackReference
    private Client client;

    // Getters
    public Integer getId() {
        return id;
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