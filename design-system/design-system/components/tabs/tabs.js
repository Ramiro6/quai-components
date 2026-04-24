/**
 * Tabs — Design System v2
 *
 * Manages tabbed navigation: click to activate tabs, keyboard navigation
 * with ArrowRight/ArrowLeft (roving tabindex), Enter/Space to activate.
 * Uses manual activation mode — arrows move focus only, Enter/Space activates.
 *
 * Usage:
 *   Wrap tabs and panels in a container with class .tabs.
 *   The tab list must have role="tablist" and each tab button role="tab"
 *   with aria-selected, aria-controls, and tabindex attributes.
 *   Each panel must have role="tabpanel", aria-labelledby, and tabindex="0".
 *
 *   <div class="tabs">
 *     <div class="tabs__list" role="tablist" aria-label="Sections">
 *       <button class="tabs__tab tabs__tab--active" role="tab"
 *               id="tab-1" aria-selected="true" aria-controls="panel-1"
 *               tabindex="0">Tab 1</button>
 *       <button class="tabs__tab" role="tab"
 *               id="tab-2" aria-selected="false" aria-controls="panel-2"
 *               tabindex="-1">Tab 2</button>
 *     </div>
 *     <div class="tabs__panel" role="tabpanel" id="panel-1"
 *          aria-labelledby="tab-1" tabindex="0">
 *       <p>Panel 1 content</p>
 *     </div>
 *     <div class="tabs__panel" role="tabpanel" id="panel-2"
 *          aria-labelledby="tab-2" tabindex="0" hidden>
 *       <p>Panel 2 content</p>
 *     </div>
 *   </div>
 */
(function () {
  'use strict';

  /**
   * Initialize a single tabs container.
   * @param {HTMLElement} container - The .tabs root element
   */
  function initTabs(container) {
    var tablist = container.querySelector('[role="tablist"]');
    if (!tablist) return;
    var tabs = tablist.querySelectorAll('[role="tab"]');
    if (tabs.length === 0) return;

    /**
     * Activate a specific tab: deactivate all others, then activate the target.
     * @param {HTMLElement} tab - The tab button to activate
     */
    function activateTab(tab) {
      // Deactivate all
      for (var i = 0; i < tabs.length; i++) {
        tabs[i].setAttribute('aria-selected', 'false');
        tabs[i].setAttribute('tabindex', '-1');
        tabs[i].classList.remove('tabs__tab--active');
        var panelId = tabs[i].getAttribute('aria-controls');
        var panel = document.getElementById(panelId);
        if (panel) panel.hidden = true;
      }
      // Activate target
      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('tabindex', '0');
      tab.classList.add('tabs__tab--active');
      var targetPanel = document.getElementById(tab.getAttribute('aria-controls'));
      if (targetPanel) targetPanel.hidden = false;
      tab.focus();
    }

    // Click handler
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].addEventListener('click', function () {
        activateTab(this);
      });
    }

    // Keyboard navigation (roving tabindex, manual activation)
    tablist.addEventListener('keydown', function (e) {
      var currentIndex = -1;
      for (var i = 0; i < tabs.length; i++) {
        if (tabs[i] === document.activeElement) { currentIndex = i; break; }
      }
      if (currentIndex === -1) return;

      var newIndex;
      if (e.key === 'ArrowRight') {
        newIndex = (currentIndex + 1) % tabs.length;
        e.preventDefault();
      } else if (e.key === 'ArrowLeft') {
        newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        e.preventDefault();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateTab(tabs[currentIndex]);
        return;
      } else {
        return;
      }

      // Move focus without activating (manual activation mode)
      tabs[currentIndex].setAttribute('tabindex', '-1');
      tabs[newIndex].setAttribute('tabindex', '0');
      tabs[newIndex].focus();
    });
  }

  /**
   * Find and initialize all tabs containers on the page.
   */
  function initAllTabs() {
    var containers = document.querySelectorAll('.tabs');
    for (var i = 0; i < containers.length; i++) {
      initTabs(containers[i]);
    }
  }

  // --- Initialize when DOM is ready ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllTabs);
  } else {
    initAllTabs();
  }
})();
