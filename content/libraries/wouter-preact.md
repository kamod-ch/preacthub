---
entryType: library
name: wouter-preact
slug: wouter-preact
description: Tiny router with a hook-first API for Preact applications.
category: routing
packageName: "wouter-preact"
repository: "https://github.com/molefrog/wouter"
documentation: "https://github.com/molefrog/wouter/tree/master/packages/wouter-preact"
compatibility: native
status: stable
typescript: true
ssr: true
islands: true
esm: true
license: MIT
tags:
  - routing
  - hooks
  - tiny
featured: true
alternatives:
  - preact-router
  - preact-iso
---

## Introduction

`wouter-preact` is attractive when you want a tiny runtime and a route API based on hooks.

## Installation

```bash
npm install wouter-preact
```

## Preact configuration

Import router helpers directly from `wouter-preact`.

## Example

```tsx
import { Link, Route, Switch } from "wouter-preact";

export function App() {
  return (
    <>
      <nav><Link href="/docs">Docs</Link></nav>
      <Switch>
        <Route path="/docs">Docs page</Route>
      </Switch>
    </>
  );
}
```

## SSR notes

The package can fit SSR setups as long as you control location handling explicitly.

## Islands notes

Works well for lightweight island shells and interactive subsections.
