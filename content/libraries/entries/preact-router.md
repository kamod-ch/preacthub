---
entryType: library
name: preact-router
slug: preact-router
description: Lightweight router for classic Preact single-page applications.
category: routing
packageName: "preact-router"
repository: "https://github.com/preactjs/preact-router"
documentation: "https://github.com/preactjs/preact-router"
compatibility: native
status: stable
typescript: true
ssr: false
islands: false
esm: true
license: MIT
tags:
  - routing
  - spa
  - navigation
featured: true
alternatives:
  - wouter-preact
  - preact-iso
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
