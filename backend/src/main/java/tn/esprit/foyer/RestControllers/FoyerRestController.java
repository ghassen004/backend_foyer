package tn.esprit.foyer.RestControllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.foyer.Entities.Foyer;
import tn.esprit.foyer.Services.IFoyerService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/foyer")
@CrossOrigin(origins = "http://localhost:3001")

public class FoyerRestController {

    IFoyerService foyerService;

    @GetMapping("/retrieve-all-foyers")
    public List<Foyer> retrieveAllFoyers() {
        return foyerService.retrieveAllFoyers();
    }

    @PostMapping("/addOrUpdate")
    public Foyer addOrUpdateFoyer(@RequestBody Foyer f) {
        return foyerService.addOrUpdateFoyer(f);
    }

    @GetMapping("/retrieve-foyer/{id}")
    public Foyer retrieveFoyer(@PathVariable long id) {
        return foyerService.retrieveFoyer(id);
    }

    @DeleteMapping("/remove-foyer/{id}")
    public void removeFoyer(@PathVariable long id) {
        foyerService.removeFoyer(id);
    }

    @PostMapping("/ajouterFoyerEtAffecterAUniversite")
    public Foyer ajouterFoyerEtAffecterAUniversite(@RequestBody Foyer foyer, @RequestParam long idUniversite) {
        return foyerService.ajouterFoyerEtAffecterAUniversite(foyer, idUniversite);
    }
}
