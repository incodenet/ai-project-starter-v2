/* Styles that hide content until a script reveals it are scoped to .js, so
   the page stays readable when scripts never run. */
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  initSiteHeader();
  initStickyHeader();
  initNavDropdowns();
  initMobileMenu();
  // initCustomCursor();
  initAmbientDots();
  initLoopParking();
  initCardNavigation();
  initScrollReveal();
  initReadingTime();
});

window.addEventListener('load', () => {});

window.addEventListener('resize', () => {});

function initSiteHeader() {
  const header = document.getElementById('site-header');
  const progress = document.getElementById('scroll-progress');
  if (!header || !progress) {
    return;
  }

  const inkSections = [...document.querySelectorAll('[data-header-ink]')];

  const update = () => {
    const scrolled = window.scrollY || 0;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${Math.min(100, (scrolled / Math.max(1, scrollable)) * 100)}%`;
    header.classList.toggle('is-scrolled', scrolled > 40);

    const line = header.offsetHeight / 2;
    let ink = 'light';
    inkSections.forEach((section) => {
      if (section.getBoundingClientRect().top <= line) {
        ink = section.dataset.headerInk;
      }
    });
    header.dataset.ink = ink;
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) {
      return;
    }
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      update();
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
}

/* The header of the ARIDES layout. The hero band is pulled up beneath it by
   --header-h, so that property follows the rendered height; once the band has
   scrolled out from under the bar, .is-scrolled deepens its shadow. */
function initStickyHeader() {
  const header = document.querySelector('[data-header]');
  const band = document.querySelector('[data-hero-band]');
  if (!header || !band) {
    return;
  }

  let headerHeight = 0;
  let isScrolled = null;

  const sync = () => {
    const height = header.getBoundingClientRect().height;
    if (height !== headerHeight) {
      headerHeight = height;
      document.documentElement.style.setProperty('--header-h', `${height}px`);
    }

    const scrolled = band.getBoundingClientRect().bottom - headerHeight <= 0;
    if (scrolled !== isScrolled) {
      isScrolled = scrolled;
      header.classList.toggle('is-scrolled', scrolled);
    }
  };

  window.addEventListener('scroll', sync, { passive: true });
  window.addEventListener('resize', sync);
  sync();
}

/* The menu itself may open from CSS (:hover / :focus-within); this keeps the
   .is-open state and the trigger's aria-expanded in step with it, and lets
   Escape dismiss a menu opened from the keyboard. */
function initNavDropdowns() {
  document.querySelectorAll('[data-nav-menu]').forEach((item) => {
    const trigger = item.querySelector('[aria-expanded]');
    let closeTimer;

    const setOpen = (isOpen) => {
      item.classList.toggle('is-open', isOpen);
      if (trigger) {
        trigger.setAttribute('aria-expanded', String(isOpen));
      }
    };

    const open = () => {
      clearTimeout(closeTimer);
      setOpen(true);
    };

    const close = () => {
      closeTimer = setTimeout(() => setOpen(false), 120);
    };

    item.addEventListener('mouseenter', open);
    item.addEventListener('mouseleave', close);
    item.addEventListener('focusin', open);
    item.addEventListener('focusout', close);
    item.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') {
        return;
      }
      clearTimeout(closeTimer);
      setOpen(false);
      if (trigger) {
        trigger.blur();
      }
    });
  });
}

function initMobileMenu() {
  const header = document.getElementById('site-header');
  const burger = document.getElementById('nav-burger');
  const menu = document.getElementById('mobile-menu');
  if (!burger || !menu) {
    return;
  }

  let prevInk;

  const setOpen = (open) => {
    if (open) {
      prevInk = header.dataset.ink;
    }

    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    menu.classList.toggle('is-open', open);

    header.dataset.ink = open ? 'light' : prevInk;

    document.body.style.overflow = open ? 'hidden' : '';
  };

  burger.addEventListener('click', () => setOpen(burger.getAttribute('aria-expanded') !== 'true'));

  menu
    .querySelectorAll('a')
    .forEach((link) => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      setOpen(false);
    }
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1080 && menu.classList.contains('is-open')) {
      setOpen(false);
    }
  });

  /* accordion groups: one open at a time, each panel tweened to its measured height */
  const groups = [...menu.querySelectorAll('[data-menu-group]')];
  const setGroup = (group, open) => {
    group.classList.toggle('is-open', open);
    group
      .querySelector('.mobile-menu-trigger')
      .setAttribute('aria-expanded', open ? 'true' : 'false');
    group.querySelector('.mobile-menu-panel').style.height = open
      ? `${group.querySelector('.mobile-menu-list').offsetHeight}px`
      : '0px';
  };

  groups.forEach((group) => {
    group.querySelector('.mobile-menu-trigger').addEventListener('click', () => {
      const open = !group.classList.contains('is-open');
      groups.forEach((other) => setGroup(other, other === group && open));
    });
  });

  window.addEventListener(
    'resize',
    () =>
      groups
        .filter((group) => group.classList.contains('is-open'))
        .forEach((group) => setGroup(group, true)),
    { passive: true }
  );
}

function initCustomCursor() {
  const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
  );

  if (isLocalhost) return;

  const ENABLED = true;
  if (!ENABLED || window.matchMedia('(hover: none)').matches) {
    return;
  }

  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  cursor.setAttribute('aria-hidden', 'true');
  document.body.appendChild(cursor);
  document.body.classList.add('has-cursor');

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let x = targetX;
  let y = targetY;

  window.addEventListener('mousemove', (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
  });

  const follow = () => {
    x += (targetX - x) * 0.18;
    y += (targetY - y) * 0.18;
    cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    requestAnimationFrame(follow);
  };
  follow();

  const HOT =
    'a, button, .news-card, .post-card, .lead-story, .wire-row, .featured, ' +
    '.event-card, .event-row, .case-card';
  document.addEventListener('mouseover', (event) => {
    if (event.target.closest(HOT)) {
      cursor.style.width = '52px';
      cursor.style.height = '52px';
    }
  });
  document.addEventListener('mouseout', (event) => {
    if (event.target.closest(HOT)) {
      cursor.style.width = '16px';
      cursor.style.height = '16px';
    }
  });
}

/* Every never-ending decoration on the site, and the smallest STABLE block
   that wraps each one. Small, so parking a host invalidates little; stable,
   so the observer is never handed a node the page re-sorts every frame — the
   sphere's marks and comet trails are parked by their stage for that reason.
   Containers rather than the animated nodes themselves, so a field whose spans
   a page script appends later is already parked when they arrive. */
const LOOP_HOSTS = [
  '[data-dots]' /* ambient dot grids */,
  '[data-dotfield]' /* services dot field, animated inline by its own script */,
  '[data-dotpatch]' /* services dot patches, likewise */,
  '[data-ribbons]' /* both logo ribbon lanes */,
  '[data-sphere-stage]' /* partners sphere: drifting marks and comet trails */,
  '.btn-primary' /* the shine ring on ::before */,
  '.svc-btn-primary',
  '.caption-drip' /* the drip on ::before */,
  '.accent-line' /* the flow on ::after */,
  '.accent-line-fill',
  '.accent-line-fill-light',
  '.accent-line-fill-bright',
  '.ticker-rule',
  '.value-card-rings',
  '.crm-corner-rings',
  '.case-feature-rings',
  '.metric-card-rings',
  '.sequence-check',
  '.scroll-hint-wheel',
].join(', ');

/* None of those loops is worth a frame while it sits off-screen, and a few are
   dear: the button shine sweeps a conic gradient from an animated custom
   property, so its ring repaints every frame with no compositor shortcut. One
   observer parks them all — the class lands on the host, so a dot field of
   hundreds of spans costs a single class write — and the margin wakes a host a
   screenful early, so it is already mid-cycle by the time it is in sight.

   Runs after initAmbientDots in the same task, so a field never paints running
   before the observer's first callback clears whatever is already in view; a
   dot opens on its resting opacity, so there is nothing to see in between. A
   host inside a closed tab panel simply never intersects, and starts the
   moment the panel opens. Where the browser has no IntersectionObserver
   nothing is parked and every loop runs as it always did. */
function initLoopParking() {
  const hosts = [...document.querySelectorAll(LOOP_HOSTS)];
  if (!hosts.length || !('IntersectionObserver' in window)) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        /* toggling with an explicit state is a no-op when the class already
           matches, so a host costs one style pass per crossing and a scroll
           that crosses nothing costs none. */
        entry.target.classList.toggle('is-anim-idle', !entry.isIntersecting);
      });
    },
    { rootMargin: '200px 0px' }
  );

  hosts.forEach((host) => {
    host.classList.add('is-anim-idle');
    observer.observe(host);
  });
}

function initAmbientDots() {
  /* Two calibrations: the slower ambient fields behind the cta band and the
     footer, and the denser ones behind the case-study cover and payoff panels.
     `data-dots` on its own still means ambient. */
  const PRESETS = {
    ambient: { pitch: 29, density: 0.45, min: 4.2, spread: 4.5, delay: 6, peak: 0.85 },
    dense: { pitch: 28, density: 0.72, min: 2.6, spread: 3, delay: 4, peak: 1 },
  };

  document.querySelectorAll('[data-dots]').forEach((field) => {
    const preset = PRESETS[field.dataset.dots] || PRESETS.ambient;
    const width = field.clientWidth || 500;
    const height = field.clientHeight || 400;
    const cols = Math.max(8, Math.round(width / preset.pitch));
    const rows = Math.max(6, Math.round(height / preset.pitch));

    const clusters = [];
    const clusterCount = parseInt(field.dataset.cluster || '0', 10);
    for (let i = 0; i < clusterCount; i += 1) {
      clusters.push({ x: Math.random(), y: Math.random() });
    }

    const fragment = document.createDocumentFragment();
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const dot = document.createElement('span');
        const nx = (col + 0.5) / cols;
        const ny = (row + 0.5) / rows;
        dot.style.left = `${(nx * 100).toFixed(2)}%`;
        dot.style.top = `${(ny * 100).toFixed(2)}%`;

        let heat = 0;
        if (clusters.length) {
          let nearest = 1;
          clusters.forEach((cluster) => {
            nearest = Math.min(nearest, Math.hypot(nx - cluster.x, ny - cluster.y));
          });
          heat = Math.max(0, 1 - nearest / 0.34);
        }

        if (Math.random() < preset.density + heat * 0.45) {
          dot.classList.add('is-twinkling');
          dot.style.setProperty(
            '--twinkle-duration',
            `${(preset.min + Math.random() * preset.spread - heat * 1.2).toFixed(2)}s`
          );
          dot.style.setProperty('--twinkle-delay', `${(Math.random() * preset.delay).toFixed(2)}s`);
          dot.style.setProperty('--twinkle-peak', (preset.peak * (0.7 + heat * 0.3)).toFixed(2));
        }
        fragment.appendChild(dot);
      }
    }
    field.appendChild(fragment);
  });
}

function initCardNavigation() {
  document.addEventListener('click', (event) => {
    const surface = event.target.closest('[data-href]');
    if (!surface) {
      return;
    }
    /* controls inside the card do their own thing */
    if (event.target.closest('a, button, .meta-category')) {
      return;
    }
    window.location.href = surface.dataset.href;
  });
}

function initScrollReveal() {
  const targets = [...document.querySelectorAll('[data-reveal]')];
  if (!targets.length) {
    return;
  }

  /* a stagger on siblings that should not all arrive at once */
  targets.forEach((element) => {
    const delay = element.dataset.revealDelay;
    if (delay) {
      element.style.transitionDelay = `${delay}ms, ${delay}ms`;
    }
  });

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    targets.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  const revealWithin = (ratio) => {
    const limit = window.innerHeight * ratio;
    targets.forEach((element) => {
      if (element.classList.contains('is-visible')) {
        return;
      }
      /* An element inside a closed tab panel has no box at all, and measuring it
         reports 0/0 — which passes the test below and burns the reveal while the
         element is still out of sight. Leave it to the pass that follows the
         panel opening. */
      if (!element.getClientRects().length) {
        return;
      }
      const box = element.getBoundingClientRect();
      if (box.top < limit && box.bottom > -40) {
        element.classList.add('is-visible');
      }
    });
  };

  const reveal = () => revealWithin(0.94);
  /* Whatever the first screen already shows appears straight away, however
     close to its bottom edge; a second pass catches late layout (fonts). */
  const revealFirstScreen = () => revealWithin(1);

  window.addEventListener('scroll', reveal, { passive: true });
  window.addEventListener('resize', reveal, { passive: true });
  /* Tab groups swap whole panels in and out, so re-measure once a panel opens. */
  document.addEventListener('tabs:change', reveal);
  revealFirstScreen();
  setTimeout(revealFirstScreen, 1200);
}

function initReadingTime() {
  document.querySelectorAll('[data-reading-time]').forEach((output) => {
    const article = document.querySelector(output.dataset.readingTime);
    if (!article) {
      return;
    }

    const words = (article.textContent || '').trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / 200));
    const label = output.dataset.readingTimeLabel || 'read';
    output.textContent = `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ${label}`;
  });
}
