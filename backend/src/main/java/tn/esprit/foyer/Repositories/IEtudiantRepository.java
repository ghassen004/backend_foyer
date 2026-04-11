package tn.esprit.foyer.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.foyer.Entities.Etudiant;

public interface IEtudiantRepository extends JpaRepository<Etudiant, Long> {
    Etudiant findByCin(long cin);
}
