package tn.esprit.foyer.Services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.foyer.Entities.*;
import tn.esprit.foyer.Repositories.*;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class ReservationServiceImpl implements IReservationService {

    IReservationRepository reservationRepository;
    IChambreRepository chambreRepository;
    IEtudiantRepository etudiantRepository;

    @Override
    public List<Reservation> retrieveAllReservations() {
        return reservationRepository.findAll();
    }

    @Override
    public Reservation addOrUpdateReservation(Reservation r) {
        return reservationRepository.save(r);
    }

    @Override
    public Reservation retrieveReservation(String idReservation) {
        return reservationRepository.findById(idReservation).orElse(null);
    }

    @Override
    public void removeReservation(String idReservation) {
        reservationRepository.deleteById(idReservation);
    }

    @Override
    public Reservation ajouterReservationEtAssignerAChambreEtAEtudiant(Long numChambre, long cin) {
        Chambre chambre = chambreRepository.findByNumeroChambre(numChambre);
        Etudiant etudiant = etudiantRepository.findByCin(cin);

        // Vérifier capacité
        long nbReservations = chambre.getReservations().size();
  int capaciteMax = switch (chambre.getTypeC()) {
    case SIMPLE -> 1;
    case DOUBLE -> 2;
    case TRIPLE -> 3;
};

        // Calculer année universitaire
        LocalDate dateDebutAU;
        int year = LocalDate.now().getYear() % 100;
        String anneeFormat;
        if (LocalDate.now().getMonthValue() <= 7) {
            dateDebutAU = LocalDate.of(Integer.parseInt("20" + (year - 1)), 9, 15);
            anneeFormat = "20" + (year - 1) + "/20" + year;
        } else {
            dateDebutAU = LocalDate.of(Integer.parseInt("20" + year), 9, 15);
            anneeFormat = "20" + year + "/20" + (year + 1);
        }

        String nomBloc = (chambre.getBloc() != null) ? chambre.getBloc().getNomBloc() : "NoBloc";
        String idReservation = anneeFormat + "-" + nomBloc + "-" + numChambre + "-" + cin;

        Reservation reservation = new Reservation();
        reservation.setIdReservation(idReservation);
        reservation.setAnneeUniversitaire(LocalDate.now());
        reservation.setEstValide(true);
        reservation.setChambre(chambre);
        reservation.getEtudiants().add(etudiant);

        return reservationRepository.save(reservation);
    }

    @Override
    public long getReservationParAnneeUniversitaire(LocalDate debutAnnee, LocalDate finAnnee) {
        return reservationRepository.countByAnneeUniversitaireBetween(debutAnnee, finAnnee);
    }

    @Override
    public Reservation annulerReservation(long cinEtudiant) {
        List<Reservation> reservations = reservationRepository.findByEtudiantsCinAndEstValide(cinEtudiant, true);
        if (reservations.isEmpty()) return null;

        Reservation reservation = reservations.get(0);
        // Désaffecter la chambre
        Chambre chambre = reservation.getChambre();
        chambre.getReservations().remove(reservation);
        chambreRepository.save(chambre);

        reservationRepository.delete(reservation);
        return reservation;
    }
}
