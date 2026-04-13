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
        if (chambre == null) {
            throw new RuntimeException("Chambre introuvable avec numéro : " + numChambre);
        }

        Etudiant etudiant = etudiantRepository.findByCin(cin);
        if (etudiant == null) {
            throw new RuntimeException("Étudiant introuvable avec CIN : " + cin);
        }

        //  calcul d'année universitaire avec arithmétique directe (sans %100 fragile)
        int year = LocalDate.now().getYear();
        LocalDate dateDebutAU;
        String anneeFormat;
        if (LocalDate.now().getMonthValue() <= 7) {
            dateDebutAU = LocalDate.of(year - 1, 9, 15);
            anneeFormat = (year - 1) + "/" + year;
        } else {
            dateDebutAU = LocalDate.of(year, 9, 15);
            anneeFormat = year + "/" + (year + 1);
        }

        // vérifier que l'étudiant n'a pas déjà une réservation valide cette année
        boolean dejaReserve = reservationRepository
                .findByEtudiantsCinAndEstValide(cin, true)
                .stream()
                .anyMatch(r -> r.getAnneeUniversitaire() != null &&
                        r.getAnneeUniversitaire().equals(dateDebutAU));
        if (dejaReserve) {
            throw new RuntimeException("L'étudiant " + cin + " a déjà une réservation active pour cette année.");
        }

        //  vérifier la capacité réelle (réservations valides uniquement)
        long nbReservations = chambre.getReservations().stream()
                .filter(Reservation::isEstValide)
                .count();
        int capaciteMax = switch (chambre.getTypeC()) {
            case SIMPLE -> 1;
            case DOUBLE -> 2;
            case TRIPLE -> 3;
        };
        if (nbReservations >= capaciteMax) {
            throw new RuntimeException("La chambre " + numChambre + " est complète (" + capaciteMax + "/" + capaciteMax + ").");
        }

        // Construction de l'ID composite
        String nomBloc = (chambre.getBloc() != null) ? chambre.getBloc().getNomBloc() : "NoBloc";
        String idReservation = anneeFormat + "-" + nomBloc + "-" + numChambre + "-" + cin;

        Reservation reservation = new Reservation();
        reservation.setIdReservation(idReservation);
        // FIX: stocker dateDebutAU (année universitaire) et non LocalDate.now()
        reservation.setAnneeUniversitaire(dateDebutAU);
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
        // désactiver la réservation au lieu de la supprimer physiquement
        reservation.setEstValide(false);
        return reservationRepository.save(reservation);
    }

}
