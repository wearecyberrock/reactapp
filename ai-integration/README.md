# AI integration (Spring Boot)

This folder contains a minimal Spring Boot service that exposes a `/api/chat` endpoint
and forwards prompts to Google Vertex AI / Gemini via the `spring-ai` starter.

Important: do NOT store API keys in source files. Use environment variables.

Quick start (Git Bash):

```bash
cd ai-integration
export GEMINI_API_KEY="PASTE_YOUR_KEY_HERE"
mvn spring-boot:run
```

Quick start (PowerShell):

```powershell
cd ai-integration
$env:GEMINI_API_KEY = "PASTE_YOUR_KEY_HERE"
mvn spring-boot:run
```

Once running, the backend listens on `http://localhost:8080` and accepts POST
requests to `/api/chat` with JSON `{ "prompt": "..." }`.

From the React frontend (dev server at `http://localhost:3000`), the example
component in `src/ai-integration/AiChat.tsx` shows how to call this endpoint.
