---
entryType: library
name: 'nano-jsx'
slug: nano-jsx
description: 'Small JSX/VDOM alternative useful as a comparison point.'
category: developer-tools
packageName: 'nano-jsx'
compatibility: partial
status: stable
typescript: true
ssr: true
islands: true
esm: true
tags:
  - vdom
  - jsx
  - alternative
---

## Introduction

nano-jsx is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install nano-jsx
```

## Preact configuration

Treat this as a compatibility candidate: start with `preact/compat`, then test interactions, SSR and bundle output.

## Example

```tsx
export function Example() {
  return <section>nano-jsx can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

nano-jsx can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
