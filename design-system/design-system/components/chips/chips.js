/**
 * Chips — Design System v2
 *
 * Manages dismissible chips: clicking the close button (.chip__close)
 * dispatches a CustomEvent("chip-dismiss") on the parent chip element
 * with detail: { id } where id comes from the chip's id attribute or
 * data-chip-id attribute.
 *
 * Usage:
 *   <span class="chip chip--dismissible" id="chip-1">
 *     Label
 *     <button class="chip__close" aria-label="Eliminar">&times;</button>
 *   </span>
 *
 *   Or with data-chip-id:
 *   <span class="chip chip--dismissible" data-chip-id="tag-42">
 *     Label
 *     <button class="chip__close" aria-label="Eliminar">&times;</button>
 *   </span>
 */
(function () {
  'use strict';

  /**
   * Get the chip identifier from its id attribute or data-chip-id.
   * @param {HTMLElement} chip
   * @returns {string|null}
   */
  function getChipId(chip) {
    return chip.getAttribute('data-chip-id') || chip.id || null;
  }

  /**
   * Initialize a single close button inside a chip.
   * @param {HTMLButtonElement} closeBtn
   */
  function initCloseButton(closeBtn) {
    var chip = closeBtn.closest('.chip');
    if (!chip) return;

    closeBtn.addEventListener('click', function () {
      var id = getChipId(chip);

      chip.dispatchEvent(new CustomEvent('chip-dismiss', {
        bubbles: true,
        detail: { id: id }
      }));
    });
  }

  /**
   * Find and initialize all chip close buttons on the page.
   */
  function initAllChips() {
    var closeBtns = document.querySelectorAll('.chip__close');
    for (var i = 0; i < closeBtns.length; i++) {
      initCloseButton(closeBtns[i]);
    }
  }

  // --- Initialize when DOM is ready ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllChips);
  } else {
    initAllChips();
  }
})();
