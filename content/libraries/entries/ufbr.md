---
entryType: library
name: ufbr
slug: ufbr
shortDescription: Client-side file-based router for Vite, with a first-party Preact adapter.
category: routing
packageName: ufbr
repositoryUrl: 'https://github.com/zakarialaoui10/ufbr'
npmUrl: 'https://www.npmjs.com/package/ufbr'
documentationUrl: 'https://ufbr.netlify.app/guides/framework-adapters/'
homepageUrl: 'https://ufbr.netlify.app/'
license: MIT
compatibilityStatus: native
typescriptSupport: bundled-types
ssrSupport: unsupported
maintenanceStatus: active
installCommand: npm install ufbr preact
testedPreactVersions:
  - 10.27.x
tags:
  - routing
  - file-based
  - vite
  - spa
limitations:
  - Route discovery depends on Vite import.meta.glob.
  - The Preact adapter renders into a DOM node and does not document server rendering or hydration.
  - preact is imported by ufbr/preact but is not declared as a peer dependency.
  - The routing engine comes from the ziko package.
lastVerifiedAt: '2026-11-14'
verificationSource: 'https://github.com/zakarialaoui10/ufbr/blob/main/packages/ufbr/src/preact/index.js'
lastReleaseAt: '2026-08-29'
lastCommitAt: '2026-09-05'
repositoryArchived: false
notes:
  - 'Evidence level: documented.'
  - 'Latest npm version checked: 1.2.0.'
  - The maintainer claimed native compatibility on Preact 10.27.x.
  - The repository Preact demo declares preact ^10.27.2 but still depends on ufbr ^0.2.1, so it does not exercise release 1.2.0.
  - Source review shows ufbr/preact imports render and createElement from preact. No runtime test was executed for this entry.
title: ufbr
description: Client-side file-based router for Vite, with a first-party Preact adapter.
featured: false
islands: false
esm: true
qualityBadges: []
alternatives:
  - preact-router
  - wouter-preact
  - preact-iso
---

## Introduction

`ufbr` builds client-side routes from a `pages/` directory. The Preact entry point is `ufbr/preact`, which mounts the matched page with Preact's `render` and `createElement`. Path matching comes from the Ziko.js router.

## Installation

```bash
npm install ufbr preact
```

`npx create-ufbr` can scaffold a Vite project and offers a Preact preset. Add `ufbr` to an existing Vite app when you already have `@preact/preset-vite` configured.

## Preact configuration

Import `createFileBasedRouter` from `ufbr/preact`. Pass the result of Vite's `import.meta.glob` as `pages` and a DOM element as `target`. A file such as `pages/hello/[name].jsx` should default-export a Preact component; the dynamic segment arrives as the `name` prop.

## Example

```jsx
// src/main.jsx
import { createFileBasedRouter } from "ufbr/preact";

const target = document.getElementById("app");

if (target) {
  createFileBasedRouter({
    pages: import.meta.glob("./pages/**/*.jsx"),
    target,
  });
}
```

## SSR notes

The adapter calls Preact `render` on a DOM node through Ziko's client-side router. The documentation describes SPA navigation and does not provide a server render or hydration API.

## Known limitations

Pages are discovered with Vite's `import.meta.glob`, so another bundler needs its own module map. Install `preact` yourself; `ufbr` 1.2.0 does not declare it as a peer dependency. The published package also depends on `ziko` for route matching.

## Alternatives

Use [preact-router](/libraries/preact-router) for explicit client routes, [wouter-preact](/libraries/wouter-preact) for a hook-based router, or [preact-iso](/libraries/preact-iso) when server rendering matters.
