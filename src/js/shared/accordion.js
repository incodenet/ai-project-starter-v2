/* =========================================================
   ACCORDION
   One row open at a time inside a [data-accordion] group. The body is sized
   from its own content, so an answer of any length opens fully; the open row's
   divider and the one above it stand down, so its plaque floats free.
   ========================================================= */
(function () {
  'use strict';

  function paint(group, sizeOnly) {
    const items = [...group.querySelectorAll('.accordion-item')];

    items.forEach((item, index) => {
      const open = item.dataset.open === 'true';
      const answer = item.querySelector('.accordion-answer');
      const inner = item.querySelector('.accordion-answer-inner');

      if (answer) {
        const height = inner ? inner.scrollHeight : answer.scrollHeight;
        answer.style.maxHeight = open ? `${height + 2}px` : '0px';
        answer.style.opacity = open ? '1' : '0';
      }

      if (sizeOnly) {
        return;
      }

      const question = item.querySelector('.accordion-question');
      if (question) {
        question.setAttribute('aria-expanded', open ? 'true' : 'false');
      }
      /* a closed body is still in the accessibility tree: max-height alone does
         not take it out, so the state is mirrored for assistive technology */
      if (answer) {
        answer.setAttribute('aria-hidden', open ? 'false' : 'true');
      }

      const previous = items[index - 1];
      if (previous) {
        previous.dataset.ruleOff = open ? 'true' : 'false';
      }
    });
  }

  function initAccordions() {
    const groups = [...document.querySelectorAll('[data-accordion]')];
    if (!groups.length) {
      return;
    }

    groups.forEach((group) => {
      group.addEventListener('click', (event) => {
        const question = event.target.closest('.accordion-question');
        if (!question || !group.contains(question)) {
          return;
        }

        const item = question.closest('.accordion-item');
        const open = item.dataset.open === 'true';

        group.querySelectorAll('.accordion-item').forEach((other) => {
          other.dataset.open = 'false';
        });
        item.dataset.open = open ? 'false' : 'true';
        paint(group);
      });

      paint(group);

      if ('ResizeObserver' in window) {
        new ResizeObserver(() => paint(group, true)).observe(group);
      }
    });

    /* a late font or image reflow must not leave an open body clipped */
    const resize = () => groups.forEach((group) => paint(group, true));
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('load', resize);
  }

  document.addEventListener('DOMContentLoaded', initAccordions);
})();
