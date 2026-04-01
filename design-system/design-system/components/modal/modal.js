/**
 * Modal — Design System v2
 * 
 * Manages <dialog> modals: open via showModal(), close on backdrop click
 * or close button, return focus to trigger element on close.
 * 
 * Usage:
 *   Add data-modal-trigger="<dialog-id>" to any trigger element.
 *   The dialog must have class .modal and a close button with class .modal__close.
 * 
 *   <button data-modal-trigger="my-dialog">Open</button>
 *   <dialog id="my-dialog" class="modal">
 *     <button class="modal__close" aria-label="Cerrar">&times;</button>
 *     ...
 *   </dialog>
 */
(function () {
  'use strict';

  /**
   * Initialize a single modal dialog.
   * @param {HTMLDialogElement} dialog
   */
  function initModal(dialog) {
    var triggerElement = null;

    // --- Backdrop click: close when clicking the dialog element itself ---
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) {
        dialog.close();
      }
    });

    // --- Close button(s) inside the dialog ---
    var closeBtns = dialog.querySelectorAll('.modal__close');
    for (var i = 0; i < closeBtns.length; i++) {
      closeBtns[i].addEventListener('click', function () {
        dialog.close();
      });
    }

    // --- Return focus to trigger on close ---
    dialog.addEventListener('close', function () {
      if (triggerElement && triggerElement.isConnected) {
        triggerElement.focus();
      } else {
        document.body.focus();
      }
      triggerElement = null;
    });

    // --- Expose a way to open with trigger tracking ---
    dialog._openModal = function (trigger) {
      triggerElement = trigger || null;
      dialog.showModal();
    };
  }

  /**
   * Bind trigger elements (data-modal-trigger) to their dialogs.
   */
  function bindTriggers() {
    var triggers = document.querySelectorAll('[data-modal-trigger]');
    for (var i = 0; i < triggers.length; i++) {
      (function (trigger) {
        var dialogId = trigger.getAttribute('data-modal-trigger');
        var dialog = document.getElementById(dialogId);
        if (!dialog) return;

        // Initialize dialog if not already done
        if (!dialog._openModal) {
          initModal(dialog);
        }

        trigger.addEventListener('click', function () {
          dialog._openModal(trigger);
        });
      })(triggers[i]);
    }
  }

  // --- Initialize when DOM is ready ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindTriggers);
  } else {
    bindTriggers();
  }
})();
