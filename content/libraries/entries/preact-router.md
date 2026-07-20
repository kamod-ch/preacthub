---
entryType: library
name: preact-router
slug: preact-router
shortDescription: Lightweight router for classic Preact single-page applications.
category: routing
compatibilityStatus: native
typescriptSupport: native
ssrSupport: unsupported
maintenanceStatus: active
tags:
  - routing
  - spa
  - navigation
packageName: preact-router
repositoryUrl: 'https://github.com/preactjs/preact-router'
npmUrl: 'https://www.npmjs.com/package/preact-router'
documentationUrl: 'https://github.com/preactjs/preact-router'
license: MIT
installCommand: npm install preact-router
alternatives:
  - wouter-preact
  - preact-iso
featured: true
esm: true
---

## Introduction

`preact-router` stays attractive for small SPAs where you want a familiar, minimal routing API.

## Installation

```bash
npm install preact-router
```

## Preact configuration

No special setup is required beyond importing the router.

## Example

```tsx
import Router, { Route } from "preact-router";

export function App() {
  return (
    <Router>
      <Route path="/" component={() => <h1>Home</h1>} />
      <Route path="/about" component={() => <h1>About</h1>} />
    </Router>
  );
}
```

## SSR notes

This package targets client-side navigation first. SSR workflows usually prefer `preact-iso` or custom routing solutions.

## Islands notes

Not typically used as an islands-first router.

## Known limitations

The project is mature but not the best fit for newer SSR-heavy application architectures.
