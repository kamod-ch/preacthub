---
entryType: library
name: Floating UI
slug: floating-ui
description: Positioning toolkit for tooltips, popovers and anchored overlays.
category: ui
packageName: "@floating-ui/dom"
repository: "https://github.com/floating-ui/floating-ui"
documentation: "https://floating-ui.com"
homepage: "https://floating-ui.com"
compatibility: partial
status: stable
typescript: true
ssr: false
islands: true
esm: true
license: MIT
tags:
  - ui
  - overlays
  - positioning
alternatives:
  - react-aria
featured: true
---

## Introduction

Floating UI is especially relevant for tooltips, dropdowns and popovers because its DOM primitives are framework-agnostic.

## Installation

```bash
npm install @floating-ui/dom
```

## Preact configuration

The DOM package can be used directly without React bindings.

## Example

```ts
import { computePosition } from "@floating-ui/dom";

await computePosition(buttonEl, tooltipEl, { placement: "bottom-start" });
```

## SSR notes

Position calculations happen in the browser, so render a sensible static fallback on the server.

## Islands notes

A strong fit for small interactive overlays inside otherwise static pages.
