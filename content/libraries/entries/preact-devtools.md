---
entryType: library
name: Preact DevTools
slug: preact-devtools
shortDescription: Development-time inspection helpers for Preact component trees.
category: developer-tools
compatibilityStatus: experimental
typescriptSupport: none
ssrSupport: unsupported
maintenanceStatus: active
tags:
  - devtools
  - debugging
  - inspection
packageName: preact/devtools
repositoryUrl: 'https://github.com/preactjs/preact'
npmUrl: 'https://www.npmjs.com/package/preact%2Fdevtools'
documentationUrl: 'https://preactjs.com/guide/v10/devtools/'
license: MIT
installCommand: npm install preact/devtools
alternatives:
  - prefresh
islands: true
esm: true
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
