---
entryType: library
name: 'Tailwind CSS'
slug: tailwind-css
description: 'Utility-first CSS framework that pairs naturally with Preact.'
category: developer-tools
packageName: 'tailwindcss'
compatibility: native
status: recommended
typescript: true
ssr: true
islands: true
esm: true
tags:
  - css
  - styling
---

## Introduction

Tailwind CSS is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install tailwindcss
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>Tailwind CSS can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

Tailwind CSS can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
