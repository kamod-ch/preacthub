---
entryType: library
name: 'preact-transition-group'
slug: preact-transition-group
description: 'Transition components for enter and leave animations in Preact.'
category: animation
packageName: 'preact-transition-group'
compatibility: native
status: stable
typescript: false
ssr: false
islands: true
esm: true
tags:
  - animation
  - transitions
---

## Introduction

preact-transition-group is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install preact-transition-group
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>preact-transition-group can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

SSR support should be treated cautiously; load this library on the client when it depends on browser APIs.

## Islands notes

preact-transition-group can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
