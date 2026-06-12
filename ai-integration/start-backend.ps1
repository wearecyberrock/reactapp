Write-Host "This script will prompt for your Gemini API key (kept only in memory) and start the backend."

$secure = Read-Host -AsSecureString "Enter GEMINI API KEY (input hidden)"
$ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
$plain = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr)
[Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr)

$env:GEMINI_API_KEY = $plain

Write-Host "GEMINI_API_KEY set for this session. Starting Spring Boot..."
Set-Location -Path (Join-Path $PSScriptRoot '.')
cd ai-integration
mvn spring-boot:run
