---
entryType: library
name: 'Final Form'
slug: final-form
description: 'Framework-agnostic form state core usable from Preact.'
category: forms
packageName: 'final-form'
compatibility: native
status: stable
typescript: true
ssr: true
islands: true
esm: true
tags:
  - forms
  - state
---

## Introduction

Final Form is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install final-form
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>Final Form can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

Final Form can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
