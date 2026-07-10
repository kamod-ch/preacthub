---
entryType: library
name: Zustand
slug: zustand
description: Small store-based state management library with selector-friendly APIs.
category: state-management
packageName: "zustand"
repository: "https://github.com/pmndrs/zustand"
documentation: "https://zustand.docs.pmnd.rs/"
homepage: "https://zustand.docs.pmnd.rs/"
compatibility: unknown
status: stable
typescript: true
ssr: true
islands: true
esm: true
license: MIT
tags:
  - state-management
  - stores
  - selectors
alternatives:
  - preact-signals
  - nanostores
---

## Introduction

Zustand offers a straightforward store model that many React teams already know.

## Installation

```bash
npm install zustand
```

## Preact configuration

Most Preact usage relies on `preact/compat`, so exact compatibility should be verified per application.

## Example

```tsx
import { create } from "zustand";

const useStore = create<{ count: number; inc: () => void }>((set) => ({
  count: 0,
  inc: () => set((state) => ({ count: state.count + 1 })),
}));

export function Counter() {
  const { count, inc } = useStore();
  return <button onClick={inc}>Count: {count}</button>;
}
```

## SSR notes

Be careful with shared store instances on the server.

## Islands notes

When using this library inside an island, keep browser-specific setup inside the island component or an effect, and pass only serializable props from the server-rendered page.
