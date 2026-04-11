package tn.esprit.foyer.Services;

import tn.esprit.foyer.Entities.Universite;

import java.util.List;

public interface IUniversiteService {
    List<Universite> retrieveAllUniversites();
    Universite addOrUpdateUniversite(Universite u);
    Universite retrieveUniversite(long idUniversite);
    void removeUniversite(long idUniversite);

    Universite affecterFoyerAUniversite(long idFoyer, String nomUniversite);
    Universite desaffecterFoyerAUniversite(long idUniversite);
}
