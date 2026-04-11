package tn.esprit.foyer.Services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.foyer.Entities.Bloc;
import tn.esprit.foyer.Entities.Foyer;
import tn.esprit.foyer.Entities.Universite;
import tn.esprit.foyer.Repositories.IFoyerRepository;
import tn.esprit.foyer.Repositories.IUniversiteRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class FoyerServiceImpl implements IFoyerService {

    IFoyerRepository foyerRepository;
    IUniversiteRepository universiteRepository;

    @Override
    public List<Foyer> retrieveAllFoyers() {
        return foyerRepository.findAll();
    }

    @Override
    public Foyer addOrUpdateFoyer(Foyer f) {
        return foyerRepository.save(f);
    }

    @Override
    public Foyer retrieveFoyer(long idFoyer) {
        return foyerRepository.findById(idFoyer).orElse(null);
    }

    @Override
    public void removeFoyer(long idFoyer) {
        foyerRepository.deleteById(idFoyer);
    }

    @Override
    public Foyer ajouterFoyerEtAffecterAUniversite(Foyer foyer, long idUniversite) {
        Universite universite = universiteRepository.findById(idUniversite).orElse(null);
        // Assigner le foyer à chaque bloc et chaque bloc au foyer
        if (foyer.getBlocs() != null) {
            for (Bloc bloc : foyer.getBlocs()) {
                bloc.setFoyer(foyer);
            }
        }
        Foyer savedFoyer = foyerRepository.save(foyer);
        universite.setFoyer(savedFoyer);
        universiteRepository.save(universite);
        return savedFoyer;
    }
}
