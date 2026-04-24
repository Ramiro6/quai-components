/**
 * Code Block — Design System v2
 *
 * Manages copy-to-clipboard functionality for code block components.
 * Uses Clipboard API with execCommand('copy') fallback.
 *
 * Usage:
 *   The code block must have class .codeblock containing:
 *   - A copy button with class .codeblock__copy
 *   - A code element with class .codeblock__code inside a .codeblock__pre
 *
 *   <div class="codeblock">
 *     <div class="codeblock__header">
 *       <span class="codeblock__lang">JavaScript</span>
 *       <button class="codeblock__copy" type="button" aria-label="Copy code">Copy</button>
 *     </div>
 *     <pre class="codeblock__pre"><code class="codeblock__code">...</code></pre>
 *   </div>
 */
(function () {
  'use strict';

  /**
   * Initialize a single code block copy button.
   * @param {HTMLButtonElement} copyBtn
   */
  function initCodeBlock(copyBtn) {
    var codeblock = copyBtn.closest('.codeblock');
    if (!codeblock) return;
    var codeEl = codeblock.querySelector('.codeblock__code');
    if (!codeEl) return;

    copyBtn.addEventListener('click', function () {
      var text = codeEl.textContent;

      function onSuccess() {
        copyBtn.textContent = 'Copied!';
        copyBtn.setAttribute('aria-label', 'Copied');
        setTimeout(function () {
          copyBtn.textContent = 'Copy';
          copyBtn.setAttribute('aria-label', 'Copy code');
        }, 2000);
      }

      // Primary: Clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(onSuccess).catch(function () {
          fallbackCopy(text, onSuccess);
        });
      } else {
        fallbackCopy(text, onSuccess);
      }
    });
  }

  /**
   * Fallback copy using execCommand('copy') with a temporary textarea.
   * @param {string} text - The text to copy
   * @param {Function} onSuccess - Callback on successful copy
   */
  function fallbackCopy(text, onSuccess) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      onSuccess();
    } catch (e) { /* silently fail */ }
    document.body.removeChild(textarea);
  }

  /**
   * Find and initialize all code block copy buttons on the page.
   */
  function initAllCodeBlocks() {
    var btns = document.querySelectorAll('.codeblock__copy');
    for (var i = 0; i < btns.length; i++) {
      initCodeBlock(btns[i]);
    }
  }

  // --- Initialize when DOM is ready ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllCodeBlocks);
  } else {
    initAllCodeBlocks();
  }
})();
