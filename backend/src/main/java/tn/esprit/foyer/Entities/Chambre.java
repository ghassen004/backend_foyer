package tn.esprit.foyer.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @ToString
public class Chambre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idChambre;

    @Column(unique = true)
    private long numeroChambre;

    @Enumerated(EnumType.STRING)
    private TypeChambre typeC;

    @ManyToOne
    @JsonBackReference("bloc-chambres")
    private Bloc bloc;

    @OneToMany(mappedBy = "chambre", fetch = FetchType.EAGER)
    @JsonManagedReference("chambre-reservations")
    private List<Reservation> reservations = new ArrayList<>();
}
