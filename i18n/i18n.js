/**
 * i18n.js - Internationalization Utility for Ingatkan Teman
 * Supports English (en) and Bahasa Melayu (bm)
 */

const I18n = (function () {
  // Configuration
  const STORAGE_KEY = "ingatkanTeman_language";
  const DEFAULT_LANG = "en";
  const TRANSLATIONS_PATH = getTranslationsPath();

  // State
  let currentLang = DEFAULT_LANG;
  let translations = null;
  let isLoaded = false;
  let initPromise = null;

  /**
   * Get the correct path to translations.json based on current page location
   */
  function getTranslationsPath() {
    const path = window.location.pathname;

    // Check folder depth
    if (
      path.includes("/main/") ||
      path.includes("/medReminder/") ||
      path.includes("/medInventoryTracker/") ||
      path.includes("/dailyHealthRecorder/") ||
      path.includes("/conversationalUI/")
    ) {
      return "../i18n/translations.json";
    }

    // Root level (index.html)
    return "i18n/translations.json";
  }

  /**
   * Load translations from JSON file
   */
  async function loadTranslations() {
    if (isLoaded && translations) {
      return translations;
    }

    try {
      const response = await fetch(TRANSLATIONS_PATH);
      if (!response.ok) {
        throw new Error(`Failed to load translations: ${response.status}`);
      }
      translations = await response.json();
      isLoaded = true;
      return translations;
    } catch (error) {
      console.error("i18n: Error loading translations", error);
      return null;
    }
  }

  /**
   * Get current language from localStorage
   */
  function getLanguage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored && (stored === "en" || stored === "bm")
      ? stored
      : DEFAULT_LANG;
  }

  /**
   * Set language and save to localStorage
   */
  function setLanguage(lang) {
    if (lang !== "en" && lang !== "bm") {
      console.warn(
        `i18n: Invalid language "${lang}", defaulting to "${DEFAULT_LANG}"`,
      );
      lang = DEFAULT_LANG;
    }
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    return lang;
  }

  /**
   * Toggle between English and Bahasa Melayu
   */
  function toggleLanguage() {
    const newLang = currentLang === "en" ? "bm" : "en";
    setLanguage(newLang);
    return newLang;
  }

  /**
   * Get a translation string by key path (e.g., "home.welcome")
   */
  function t(keyPath, fallback = null) {
    if (!translations || !translations[currentLang]) {
      return fallback || keyPath;
    }

    const keys = keyPath.split(".");
    let result = translations[currentLang];

    for (const key of keys) {
      if (result && typeof result === "object" && key in result) {
        result = result[key];
      } else {
        return fallback || keyPath;
      }
    }

    return result;
  }

  /**
   * Apply translations to all elements with data-i18n attribute
   */
  function applyTranslations() {
    // Handle data-i18n elements (text content)
    const elements = document.querySelectorAll("[data-i18n]");

    elements.forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const translation = t(key);

      if (translation && translation !== key) {
        // Default: set innerHTML (supports <br> tags)
        el.innerHTML = translation;
      }
    });

    // Handle data-i18n-placeholder elements (input placeholders)
    const placeholderElements = document.querySelectorAll(
      "[data-i18n-placeholder]",
    );

    placeholderElements.forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      const translation = t(key);

      if (translation && translation !== key) {
        el.placeholder = translation;
      }
    });

    // Update page title if specified
    const titleEl = document.querySelector("[data-i18n-title]");
    if (titleEl) {
      document.title = t(titleEl.getAttribute("data-i18n-title"));
    }

    // Update html lang attribute
    document.documentElement.lang = currentLang === "bm" ? "ms" : "en";
  }

  /**
   * Initialize i18n system
   * @param {Function} callback - Optional callback after initialization
   */
  async function init(callback) {
    // If already initializing, wait for that to complete
    if (initPromise) {
      await initPromise;
      if (typeof callback === "function") {
        callback(currentLang);
      }
      return currentLang;
    }

    // Create initialization promise
    initPromise = (async () => {
      currentLang = getLanguage();
      await loadTranslations();
      applyTranslations();
    })();

    await initPromise;

    if (typeof callback === "function") {
      callback(currentLang);
    }

    return currentLang;
  }

  /**
   * Switch language and re-apply all translations
   */
  async function switchLanguage() {
    const newLang = toggleLanguage();
    await loadTranslations();
    applyTranslations();

    // Dispatch custom event for components that need to react
    window.dispatchEvent(
      new CustomEvent("languageChanged", {
        detail: { language: newLang },
      }),
    );

    return newLang;
  }

  /**
   * Update language toggle button text
   */
  function updateLangButton(buttonEl) {
    if (buttonEl) {
      buttonEl.textContent = currentLang === "en" ? "BM" : "EN";
      buttonEl.setAttribute(
        "aria-label",
        currentLang === "en" ? "Tukar ke Bahasa Melayu" : "Switch to English",
      );
    }
  }

  // Public API
  return {
    init,
    t,
    getLanguage,
    setLanguage,
    switchLanguage,
    applyTranslations,
    updateLangButton,
    get currentLang() {
      return currentLang;
    },
  };
})();

// Auto-initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => I18n.init());
} else {
  I18n.init();
}
