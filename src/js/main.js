/* =========================================================
   Site-wide behaviour: header, cart and compare.
   Loaded on every page by index.php.
   ========================================================= */

(() => {
  /* Demo state in localStorage, as in the design export.
     Real cart/compare integration is still to be connected. */
  const CART_KEY = 'abecq-cart-v3';
  const COMPARE_KEY = 'abecq-compare-v4';
  const CART_EVENT = 'abecq-cart-change';
  const COMPARE_EVENT = 'abecq-compare-change';
  const DEFAULT_CART = [
    { name: 'Lion Alcolmeter SD400F', brand: 'Lion', price: 990, qty: 1 },
    { name: 'Ethylotest Ethylec', brand: 'ABECQ', price: 163.8, qty: 2 },
  ];
  const DEFAULT_COMPARE = ['Lion Alcolmeter SD400F', 'Drivesafe III'];

  const readList = (key, fallback) => {
    let value = null;
    try {
      value = JSON.parse(localStorage.getItem(key) || 'null');
    } catch (error) {
      value = null;
    }
    return Array.isArray(value) ? value : fallback;
  };

  const writeList = (key, list) => {
    try {
      localStorage.setItem(key, JSON.stringify(list));
    } catch (error) {
      /* storage unavailable */
    }
  };

  const parsePrice = (text) => parseFloat(text.replace(/[^0-9,]/g, '').replace(',', '.')) || 0;

  /* ---------- Header: Products dropdown ----------
     Opens on hover, closes on leave; a click toggles it and
     suppresses hover re-opening until the pointer leaves. */
  const initDropdown = () => {
    const item = document.querySelector('[data-dropdown]');
    if (!item) return;

    const toggle = item.querySelector('[data-dropdown-toggle]');
    let open = false;
    let suppress = false;

    const setOpen = (value) => {
      open = value;
      item.classList.toggle('is-open', value);
      toggle.setAttribute('aria-expanded', String(value));
    };

    item.addEventListener('mouseenter', () => {
      suppress = false;
      setOpen(true);
    });
    item.addEventListener('mouseleave', () => {
      suppress = false;
      setOpen(false);
    });
    item.addEventListener('mousemove', () => {
      if (!suppress && !open) setOpen(true);
    });

    toggle.addEventListener('click', (event) => {
      event.preventDefault();
      suppress = open;
      setOpen(!open);
    });

    item.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || !open) return;
      setOpen(false);
      toggle.focus();
    });

    window.addEventListener('hashchange', () => {
      suppress = true;
      setOpen(false);
    });
  };

  /* ---------- Header: mobile menu ---------- */
  const initMobileMenu = () => {
    const button = document.querySelector('[data-menu-toggle]');
    const menu = button && document.getElementById(button.getAttribute('aria-controls'));
    if (!menu) return;

    const setOpen = (value) => {
      menu.hidden = !value;
      button.setAttribute('aria-expanded', String(value));
    };

    button.addEventListener('click', () => setOpen(menu.hidden));
    menu.addEventListener('click', (event) => {
      if (event.target.closest('[data-menu-close]')) setOpen(false);
    });
    window.addEventListener('hashchange', () => setOpen(false));
  };

  /* ---------- Header: cart and compare counters ---------- */
  const renderCount = (type, count, label) => {
    const badge = document.querySelector(`[data-count="${type}"]`);
    if (!badge) return;
    badge.hidden = count === 0;
    badge.textContent = String(count);
    badge.setAttribute('aria-label', `${count} ${label}`);
  };

  const updateCounters = () => {
    const cart = readList(CART_KEY, DEFAULT_CART);
    const items = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
    renderCount('cart', items, 'items in cart');
    renderCount('compare', readList(COMPARE_KEY, DEFAULT_COMPARE).length, 'products to compare');
  };

  const initCounters = () => {
    window.addEventListener(CART_EVENT, updateCounters);
    window.addEventListener(COMPARE_EVENT, updateCounters);
    window.addEventListener('storage', updateCounters);
    updateCounters();
  };

  /* ---------- Product actions: add to cart, compare ---------- */
  const addToCart = ({ name, price }) => {
    const cart = readList(CART_KEY, DEFAULT_CART.slice());
    const index = cart.findIndex((item) => item.name === name);

    if (index >= 0) cart[index] = { ...cart[index], qty: cart[index].qty + 1 };
    else cart.push({ name, brand: '', price: parsePrice(price), qty: 1 });

    writeList(CART_KEY, cart);
    window.dispatchEvent(new Event(CART_EVENT));
  };

  /* the export binds no style to the compare state */
  const toggleCompare = (button) => {
    button.setAttribute('aria-pressed', String(button.getAttribute('aria-pressed') !== 'true'));
  };

  const initProductActions = () => {
    document.addEventListener('click', (event) => {
      const addButton = event.target.closest('[data-add-to-cart]');
      if (addButton) {
        addToCart(addButton.dataset);
        return;
      }

      const compareButton = event.target.closest('[data-compare-toggle]');
      if (compareButton) toggleCompare(compareButton);
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    initDropdown();
    initMobileMenu();
    initCounters();
    initProductActions();
  });
})();
