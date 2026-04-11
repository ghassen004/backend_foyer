package tn.esprit.foyer.Services;

import tn.esprit.foyer.Entities.Bloc;

import java.util.List;

public interface IBlocService {
    List<Bloc> retrieveAllBlocs();
    Bloc addOrUpdateBloc(Bloc b);
    Bloc retrieveBloc(long idBloc);
    void removeBloc(long idBloc);
    Bloc affecterChambresABloc(List<Long> numChambre, String nomBloc);
    Bloc affecterBlocAFoyer(String nomBloc, String nomFoyer);
}
