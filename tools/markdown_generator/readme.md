# Optional Markdown generators

These inherited AcademicPages scripts and notebooks generate individual collection pages. They do not update the homepage data in `_data/home/`.

1. Replace the example TSV rows or BibTeX inputs with your own content.
2. Install `pandas` for TSV tools and `pybtex` for `pubsFromBib.py`. Jupyter is only needed for notebooks.
3. Create `_publications/` and/or `_talks/` at the repository root.
4. From `tools/markdown_generator/`, run `python publications.py`, `python talks.py`, or the corresponding notebook. Output goes to `../../_publications/` or `../../_talks/`.
5. Copy the matching index page from `examples/pages/` to `_pages/` to show the collection.

The `.py` files and `.ipynb` notebooks are alternative entry points; run either one, not both. Back up existing collection pages before regenerating, because matching filenames are overwritten.




