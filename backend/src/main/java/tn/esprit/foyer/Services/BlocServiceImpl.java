package tn.esprit.foyer.Services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.foyer.Entities.Bloc;
import tn.esprit.foyer.Entities.Chambre;
import tn.esprit.foyer.Entities.Foyer;
import tn.esprit.foyer.Repositories.IBlocRepository;
import tn.esprit.foyer.Repositories.IChambreRepository;
import tn.esprit.foyer.Repositories.IFoyerRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class BlocServiceImpl implements IBlocService {

    IBlocRepository blocRepository;
    IChambreRepository chambreRepository;
    IFoyerRepository foyerRepository;

    @Override
    public List<Bloc> retrieveAllBlocs() {
        return blocRepository.findAll();
    }

    @Override
    public Bloc addOrUpdateBloc(Bloc b) {
        if (b.getChambres() != null) {
            for (Chambre c : b.getChambres()) {
                c.setBloc(b);
            }
        }
        return blocRepository.save(b);
    }

    @Override
    public Bloc retrieveBloc(long idBloc) {
        return blocRepository.findById(idBloc).orElse(null);
    }

    @Override
    public void removeBloc(long idBloc) {
        blocRepository.deleteById(idBloc);
    }

    @Override
    public Bloc affecterChambresABloc(List<Long> numChambre, String nomBloc) {
        Bloc bloc = blocRepository.findByNomBloc(nomBloc);
        for (Long num : numChambre) {
            Chambre chambre = chambreRepository.findByNumeroChambre(num);
            chambre.setBloc(bloc);
            chambreRepository.save(chambre);
        }
        return blocRepository.findByNomBloc(nomBloc);
    }

    @Override
    public Bloc affecterBlocAFoyer(String nomBloc, String nomFoyer) {
        Bloc bloc = blocRepository.findByNomBloc(nomBloc);
        Foyer foyer = foyerRepository.findByNomFoyer(nomFoyer);
        bloc.setFoyer(foyer);
        return blocRepository.save(bloc);
    }
}
