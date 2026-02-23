# Download property images from Stitch manifest to web/public/images/properties/
# Run from repo root: .\stitch-screens\download-property-images.ps1
# Uses curl -L to follow redirects

$ErrorActionPreference = "Stop"
$ScriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$ManifestPath = Join-Path $ScriptRoot "PROPERTY_IMAGES_MANIFEST.json"
$OutDir = Join-Path (Join-Path (Join-Path (Join-Path $ScriptRoot "..") "web") "public") "images"
$OutDir = Join-Path $OutDir "properties"
$OutDir = [System.IO.Path]::GetFullPath($OutDir)
$Curl = "curl.exe"
$CurlArgs = @("-L", "--ssl-no-revoke", "-s", "-S", "-o")

if (-not (Test-Path $ManifestPath)) {
    Write-Error "Manifest not found: $ManifestPath"
    exit 1
}

$manifest = Get-Content $ManifestPath -Raw | ConvertFrom-Json
if (-not (Test-Path $OutDir)) {
    New-Item -ItemType Directory -Path $OutDir -Force | Out-Null
}

$count = 0
foreach ($img in $manifest.images) {
    $slug = $img.slug
    $url = $img.url
    $ext = ".jpg"
    $outPath = Join-Path $OutDir "$slug$ext"
    Write-Host "Downloading: $slug -> $outPath"
    try {
        & $Curl $CurlArgs $outPath $url
        if (Test-Path $outPath) {
            $count++
        }
    } catch {
        Write-Warning "Failed: $slug - $_"
    }
}

Write-Host "Done. Saved $count images to $OutDir"
