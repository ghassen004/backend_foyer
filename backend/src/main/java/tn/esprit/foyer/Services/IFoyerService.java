package tn.esprit.foyer.Services;

import tn.esprit.foyer.Entities.Foyer;

import java.util.List;

public interface IFoyerService {
    List<Foyer> retrieveAllFoyers();
    Foyer addOrUpdateFoyer(Foyer f);
    Foyer retrieveFoyer(long idFoyer);
    void removeFoyer(long idFoyer);
    Foyer ajouterFoyerEtAffecterAUniversite(Foyer foyer, long idUniversite);
}
