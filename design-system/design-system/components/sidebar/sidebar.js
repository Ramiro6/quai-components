/**
 * Sidebar — Design System v2
 *
 * Manages responsive sidebar: toggle open/close with aria-expanded,
 * overlay click to close, Escape key to close and return focus,
 * focus trap in mobile overlay mode, and body scroll lock.
 *
 * Usage:
 *   The toggle button must have class .sidebar__toggle and attributes:
 *     aria-expanded="false"
 *     aria-controls="<sidebar-id>"
 *
 *   The sidebar must have class .sidebar and a matching id.
 *   The overlay must have class .sidebar__overlay (sibling of sidebar
 *   or anywhere in the document).
 *
 *   <aside class="sidebar" id="app-sidebar" role="complementary" aria-label="Navegación principal">
 *     ...
 *   </aside>
 *   <div class="sidebar__overlay" aria-hidden="true"></div>
 *   <button class="sidebar__toggle" aria-expanded="false" aria-controls="app-sidebar" type="button">
 *     ☰
 *   </button>
 */
(function () {
  'use strict';

  /**
   * Selector for focusable elements inside the sidebar.
   */
  var FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

  /**
   * Initialize a single sidebar toggle and its associated sidebar/overlay.
   * @param {HTMLButtonElement} toggle
   */
  function initSidebar(toggle) {
    var sidebarId = toggle.getAttribute('aria-controls');
    if (!sidebarId) {
      return;
    }

    var sidebar = document.getElementById(sidebarId);
    if (!sidebar) {
      console.warn(
        'Sidebar: element with id "' + sidebarId + '" referenced by aria-controls not found. Skipping initialization.'
      );
      return;
    }

    // Find overlay — try sibling first, then fall back to document query
    var overlay = sidebar.parentNode
      ? sidebar.parentNode.querySelector('.sidebar__overlay')
      : null;
    if (!overlay) {
      overlay = document.querySelector('.sidebar__overlay');
    }

    /**
     * Check if the sidebar is currently open.
     * @returns {boolean}
     */
    function isOpen() {
      return toggle.getAttribute('aria-expanded') === 'true';
    }

    /**
     * Open the sidebar.
     */
    function openSidebar() {
      sidebar.classList.add('sidebar--open');
      toggle.setAttribute('aria-expanded', 'true');
      if (overlay) {
        overlay.classList.add('sidebar__overlay--visible');
      }
      document.body.classList.add('sidebar-body-lock');
    }

    /**
     * Close the sidebar and optionally return focus to the toggle.
     * @param {boolean} [returnFocus=false]
     */
    function closeSidebar(returnFocus) {
      sidebar.classList.remove('sidebar--open');
      toggle.setAttribute('aria-expanded', 'false');
      if (overlay) {
        overlay.classList.remove('sidebar__overlay--visible');
      }
      document.body.classList.remove('sidebar-body-lock');
      if (returnFocus) {
        toggle.focus();
      }
    }

    /**
     * Toggle the sidebar open/closed.
     */
    function toggleSidebar() {
      if (isOpen()) {
        closeSidebar();
      } else {
        openSidebar();
      }
    }

    /**
     * Get all focusable elements inside the sidebar.
     * @returns {HTMLElement[]}
     */
    function getFocusableElements() {
      var elements = sidebar.querySelectorAll(FOCUSABLE_SELECTOR);
      var result = [];
      for (var i = 0; i < elements.length; i++) {
        result.push(elements[i]);
      }
      return result;
    }

    /**
     * Handle focus trap: cycle Tab/Shift+Tab within the sidebar.
     * @param {KeyboardEvent} e
     */
    function handleFocusTrap(e) {
      if (e.key !== 'Tab') {
        return;
      }

      var focusable = getFocusableElements();
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }

      var firstElement = focusable[0];
      var lastElement = focusable[focusable.length - 1];

      if (e.shiftKey) {
        // Shift+Tab: if focus is on first element, wrap to last
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: if focus is on last element, wrap to first
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }

    // --- Toggle button click ---
    toggle.addEventListener('click', function () {
      toggleSidebar();
    });

    // --- Overlay click: close sidebar ---
    if (overlay) {
      overlay.addEventListener('click', function () {
        if (isOpen()) {
          closeSidebar(true);
        }
      });
    }

    // --- Keyboard: Escape to close, focus trap when open ---
    document.addEventListener('keydown', function (e) {
      if (!isOpen()) {
        return;
      }

      if (e.key === 'Escape') {
        closeSidebar(true);
        return;
      }

      // Focus trap
      handleFocusTrap(e);
    });
  }

  /**
   * Find and initialize all sidebar toggles on the page.
   */
  function initAllSidebars() {
    var toggles = document.querySelectorAll('.sidebar__toggle');
    for (var i = 0; i < toggles.length; i++) {
      initSidebar(toggles[i]);
    }
  }

  // --- Initialize when DOM is ready ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllSidebars);
  } else {
    initAllSidebars();
  }
})();
