package tn.esprit.foyer.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tn.esprit.foyer.Entities.Chambre;
import tn.esprit.foyer.Entities.TypeChambre;

import java.time.LocalDate;
import java.util.List;

public interface IChambreRepository extends JpaRepository<Chambre, Long> {
    Chambre findByNumeroChambre(long numeroChambre);

    List<Chambre> findByBlocNomBloc(String nomBloc);

    long countByChambreTypeAndBlocIdBloc(TypeChambre typeC, long idBloc);

    @Query("select count(c) from Chambre c where c.bloc.nomBloc = :nomBloc and c.typeC = :typeC")
    long countByTypeCAndBlocNomBloc(TypeChambre typeC, String nomBloc);

    @Query("select c from Chambre c where c.bloc.foyer.nomFoyer = :nomFoyer and c.typeC = :type " +
           "and c.idChambre not in (" +
           "  select r.chambre.idChambre from Reservation r " +
           "  where r.anneeUniversitaire between :debut and :fin" +
           ")")
    List<Chambre> getChambresNonReserveParNomFoyerEtTypeChambre(String nomFoyer, TypeChambre type, LocalDate debut, LocalDate fin);
}
