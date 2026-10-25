# UI kit — Gino's Blog website

Click-through recreation of the Astro blog. `index.html` composes the DS bundle components.

- `data.js` — categories (12 top-level from DESIGN-SPEC §0) + the two real posts.
- `Screens.jsx` — `Shell` (desktop sidebar / mobile top bar), `ArticlesScreen`, `PostScreen` (prose + sticky TOC), `CategoriesScreen` (tile grid), `CategoryScreen` (grouped by 2nd level with centered dividers, Miscellaneous last), `ArchivesScreen`, `AboutScreen`.
- `PostCache.jsx`, `PostMatching.jsx` — post bodies from `blogpost-example/` (Perfect Matching abridged).
- `DotGraph.jsx` — renders ```` ```dot ```` fences via viz.js (kit-only).

Interactions: nav, theme toggle (persists), card → post, category path → category page, TOC jump + scroll-spy, foldable callouts, image lightbox. Route + theme persist in localStorage.

Not real content: word counts / read times (520 / 6 copied from the sketch), About Me body (placeholder cards), category tile backgrounds (none yet).
