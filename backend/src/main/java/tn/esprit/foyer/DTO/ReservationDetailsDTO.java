package tn.esprit.foyer.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ReservationDetailsDTO {
    private String idReservation;
    private boolean estValide;
    private List<String> nomsEtudiants;
    private long numeroChambre;
    private String nomBloc;
    private LocalDate anneeUniversitaire;
}
