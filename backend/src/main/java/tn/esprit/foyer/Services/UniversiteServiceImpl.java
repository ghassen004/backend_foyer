package tn.esprit.foyer.Services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.foyer.Entities.Foyer;
import tn.esprit.foyer.Entities.Universite;
import tn.esprit.foyer.Repositories.IFoyerRepository;
import tn.esprit.foyer.Repositories.IUniversiteRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class UniversiteServiceImpl implements IUniversiteService {

    IUniversiteRepository universiteRepository;
    IFoyerRepository foyerRepository;

    @Override
    public List<Universite> retrieveAllUniversites() {
        return universiteRepository.findAll();
    }

    @Override
    public Universite addOrUpdateUniversite(Universite u) {
        return universiteRepository.save(u);
    }

    @Override
    public Universite retrieveUniversite(long idUniversite) {
        return universiteRepository.findById(idUniversite).orElse(null);
    }

    @Override
    public void removeUniversite(long idUniversite) {
        universiteRepository.deleteById(idUniversite);
    }

    @Override
    public Universite affecterFoyerAUniversite(long idFoyer, String nomUniversite) {
        // FIX: orElseThrow pour éviter NPE si université ou foyer introuvable
        Universite u = universiteRepository.findByNomUniversite(nomUniversite);
        if (u == null) {
            throw new RuntimeException("Université introuvable : " + nomUniversite);
        }
        Foyer f = foyerRepository.findById(idFoyer)
                .orElseThrow(() -> new RuntimeException("Foyer introuvable : " + idFoyer));
        u.setFoyer(f);
        return universiteRepository.save(u);
    }

    @Override
    public Universite desaffecterFoyerAUniversite(long idUniversite) {
        // orElseThrow pour éviter NPE si université introuvable
        Universite u = universiteRepository.findById(idUniversite)
                .orElseThrow(() -> new RuntimeException("Université introuvable : " + idUniversite));
        u.setFoyer(null);
        return universiteRepository.save(u);
    }
}
