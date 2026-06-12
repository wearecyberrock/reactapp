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

Helper scripts
---------------

Two helper scripts are included to start the backend without storing the API key:

- `start-backend.ps1` — PowerShell script that prompts securely for the key and runs the app.
- `start-backend.sh` — POSIX shell script that prompts securely for the key and runs the app.

Usage (PowerShell):

```powershell
cd <project-root>
./ai-integration/start-backend.ps1
```

Usage (Bash):

```bash
./ai-integration/start-backend.sh
```

Security note: These scripts only set the `GEMINI_API_KEY` for the running session and do not write it to disk.
