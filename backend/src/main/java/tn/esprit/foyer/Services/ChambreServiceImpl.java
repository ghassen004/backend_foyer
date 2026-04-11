package tn.esprit.foyer.Services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.foyer.Entities.Chambre;
import tn.esprit.foyer.Entities.TypeChambre;
import tn.esprit.foyer.Repositories.IChambreRepository;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class ChambreServiceImpl implements IChambreService {

    IChambreRepository chambreRepository;

    @Override
    public List<Chambre> retrieveAllChambres() {
        return chambreRepository.findAll();
    }

    @Override
    public Chambre addOrUpdateChambre(Chambre c) {
        return chambreRepository.save(c);
    }

    @Override
    public Chambre retrieveChambre(long idChambre) {
        return chambreRepository.findById(idChambre).orElse(null);
    }

    @Override
    public void removeChambre(long idChambre) {
        chambreRepository.deleteById(idChambre);
    }

    @Override
    public List<Chambre> getChambresParNomBloc(String nomBloc) {
        return chambreRepository.findByBlocNomBloc(nomBloc);
    }

    @Override
    public long nbChambreParTypeEtBloc(TypeChambre type, long idBloc) {
        return chambreRepository.countByChambreTypeAndBlocIdBloc(type, idBloc);
    }

    @Override
    public List<Chambre> getChambresNonReserveParNomFoyerEtTypeChambre(String nomFoyer, TypeChambre type) {
        LocalDate dateDebutAU;
        LocalDate dateFinAU;
        int year = LocalDate.now().getYear() % 100;
        if (LocalDate.now().getMonthValue() <= 7) {
            dateDebutAU = LocalDate.of(Integer.parseInt("20" + (year - 1)), 9, 15);
            dateFinAU   = LocalDate.of(Integer.parseInt("20" + year), 6, 30);
        } else {
            dateDebutAU = LocalDate.of(Integer.parseInt("20" + year), 9, 15);
            dateFinAU   = LocalDate.of(Integer.parseInt("20" + (year + 1)), 6, 30);
        }
        return chambreRepository.getChambresNonReserveParNomFoyerEtTypeChambre(nomFoyer, type, dateDebutAU, dateFinAU);
    }
}
