---
entryType: library
name: Floating UI
slug: floating-ui
shortDescription: 'Positioning toolkit for tooltips, popovers and anchored overlays.'
category: ui
compatibilityStatus: experimental
typescriptSupport: native
ssrSupport: unsupported
maintenanceStatus: active
tags:
  - ui
  - overlays
  - positioning
packageName: '@floating-ui/dom'
repositoryUrl: 'https://github.com/floating-ui/floating-ui'
npmUrl: 'https://www.npmjs.com/package/%40floating-ui%2Fdom'
documentationUrl: 'https://floating-ui.com'
homepageUrl: 'https://floating-ui.com'
license: MIT
installCommand: npm install @floating-ui/dom
alternatives:
  - react-aria
featured: true
islands: true
esm: true
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
