# Converts i18n/translations.json to Flutter gen-l10n ARB format.
# Usage: powershell -ExecutionPolicy Bypass -File i18n/convert_to_flutter_arb.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$inputPath = Join-Path $root "i18n\translations.json"
$outputDir = Join-Path $root "mobile\l10n"
$utf8NoBom = New-Object System.Text.UTF8Encoding $false

$jsonText = [System.IO.File]::ReadAllText($inputPath, $utf8NoBom)
$translations = $jsonText | ConvertFrom-Json
New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

function To-ArbKey($section, $key) {
    return $section + ($key.Substring(0, 1).ToUpper() + $key.Substring(1))
}

function Sanitize([string]$text) {
    if ($null -eq $text) { return $text }
    $text = $text -replace '(?i)<br\s*/?>', "`n"
    $text = $text -replace '(?i)</?strong>', ''
    $text = $text -replace '(?i)</?em>', ''
    return $text
}

function Flatten-Locale($localeData) {
    $flat = [ordered]@{}
    foreach ($sectionProp in $localeData.PSObject.Properties) {
        $section = $sectionProp.Name
        $entries = $sectionProp.Value
        if ($entries -isnot [System.Management.Automation.PSCustomObject]) { continue }
        foreach ($keyProp in $entries.PSObject.Properties) {
            $flat[(To-ArbKey $section $keyProp.Name)] = $keyProp.Value
        }
    }
    return $flat
}

function Build-Arb($flat, $locale, $isTemplate) {
    $arb = [ordered]@{ '@@locale' = $locale }
    if ($isTemplate) {
        $arb['@@context'] = 'Ingatkan Teman UI strings — generated from i18n/translations.json'
    }
    foreach ($entry in $flat.GetEnumerator()) {
        $key = $entry.Key
        $value = Sanitize $entry.Value
        $arb[$key] = $value
        if ($isTemplate) {
            $meta = [ordered]@{ description = 'Web key equivalent in key_map.json' }
            $matches = [regex]::Matches($value, '\{(\w+)\}')
            if ($matches.Count -gt 0) {
                $ph = [ordered]@{}
                foreach ($m in $matches) {
                    $ph[$m.Groups[1].Value] = [ordered]@{ type = 'String' }
                }
                $meta['placeholders'] = $ph
            }
            $arb["@$key"] = $meta
        }
    }
    return $arb
}

$enFlat = Flatten-Locale $translations.en
$msFlat = Flatten-Locale $translations.bm

$enJson = (Build-Arb $enFlat 'en' $true | ConvertTo-Json -Depth 10 -Compress:$false)
$msJson = (Build-Arb $msFlat 'ms' $false | ConvertTo-Json -Depth 10 -Compress:$false)
[System.IO.File]::WriteAllText((Join-Path $outputDir 'app_en.arb'), $enJson + "`n", $utf8NoBom)
[System.IO.File]::WriteAllText((Join-Path $outputDir 'app_ms.arb'), $msJson + "`n", $utf8NoBom)

$keyMap = [ordered]@{
    meta = [ordered]@{
        source         = 'i18n/translations.json'
        webLocales     = @('en', 'bm')
        flutterLocales = @('en', 'ms')
        note           = 'Web locale "bm" maps to Flutter/Android locale "ms" (Bahasa Melayu).'
    }
    keys = [ordered]@{}
}
foreach ($sectionProp in $translations.en.PSObject.Properties) {
    $section = $sectionProp.Name
    $entries = $sectionProp.Value
    if ($entries -isnot [System.Management.Automation.PSCustomObject]) { continue }
    foreach ($keyProp in $entries.PSObject.Properties) {
        $keyMap.keys["$section.$($keyProp.Name)"] = (To-ArbKey $section $keyProp.Name)
    }
}
$keyMapJson = ($keyMap | ConvertTo-Json -Depth 10 -Compress:$false)
[System.IO.File]::WriteAllText((Join-Path $outputDir 'key_map.json'), $keyMapJson + "`n", $utf8NoBom)

$l10nYaml = @'
# Flutter gen-l10n configuration for Ingatkan Teman
# Place this file at mobile/l10n.yaml (or copy to project root when creating Flutter app).
#
# pubspec.yaml requirements:
#   dependencies:
#     flutter:
#       sdk: flutter
#     flutter_localizations:
#       sdk: flutter
#     intl: any
#   flutter:
#     generate: true

arb-dir: l10n
template-arb-file: app_en.arb
output-localization-file: app_localizations.dart
nullable-getter: false
'@
[System.IO.File]::WriteAllText((Join-Path $root 'mobile\l10n.yaml'), $l10nYaml, $utf8NoBom)

Write-Host "Converted $($enFlat.Count) keys -> mobile/l10n/app_en.arb"
Write-Host "Converted $($enFlat.Count) keys -> mobile/l10n/app_ms.arb"
Write-Host "Key map -> mobile/l10n/key_map.json"
Write-Host "Config  -> mobile/l10n.yaml"
