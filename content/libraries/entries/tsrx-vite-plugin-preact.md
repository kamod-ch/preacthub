---
entryType: library
name: 'TSRX Vite Plugin Preact'
slug: 'tsrx-vite-plugin-preact'
shortDescription: 'Vite plugin compiling .tsrx single-file Preact components via @tsrx/preact.'
category: 'build-tools'
compatibilityStatus: 'experimental'
maintenanceStatus: 'active'
typescriptSupport: 'native'
ssrSupport: 'supported'
packageName: '@tsrx/vite-plugin-preact'
repositoryUrl: 'https://github.com/tsrx-org/tsrx/tree/main/packages/vite-plugin-preact'
documentationUrl: 'https://github.com/tsrx-org/tsrx/tree/main/packages/vite-plugin-preact'
npmUrl: 'https://www.npmjs.com/package/@tsrx/vite-plugin-preact'
license: 'MIT'
installCommand: 'npm install -D @tsrx/vite-plugin-preact @tsrx/preact'
featured: false
islands: false
esm: true
tags:
  - vite
  - tsrx
  - sfc
limitations:
  - 'TSRX ecosystem remains beta (plugin 0.0.x); expect API movement.'
  - 'Requires companion packages `@tsrx/core` and `@tsrx/preact` pulled in as dependencies.'
qualityBadges: []
alternatives:
  - preact-preset-vite
---

## Introduction

`@tsrx/vite-plugin-preact` compiles `.tsrx` single-file Preact components through `@tsrx/preact`, emits virtual CSS modules for `<style>` blocks, and configures Vite dependency scanning for the custom extension.

## Installation

```bash
npm install -D @tsrx/vite-plugin-preact @tsrx/preact
```

## Preact configuration

Add the plugin before other JSX transforms. Default `jsxImportSource` is `preact`. When pairing with Pracht, register `additionalExtensions: [".tsrx"]` on `@pracht/vite-plugin`.

## Example

```ts
import { defineConfig } from "vite";
import { tsrxPreact } from "@tsrx/vite-plugin-preact";
import { pracht } from "@pracht/vite-plugin";

export default defineConfig({
  plugins: [tsrxPreact(), pracht({ additionalExtensions: [".tsrx"] })],
});
```

## SSR notes

Compiled `.tsrx` output uses Preact automatic JSX runtime via Oxc. Validate SSR bundles when `.tsrx` components render on the server through Pracht or custom Vite SSR entries.

## Islands notes

Build plugin only; `.tsrx` components behave like standard Preact components once compiled.

## Known limitations

Beta TSRX compiler and 0.0.x plugin versioning. Platform-specific defines are merged through `@tsrx/core`—review TSRX docs for target configuration.

## Alternatives

Standard Preact + Vite projects without `.tsrx` SFCs should use [@preact/preset-vite](/libraries/preact-preset-vite).

