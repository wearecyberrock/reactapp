package com.cyberrock.ai.controller;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Allow local React dev server
public class AiController {

    private final ChatClient chatClient;

    // Prefer injecting the ChatClient bean produced by the starter
    public AiController(ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    @PostMapping("/chat")
    public ResponseEntity<?> handleAiQuery(@RequestBody Map<String, String> payload) {
        String prompt = payload.get("prompt");
        if (prompt == null || prompt.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Prompt cannot be empty"));
        }

        try {
            // Use the ChatClient to prompt the model. The exact API depends on the
            // spring-ai version; this matches typical fluent builders.
            String aiResponse = chatClient.prompt()
                    .user(prompt)
                    .call()
                    .content();

            return ResponseEntity.ok(Map.of("text", aiResponse));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "AI generation processing failed"));
        }
    }
}
