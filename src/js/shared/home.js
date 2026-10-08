/* =========================================================
   HOME PAGE
   Deferred metric and process graphics, the dotted dome on the red metric
   card, the catalog tabs with their product slider, and the processes slider.
   Shared behaviour (header, dropdowns, scroll reveal, card links) lives in
   main.js.
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Deferred graphics ----------
     Blocks marked [data-anim-defer] hold their charts, bars and illustrations
     paused (see pages/home.scss) and replay them, counters included, each
     time a quarter of the block comes into view. */

  const COUNT_DURATION = 1800;

  function countUp(node) {
    const target = parseFloat(node.dataset.countTo) || 0;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / COUNT_DURATION);
      const eased = 1 - Math.pow(1 - progress, 3);
      node.textContent = Math.round(target * eased);
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }

  function replay(block) {
    block.classList.remove('is-playing', 'is-replayed');
    block.classList.add('is-resetting');
    /* flush the reset so the animations restart from their first frame */
    void block.offsetWidth;
    block.classList.remove('is-resetting');
    block.classList.add('is-playing', 'is-replayed');
    block.querySelectorAll('[data-count-to]').forEach(countUp);
  }

  function initDeferredGraphics() {
    const blocks = [...document.querySelectorAll('[data-anim-defer]')];
    if (!blocks.length) {
      return;
    }

    if (!('IntersectionObserver' in window)) {
      blocks.forEach((block) => block.classList.add('is-playing'));
      return;
    }

    blocks.forEach((block) => {
      let inside = false;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const visible = entry.isIntersecting && entry.intersectionRatio >= 0.25;
            if (visible && !inside) {
              inside = true;
              replay(block);
            } else if (!entry.isIntersecting || entry.intersectionRatio < 0.08) {
              inside = false;
            }
          });
        },
        { threshold: [0, 0.08, 0.25, 0.5] }
      );

      observer.observe(block);
    });
  }

  /* ---------- Dome ----------
     A slowly turning dotted sphere, tilted towards the viewer, drawn into
     the red card's canvas at ~24fps while it is on screen. */

  function drawDome(canvas, ctx, time, reduceMotion) {
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    if (!w || !h) {
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const radius = w * 0.6;
    const cy = h * 1.3;
    const tilt = 0.36;
    const cosT = Math.cos(tilt);
    const sinT = Math.sin(tilt);
    const spin = (time || 0) * 0.00016;
    let k = 0;

    for (let li = 0; li <= 24; li++) {
      const phi = ((-80 + (li / 24) * 160) * Math.PI) / 180;
      const cosP = Math.cos(phi);
      const sinP = Math.sin(phi);
      const segments = Math.max(6, Math.round(10 + 58 * cosP));

      for (let bi = 0; bi < segments; bi++) {
        k++;
        const lambda = (bi / segments) * Math.PI * 2 + spin;
        const x = cosP * Math.sin(lambda);
        const y = sinP;
        const z = cosP * Math.cos(lambda);
        const y2 = y * cosT - z * sinT;
        const z2 = y * sinT + z * cosT;
        if (z2 < 0.03) {
          continue;
        }

        const X = cx + x * radius;
        const Y = cy - y2 * radius;
        if (Y > h + 2 || Y < -2) {
          continue;
        }

        const top = (y2 + 1) / 2;
        let alpha = Math.pow(top, 1.9) * 0.68 * Math.min(1, z2 * 2.2);
        const highlight = (k * 37) % 7 === 0;
        let r = 1.15;

        if (highlight) {
          const twinkle = reduceMotion ? 1 : 0.6 + 0.4 * Math.sin((time || 0) * 0.0025 + k);
          alpha = Math.min(1, alpha * 1.9 * twinkle + 0.06 * twinkle);
          r = 1.45;
        } else {
          alpha *= 0.72;
        }

        if (alpha <= 0.012) {
          continue;
        }
        ctx.beginPath();
        ctx.arc(X, Y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
        ctx.fill();
      }
    }
  }

  function initDome() {
    const canvas = document.querySelector('[data-dome]');
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    const reduceMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const draw = (time) => drawDome(canvas, ctx, time, reduceMotion);

    if (reduceMotion) {
      draw(0);
    } else {
      let visible = true;
      let last = 0;

      const loop = (time) => {
        if (visible && document.visibilityState !== 'hidden' && time - last >= 41) {
          last = time;
          draw(time);
        }
        requestAnimationFrame(loop);
      };

      requestAnimationFrame(loop);

      if ('IntersectionObserver' in window) {
        new IntersectionObserver(
          (entries) => {
            visible = entries[0].isIntersecting;
          },
          { rootMargin: '120px' }
        ).observe(canvas);
      }
    }

    if (window.ResizeObserver) {
      new ResizeObserver(() => draw(performance.now())).observe(canvas);
    }
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => draw(performance.now()));
    }
  }

  /* ---------- Catalog ----------
     Tabs switch the category rendered into the slider from the page's
     #catalog-data; cards link through [data-href] (initCardNavigation). */

  function initCatalog() {
    const slider = document.querySelector('[data-slider]');
    const tabList = document.querySelector('[data-tabs]');
    const dataNode = document.getElementById('catalog-data');
    const template = document.getElementById('product-card-template');
    if (!slider || !tabList || !dataNode || !template) {
      return;
    }

    const track = slider.querySelector('[data-slider-track]');
    const prev = slider.querySelector('[data-slider-prev]');
    const next = slider.querySelector('[data-slider-next]');
    const tabs = [...tabList.querySelectorAll('[data-category]')];
    const catalog = JSON.parse(dataNode.textContent);

    const updateArrows = () => {
      const canScroll = track.scrollWidth > track.clientWidth + 4;
      prev.hidden = !canScroll;
      next.hidden = !canScroll;
    };

    const buildCard = (product, href, titleId) => {
      const card = template.content.firstElementChild.cloneNode(true);
      const image = card.querySelector('[data-field="image"]');
      const title = card.querySelector('[data-field="title"]');
      const link = card.querySelector('[data-field="link"]');
      const request = card.querySelector('[data-field="request"]');

      card.dataset.href = href;
      image.src = product.image;
      image.alt = product.name;
      title.id = titleId;
      title.href = href;
      title.textContent = product.name;
      link.href = href;
      link.setAttribute('aria-describedby', titleId);
      request.setAttribute('aria-describedby', titleId);
      request.dataset.name = product.name;
      card.querySelector('[data-field="spec"]').textContent = product.spec;

      return card;
    };

    const render = (category) => {
      const group = catalog[category];
      if (!group) {
        return;
      }

      const fragment = document.createDocumentFragment();
      group.items.forEach((product, index) => {
        fragment.appendChild(buildCard(product, group.href, `product-${category}-${index}`));
      });

      track.replaceChildren(fragment);
      setTimeout(updateArrows, 50);
    };

    /* roving tabindex: only the selected tab sits in the tab order */
    const select = (tab) => {
      tabs.forEach((item) => {
        const isSelected = item === tab;
        item.setAttribute('aria-selected', String(isSelected));
        item.tabIndex = isSelected ? 0 : -1;
      });
      track.setAttribute('aria-labelledby', tab.id);
      track.scrollLeft = 0;
      render(tab.dataset.category);
    };

    tabList.addEventListener('click', (event) => {
      const tab = event.target.closest('[data-category]');
      if (tab) {
        select(tab);
      }
    });

    tabList.addEventListener('keydown', (event) => {
      const index = tabs.indexOf(event.target);
      const targets = {
        ArrowLeft: index - 1,
        ArrowRight: index + 1,
        Home: 0,
        End: tabs.length - 1,
      };
      if (index === -1 || !(event.key in targets)) {
        return;
      }

      event.preventDefault();
      const tab = tabs[(targets[event.key] + tabs.length) % tabs.length];
      tab.focus();
      select(tab);
    });

    const scrollByStep = (direction) => {
      track.scrollLeft += direction * (track.clientWidth * 0.8 || 308);
    };

    prev.addEventListener('click', () => scrollByStep(-1));
    next.addEventListener('click', () => scrollByStep(1));
    window.addEventListener('resize', updateArrows);

    const initial = tabs.find((tab) => tab.getAttribute('aria-selected') === 'true') || tabs[0];
    render(initial.dataset.category);
    setTimeout(updateArrows, 300);
  }

  /* ---------- Processes ---------- */

  function initProcesses() {
    const track = document.querySelector('[data-processes-track]');
    const prev = document.querySelector('[data-processes-prev]');
    const next = document.querySelector('[data-processes-next]');
    if (!track || !prev || !next) {
      return;
    }

    const scrollByPage = (direction) => {
      track.scrollLeft += direction * (track.clientWidth || 900);
    };

    prev.addEventListener('click', () => scrollByPage(-1));
    next.addEventListener('click', () => scrollByPage(1));
  }

  initDeferredGraphics();
  initDome();
  initCatalog();
  initProcesses();
})();
