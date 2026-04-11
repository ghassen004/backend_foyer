package tn.esprit.foyer.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.foyer.Entities.Bloc;

public interface IBlocRepository extends JpaRepository<Bloc, Long> {
    Bloc findByNomBloc(String nomBloc);
}
