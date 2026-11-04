---
entryType: library
name: wouter-preact
title: "wouter-preact"
slug: wouter-preact
description: "Tiny router with a hook-first API for Preact applications."
shortDescription: Tiny router with a hook-first API for Preact applications.
category: routing
compatibilityStatus: native
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - routing
  - hooks
  - tiny
packageName: wouter-preact
repositoryUrl: 'https://github.com/molefrog/wouter'
npmUrl: 'https://www.npmjs.com/package/wouter-preact'
documentationUrl: 'https://github.com/molefrog/wouter/tree/master/packages/wouter-preact'
license: MIT
installCommand: npm install wouter-preact
alternatives:
  - preact-router
  - preact-iso
featured: true
islands: true
esm: true
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
      <nav><Link href="/libraries">Libraries</Link></nav>
      <Switch>
        <Route path="/libraries">Library directory</Route>
      </Switch>
    </>
  );
}
```

## SSR notes

The package can fit SSR setups as long as you control location handling explicitly.

## Islands notes

Works well for lightweight island shells and interactive subsections.
