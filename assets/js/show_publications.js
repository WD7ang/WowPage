document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('[data-publication-filter]');
  const panels = document.querySelectorAll('[data-publication-view]');
  function select(view) {
    buttons.forEach((button) => {
      const active = button.dataset.publicationFilter === view;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    panels.forEach((panel) => { panel.hidden = panel.dataset.publicationView !== view; });
  }
  buttons.forEach((button) => button.addEventListener('click', () => select(button.dataset.publicationFilter)));
  select('core');
});
