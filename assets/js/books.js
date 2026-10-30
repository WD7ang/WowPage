document.querySelectorAll('[data-bookshelf]').forEach((shelf) => {
  const hoverPointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  shelf.querySelectorAll('[data-book]').forEach((book) => {
    const cover = book.querySelector('[data-book-cover]');
    const pages = book.querySelector('[data-book-pages]');
    const closeButton = book.querySelector('[data-book-close]');
    let pointerInside = false;
    let pinned = false;

    const setOpen = (open) => {
      book.classList.toggle('is-open', open);
      cover.setAttribute('aria-expanded', String(open));
      cover.tabIndex = open ? -1 : 0;
      pages.inert = !open;
      pages.setAttribute('aria-hidden', String(!open));
    };
    const close = (restoreFocus) => {
      pinned = false;
      setOpen(false);
      if (restoreFocus) cover.focus({ preventScroll: true });
    };
    setOpen(false);
    closeButton.hidden = false;

    book.addEventListener('pointerenter', (event) => {
      if (!hoverPointer.matches || event.pointerType === 'touch') return;
      pointerInside = true;
      setOpen(true);
    });
    book.addEventListener('pointerleave', () => {
      pointerInside = false;
      if (!pinned && !pages.contains(document.activeElement)) close(false);
    });
    cover.addEventListener('click', () => {
      pinned = true;
      setOpen(true);
      const firstEntry = pages.querySelector('.book-entry');
      (firstEntry || closeButton).focus({ preventScroll: true });
    });
    closeButton.addEventListener('click', () => close(true));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && book.classList.contains('is-open')) {
        event.preventDefault();
        close(book.contains(document.activeElement));
      }
    });
    book.addEventListener('focusout', () => {
      queueMicrotask(() => {
        if (!pointerInside && !pinned && !book.contains(document.activeElement)) close(false);
      });
    });
    if (window.location.hash === '#' + book.id) {
      pinned = true;
      setOpen(true);
    }
  });
  shelf.classList.add('books-ready');
});
