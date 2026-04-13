package tn.esprit.foyer.RestControllers;


import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.foyer.Entities.Chambre;
import tn.esprit.foyer.Entities.TypeChambre;
import tn.esprit.foyer.Services.IChambreService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/chambre")
@CrossOrigin(origins = "http://localhost:3001")

public class ChambreRestController {

    IChambreService chambreService;

    @GetMapping("/retrieve-all-chambres")
    public List<Chambre> retrieveAllChambres() {
        return chambreService.retrieveAllChambres();
    }

    @PostMapping("/addOrUpdate")
    public Chambre addOrUpdateChambre(@RequestBody Chambre c) {
        return chambreService.addOrUpdateChambre(c);
    }

    @GetMapping("/retrieve-chambre/{id}")
    public Chambre retrieveChambre(@PathVariable long id) {
        return chambreService.retrieveChambre(id);
    }

    @DeleteMapping("/remove-chambre/{id}")
    public void removeChambre(@PathVariable long id) {
        chambreService.removeChambre(id);
    }

    @GetMapping("/getChambresParNomBloc")
    public List<Chambre> getChambresParNomBloc(@RequestParam String nomBloc) {
        return chambreService.getChambresParNomBloc(nomBloc);
    }

    @GetMapping("/nbChambreParTypeEtBloc")
    public long nbChambreParTypeEtBloc(@RequestParam TypeChambre type, @RequestParam long idBloc) {
        return chambreService.nbChambreParTypeEtBloc(type, idBloc);
    }

    @GetMapping("/getChambresNonReserve")
    public List<Chambre> getChambresNonReserve(@RequestParam String nomFoyer, @RequestParam TypeChambre type) {
        return chambreService.getChambresNonReserveParNomFoyerEtTypeChambre(nomFoyer, type);
    }
}
