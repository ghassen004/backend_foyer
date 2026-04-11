package tn.esprit.foyer.RestControllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.foyer.Entities.Universite;
import tn.esprit.foyer.Services.IUniversiteService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/universite")
@CrossOrigin(origins = "http://localhost:3000")
public class UniversiteRestController {

    IUniversiteService universiteService;

    @GetMapping("/retrieve-all-universites")
    public List<Universite> retrieveAllUniversites() {
        return universiteService.retrieveAllUniversites();
    }

    @PostMapping("/addOrUpdate")
    public Universite addOrUpdateUniversite(@RequestBody Universite u) {
        return universiteService.addOrUpdateUniversite(u);
    }

    @GetMapping("/retrieve-universite/{id}")
    public Universite retrieveUniversite(@PathVariable long id) {
        return universiteService.retrieveUniversite(id);
    }

    @DeleteMapping("/remove-universite/{id}")
    public void removeUniversite(@PathVariable long id) {
        universiteService.removeUniversite(id);
    }

    @PutMapping("/affecterFoyerAUniversite")
    public Universite affecterFoyerAUniversite(@RequestParam long idFoyer, @RequestParam String nomUniversite) {
        return universiteService.affecterFoyerAUniversite(idFoyer, nomUniversite);
    }

    @PutMapping("/desaffecterFoyerAUniversite")
    public Universite desaffecterFoyerAUniversite(@RequestParam long idUniversite) {
        return universiteService.desaffecterFoyerAUniversite(idUniversite);
    }
}
