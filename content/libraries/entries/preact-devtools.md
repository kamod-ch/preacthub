---
entryType: library
name: Preact DevTools
slug: preact-devtools
description: Development-time inspection helpers for Preact component trees.
category: developer-tools
packageName: "preact/devtools"
repository: "https://github.com/preactjs/preact"
documentation: "https://preactjs.com/guide/v10/devtools/"
compatibility: native
status: experimental
typescript: false
ssr: false
islands: true
esm: true
license: MIT
tags:
  - devtools
  - debugging
  - inspection
alternatives:
  - prefresh
---

## Introduction

DevTools support helps inspect component trees and state changes while debugging Preact applications.

## Installation

```bash
npm install preact
```

## Preact configuration

Import the devtools entry during development only.

## Example

```tsx
if (import.meta.env.DEV) {
  await import("preact/devtools");
}
```

## SSR notes

Development-only tooling.

## Islands notes

Helpful when debugging isolated interactive widgets.
