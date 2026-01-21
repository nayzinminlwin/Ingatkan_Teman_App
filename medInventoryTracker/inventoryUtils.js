/**
 * Medicine Inventory Tracker - Shared Utilities
 * Centralized functions used across all inventory pages
 */

// =====================
// CONSTANTS
// =====================
const LOW_STOCK_THRESHOLD = 10;
const EXPIRING_SOON_DAYS = 60;
const INVENTORY_STORAGE_KEY = "medInventory";
const INVENTORY_JSON_PATH = "../assets/dummyData/inventory.JSON";

// =====================
// DATA MANAGEMENT
// =====================

/**
 * Load inventory from localStorage or fetch from JSON file
 * @returns {Promise<Array>} Array of medicine objects
 */
async function loadInventory() {
  const stored = localStorage.getItem(INVENTORY_STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  try {
    const response = await fetch(INVENTORY_JSON_PATH);
    const data = await response.json();
    localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Failed to fetch inventory:", error);
    return [];
  }
}

/**
 * Save inventory to localStorage
 * @param {Array} inventory - Array of medicine objects
 */
function saveInventory(inventory) {
  localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(inventory));
}

// =====================
// DATE UTILITIES
// =====================

/**
 * Parse date from DD.MM.YYYY format to Date object
 * @param {string} dateStr - Date in DD.MM.YYYY format
 * @returns {Date}
 */
function parseDate(dateStr) {
  const [day, month, year] = dateStr.split(".");
  return new Date(year, month - 1, day);
}

/**
 * Format date from ISO (YYYY-MM-DD) to DD.MM.YYYY
 * @param {string} isoDate - Date in YYYY-MM-DD format
 * @returns {string} Date in DD.MM.YYYY format
 */
function formatDateToDisplay(isoDate) {
  const [year, month, day] = isoDate.split("-");
  return `${day}.${month}.${year}`;
}

/**
 * Get days until expiry
 * @param {string} expDate - Expiry date in DD.MM.YYYY format
 * @returns {number} Days until expiry (negative if expired)
 */
function getDaysUntilExpiry(expDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = parseDate(expDate);
  return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
}

// =====================
// STATUS CHECKS
// =====================

/**
 * Check if medicine is expiring soon
 * @param {string} expDate - Expiry date in DD.MM.YYYY format
 * @returns {boolean}
 */
function isExpiringSoon(expDate) {
  const daysLeft = getDaysUntilExpiry(expDate);
  return daysLeft <= EXPIRING_SOON_DAYS && daysLeft > 0;
}

/**
 * Check if medicine is expired
 * @param {string} expDate - Expiry date in DD.MM.YYYY format
 * @returns {boolean}
 */
function isExpired(expDate) {
  return getDaysUntilExpiry(expDate) <= 0;
}

/**
 * Check if stock is low
 * @param {number} qty - Current quantity
 * @returns {boolean}
 */
function isLowStock(qty) {
  return qty <= LOW_STOCK_THRESHOLD;
}

/**
 * Get status object for a medicine
 * @param {Object} med - Medicine object with Qty and ExpDate
 * @returns {Object} { text, class, icon }
 */
function getMedicineStatus(med) {
  const daysLeft = getDaysUntilExpiry(med.ExpDate);

  if (daysLeft <= 0) {
    return { text: "Expired", class: "expired", icon: "🔴" };
  } else if (daysLeft <= EXPIRING_SOON_DAYS) {
    return { text: "Expiring", class: "expiring", icon: "🟠" };
  } else if (med.Qty <= LOW_STOCK_THRESHOLD) {
    return { text: "Low", class: "low", icon: "🟡" };
  }
  return { text: "OK", class: "ok", icon: "🟢" };
}

// =====================
// FORMATTING
// =====================

/**
 * Format current date/time for report display
 * @returns {string} Formatted date string
 */
function formatReportDate() {
  const now = new Date();
  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return now.toLocaleDateString("en-MY", options);
}
