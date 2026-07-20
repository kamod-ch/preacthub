---
entryType: library
name: Preact Signals Core
slug: preact-signals-core
shortDescription: Framework-agnostic signals primitives used by Preact Signals.
category: state-management
compatibilityStatus: native
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - signals
  - state
  - framework-agnostic
packageName: '@preact/signals-core'
npmUrl: 'https://www.npmjs.com/package/%40preact%2Fsignals-core'
installCommand: npm install @preact/signals-core
islands: true
esm: true
---

## Introduction

Preact Signals Core is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install @preact/signals-core
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>Preact Signals Core can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

Preact Signals Core can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
