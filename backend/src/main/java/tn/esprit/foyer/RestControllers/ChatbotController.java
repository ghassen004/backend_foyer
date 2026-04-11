package tn.esprit.foyer.RestControllers;

import lombok.AllArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/chatbot")
@CrossOrigin(origins = "http://localhost:3000")
public class ChatbotController {

    private static final String ANTHROPIC_URL    = "https://api.anthropic.com/v1/messages";
    // ⚠ Remplacez par votre vraie clé API Anthropic :
    private static final String ANTHROPIC_API_KEY = "VOTRE_CLE_API_ICI";
    private static final String MODEL             = "claude-sonnet-4-20250514";

    private static final String SYSTEM_PROMPT =
        "Tu es un assistant IA intégré dans FoyerMS, une plateforme de gestion des foyers universitaires. " +
        "Tu aides les étudiants et administrateurs à trouver la meilleure chambre, comprendre les réservations, " +
        "et naviguer dans la plateforme. " +
        "Types de chambres : SIMPLE (1 personne), DOUBLE (2 personnes), TRIPLE (3 personnes). " +
        "Réponds toujours en français, de façon empathique, concise et utile.";

    @PostMapping("/ask")
    public ResponseEntity<Map<String, String>> ask(@RequestBody ChatRequest request) {
        try {
            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("x-api-key", ANTHROPIC_API_KEY);
            headers.set("anthropic-version", "2023-06-01");

            // Construire le body pour l'API Anthropic
            Map<String, Object> body = Map.of(
                "model",      MODEL,
                "max_tokens", 1000,
                "system",     SYSTEM_PROMPT,
                "messages",   request.getMessages()
            );

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
            ResponseEntity<Map> response = restTemplate.postForEntity(ANTHROPIC_URL, entity, Map.class);

            // Extraire le texte de la réponse
            List<Map<String, Object>> content = (List<Map<String, Object>>) response.getBody().get("content");
            String text = content != null && !content.isEmpty()
                ? (String) content.get(0).get("text")
                : "Désolé, je n'ai pas pu répondre.";

            return ResponseEntity.ok(Map.of("reply", text));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("reply", "⚠Erreur du service IA : " + e.getMessage()));
        }
    }

    // DTO pour la requête
    public static class ChatRequest {
        private List<Map<String, String>> messages;
        public List<Map<String, String>> getMessages() { return messages; }
        public void setMessages(List<Map<String, String>> messages) { this.messages = messages; }
    }
}
