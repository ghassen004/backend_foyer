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
        Universite u = universiteRepository.findByNomUniversite(nomUniversite);
        Foyer f = foyerRepository.findById(idFoyer).orElse(null);
        u.setFoyer(f);
        return universiteRepository.save(u);
    }

    @Override
    public Universite desaffecterFoyerAUniversite(long idUniversite) {
        Universite u = universiteRepository.findById(idUniversite).orElse(null);
        u.setFoyer(null);
        return universiteRepository.save(u);
    }
}
