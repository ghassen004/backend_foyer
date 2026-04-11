package tn.esprit.foyer.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @ToString
public class Etudiant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idEtudiant;

    private String nomEt;
    private String prenomEt;
    private long cin;
    private String ecole;
    private LocalDate dateNaissance;

    @ManyToMany(mappedBy = "etudiants", fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Reservation> reservations = new ArrayList<>();
}
