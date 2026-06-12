#!/usr/bin/env bash
set -euo pipefail

echo "This script will prompt for your Gemini API key (kept only in memory) and start the backend."
read -rsp "Enter GEMINI_API_KEY: " KEY
export GEMINI_API_KEY="$KEY"
echo
echo "GEMINI_API_KEY set for this session. Starting Spring Boot..."
cd "$(dirname "$0")"
mvn spring-boot:run
