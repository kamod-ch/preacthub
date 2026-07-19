---
entryType: library
name: preact-redux
slug: preact-redux
shortDescription: Redux bindings tailored for Preact applications.
category: state-management
compatibilityStatus: native
typescriptSupport: none
ssrSupport: supported
maintenanceStatus: active
tags:
  - redux
  - state
packageName: preact-redux
npmUrl: 'https://www.npmjs.com/package/preact-redux'
installCommand: npm install preact-redux
islands: true
esm: true
---

## Introduction

preact-redux is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install preact-redux
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>preact-redux can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

preact-redux can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
