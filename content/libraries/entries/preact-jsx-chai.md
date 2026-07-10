---
entryType: library
name: 'preact-jsx-chai'
slug: preact-jsx-chai
description: 'Chai assertions for checking Preact JSX output in tests.'
category: testing
packageName: 'preact-jsx-chai'
compatibility: native
status: stable
typescript: false
ssr: false
islands: false
esm: false
tags:
  - testing
  - assertions
  - jsx
---

## Introduction

preact-jsx-chai is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install preact-jsx-chai
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>preact-jsx-chai can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

SSR support should be treated cautiously; load this library on the client when it depends on browser APIs.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
