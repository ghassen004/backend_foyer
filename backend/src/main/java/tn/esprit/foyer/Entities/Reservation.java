package tn.esprit.foyer.Entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@ToString(exclude = {"chambre", "etudiants"})
public class Reservation {

    @Id
    private String idReservation;

    private LocalDate anneeUniversitaire;
    private boolean estValide;

    @ManyToOne
    @JsonIgnoreProperties({"reservations"})  // évite la récursion chambre→reservations→chambre
    private Chambre chambre;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JsonIgnoreProperties({"reservations"})
    private List<Etudiant> etudiants = new ArrayList<>();
}