---
entryType: library
name: Prefresh
slug: prefresh
description: Fast refresh support for local Preact development workflows.
category: developer-tools
packageName: "@prefresh/vite"
repository: "https://github.com/preactjs/prefresh"
documentation: "https://github.com/preactjs/prefresh"
compatibility: native
status: stable
typescript: true
ssr: false
islands: false
esm: true
license: MIT
tags:
  - vite
  - hmr
  - developer-experience
alternatives:
  - preact-devtools
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
