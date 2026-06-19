---
entryType: library
name: preact-render-to-string
slug: preact-render-to-string
description: Official HTML rendering package for server-side rendering and static generation.
category: ssr
packageName: "preact-render-to-string"
repository: "https://github.com/preactjs/preact-render-to-string"
documentation: "https://preactjs.com/guide/v10/server-side-rendering/"
compatibility: native
status: recommended
typescript: true
ssr: true
islands: true
esm: true
license: MIT
tags:
  - ssr
  - rendering
  - html
featured: true
alternatives:
  - preact-iso
---

## Introduction

This is the canonical renderer for turning Preact components into HTML strings on the server.

## Installation

```bash
npm install preact-render-to-string
```

## Preact configuration

Import the renderer from your server entry and pass your app component directly.

## Example

```tsx
import render from "preact-render-to-string";
import { App } from "./App";

const html = render(<App />);
```

## SSR notes

This package is central to many Preact SSR and SSG setups.

## Islands notes

Useful as the server renderer in islands-oriented architectures when paired with client-side hydration boundaries.
