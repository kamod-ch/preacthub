---
entryType: library
name: '@iconify-icon/react'
slug: iconify-icon-react
description: 'Iconify component package relevant through React compatibility and web components.'
category: ui
packageName: '@iconify-icon/react'
compatibility: compat
status: stable
typescript: true
ssr: true
islands: true
esm: true
tags:
  - icons
  - iconify
---

## Introduction

@iconify-icon/react is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install @iconify-icon/react
```

## Preact configuration

Use the React-facing package with `preact/compat` aliases and verify hooks or context-heavy usage in your app.

## Example

```tsx
export function Example() {
  return <section>@iconify-icon/react can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

@iconify-icon/react can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
