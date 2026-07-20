---
entryType: library
name: Preact Signals
slug: preact-signals
shortDescription: Fine-grained reactive state primitives built by the Preact team.
category: state-management
compatibilityStatus: native
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - signals
  - state
  - reactivity
packageName: '@preact/signals'
repositoryUrl: 'https://github.com/preactjs/signals'
npmUrl: 'https://www.npmjs.com/package/%40preact%2Fsignals'
documentationUrl: 'https://preactjs.com/guide/v10/signals/'
homepageUrl: 'https://preactjs.com'
license: MIT
installCommand: npm install @preact/signals
alternatives:
  - nanostores
  - zustand
featured: true
islands: true
esm: true
qualityBadges:
  - ssr-ready
  - signals-compatible
  - tree-shakeable
  - docs-complete
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
