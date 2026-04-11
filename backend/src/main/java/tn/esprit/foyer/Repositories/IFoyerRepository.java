package tn.esprit.foyer.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.foyer.Entities.Foyer;

public interface IFoyerRepository extends JpaRepository<Foyer, Long> {
    Foyer findByNomFoyer(String nomFoyer);
}
