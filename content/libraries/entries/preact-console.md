---
entryType: library
name: Preact console
title: "Preact console"
slug: preact-console
description: "Preact components that render console-style log, warning, and table output by mounting ZikoJS console elements in the page."
shortDescription: "Preact components that render console-style log, warning, and table output by mounting ZikoJS console elements in the page."
category: ui
compatibilityStatus: experimental
maintenanceStatus: active
typescriptSupport: bundled-types
ssrSupport: unsupported
packageName: "@zikojs/preact-console"
repositoryUrl: "https://github.com/zikojs/console/tree/main/packages/integrations/preact"
documentationUrl: "https://github.com/zikojs/console/blob/main/packages/integrations/preact/README.md"
homepageUrl: "https://github.com/zikojs/console"
npmUrl: "https://www.npmjs.com/package/@zikojs/preact-console"
license: MIT
installCommand: "npm install @zikojs/preact-console preact"
testedPreactVersions:
  - 10.27.x
lastVerifiedAt: "2026-11-14"
verificationSource: "https://github.com/zikojs/console/blob/main/packages/integrations/preact/src/main.jsx"
lastReleaseAt: "2026-11-12"
lastCommitAt: "2026-11-12"
repositoryArchived: false
featured: false
islands: true
esm: true
tags:
  - console
  - zikojs
  - playground
limitations:
  - "0.5.2 publishes a test script that exits immediately, and runtime dependencies float on `ziko: latest`."
  - "Each method renders through `ZikoWrapper`, which appends DOM nodes in `useEffect`, so server HTML does not include the console output."
  - "The maintainer reported Preact 10.27.x. `@zikojs/preact` peers `preact: latest` and this package does not pin or test a Preact range."
qualityBadges: []
alternatives: []
notes:
  - "Evidence level: source and npm review. PreactHub did not execute the component on Preact 10.27.x."
  - "Latest npm version checked: 0.5.2."
  - "Maintainer claimed native compatibility. Catalog status is experimental because output depends on the ZikoJS Preact wrapper rather than Preact VNodes."
---

## Introduction

`@zikojs/preact-console` exposes `Console.log`, `Console.info`, `Console.warn`, `Console.debug`, `Console.error`, and `Console.table` as Preact components. Each method forwards its children to `@zikojs/console` and mounts the result with [`ZikoWrapper`](/libraries/zikojs-preact) from `@zikojs/preact`. The public API does not use `preact/compat`.

The package is aimed at playgrounds, notebooks, documentation, and other in-app views that want console-like output in the page instead of the browser devtools console.

## Installation

```bash
npm install @zikojs/preact-console preact
```

`preact` is required because `@zikojs/preact` declares it as a peer dependency. `@zikojs/preact-console` also installs `@zikojs/console` and `ziko`.

## Preact configuration

No `preact/compat` alias is required. The default entry imports `@zikojs/console/style`. Import `@zikojs/preact-console/no-css` when the app should load `@zikojs/preact-console/style` itself.

Keep a single Preact copy in the bundle. `@zikojs/preact` 0.4.0 peers `preact` instead of depending on it, but `ziko` is specified as `latest`, so lockfile review still matters.

## Example

```tsx
import { Console } from "@zikojs/preact-console";

export function PlaygroundOutput() {
  return (
    <div>
      <Console.log>Application started</Console.log>
      <Console.warn>Something may require your attention</Console.warn>
      <Console.table>
        {[
          { name: "Alice", score: 95 },
          { name: "Bob", score: 87 },
        ]}
      </Console.table>
    </div>
  );
}
```

Children are inspection values. Objects and arrays are passed through to the Ziko console renderer rather than rendered as Preact elements.

## SSR notes

`ZikoWrapper` returns an empty `display: contents` container and appends Ziko DOM nodes from `useEffect` after clearing `innerHTML`. Server-rendered HTML does not contain the formatted log, warning, or table. Treat the output as client-only.

## Islands notes

Each `Console.*` method is its own `ZikoWrapper`, so each block is a client island. Place these components inside an island boundary when the surrounding page is server-rendered.

## Known limitations

Version 0.5.2 has no real test suite. Installs can move `ziko` without a new `@zikojs/preact-console` release because that dependency is `latest`. The README documents `log`, `warn`, and `table`; `info`, `debug`, and `error` are also exported by the source and the bundled declarations. The styling section in the README is commented out.

The maintainer reported testing with Preact 10.27.x. PreactHub reviewed the published source and npm metadata on 2026-11-14 and did not run that version.

## Alternatives

This is a display component, not a debugger. For development-time component inspection, see [Preact DevTools](/libraries/preact-devtools). The mount path is the [ZikoJS Preact](/libraries/zikojs-preact) adapter.
