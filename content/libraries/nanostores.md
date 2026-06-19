---
entryType: library
name: Nanostores
slug: nanostores
description: Tiny state manager with optional framework adapters and a small mental model.
category: state-management
packageName: "nanostores"
repository: "https://github.com/nanostores/nanostores"
documentation: "https://nanostores.github.io/nanostores/"
homepage: "https://nanostores.github.io/nanostores/"
compatibility: unknown
status: stable
typescript: true
ssr: true
islands: true
esm: true
license: MIT
tags:
  - stores
  - state-management
  - tiny
featured: true
alternatives:
  - preact-signals
  - zustand
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
