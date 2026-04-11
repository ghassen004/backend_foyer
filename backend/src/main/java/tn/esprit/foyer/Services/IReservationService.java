package tn.esprit.foyer.Services;

import tn.esprit.foyer.Entities.Reservation;

import java.time.LocalDate;
import java.util.List;

public interface IReservationService {
    List<Reservation> retrieveAllReservations();
    Reservation addOrUpdateReservation(Reservation r);
    Reservation retrieveReservation(String idReservation);
    void removeReservation(String idReservation);
    Reservation ajouterReservationEtAssignerAChambreEtAEtudiant(Long numChambre, long cin);
    long getReservationParAnneeUniversitaire(LocalDate debutAnnee, LocalDate finAnnee);
    Reservation annulerReservation(long cinEtudiant);
}
