package tn.esprit.foyer.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @ToString
public class Bloc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idBloc;

    private String nomBloc;
    private long capaciteBloc;

    @ManyToOne
    @JsonBackReference("foyer-blocs")
    private Foyer foyer;

    @OneToMany(mappedBy = "bloc", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference("bloc-chambres")
    private List<Chambre> chambres = new ArrayList<>();
}
