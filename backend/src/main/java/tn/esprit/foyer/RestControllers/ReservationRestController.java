package tn.esprit.foyer.RestControllers;


import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import tn.esprit.foyer.Entities.Reservation;
import tn.esprit.foyer.Services.IReservationService;
import org.springframework.web.bind.annotation.RequestMethod;
import java.time.LocalDate;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/reservation")
@CrossOrigin(origins = "http://localhost:3001", methods = {
        RequestMethod.GET, RequestMethod.POST,
        RequestMethod.DELETE, RequestMethod.OPTIONS
})
public class ReservationRestController {

    IReservationService reservationService;

    @GetMapping("/retrieve-all-reservations")
    public List<Reservation> retrieveAllReservations() {
        return reservationService.retrieveAllReservations();
    }

    @PostMapping("/addOrUpdate")
    public Reservation addOrUpdateReservation(@RequestBody Reservation r) {
        return reservationService.addOrUpdateReservation(r);
    }

    @GetMapping("/retrieve-reservation/{id}")
    public Reservation retrieveReservation(@PathVariable String id) {
        return reservationService.retrieveReservation(id);
    }

    @DeleteMapping("/remove-reservation/{id}")
    public void removeReservation(@PathVariable String id) {
        reservationService.removeReservation(id);
    }

    @PostMapping("/ajouterReservationEtAssignerAChambreEtAEtudiant")
    public Reservation ajouterReservation(@RequestParam Long numChambre, @RequestParam long cin) {
        return reservationService.ajouterReservationEtAssignerAChambreEtAEtudiant(numChambre, cin);
    }

    @GetMapping("/getReservationParAnneeUniversitaire")
    public long getReservationParAnnee(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate debutAnnee,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate finAnnee) {
        return reservationService.getReservationParAnneeUniversitaire(debutAnnee, finAnnee);
    }

    @DeleteMapping("/annulerReservation")
    public String annulerReservation(@RequestParam long cinEtudiant) {
        Reservation r = reservationService.annulerReservation(cinEtudiant);
        if (r == null) return "Aucune réservation active trouvée.";
        return "La réservation " + r.getIdReservation() + " est annulée avec succès";
    }
}
