package tn.esprit.foyer.RestControllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.foyer.Entities.Bloc;
import tn.esprit.foyer.Services.IBlocService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/bloc")
@CrossOrigin(origins = "http://localhost:3001")

public class BlocRestController {

    IBlocService blocService;

    @GetMapping("/retrieve-all-blocs")
    public List<Bloc> retrieveAllBlocs() {
        return blocService.retrieveAllBlocs();
    }

    @PostMapping("/addOrUpdate")

    public Bloc addOrUpdateBloc(@RequestBody Bloc b) {
        return blocService.addOrUpdateBloc(b);
    }

    @GetMapping("/retrieve-bloc/{id}")
    public Bloc retrieveBloc(@PathVariable long id) {
        return blocService.retrieveBloc(id);
    }

    @DeleteMapping("/remove-bloc/{id}")
    public void removeBloc(@PathVariable long id) {
        blocService.removeBloc(id);
    }

    @PutMapping("/affecterChambresABloc")

    public Bloc affecterChambresABloc(@RequestBody List<Long> numChambre, @RequestParam String nomBloc) {
        return blocService.affecterChambresABloc(numChambre, nomBloc);
    }

    @PutMapping("/affecterBlocAFoyer")

    public Bloc affecterBlocAFoyer(@RequestParam String nomBloc, @RequestParam String nomFoyer) {
        return blocService.affecterBlocAFoyer(nomBloc, nomFoyer);
    }
}
