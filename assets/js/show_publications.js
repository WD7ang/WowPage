const publicationAuthorRows = [];

function fitPublicationAuthors() {
  // All author lines share the width of the longest rendered line in any title.
  let longestTitleLine = 0;
  for (const { titleRange } of publicationAuthorRows) {
    for (const line of titleRange.getClientRects()) {
      longestTitleLine = Math.max(longestTitleLine, line.width);
    }
  }
  if (!longestTitleLine) return;

  publicationAuthorRows.forEach(({ row, visible, authors }) => {
    if (!row.getClientRects().length || !row.clientWidth) return;

    row.style.removeProperty('font-size');
    const availableWidth = Math.min(row.getBoundingClientRect().width, longestTitleLine);
    const included = authors.map(() => true);

    function render() {
      const parts = [];
      authors.forEach((author, index) => {
        if (included[index]) {
          parts.push(author.html);
        } else if (index === 0 || included[index - 1]) {
          parts.push('<span class="pub-author-ellipsis">…</span>');
        }
      });
      visible.innerHTML = parts.join(', ');
    }

    // Keep the first/last author, the highlighted author and every † author.
    // Remove complete names from the middle, never clip a corresponding name.
    const middle = (authors.length - 1) / 2;
    const removable = authors.map((author, index) => ({ author, index }))
      .filter(({ author, index }) => index > 0 && index < authors.length - 1 && !author.protected)
      .sort((a, b) => Math.abs(a.index - middle) - Math.abs(b.index - middle));

    render();
    for (const { index } of removable) {
      if (visible.getBoundingClientRect().width <= availableWidth) break;
      included[index] = false;
      render();
    }

    // On narrow screens, fit the remaining essential names without hiding them.
    const remainingWidth = visible.getBoundingClientRect().width;
    if (remainingWidth > availableWidth) {
      const fontSize = parseFloat(getComputedStyle(row).fontSize);
      row.style.fontSize = `${fontSize * (availableWidth - 1) / remainingWidth}px`;
    }
    row.classList.toggle('pub-authors-shortened', included.includes(false));
  });
}

function initializePublicationAuthors() {
  document.querySelectorAll('.publication-card .pub-authors').forEach((row) => {
    const title = row.closest('.publication-card').querySelector('.pub-card-title');
    if (!title) return;
    const titleRange = document.createRange();
    titleRange.selectNodeContents(title.querySelector('a') || title);
    const star = title.querySelector('.publication-title-star');
    if (star) titleRange.setStartAfter(star);

    const fullAuthors = document.createElement('span');
    fullAuthors.innerHTML = row.dataset.authorsFull || row.innerHTML;
    const fullText = fullAuthors.textContent.replace(/\s+/g, ' ').trim();
    const authors = row.innerHTML.trim().split(/\s*,\s*/).map((html) => {
      const author = document.createElement('span');
      author.innerHTML = html;
      return { html, protected: author.textContent.includes('†') || !!author.querySelector('strong') };
    });
    const visible = document.createElement('span');
    visible.className = 'pub-authors-visible';
    visible.setAttribute('aria-hidden', 'true');
    const complete = document.createElement('span');
    complete.className = 'pub-authors-complete';
    complete.textContent = fullText;
    row.replaceChildren(visible, complete);
    row.classList.add('pub-author-line');
    row.title = fullText;
    publicationAuthorRows.push({ row, visible, authors, title, titleRange });
  });

  let frame;
  const scheduleFit = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(fitPublicationAuthors);
  };
  const observer = new ResizeObserver(scheduleFit);
  publicationAuthorRows.forEach(({ row, title }) => {
    observer.observe(row);
    observer.observe(title);
  });
  document.fonts.ready.then(scheduleFit);
}

document.addEventListener('DOMContentLoaded', () => {
  initializePublicationAuthors();
  fitPublicationAuthors();
});
