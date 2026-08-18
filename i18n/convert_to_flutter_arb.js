/**
 * Converts i18n/translations.json to Flutter gen-l10n ARB format.
 *
 * Usage: node i18n/convert_to_flutter_arb.js
 *
 * Output:
 *   mobile/l10n/app_en.arb  (English template)
 *   mobile/l10n/app_ms.arb  (Bahasa Melayu — locale "ms")
 *   mobile/l10n/key_map.json (web dot-path → ARB key reference)
 *   mobile/l10n.yaml         (Flutter l10n configuration)
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const INPUT = path.join(ROOT, "i18n", "translations.json");
const OUTPUT_DIR = path.join(ROOT, "mobile", "l10n");

/** Web "bm" maps to ISO 639-1 Malay used by Flutter/Android. */
const LOCALE_MAP = {
  en: "en",
  bm: "ms",
};

/** Convert web dot-path segment to camelCase ARB key (e.g. home.pageTitle → homePageTitle). */
function toArbKey(section, key) {
  return section + key.charAt(0).toUpperCase() + key.slice(1);
}

/** Flatten nested locale object into ARB key/value pairs. */
function flattenLocale(localeData) {
  const flat = {};

  for (const [section, entries] of Object.entries(localeData)) {
    if (typeof entries !== "object" || entries === null) continue;

    for (const [key, value] of Object.entries(entries)) {
      flat[toArbKey(section, key)] = value;
    }
  }

  return flat;
}

/** Prepare string values for Flutter (no HTML; ICU placeholders preserved). */
function sanitizeForFlutter(text) {
  if (typeof text !== "string") return text;

  return text
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/?strong>/gi, "")
    .replace(/<\/?em>/gi, "");
}

/** Detect ICU-style placeholders like {name}. */
function extractPlaceholders(text) {
  const placeholders = {};
  const matches = text.matchAll(/\{(\w+)\}/g);

  for (const match of matches) {
    placeholders[match[1]] = { type: "String" };
  }

  return placeholders;
}

/** Build one ARB file object. */
function buildArb(flatStrings, locale, isTemplate) {
  const arb = {
    "@@locale": locale,
  };

  if (isTemplate) {
    arb["@@context"] =
      "Ingatkan Teman UI strings — generated from i18n/translations.json";
  }

  for (const [key, rawValue] of Object.entries(flatStrings)) {
    const value = sanitizeForFlutter(rawValue);
    arb[key] = value;

    if (isTemplate) {
      const meta = { description: `Web key equivalent in key_map.json` };
      const placeholders = extractPlaceholders(value);

      if (Object.keys(placeholders).length > 0) {
        meta.placeholders = placeholders;
      }

      arb[`@${key}`] = meta;
    }
  }

  return arb;
}

/** Build reverse lookup: web dot-path → ARB key. */
function buildKeyMap(localeData) {
  const map = {};

  for (const [section, entries] of Object.entries(localeData)) {
    if (typeof entries !== "object" || entries === null) continue;

    for (const key of Object.keys(entries)) {
      map[`${section}.${key}`] = toArbKey(section, key);
    }
  }

  return map;
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
}

function main() {
  const translations = JSON.parse(fs.readFileSync(INPUT, "utf8"));
  const { meta, en, bm } = translations;

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const enFlat = flattenLocale(en);
  const msFlat = flattenLocale(bm);

  writeJson(
    path.join(OUTPUT_DIR, "app_en.arb"),
    buildArb(enFlat, "en", true),
  );
  writeJson(path.join(OUTPUT_DIR, "app_ms.arb"), buildArb(msFlat, "ms", false));

  writeJson(path.join(OUTPUT_DIR, "key_map.json"), {
    meta: {
      source: "i18n/translations.json",
      webLocales: meta.languages,
      flutterLocales: meta.languages.map((lang) => LOCALE_MAP[lang] || lang),
      note: 'Web locale "bm" maps to Flutter/Android locale "ms" (Bahasa Melayu).',
    },
    keys: buildKeyMap(en),
  });

  const l10nYaml = `# Flutter gen-l10n configuration for Ingatkan Teman
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
`;

  fs.writeFileSync(path.join(ROOT, "mobile", "l10n.yaml"), l10nYaml, "utf8");

  const keyCount = Object.keys(enFlat).length;
  console.log(`Converted ${keyCount} keys → mobile/l10n/app_en.arb`);
  console.log(`Converted ${keyCount} keys → mobile/l10n/app_ms.arb`);
  console.log("Key map → mobile/l10n/key_map.json");
  console.log("Config  → mobile/l10n.yaml");
}

main();
