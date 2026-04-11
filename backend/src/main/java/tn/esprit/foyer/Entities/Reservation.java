package tn.esprit.foyer.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @ToString
public class Reservation {

    @Id
    private String idReservation;

    private LocalDate anneeUniversitaire;
    private boolean estValide;

    @ManyToOne
    @JsonBackReference("chambre-reservations")
    private Chambre chambre;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JsonIgnore
    private List<Etudiant> etudiants = new ArrayList<>();
}
