package tn.esprit.foyer.Services;

import tn.esprit.foyer.Entities.Etudiant;

import java.util.List;

public interface IEtudiantService {
    List<Etudiant> retrieveAllEtudiants();
    Etudiant addOrUpdateEtudiant(Etudiant e);
    Etudiant retrieveEtudiant(long idEtudiant);
    void removeEtudiant(long idEtudiant);
}
