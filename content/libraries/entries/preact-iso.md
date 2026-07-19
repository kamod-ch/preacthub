---
entryType: library
name: preact-iso
slug: preact-iso
shortDescription: >-
  Small toolkit for routing, lazy loading and server rendering patterns in
  Preact apps.
category: ssr
compatibilityStatus: native
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - ssr
  - routing
  - islands
packageName: preact-iso
repositoryUrl: 'https://github.com/preactjs/wmr/tree/main/packages/preact-iso'
npmUrl: 'https://www.npmjs.com/package/preact-iso'
documentationUrl: 'https://github.com/preactjs/wmr/tree/main/packages/preact-iso'
license: MIT
installCommand: npm install preact-iso
alternatives:
  - preact-router
  - preact-render-to-string
featured: true
islands: true
esm: true
---

## Introduction

`preact-iso` bundles common primitives for file-light Preact app architecture, especially when SSR and lazy routes matter.

## Installation

```bash
npm install preact-iso
```

## Preact configuration

Use its router and hydration helpers directly rather than mixing multiple small packages.

## Example

```tsx
import { LocationProvider, Router, Route } from "preact-iso";

export function App() {
  return (
    <LocationProvider>
      <Router>
        <Route path="/" component={() => <h1>Home</h1>} />
      </Router>
    </LocationProvider>
  );
}
```

## SSR notes

Designed for universal rendering patterns.

## Islands notes

A strong starting point when you want server-rendered shells with progressive client behavior.
