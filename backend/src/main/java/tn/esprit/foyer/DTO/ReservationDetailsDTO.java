package tn.esprit.foyer.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ReservationDetailsDTO {
    private String idReservation;
    private boolean estValide;
    private String nomCompletEtudiant;
    private long numeroChambre;
    private String nomBloc;
}
