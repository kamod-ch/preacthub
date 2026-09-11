---
entryType: library
name: 'Pracht Vite Plugin'
slug: 'pracht-vite-plugin'
shortDescription: 'Vite plugin for Pracht virtual modules, multi-environment builds, and SSG prerendering.'
category: 'build-tools'
compatibilityStatus: 'native'
maintenanceStatus: 'active'
typescriptSupport: 'native'
ssrSupport: 'supported'
packageName: '@pracht/vite-plugin'
repositoryUrl: 'https://github.com/JoviDeCroock/pracht/tree/main/packages/vite-plugin'
documentationUrl: 'https://github.com/JoviDeCroock/pracht/tree/main/packages/vite-plugin'
homepageUrl: 'https://github.com/JoviDeCroock/pracht/tree/main/packages/vite-plugin'
npmUrl: 'https://www.npmjs.com/package/@pracht/vite-plugin'
license: 'MIT'
installCommand: 'npm install @pracht/vite-plugin'
featured: false
islands: false
esm: true
tags:
  - vite
  - pracht
  - ssr
  - prerender
limitations:
  - 'Requires Vite ^8.0.0 as a peer dependency.'
  - 'Experimental `@pracht/preact-ssr-precompile` JSX transform is opt-in and should be benchmarked before broad enablement.'
qualityBadges: []
alternatives:
  - preact-preset-vite
  - preact-iso
---

## Introduction

`@pracht/vite-plugin` integrates [Pracht](https://github.com/JoviDeCroock/pracht) with Vite: virtual modules (`virtual:pracht/client`, `virtual:pracht/server`), multi-environment client/SSR bundles, SSG prerendering, and dev HMR.

## Installation

```bash
npm install @pracht/vite-plugin
```

## Preact configuration

Register the plugin in `vite.config.ts`. Pair with a Pracht adapter package (`@pracht/adapter-node`, `@pracht/adapter-cloudflare`, etc.) for deployment targets.

## Example

```ts
import { defineConfig } from "vite";
import { pracht } from "@pracht/vite-plugin";

export default defineConfig({
  plugins: [pracht()],
});
```

Opt into experimental SSR JSX precompile:

```ts
export default defineConfig({
  plugins: [pracht({ precompileSsrJsx: true })],
});
```

## SSR notes

Builds separate client and SSR bundles via Vite multi-environment mode and prerenders SSG/ISG routes at build time (`prerenderConcurrency` controls parallelism). Client bundles keep the normal Preact JSX transform for hydration.

## Islands notes

Pracht route model determines client islands; the Vite plugin emits the virtual modules and prerender artifacts your adapter serves.

## Known limitations

SSR precompile transforms safe HTML subtrees into `jsxTemplate()` calls—keep it opt-in until validated on SSR-heavy pages. TSRX routes may require `additionalExtensions: [".tsrx"]` alongside `@tsrx/vite-plugin-preact`.

## Alternatives

Standalone Vite Preact setups often use [@preact/preset-vite](/libraries/preact-preset-vite); lighter SSR routing is available via [Preact ISO](/libraries/preact-iso).

