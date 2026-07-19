---
entryType: library
name: Prefresh
slug: prefresh
shortDescription: Fast refresh support for local Preact development workflows.
category: developer-tools
compatibilityStatus: native
typescriptSupport: native
ssrSupport: unsupported
maintenanceStatus: active
tags:
  - vite
  - hmr
  - developer-experience
packageName: '@prefresh/vite'
repositoryUrl: 'https://github.com/preactjs/prefresh'
npmUrl: 'https://www.npmjs.com/package/%40prefresh%2Fvite'
documentationUrl: 'https://github.com/preactjs/prefresh'
license: MIT
installCommand: npm install @prefresh/vite
alternatives:
  - preact-devtools
esm: true
---

## Introduction

Prefresh improves local feedback loops with component-preserving hot updates during development.

## Installation

```bash
npm install -D @prefresh/vite
```

## Preact configuration

In most Vite setups it is already included through `@preact/preset-vite`.

## Example

```ts
import preact from "@preact/preset-vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [preact()],
});
```

## SSR notes

Development-only tooling.

## Islands notes

Useful regardless of whether your app uses islands.
