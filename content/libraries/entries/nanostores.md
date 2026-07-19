---
entryType: library
name: Nanostores
slug: nanostores
shortDescription: Tiny state manager with optional framework adapters and a small mental model.
category: state-management
compatibilityStatus: unverified
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - stores
  - state-management
  - tiny
packageName: nanostores
repositoryUrl: 'https://github.com/nanostores/nanostores'
npmUrl: 'https://www.npmjs.com/package/nanostores'
documentationUrl: 'https://nanostores.github.io/nanostores/'
homepageUrl: 'https://nanostores.github.io/nanostores/'
license: MIT
installCommand: npm install nanostores
alternatives:
  - preact-signals
  - zustand
featured: true
islands: true
esm: true
---

## Introduction

Nanostores is often considered when you want a small store abstraction with framework adapters around it.

## Installation

```bash
npm install nanostores
```

## Preact configuration

Review the exact adapter and subscription approach you plan to use in Preact before treating it as verified.

## Example

```ts
import { atom } from "nanostores";

export const $count = atom(0);
$count.set($count.get() + 1);
```

## SSR notes

Create store instances carefully in SSR contexts to avoid request leakage.

## Islands notes

When using this library inside an island, keep browser-specific setup inside the island component or an effect, and pass only serializable props from the server-rendered page.
