/* =========================================================
   DESIGN SYSTEM DOCS
   Documentation-only behaviour for the catalog in design-system/.
   Clicking a colour swatch copies its CSS variable and shows a short
   toast, as in the approved export. Never load on production pages.
   ========================================================= */
(function () {
  'use strict';

  const TOAST_DURATION = 1400;

  function initTokenCopy() {
    const toast = document.querySelector('[data-docs-toast]');
    if (!toast) {
      return;
    }

    let timer = null;

    const flash = (label) => {
      toast.textContent = `Copied ${label}`;
      clearTimeout(timer);
      timer = setTimeout(() => {
        toast.textContent = '';
      }, TOAST_DURATION);
    };

    document.addEventListener('click', (event) => {
      const button = event.target.closest('[data-copy-token]');
      if (!button) {
        return;
      }

      const value = button.dataset.copyToken;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(value).catch(() => {});
      }
      flash(button.dataset.copyLabel || value);
    });
  }

  document.addEventListener('DOMContentLoaded', initTokenCopy);
})();
