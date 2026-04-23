/**
 * Toggle (Switch) — Design System v2
 *
 * Manages toggle switches: click to alternate state, update
 * aria-checked attribute and .toggle--checked class.
 *
 * Usage:
 *   <button class="toggle" role="switch" aria-checked="false" type="button">
 *     <span class="toggle__track">
 *       <span class="toggle__thumb"></span>
 *     </span>
 *   </button>
 */
(function () {
  'use strict';

  /**
   * Initialize a single toggle button.
   * @param {HTMLButtonElement} toggle
   */
  function initToggle(toggle) {
    toggle.addEventListener('click', function () {
      var isChecked = toggle.getAttribute('aria-checked') === 'true';

      if (isChecked) {
        toggle.setAttribute('aria-checked', 'false');
        toggle.classList.remove('toggle--checked');
      } else {
        toggle.setAttribute('aria-checked', 'true');
        toggle.classList.add('toggle--checked');
      }
    });
  }

  /**
   * Find and initialize all toggle buttons on the page.
   */
  function initAllToggles() {
    var toggles = document.querySelectorAll('.toggle[role="switch"]');
    for (var i = 0; i < toggles.length; i++) {
      initToggle(toggles[i]);
    }
  }

  // --- Initialize when DOM is ready ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllToggles);
  } else {
    initAllToggles();
  }
})();
