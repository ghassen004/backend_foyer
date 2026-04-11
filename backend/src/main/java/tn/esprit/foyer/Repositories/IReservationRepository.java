package tn.esprit.foyer.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.foyer.Entities.Reservation;

import java.time.LocalDate;
import java.util.List;

public interface IReservationRepository extends JpaRepository<Reservation, String> {
    long countByAnneeUniversitaireBetween(LocalDate debut, LocalDate fin);

    List<Reservation> findByEtudiantsCinAndEstValide(long cin, boolean estValide);
}
