# PreactHub Library Research — Overview

Checked: 2026-11-04

Duplicate comparison: 180 existing PreactHub entries checked by npm package name and normalized repository URL. No duplicates found among this selection.

| Name | Category | Compatibility | Evidence level | Why include it? |
|---|---|---|---|---|
| [Zag Preact](https://github.com/chakra-ui/zag/tree/main/packages/frameworks/preact) | UI Components (`ui`) | `native` | `documented` | It adds a broad set of reusable interaction and accessibility behaviors without imposing visual styling. |
| [Mock Service Worker](https://github.com/mswjs/msw) | Testing (`testing`) | `framework-agnostic` | `inferred` | It lets teams test actual fetch behavior and reuse request handlers across browser development, unit tests and integration tests. |
| [axe-core](https://github.com/dequelabs/axe-core) | Testing (`testing`) | `framework-agnostic` | `inferred` | It provides direct, automatable feedback on accessibility regressions in the HTML that Preact actually renders. |
| [CodeMirror View](https://code.haverbeke.berlin/codemirror/view) | Editors (`editors`) | `framework-agnostic` | `inferred` | It is a mature, modular editor foundation for code, configuration, Markdown and other structured text interfaces. |
| [AutoAnimate](https://github.com/formkit/auto-animate) | Animation (`animation`) | `framework-agnostic` | `documented` | It solves common list and disclosure transitions with very little code while remaining independent of component structure. |
| [idb](https://github.com/jakearchibald/idb) | Developer Tools (`developer-tools`) | `framework-agnostic` | `inferred` | It gives Preact PWAs a compact, typed route to durable browser storage without adopting a larger database abstraction. |
| [Fluent Bundle](https://github.com/projectfluent/fluent.js) | Internationalization (`i18n`) | `framework-agnostic` | `inferred` | It offers expressive message syntax while remaining renderer-independent and usable on the client and server. |
| [SortableJS](https://github.com/SortableJS/Sortable) | UI Components (`ui`) | `framework-agnostic` | `inferred` | It covers pointer and touch reordering without requiring React-specific drag-and-drop abstractions. |
| [HLS.js](https://github.com/video-dev/hls.js) | Developer Tools (`developer-tools`) | `framework-agnostic` | `inferred` | It provides live and adaptive video support while keeping rendering based on a standard HTML video element. |
| [Ajv](https://github.com/ajv-validator/ajv) | Forms (`forms`) | `framework-agnostic` | `inferred` | It is a strong fit for generated forms and boundary validation based on JSON Schema or JTD contracts. |

## Notes

- No candidate was marked `tested`; no runtime integration test was executed during this research.
- `native` and explicitly documented integrations: Zag Preact.
- AutoAnimate is framework-agnostic but has an official Preact usage section.
- The remaining framework-agnostic candidates are supported by package dependencies, source architecture and documented DOM or JavaScript integration paths.
