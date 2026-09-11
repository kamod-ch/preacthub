# PreactHub candidate import source

This file is the machine-readable source for importing candidates into `kamod-ch/preacthub`.

```yaml
schemaVersion: 1
generatedAt: 2026-09-11
reportPeriod: 2026-08-22..2026-09-11
expectedCandidateCount: 200
includedCandidateCount: 40
complete: false
includedReports: [2026-09-08, 2026-09-09, 2026-09-10, 2026-09-11]
missingReports: 2026-08-22..2026-09-07
```

Priority: **1** = import soon, **2** = useful, **3** = specialized, young or experimental.

The claims below come from the daily reports. They are leads, not completed technical verification. Do not set `lastVerifiedAt`, `testedPreactVersions`, `verificationSource` or quality badges without actual verification.

## Candidates

| # | Date | Priority | Package/name | Reported category | Repository | Documentation / npm | Reported compatibility and limitation |
|---:|---|---:|---|---|---|---|---|
| 1 | 2026-09-08 | 1 | `@gridsheet/preact-core` | Data Grid / Spreadsheet | https://github.com/walkframe/gridsheet | https://gridsheet.walkframe.com/ · https://www.npmjs.com/package/@gridsheet/preact-core | Official Preact renderer, reportedly with Preact peer dependency; verify API and SSR. |
| 2 | 2026-09-08 | 1 | `@clean-jsdoc-theme/rang` | Documentation UI / Islands | https://github.com/ankitskvmdam/clean-jsdoc-theme | https://github.com/ankitskvmdam/clean-jsdoc-theme/blob/master/docs/ARCHITECTURE.md · https://www.npmjs.com/package/@clean-jsdoc-theme/rang | Native Preact with SSR chrome and islands; determine reuse outside Clean JSDoc. |
| 3 | 2026-09-08 | 1 | `@lynx-js/react-signals` | Mobile / Signals | https://github.com/lynx-family/lynx-stack/tree/main/packages/react-signals | https://www.npmjs.com/package/@lynx-js/react-signals | Preact peer and Signals integration for ReactLynx; not for normal browser apps. |
| 4 | 2026-09-08 | 2 | `@dillingerstaffing/strand-ui` | UI / Design System | https://github.com/dillingerstaffing/strand/tree/main/packages/strand-ui | https://dillingerstaffing.com/labs/strand · https://www.npmjs.com/package/@dillingerstaffing/strand-ui | Shared Preact/React component library; WCAG claim must remain attributed to vendor. |
| 5 | 2026-09-08 | 2 | `@peter.naydenov/visual-controller-for-preact` | Microfrontends | https://github.com/PeterNaydenov/visual-controller-for-preact | https://www.npmjs.com/package/@peter.naydenov/visual-controller-for-preact | Preact-native controller for multiple roots; verify lifecycle and SSR constraints. |
| 6 | 2026-09-08 | 2 | `@zikojs/preact` | Framework Interoperability | https://github.com/zikojs/integrations/tree/main/packages/preact | https://www.npmjs.com/package/@zikojs/preact | Dedicated adapter; beta and reportedly uses direct Preact dependency, risking duplicate runtimes. |
| 7 | 2026-09-08 | 2 | `preact-browser-bundle` | Distribution / No-build | https://github.com/linfx7/preact-browser-bundle | https://www.npmjs.com/package/preact-browser-bundle | Bundles Preact, HTM and Signals; catalog as distribution/tool, not normal dependency. |
| 8 | 2026-09-08 | 3 | `oc-template-preact-compiler` | OpenComponents | https://github.com/opencomponents/vite-templates | https://www.npmjs.com/package/oc-template-preact-compiler | Official Preact compiler in OC templates; only useful in OpenComponents architecture. |
| 9 | 2026-09-08 | 3 | `@sometic/preact` | State Adapter | https://github.com/aitistack/sometic | https://sometic.dev/frameworks/preact · https://www.npmjs.com/package/@sometic/preact | Thin Preact binding exposing `createPreactStoreBind`; young, not a full store. |
| 10 | 2026-09-08 | 3 | `@allurereport/web-components` | Testing / Report UI | https://github.com/allure-framework/allure3 | https://allurereport.org/ · https://www.npmjs.com/package/@allurereport/web-components | Preact/Signals UI with some compat usage; tightly coupled to Allure and heavyweight. |
| 11 | 2026-09-09 | 1 | `@formepdf/preact` | PDF / Document UI | https://github.com/danmolitor/forme | https://formepdf.com/ · https://www.npmjs.com/package/@formepdf/preact | Official native Preact adapter; verify which advanced PDF features are exposed. |
| 12 | 2026-09-09 | 1 | `@tanstack/charts/preact` | Charts | https://github.com/TanStack/charts | https://tanstack.com/charts/latest/docs/framework/preact/adapter | Official Preact export; likely import path of `@tanstack/charts`, not a separate npm package—confirm canonical packageName. |
| 13 | 2026-09-09 | 1 | `praxis-kit` | Developer Tools / Accessibility | https://github.com/slowebworkz/praxis-kit | https://github.com/slowebworkz/praxis-kit/blob/develop/GETTING_STARTED.md · https://www.npmjs.com/package/praxis-kit | Provides `praxis-kit/preact`; brand-new project, classify experimental until tested. |
| 14 | 2026-09-09 | 2 | `@longsightgroup/qti3-player-preact` | Education / Assessment | https://github.com/LongsightGroup/qti3 | https://github.com/LongsightGroup/qti3/tree/main/packages/player-preact · https://www.npmjs.com/package/@longsightgroup/qti3-player-preact | Official adapter for QTI custom element; reportedly not yet 1EdTech certified. |
| 15 | 2026-09-09 | 2 | `@public-ui/preact` | Accessible UI / Web Components | https://github.com/public-ui/kolibri | https://public-ui.github.io/en/docs/get-started/frameworks · https://www.npmjs.com/package/@public-ui/preact | Official KoliBri adapter; verify registration and theme requirements. |
| 16 | 2026-09-09 | 2 | `@oracle/oraclejet-preact` | Enterprise UI | https://github.com/oracle/oraclejet | https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html · https://www.npmjs.com/package/@oracle/oraclejet-preact | Direct Preact implementation; strongly tied to Oracle JET/Redwood infrastructure. |
| 17 | 2026-09-09 | 2 | `@neutron-build/core` | Full-stack SSR | https://github.com/neutron-build/neutron | https://neutron.build/docs · https://www.npmjs.com/package/@neutron-build/core | Preact rendering layer with Hono and islands; young, classify experimental. |
| 18 | 2026-09-09 | 2 | `@pracht/test` | Testing / Framework Utility | https://github.com/JoviDeCroock/pracht | https://github.com/JoviDeCroock/pracht/tree/main/packages/test · https://www.npmjs.com/package/@pracht/test | First-party Pracht testing package; consider enriching Pracht entry instead of standalone entry. |
| 19 | 2026-09-09 | 3 | `@tuqulore-inc/eleventy-plugin-preact-island` | SSG / Islands | https://github.com/tuqulore/website-boilerplate | https://github.com/tuqulore/website-boilerplate/tree/main/packages/eleventy-plugin-preact-island · https://www.npmjs.com/package/@tuqulore-inc/eleventy-plugin-preact-island | Dedicated Preact islands plugin; small community and mostly Japanese docs. |
| 20 | 2026-09-09 | 3 | `cincin-preact` | UI Feedback / Toasts | https://github.com/nbarinov/cincin | https://cincin.nbarinov.io/ · https://www.npmjs.com/package/cincin-preact | Dedicated Preact toast adapter; early version and limited adoption. |
| 21 | 2026-09-10 | 1 | `@rsbuild/plugin-preact` | Build Tools / Rsbuild | https://github.com/web-infra-dev/rsbuild/tree/main/packages/plugin-preact | https://rsbuild.rs/plugins/list/plugin-preact · https://www.npmjs.com/package/@rsbuild/plugin-preact | Official Rsbuild plugin using Prefresh; verify current configuration. |
| 22 | 2026-09-10 | 1 | `vitest-browser-preact` | Testing / Browser | https://github.com/JoviDeCroock/vitest-browser-preact | https://www.npmjs.com/package/vitest-browser-preact | Native browser-context renderer for Preact VNodes; verify providers and cleanup. |
| 23 | 2026-09-10 | 1 | `@monza-editor/preact` | Editors / Code Input | https://github.com/raviqqe/monza-editor | https://www.npmjs.com/package/@monza-editor/preact | Dedicated lightweight Preact editor; syntax highlighting supplied externally. |
| 24 | 2026-09-10 | 2 | `@prosekit/preact` | Editors / Rich Text | https://github.com/prosekit/prosekit/tree/master/packages/preact | https://prosekit.dev/ · https://www.npmjs.com/package/@prosekit/preact | Official ProseMirror-based Preact adapter; substantially larger than simple editors. |
| 25 | 2026-09-10 | 2 | `@swc/plugin-prefresh` | Compiler / HMR | https://github.com/swc-project/plugins/tree/main/packages/prefresh | https://www.npmjs.com/package/@swc/plugin-prefresh | Official SWC Prefresh plugin; mainly relevant to custom toolchains. |
| 26 | 2026-09-10 | 2 | `@deepgram/agents-widget` | AI / Voice Agents | https://github.com/deepgram/agent/tree/main/packages/widget | https://www.npmjs.com/package/@deepgram/agents-widget | Preact bundled internally with some compat usage; Deepgram-bound and browser keys require strong warning. |
| 27 | 2026-09-10 | 2 | `@pracht/vite-plugin` | Build Tools / Full-stack | https://github.com/JoviDeCroock/pracht | https://github.com/JoviDeCroock/pracht/tree/main/packages/vite-plugin · https://www.npmjs.com/package/@pracht/vite-plugin | First-party Pracht plugin; enrich project entry; SSR precompile reportedly experimental. |
| 28 | 2026-09-10 | 2 | `@tsrx/vite-plugin-preact` | Build Tools / SFC | https://github.com/tsrx-org/tsrx | https://github.com/tsrx-org/tsrx/tree/main/packages/vite-plugin-preact · https://www.npmjs.com/package/@tsrx/vite-plugin-preact | Official Vite integration for Preact TSRX compiler; ecosystem remains beta. |
| 29 | 2026-09-10 | 3 | `@mauroandre/velojs` | Full-stack SSR | https://github.com/mauro-andre/velojs | https://www.npmjs.com/package/@mauroandre/velojs | Preact client/SSR with Hono server; very early and small community. |
| 30 | 2026-09-10 | 3 | `@klunqlabs/klunq-widget` | AI / Embedded Chat | https://github.com/klunqlabs/klunq-widget | https://www.npmjs.com/package/@klunqlabs/klunq-widget | Preact UI mounted independently; direct browser configuration can expose API keys. |
| 31 | 2026-09-11 | 1 | `@xstate/store-preact` | State Management | https://github.com/statelyai/xstate/tree/main/packages/xstate-store-preact | https://stately.ai/docs/xstate-store · https://www.npmjs.com/package/@xstate/store-preact | Official Preact store adapter; decide relationship to existing XState entry. |
| 32 | 2026-09-11 | 1 | `extension` | Browser Extensions | https://github.com/extension-js/extension.js | https://extension.js.org/ · https://www.npmjs.com/package/extension | Detects Preact and has refresh shim; Preact is one supported frontend option. |
| 33 | 2026-09-11 | 1 | `mixed-signals` | Signals / RPC | https://github.com/developit/mixed-signals | https://www.npmjs.com/package/mixed-signals | Built on Signals Core for cross-context state; verify transports and reconnection. |
| 34 | 2026-09-11 | 1 | `@css-hooks/preact` | Styling | https://github.com/css-hooks/css-hooks | https://www.npmjs.com/package/@css-hooks/preact | Dedicated Preact adapter; verify SSR, hydration and browser support. |
| 35 | 2026-09-11 | 2 | `@preliquify/preact` | E-Commerce / Shopify | https://github.com/MichaelNusair/preliquify | https://github.com/MichaelNusair/preliquify/tree/main/packages/preact · https://www.npmjs.com/package/@preliquify/preact | Dedicated Preact-to-Liquid integration; specialized and older release. |
| 36 | 2026-09-11 | 2 | `@signaldb/preact` | Local-first Data / Signals | https://github.com/maxnowack/signaldb | https://signaldb.js.org/ · https://www.npmjs.com/package/@signaldb/preact | Official Signals adapter; confirm compatibility of older adapter with current core. |
| 37 | 2026-09-11 | 2 | `hello-csv` | Data Import / CSV | https://github.com/HelloCSV/HelloCSV | https://hellocsv.mintlify.app/ · https://www.npmjs.com/package/hello-csv | UI built in Preact but some React-origin dependencies; do not call fully React-free. |
| 38 | 2026-09-11 | 2 | `@nxext/preact` | Monorepos / Nx | https://github.com/nxext/nx-extensions/tree/main/packages/preact | https://nxext.dev/docs/preact/overview · https://www.npmjs.com/package/@nxext/preact | Dedicated Nx Preact plugin; verify current Nx-major compatibility. |
| 39 | 2026-09-11 | 3 | `@nifrajs/web-preact` | Streaming SSR | https://github.com/nifrajs/nifra/tree/main/packages/web-preact | https://nifra.dev/docs · https://www.npmjs.com/package/@nifrajs/web-preact | Dedicated Preact renderer; very small ecosystem, classify experimental/specialized. |
| 40 | 2026-09-11 | 3 | `hast-util-to-jsx-runtime` | Content / HAST | https://github.com/syntax-tree/hast-util-to-jsx-runtime | https://www.npmjs.com/package/hast-util-to-jsx-runtime | Official Preact JSX-runtime example; framework-neutral and especially relevant to PreactPress. |

## Reported activity snapshot

Activity/version statements from the reports should be refreshed before import:

- 2026-09-08 highlights: GridSheet 3.4.1; Rang 5.2.0; Lynx Signals 0.0.3; Strand UI 0.64.1; Visual Controller 2.0.0.
- 2026-09-09 highlights: Forme 0.21.0; TanStack Charts 0.16.2; Praxis Kit 0.1.0; QTI Player 0.10.4; Public UI 4.3.0.
- 2026-09-10 highlights: Rsbuild plugin 2.1.0; Vitest Browser Preact 1.1.0; Monza 0.6.0; ProseKit 0.8.2; SWC Prefresh 14.0.0.
- 2026-09-11 highlights: XState Store Preact 2.0.0; Extension.js 4.1.16; Mixed Signals 0.4.2; CSS Hooks 3.1.2; SignalDB adapter 1.0.0.

## Import checklist

- [ ] Add reports from 2026-08-22 through 2026-09-07.
- [ ] Confirm exactly 200 unique report candidates.
- [ ] Compare exact package names and normalized repository URLs with the current catalog.
- [ ] Decide per item: `new`, `enrich-existing`, `replace-or-redirect`, `rejected` or `needs-review`.
- [ ] Verify package existence, license, maintenance and Preact integration upstream.
- [ ] Map reported categories to current PreactHub categories or reviewed new categories.
- [ ] Import no more than 20 entries per batch.
- [ ] Run catalog validation, lint, typecheck, tests, route checks, build and scoped link checks.
