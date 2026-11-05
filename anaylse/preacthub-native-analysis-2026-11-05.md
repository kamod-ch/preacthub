# PreactHub analysis: Preact-first selection

Checked: **2026-11-05**

## Inventory and duplicate check

- No repository-level `AGENTS.md` exists.
- The local catalog contains **180** entry files; the live directory was accessible and also exposed 180 library entries.
- Candidates were compared against existing npm package names and normalized repository URLs.
- None of the ten selected packages or repositories is already present.
- This selection is deliberately Preact-first: **10 of 10 candidates are native Preact packages or official Preact adapters**.
- No runtime integration tests were executed; every compatibility claim is therefore `documented`, not `tested`.

## A. Overview

| Name | Category | Compatibility | Evidence level | Why include it? |
|---|---|---|---|---|
| [Storybook for Preact with Vite](https://github.com/storybookjs/storybook/tree/next/code/frameworks/preact-vite) | Developer Tools (`developer-tools`) | `native` | `documented` | Official Preact-Vite component workshop for isolated development, documentation and interaction testing. |
| [Nano Stores Preact](https://github.com/nanostores/preact) | State Management (`state-management`) | `native` | `documented` | Small official binding with selective subscriptions and unusually clear SSR hydration guidance. |
| [TanStack Preact Store](https://github.com/TanStack/store/tree/main/packages/preact-store) | State Management (`state-management`) | `native` | `documented` | Typed official Preact adapter with selectors, atoms, context helpers and maintained examples. |
| [ProseMirror Adapter for Preact](https://github.com/prosekit/prosemirror-adapter/tree/main/packages/preact) | Editors (`editors`) | `native` | `documented` | Makes ProseMirror node and plugin views practical with idiomatic Preact components and hooks. |
| [TanStack AI Preact](https://github.com/TanStack/ai/tree/main/packages/ai-preact) | Data Fetching (`data-fetching`) | `native` | `documented` | Adds native typed hooks for streaming chat, tool calls and approval flows in Preact interfaces. |
| [Preact Intlayer](https://github.com/aymericzip/intlayer) | Internationalization (`i18n`) | `native` | `documented` | Provides a current Preact-specific i18n workflow with typed content, routing and lazy loading. |
| [Preact Feather](https://github.com/ForsakenHarmony/preact-feather) | UI Components (`ui`) | `native` | `documented` | Offers simple, tree-shakeable SVG icon components without requiring preact/compat. |
| [Preact Transitioning](https://github.com/fakundo/preact-transitioning) | Animation (`animation`) | `native` | `documented` | Fills the transition-group use case with a maintained package built directly for Preact. |
| [MDX Preact](https://github.com/mdx-js/mdx/tree/main/packages/preact) | Developer Tools (`developer-tools`) | `native` | `documented` | Official context bridge for mapping compiled MDX elements to Preact components. |
| [tsParticles Preact](https://github.com/tsparticles/tsparticles/tree/main/wrappers/preact) | Animation (`animation`) | `native` | `documented` | Official native wrapper for particle, confetti and canvas effects with modular engine loading. |

## B. Canonical PreactHub JSON objects

The objects below use the repository's current catalog schema rather than the generic research example. Version checks are recorded in `notes`; dates use the canonical `lastReleaseAt`, `lastCommitAt` and `lastVerifiedAt` fields.

### Storybook for Preact with Vite

```json
{
  "entryType": "library",
  "name": "Storybook for Preact with Vite",
  "slug": "storybook-preact-vite",
  "shortDescription": "Storybook framework for developing, documenting and testing Preact components in isolation with Vite.",
  "category": "developer-tools",
  "packageName": "@storybook/preact-vite",
  "repositoryUrl": "https://github.com/storybookjs/storybook/tree/next/code/frameworks/preact-vite",
  "npmUrl": "https://www.npmjs.com/package/@storybook/preact-vite",
  "documentationUrl": "https://storybook.js.org/docs/get-started/frameworks/preact-vite",
  "homepageUrl": "https://storybook.js.org/",
  "license": "MIT",
  "compatibilityStatus": "native",
  "typescriptSupport": "native",
  "ssrSupport": "unknown",
  "maintenanceStatus": "active",
  "installCommand": "npm install --save-dev @storybook/preact-vite storybook",
  "tags": [
    "storybook",
    "component-workshop",
    "vite",
    "testing",
    "documentation"
  ],
  "limitations": [
    "Targets Preact projects built with Vite.",
    "Storybook builds a separate component workshop; it does not verify application SSR behavior by itself.",
    "Addons should be checked for renderer-specific React assumptions."
  ],
  "lastVerifiedAt": "2026-11-05",
  "verificationSource": "Official Storybook Preact-Vite documentation and package metadata",
  "lastReleaseAt": "2026-10-27",
  "lastCommitAt": "2026-11-05",
  "repositoryArchived": false,
  "notes": [
    "Evidence level: documented.",
    "Latest npm version checked: 10.6.5.",
    "Official documentation explicitly describes the framework as Storybook for Preact applications built with Vite."
  ]
}
```

### Nano Stores Preact

```json
{
  "entryType": "library",
  "name": "Nano Stores Preact",
  "slug": "nanostores-preact",
  "shortDescription": "Official Preact binding for Nano Stores with selective subscriptions to atomic and derived stores.",
  "category": "state-management",
  "packageName": "@nanostores/preact",
  "repositoryUrl": "https://github.com/nanostores/preact",
  "npmUrl": "https://www.npmjs.com/package/@nanostores/preact",
  "documentationUrl": "https://github.com/nanostores/preact#readme",
  "homepageUrl": "https://github.com/nanostores/preact",
  "license": "MIT",
  "compatibilityStatus": "native",
  "typescriptSupport": "native",
  "ssrSupport": "supported",
  "maintenanceStatus": "active",
  "installCommand": "npm install nanostores @nanostores/preact",
  "tags": [
    "state",
    "atomic-stores",
    "subscriptions",
    "ssr"
  ],
  "limitations": [
    "Requires the separate nanostores core package.",
    "Server and initial client store values must match to avoid hydration errors.",
    "Global stores need request isolation when server rendering user-specific state."
  ],
  "lastVerifiedAt": "2026-11-05",
  "verificationSource": "Official Nano Stores Preact README, including the SSR section",
  "lastReleaseAt": "2026-10-05",
  "lastCommitAt": "2026-10-15",
  "repositoryArchived": false,
  "notes": [
    "Evidence level: documented.",
    "Latest npm version checked: 1.1.1.",
    "The official README documents useStore and explicit SSR hydration strategies."
  ]
}
```

### TanStack Preact Store

```json
{
  "entryType": "library",
  "name": "TanStack Preact Store",
  "slug": "tanstack-preact-store",
  "shortDescription": "Official Preact adapter for TanStack Store with typed stores, selectors, atoms and context helpers.",
  "category": "state-management",
  "packageName": "@tanstack/preact-store",
  "repositoryUrl": "https://github.com/TanStack/store/tree/main/packages/preact-store",
  "npmUrl": "https://www.npmjs.com/package/@tanstack/preact-store",
  "documentationUrl": "https://tanstack.com/store/latest/docs/framework/preact/quick-start",
  "homepageUrl": "https://tanstack.com/store",
  "license": "MIT",
  "compatibilityStatus": "native",
  "typescriptSupport": "native",
  "ssrSupport": "limited",
  "maintenanceStatus": "active",
  "installCommand": "npm install @tanstack/preact-store",
  "tags": [
    "state",
    "selectors",
    "atoms",
    "context",
    "typescript"
  ],
  "limitations": [
    "The Preact documentation demonstrates client rendering but does not provide a dedicated SSR guide.",
    "Store lifetime and request isolation must be designed explicitly for SSR.",
    "Some APIs are still below version 1.0 and may evolve."
  ],
  "lastVerifiedAt": "2026-11-05",
  "verificationSource": "Official TanStack Store Preact quick start and maintained Preact examples",
  "lastReleaseAt": "2026-10-09",
  "lastCommitAt": "2026-11-03",
  "repositoryArchived": false,
  "notes": [
    "Evidence level: documented.",
    "Latest npm version checked: 0.13.5.",
    "The monorepo contains Preact documentation and multiple runnable Preact examples."
  ]
}
```

### ProseMirror Adapter for Preact

```json
{
  "entryType": "library",
  "name": "ProseMirror Adapter for Preact",
  "slug": "prosemirror-adapter-preact",
  "shortDescription": "Preact adapter for rendering ProseMirror node views and plugin views with Preact components and hooks.",
  "category": "editors",
  "packageName": "@prosemirror-adapter/preact",
  "repositoryUrl": "https://github.com/prosekit/prosemirror-adapter/tree/main/packages/preact",
  "npmUrl": "https://www.npmjs.com/package/@prosemirror-adapter/preact",
  "documentationUrl": "https://github.com/prosekit/prosemirror-adapter/tree/main/packages/preact#readme",
  "homepageUrl": "https://github.com/prosekit/prosemirror-adapter",
  "license": "MIT",
  "compatibilityStatus": "native",
  "typescriptSupport": "native",
  "ssrSupport": "limited",
  "maintenanceStatus": "active",
  "installCommand": "npm install @prosemirror-adapter/preact prosemirror-model prosemirror-state prosemirror-view",
  "tags": [
    "prosemirror",
    "editor",
    "node-view",
    "hooks"
  ],
  "limitations": [
    "ProseMirror's EditorView is DOM-dependent and should be created on the client.",
    "The adapter requires familiarity with ProseMirror state, schemas and view lifecycles.",
    "The official example imports StrictMode from preact/compat, although the adapter itself targets Preact."
  ],
  "lastVerifiedAt": "2026-11-05",
  "verificationSource": "Official Preact adapter README and official Preact example",
  "lastReleaseAt": "2026-09-28",
  "lastCommitAt": "2026-09-28",
  "repositoryArchived": false,
  "notes": [
    "Evidence level: documented.",
    "Latest npm version checked: 0.5.6.",
    "The repository provides a dedicated Preact package and StackBlitz-linked Preact example."
  ]
}
```

### TanStack AI Preact

```json
{
  "entryType": "library",
  "name": "TanStack AI Preact",
  "slug": "tanstack-ai-preact",
  "shortDescription": "Official Preact hooks and headless UI bindings for typed streaming chat, tool calls, approvals and AI message parts.",
  "category": "data-fetching",
  "packageName": "@tanstack/ai-preact",
  "repositoryUrl": "https://github.com/TanStack/ai/tree/main/packages/ai-preact",
  "npmUrl": "https://www.npmjs.com/package/@tanstack/ai-preact",
  "documentationUrl": "https://tanstack.com/ai/latest/docs/framework/preact/overview",
  "homepageUrl": "https://tanstack.com/ai",
  "license": "MIT",
  "compatibilityStatus": "native",
  "typescriptSupport": "native",
  "ssrSupport": "limited",
  "maintenanceStatus": "active",
  "installCommand": "npm install @tanstack/ai @tanstack/ai-preact",
  "tags": [
    "ai",
    "streaming",
    "chat",
    "tool-calling",
    "typescript"
  ],
  "limitations": [
    "The Preact package is client-facing and normally depends on a separate server chat endpoint.",
    "Provider adapters and optional MCP UI support require additional packages.",
    "The 1.0 API is new and should receive an integration test before a verified badge is assigned."
  ],
  "lastVerifiedAt": "2026-11-05",
  "verificationSource": "Official TanStack AI Preact UI guide and API documentation",
  "lastReleaseAt": "2026-10-29",
  "lastCommitAt": "2026-11-05",
  "repositoryArchived": false,
  "notes": [
    "Evidence level: documented.",
    "Latest npm version checked: 1.0.1.",
    "Official docs provide a Preact-specific createChatHook workflow and typed component slots."
  ]
}
```

### Preact Intlayer

```json
{
  "entryType": "library",
  "name": "Preact Intlayer",
  "slug": "preact-intlayer",
  "shortDescription": "Preact integration for typed, component-scoped translations, locale routing, lazy-loaded content and visual editing.",
  "category": "i18n",
  "packageName": "preact-intlayer",
  "repositoryUrl": "https://github.com/aymericzip/intlayer",
  "npmUrl": "https://www.npmjs.com/package/preact-intlayer",
  "documentationUrl": "https://intlayer.org/doc/environment/vite-and-preact",
  "homepageUrl": "https://intlayer.org/",
  "license": "Apache-2.0",
  "compatibilityStatus": "native",
  "typescriptSupport": "native",
  "ssrSupport": "limited",
  "maintenanceStatus": "active",
  "installCommand": "npm install intlayer preact-intlayer",
  "tags": [
    "i18n",
    "localization",
    "typed-content",
    "routing",
    "vite"
  ],
  "limitations": [
    "The documented setup relies on the Intlayer Vite plugin and generated content files.",
    "The package brings several Intlayer runtime dependencies rather than a minimal translation core.",
    "SSR behavior depends on the chosen Preact host and locale-routing setup."
  ],
  "lastVerifiedAt": "2026-11-05",
  "verificationSource": "Official Vite and Preact integration guide and preact-intlayer package metadata",
  "lastReleaseAt": "2026-11-03",
  "lastCommitAt": "2026-11-04",
  "repositoryArchived": false,
  "notes": [
    "Evidence level: documented.",
    "Latest npm version checked: 9.7.1.",
    "The official guide includes provider, hook, locale switcher and localized routing examples for Preact."
  ]
}
```

### Preact Feather

```json
{
  "entryType": "library",
  "name": "Preact Feather",
  "slug": "preact-feather",
  "shortDescription": "Feather icon set exposed as individually importable Preact SVG components with bundled TypeScript declarations.",
  "category": "ui",
  "packageName": "preact-feather",
  "repositoryUrl": "https://github.com/ForsakenHarmony/preact-feather",
  "npmUrl": "https://www.npmjs.com/package/preact-feather",
  "documentationUrl": "https://github.com/ForsakenHarmony/preact-feather#readme",
  "homepageUrl": "https://github.com/ForsakenHarmony/preact-feather",
  "license": "MIT",
  "compatibilityStatus": "native",
  "typescriptSupport": "bundled-types",
  "ssrSupport": "supported",
  "maintenanceStatus": "active",
  "installCommand": "npm install preact-feather",
  "tags": [
    "icons",
    "svg",
    "feather",
    "components"
  ],
  "limitations": [
    "The package tracks the Feather icon set rather than newer community forks with additional icons.",
    "Accessibility labels or aria-hidden behavior must be selected by the consuming application.",
    "Import individual icons to avoid unnecessary bundle inclusion."
  ],
  "lastVerifiedAt": "2026-11-05",
  "verificationSource": "Official package README and Preact peer dependency",
  "lastReleaseAt": "2026-06-03",
  "lastCommitAt": "2026-06-03",
  "repositoryArchived": false,
  "notes": [
    "Evidence level: documented.",
    "Latest npm version checked: 4.3.0.",
    "The package documents direct Preact component imports and contains no browser-only runtime dependency for SVG rendering."
  ]
}
```

### Preact Transitioning

```json
{
  "entryType": "library",
  "name": "Preact Transitioning",
  "slug": "preact-transitioning",
  "shortDescription": "Preact components for enter, exit and grouped CSS transitions with an API inspired by react-transition-group.",
  "category": "animation",
  "packageName": "preact-transitioning",
  "repositoryUrl": "https://github.com/fakundo/preact-transitioning",
  "npmUrl": "https://www.npmjs.com/package/preact-transitioning",
  "documentationUrl": "https://fakundo.github.io/preact-transitioning/",
  "homepageUrl": "https://github.com/fakundo/preact-transitioning",
  "license": "MIT",
  "compatibilityStatus": "native",
  "typescriptSupport": "native",
  "ssrSupport": "limited",
  "maintenanceStatus": "active",
  "installCommand": "npm install preact-transitioning",
  "tags": [
    "animation",
    "transitions",
    "css",
    "transition-group"
  ],
  "limitations": [
    "Transitions depend on DOM lifecycle timing and CSS classes after hydration.",
    "The API is intentionally close to react-transition-group, so Preact-specific edge cases should be tested.",
    "Complex timeline or gesture animation requires a different tool."
  ],
  "lastVerifiedAt": "2026-11-05",
  "verificationSource": "Official documentation and native Preact package metadata",
  "lastReleaseAt": "2025-10-22",
  "lastCommitAt": "2026-09-11",
  "repositoryArchived": false,
  "notes": [
    "Evidence level: documented.",
    "Latest npm version checked: 1.5.3.",
    "A newer commit history after the latest release indicates continued maintenance."
  ]
}
```

### MDX Preact

```json
{
  "entryType": "library",
  "name": "MDX Preact",
  "slug": "mdx-preact",
  "shortDescription": "Official Preact context provider for supplying and merging custom components used by compiled MDX content.",
  "category": "developer-tools",
  "packageName": "@mdx-js/preact",
  "repositoryUrl": "https://github.com/mdx-js/mdx/tree/main/packages/preact",
  "npmUrl": "https://www.npmjs.com/package/@mdx-js/preact",
  "documentationUrl": "https://mdxjs.com/packages/preact/",
  "homepageUrl": "https://mdxjs.com/",
  "license": "MIT",
  "compatibilityStatus": "native",
  "typescriptSupport": "bundled-types",
  "ssrSupport": "supported",
  "maintenanceStatus": "active",
  "installCommand": "npm install @mdx-js/preact",
  "tags": [
    "mdx",
    "markdown",
    "content",
    "context",
    "components"
  ],
  "limitations": [
    "The package provides component context and is not required for every MDX and Preact setup.",
    "Compilation and bundler integration require other MDX packages.",
    "Untrusted MDX content requires a separate security model."
  ],
  "lastVerifiedAt": "2026-11-05",
  "verificationSource": "Official MDX Preact package documentation",
  "lastReleaseAt": "2025-08-29",
  "lastCommitAt": "2026-11-04",
  "repositoryArchived": false,
  "notes": [
    "Evidence level: documented.",
    "Latest npm version checked: 3.1.1.",
    "The official docs identify the package as a context-based component provider for Preact and MDX."
  ]
}
```

### tsParticles Preact

```json
{
  "entryType": "library",
  "name": "tsParticles Preact",
  "slug": "tsparticles-preact",
  "shortDescription": "Official Preact component for configurable particle, confetti and animated canvas effects using the modular tsParticles engine.",
  "category": "animation",
  "packageName": "@tsparticles/preact",
  "repositoryUrl": "https://github.com/tsparticles/tsparticles/tree/main/wrappers/preact",
  "npmUrl": "https://www.npmjs.com/package/@tsparticles/preact",
  "documentationUrl": "https://github.com/tsparticles/tsparticles/tree/main/wrappers/preact#readme",
  "homepageUrl": "https://particles.js.org/",
  "license": "MIT",
  "compatibilityStatus": "native",
  "typescriptSupport": "native",
  "ssrSupport": "limited",
  "maintenanceStatus": "active",
  "installCommand": "npm install @tsparticles/preact @tsparticles/engine",
  "tags": [
    "particles",
    "canvas",
    "confetti",
    "animation",
    "effects"
  ],
  "limitations": [
    "The canvas engine must initialize in the browser and should not run during server rendering.",
    "Loading the full tsParticles bundle can be large; use selected engine packages when possible.",
    "Continuous animation should respect reduced-motion preferences and performance budgets."
  ],
  "lastVerifiedAt": "2026-11-05",
  "verificationSource": "Official tsParticles Preact wrapper README and package metadata",
  "lastReleaseAt": "2026-11-02",
  "lastCommitAt": "2026-11-04",
  "repositoryArchived": false,
  "notes": [
    "Evidence level: documented.",
    "Latest npm version checked: 4.5.1.",
    "The monorepo labels this package as the official tsParticles Preact component and provides usage examples."
  ]
}
```

## C. Redaktionelle Empfehlung

### Zuerst aufnehmen

1. **Storybook for Preact with Vite** — Die Integration ist offiziell, aktuell und für fast jedes Preact-Komponentenprojekt nützlich. Sie verbessert Entwicklung, Dokumentation und visuelles Testen, ohne eine React-Kompatibilitätsschicht zu benötigen.
2. **Nano Stores Preact** — Der Adapter ist klein, stabil und dokumentiert SSR/Hydration deutlich besser als viele State-Bindings. Er ergänzt den vorhandenen Nano-Stores-Core-Eintrag mit der tatsächlich benötigten Preact-Integration.
3. **ProseMirror Adapter for Preact** — Der Eintrag schließt eine konkrete Editor-Lücke. Er ist kein generischer React-Port, sondern ein offizieller Preact-Adapter mit Beispiel und Preact-spezifischen Hooks.

### Noch durch Integrationstests absichern

- **ProseMirror Adapter for Preact:** NodeView-Mounting, Cleanup, Selection und Hydration in einer echten Preact-Anwendung.
- **TanStack AI Preact:** Streaming-Abbruch, Tool-Call-Updates und Unmount während eines laufenden Streams.
- **Preact Intlayer:** Locale-Wechsel, Vite-Build, lazy-loaded content und SSR/locale routing im gewählten Host.
- **Preact Transitioning:** Enter/exit-Endzustände, schnelle Zustandswechsel und Hydration.
- **tsParticles Preact:** Client-only Initialisierung, Cleanup und Reduced-Motion-Verhalten.
- **Storybook for Preact with Vite:** mindestens ein Smoke-Test mit Controls, Actions und einem häufig genutzten Addon.
- **Nano Stores Preact:** SSR-Test mit identischem Server-/Client-Storezustand sowie request-lokalen Stores.

Preact Feather und MDX Preact sind aufgrund ihrer einfachen Renderpfade risikoärmer, sollten aber vor einem `verified-for-preact`-Badge ebenfalls einmal mit Preact 10/11 und SSR geprüft werden.

### Ausgeschlossene oder zurückgestellte Kandidaten

- **@uppy/components:** intern mit Preact gebaut, aber laut offizieller README normalerweise nicht direkt zu installieren; die öffentlich dokumentierten Framework-Oberflächen sind React, Vue und Svelte.
- **@tanstack/preact-query:** sehr guter nativer Adapter, aber das Repository überschneidet sich mit dem vorhandenen TanStack-Query-Eintrag. Besser den bestehenden Eintrag auf das offizielle Preact-Paket korrigieren.
- **@tanstack/preact-form:** gleicher Fall für den vorhandenen TanStack-Form-Eintrag; Korrektur statt neuem Duplikat.
- **@urql/preact:** sollte den bestehenden, derzeit React-/compat-orientierten urql-Eintrag ersetzen oder korrigieren.
- **@preact/eslint-plugin-signals:** nützlich, aber dasselbe Upstream-Repository wie die vorhandenen Preact-Signals-Einträge; zunächst als Ergänzung eines bestehenden Eintrags behandeln.
- **@modular-forms/preact:** offiziell im Maintenance-Modus; Upstream empfiehlt Formisch, das bereits im Katalog vorhanden ist.

## Abschließende Bewertung

Diese Auswahl erfüllt die gewünschte Preact-Priorisierung deutlich besser als die vorherige Runde: Alle zehn Kandidaten besitzen ein offizielles Preact-Paket, eine Preact-Peer-Dependency oder eine ausdrücklich dokumentierte Preact-Oberfläche. Die stärksten Einträge sind nicht zwingend die größten Projekte, sondern diejenigen mit einer klaren Preact-Rolle, nachvollziehbarer Wartung und einem konkreten Integrationsproblem.

Die Hauptunsicherheit liegt nicht bei der allgemeinen Preact-Kompatibilität, sondern bei SSR, Hydration und DOM-Lebenszyklen. Deshalb sollten diese Eigenschaften in den späteren Katalogtexten konservativ formuliert und erst nach Smoke-Tests mit einem Verifizierungs-Badge versehen werden.
