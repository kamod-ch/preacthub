---
entryType: library
name: Preact Signals
slug: preact-signals
description: Fine-grained reactive state primitives built by the Preact team.
category: state-management
packageName: "@preact/signals"
repository: "https://github.com/preactjs/signals"
documentation: "https://preactjs.com/guide/v10/signals/"
homepage: "https://preactjs.com"
compatibility: native
status: recommended
typescript: true
ssr: true
islands: true
esm: true
license: MIT
tags:
  - signals
  - state
  - reactivity
featured: true
alternatives:
  - nanostores
  - zustand
---

## Introduction

Preact Signals is the default recommendation for shared and local reactive state in modern Preact applications.

## Installation

```bash
npm install @preact/signals
```

## Preact configuration

No compatibility layer is required.

## Example

```tsx
import { signal } from "@preact/signals";

const count = signal(0);

export function Counter() {
  return <button onClick={() => count.value++}>Count: {count}</button>;
}
```

## SSR notes

Signals work well during SSR because values can be read synchronously while rendering.

## Islands notes

Signals are useful for island-style composition because isolated widgets can subscribe only to the values they need.

## Known limitations

Signals are intentionally small. You may still want a dedicated async-state or form library for specialized workflows.

## Alternatives

Consider [Nanostores](/libraries/nanostores) or [Zustand](/libraries/zustand) if you prefer store-oriented APIs.
