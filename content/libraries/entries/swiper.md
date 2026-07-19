---
entryType: library
name: Swiper
slug: swiper
shortDescription: Slider package with web component and JavaScript APIs usable from Preact.
category: ui
compatibilityStatus: native
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - slider
  - carousel
packageName: swiper
npmUrl: 'https://www.npmjs.com/package/swiper'
installCommand: npm install swiper
islands: true
esm: true
---

## Introduction

Swiper is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install swiper
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>Swiper can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

Swiper can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
