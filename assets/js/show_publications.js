(() => {
  const controls = document.querySelector('[data-publication-controls]');
  if (!controls) return;
  const panels = document.querySelectorAll('[data-publication-view]');
  const buttons = controls.querySelectorAll('[data-publication-target]');
  function select(view) {
    panels.forEach(panel => { panel.hidden = panel.dataset.publicationView !== view; });
    buttons.forEach(button => {
      const active = button.dataset.publicationTarget === view;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }
  buttons.forEach(button => button.addEventListener('click', () => select(button.dataset.publicationTarget)));
  select(document.querySelector('#core-publications .publication-card') ? 'core' : 'list');
  controls.hidden = false;
})();
