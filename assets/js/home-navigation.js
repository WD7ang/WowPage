/* Keep section headings clear of the navigation when its links wrap. */
jQuery(function ($) {
  const masthead = document.querySelector('.masthead--all-links');
  if (!masthead) return;
  const nav = masthead.querySelector('#site-nav-all');
  const toggle = masthead.querySelector('.home-nav-toggle');
  if (!nav || !toggle) return;
  const mobile = window.matchMedia('(max-width: 767px)');

  function updateOffset() {
    const offset = Math.ceil(masthead.getBoundingClientRect().height) + 16;
    document.documentElement.style.setProperty('--home-nav-offset', offset + 'px');
    $.smoothScroll('options', { offset: -offset });
  }

  function setOpen(open) {
    const expanded = mobile.matches && open;
    masthead.classList.toggle('is-menu-open', expanded);
    toggle.setAttribute('aria-expanded', String(expanded));
    updateOffset();
  }

  toggle.hidden = false;
  masthead.classList.add('has-mobile-menu');
  toggle.addEventListener('click', function () {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });
  mobile.addEventListener('change', function () { setOpen(false); });
  document.addEventListener('click', function (event) {
    if (!masthead.contains(event.target)) setOpen(false);
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && masthead.classList.contains('is-menu-open')) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Close and measure before the existing link-level smoothScroll handler runs.
  nav.addEventListener('click', function (event) {
    const link = event.target.closest('a');
    if (!link || !mobile.matches || !masthead.classList.contains('is-menu-open')) return;
    setOpen(false);
    if (link.hash && link.origin === window.location.origin && link.pathname === window.location.pathname) {
      const target = document.getElementById(link.hash.slice(1));
      if (target) {
        if (!target.hasAttribute('tabindex')) {
          target.setAttribute('tabindex', '-1');
          target.addEventListener('blur', function () { target.removeAttribute('tabindex'); }, { once: true });
        }
        target.focus({ preventScroll: true });
      }
    }
  }, true);

  setOpen(false);
  if ('ResizeObserver' in window) {
    new ResizeObserver(updateOffset).observe(masthead);
  } else {
    window.addEventListener('resize', updateOffset);
  }

  // Apply the measured offset when arriving from an article or a shared link.
  if (window.location.hash) {
    requestAnimationFrame(function () {
      const target = document.getElementById(window.location.hash.slice(1));
      if (target) target.scrollIntoView({ block: 'start' });
    });
  }
});
