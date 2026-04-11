package tn.esprit.foyer.RestControllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.foyer.Entities.Etudiant;
import tn.esprit.foyer.Services.IEtudiantService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/etudiant")
@CrossOrigin(origins = "http://localhost:3000")
public class EtudiantRestController {

    IEtudiantService etudiantService;

    @GetMapping("/retrieve-all-etudiants")
    public List<Etudiant> retrieveAllEtudiants() {
        return etudiantService.retrieveAllEtudiants();
    }

    @PostMapping("/addOrUpdate")
    public Etudiant addOrUpdateEtudiant(@RequestBody Etudiant e) {
        return etudiantService.addOrUpdateEtudiant(e);
    }

    @GetMapping("/retrieve-etudiant/{id}")
    public Etudiant retrieveEtudiant(@PathVariable long id) {
        return etudiantService.retrieveEtudiant(id);
    }

    @DeleteMapping("/remove-etudiant/{id}")
    public void removeEtudiant(@PathVariable long id) {
        etudiantService.removeEtudiant(id);
    }
}
