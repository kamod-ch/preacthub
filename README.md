# PreactHub

A PreactPress site for curated Preact library recommendations.

## Scripts

- `npm run dev` — start local development
- `npm run check` — validate routes and links
- `npm run build` — generate the static site
- `npm run preview` — preview the production build
- `npm run typecheck` — run TypeScript checks
- `npm run test` — run unit tests
- `npm run lint` — run oxlint
- `npm run new:library -- --name "My Library" --category ui` — scaffold a library entry
- `npm run new:category -- --name "My Category" --icon "◧"` — scaffold a category and register it

## Library directory

The `Preact Libraries` directory lives under `content/libraries/`.

- Library entries live in `content/libraries/entries/`
- Category pages live in `content/libraries/categories/`
- Parsing and indexing live in `src/lib/`

See:

- `docs/library-directory.md` for architecture, content authoring, validation, and submission workflow
- `docs/design-notes.md` for the visual implementation rules derived from the Figma export
- `docs/qa-review.md` for the latest QA and visual review summary
