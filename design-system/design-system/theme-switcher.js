/**
 * Theme Switcher — Design System v2
 * 
 * Reads localStorage('theme-preference') before first render to prevent
 * theme flash. Toggles .theme-dark class on <html>.
 * 
 * Include inline in <head> without defer:
 *   <script src="design-system/theme-switcher.js"></script>
 * 
 * Usage:
 *   ThemeSwitcher.toggle()       — toggle between light/dark
 *   ThemeSwitcher.set('dark')    — set specific theme ('light' | 'dark' | 'system')
 *   ThemeSwitcher.current()      — get current resolved theme ('light' | 'dark')
 *   ThemeSwitcher.preference()   — get stored preference ('light' | 'dark' | 'system')
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'theme-preference';
  var VALID_VALUES = ['light', 'dark', 'system'];
  var root = document.documentElement;

  // --- Helpers ---

  function storageAvailable() {
    try {
      var test = '__theme_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  function readPreference() {
    if (!storageAvailable()) return null;
    try {
      var value = localStorage.getItem(STORAGE_KEY);
      if (value !== null && VALID_VALUES.indexOf(value) === -1) {
        // Corrupt value — remove it
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return value;
    } catch (e) {
      return null;
    }
  }

  function writePreference(value) {
    if (!storageAvailable()) return;
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      // Silently fail — storage full or unavailable
    }
  }

  function getSystemPreference() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  function resolveTheme(preference) {
    if (preference === 'dark') return 'dark';
    if (preference === 'light') return 'light';
    // 'system' or null — use OS preference
    return getSystemPreference();
  }

  function applyTheme(resolved) {
    if (resolved === 'dark') {
      root.classList.add('theme-dark');
    } else {
      root.classList.remove('theme-dark');
    }
  }

  // --- Initialize on load (runs immediately, no defer) ---

  var storedPreference = readPreference();
  var currentResolved = resolveTheme(storedPreference);
  applyTheme(currentResolved);

  // Listen for OS theme changes when preference is 'system' or unset
  if (window.matchMedia) {
    try {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
        var pref = readPreference();
        if (!pref || pref === 'system') {
          currentResolved = resolveTheme(pref);
          applyTheme(currentResolved);
        }
      });
    } catch (e) {
      // Older browsers may not support addEventListener on MediaQueryList
    }
  }

  // --- Public API ---

  window.ThemeSwitcher = {
    /** Toggle between light and dark */
    toggle: function () {
      var next = currentResolved === 'dark' ? 'light' : 'dark';
      currentResolved = next;
      writePreference(next);
      applyTheme(next);
      return next;
    },

    /** Set theme explicitly: 'light', 'dark', or 'system' */
    set: function (value) {
      if (VALID_VALUES.indexOf(value) === -1) return;
      writePreference(value);
      currentResolved = resolveTheme(value);
      applyTheme(currentResolved);
      return currentResolved;
    },

    /** Get current resolved theme ('light' or 'dark') */
    current: function () {
      return currentResolved;
    },

    /** Get stored preference ('light', 'dark', 'system', or null) */
    preference: function () {
      return readPreference();
    }
  };
})();
