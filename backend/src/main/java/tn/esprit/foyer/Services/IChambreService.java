package tn.esprit.foyer.Services;

import tn.esprit.foyer.Entities.Chambre;
import tn.esprit.foyer.Entities.TypeChambre;

import java.util.List;

public interface IChambreService {
    List<Chambre> retrieveAllChambres();
    Chambre addOrUpdateChambre(Chambre c);
    Chambre retrieveChambre(long idChambre);
    void removeChambre(long idChambre);
    List<Chambre> getChambresParNomBloc(String nomBloc);
    long nbChambreParTypeEtBloc(TypeChambre type, long idBloc);
    List<Chambre> getChambresNonReserveParNomFoyerEtTypeChambre(String nomFoyer, TypeChambre type);
}
