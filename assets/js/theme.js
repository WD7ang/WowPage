(function () {
  function closeAll() {
    document.querySelectorAll('.author__urls-wrapper.is-open').forEach(function (wrapper) {
      wrapper.classList.remove('is-open');
      const button = wrapper.querySelector('button');
      if (button) button.setAttribute('aria-expanded', 'false');
    });
  }

  document.querySelectorAll('.author__urls-wrapper').forEach(function (wrapper) {
    const button = wrapper.querySelector('button');
    const list = wrapper.querySelector('.author__urls');
    if (!button || !list) return;

    button.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      const expanded = wrapper.classList.toggle('is-open');
      button.setAttribute('aria-expanded', String(expanded));
    });
  });

  document.addEventListener('click', closeAll);
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeAll();
  });
})();
