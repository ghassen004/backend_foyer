// ===== IUniversiteRepository.java =====
package tn.esprit.foyer.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.foyer.Entities.Universite;

public interface IUniversiteRepository extends JpaRepository<Universite, Long> {
    Universite findByNomUniversite(String nomUniversite);
}
