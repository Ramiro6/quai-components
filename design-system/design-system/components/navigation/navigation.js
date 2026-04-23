/**
 * Navigation — Design System v2
 *
 * Manages responsive navigation: hamburger toggle with aria-expanded
 * and aria-controls, open/close mobile menu panel, close on outside
 * click or Escape key.
 *
 * Usage:
 *   The toggle button must have class .nav__toggle and attributes:
 *     aria-expanded="false"
 *     aria-controls="<menu-id>"
 *
 *   The menu panel must have class .nav__menu and a matching id.
 *
 *   <nav class="nav" aria-label="Principal">
 *     <a class="nav__brand" href="/">Brand</a>
 *     <ul class="nav__links">...</ul>
 *     <button class="nav__toggle" aria-expanded="false" aria-controls="nav-menu" type="button">
 *       ☰
 *     </button>
 *     <ul class="nav__menu" id="nav-menu">...</ul>
 *   </nav>
 */
(function () {
  'use strict';

  /**
   * Initialize a single navigation toggle and its associated menu.
   * @param {HTMLButtonElement} toggle
   */
  function initNavToggle(toggle) {
    var menuId = toggle.getAttribute('aria-controls');
    if (!menuId) return;

    var menu = document.getElementById(menuId);
    if (!menu) return;

    /**
     * Open the mobile menu.
     */
    function openMenu() {
      menu.classList.add('nav__menu--open');
      toggle.setAttribute('aria-expanded', 'true');
    }

    /**
     * Close the mobile menu.
     */
    function closeMenu() {
      menu.classList.remove('nav__menu--open');
      toggle.setAttribute('aria-expanded', 'false');
    }

    /**
     * Toggle the mobile menu open/closed.
     */
    function toggleMenu() {
      var isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    // --- Toggle button click ---
    toggle.addEventListener('click', function () {
      toggleMenu();
    });

    // --- Keyboard: Enter/Space on toggle (button handles Enter natively,
    //     but we ensure Space also works via keydown) ---
    toggle.addEventListener('keydown', function (e) {
      if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault(); // Prevent page scroll
        toggleMenu();
      }
    });

    // --- Close on Escape key ---
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        toggle.focus();
      }
    });

    // --- Close when clicking outside the nav ---
    document.addEventListener('click', function (e) {
      if (toggle.getAttribute('aria-expanded') !== 'true') return;

      var nav = toggle.closest('.nav');
      if (nav && !nav.contains(e.target)) {
        closeMenu();
      }
    });
  }

  /**
   * Find and initialize all navigation toggles on the page.
   */
  function initAllNavs() {
    var toggles = document.querySelectorAll('.nav__toggle');
    for (var i = 0; i < toggles.length; i++) {
      initNavToggle(toggles[i]);
    }
  }

  // --- Initialize when DOM is ready ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllNavs);
  } else {
    initAllNavs();
  }
})();
