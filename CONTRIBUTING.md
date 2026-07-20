# Contributing to PreactHub

PreactHub is a statically generated catalog curated in GitHub. There is no PreactHub login—contributions happen through pull requests and structured GitHub issues.

## Ways to contribute

| Goal | Path |
| --- | --- |
| Suggest a new library | [Submit form](https://preacthub.com/submit) → GitHub issue |
| Fix outdated catalog data | [Correct library information](https://github.com/kamod-ch/preacthub/issues/new?template=library-correction.yml) |
| Understand labels and verification | [Methodology](https://preacthub.com/methodology) |
| Edit catalog content directly | Pull request changing `content/libraries/entries/*.md` |

## Submission workflow (no account on PreactHub)

1. Open [/submit](https://preacthub.com/submit) and fill in the form.
2. Client-side validation checks required fields and URL formats.
3. Review the GitHub issue preview shown on the page.
4. Click **Create GitHub submission** to open a prefilled issue (GitHub sign-in required there).
5. A maintainer triages the issue, verifies claims and either requests changes or merges a catalog entry.

Spam is reduced by required fields, URL validation, minimum explanation length and GitHub’s own account requirement—not by CAPTCHA in the MVP.

## Maintainer review workflow

1. **Triage** — Confirm the issue uses the right template and includes repository/docs links.
2. **Verify compatibility** — Reproduce or review evidence for the claimed `compatibilityStatus`. Update the claim if evidence is weak.
3. **Scaffold entry** — Run `npm run new:library -- --name "Library Name" --category <slug>` or edit `content/libraries/entries/<slug>.md`.
4. **Set canonical frontmatter** — Use `compatibilityStatus`, `maintenanceStatus`, `testedPreactVersions`, `lastVerifiedAt` and `verificationSource` when verification is complete.
5. **Write editorial body** — Include Introduction, Installation, Preact configuration, Example and SSR notes (enforced by tests).
6. **Validate locally** —
   ```bash
   npm run validate:catalog
   npm run typecheck
   npm run test
   npm run check
   npm run build
   ```
7. **Merge PR** — Close the linked issue and note what was verified.

## Correction workflow

1. Contributor files a **Correct library information** issue with slug, summary, proposed changes and evidence.
2. Maintainer confirms the report against upstream docs/repos.
3. Maintainer updates frontmatter and editorial sections in a PR.
4. When compatibility was re-checked, update `lastVerifiedAt` and `verificationSource`.

## Catalog authoring rules

- Prefer canonical schema fields documented in `src/lib/library-schema.ts`.
- Do not assign quality badges without evidence.
- Do not set `lastVerifiedAt` unless someone actually verified the entry.
- GitHub stars and npm downloads are context only—they are not compatibility proof.
- PreactHub 0.1 does not use an opaque 0–100 quality score; expose structured facts instead.

## Development setup

```bash
npm install
npm run dev
```

See `docs/library-directory.md` for architecture details and `README.md` for the full script list.
