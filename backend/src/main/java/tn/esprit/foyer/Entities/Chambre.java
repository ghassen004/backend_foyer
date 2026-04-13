package tn.esprit.foyer.Entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@ToString(exclude = {"bloc", "reservations"})
public class Chambre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idChambre;

    @Column(unique = true)
    private long numeroChambre;

    @Enumerated(EnumType.STRING)
    private TypeChambre typeC;

    @ManyToOne
    @JsonIgnoreProperties({"chambres", "foyer"})  // évite la récursion bloc→chambres→bloc
    private Bloc bloc;

    @OneToMany(mappedBy = "chambre", fetch = FetchType.EAGER)
    @JsonManagedReference("chambre-reservations")
    private List<Reservation> reservations = new ArrayList<>();
}