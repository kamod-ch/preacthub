---
entryType: library
name: Storeon
slug: storeon
shortDescription: Event-based state manager with a small footprint.
category: state-management
compatibilityStatus: native
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - state
  - events
packageName: storeon
npmUrl: 'https://www.npmjs.com/package/storeon'
installCommand: npm install storeon
islands: true
esm: true
---

## Introduction

Storeon is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install storeon
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>Storeon can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

Storeon can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
