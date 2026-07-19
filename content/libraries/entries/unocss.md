---
entryType: library
name: UnoCSS
slug: unocss
shortDescription: On-demand atomic CSS engine independent of UI frameworks.
category: developer-tools
compatibilityStatus: native
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - css
  - atomic
packageName: unocss
npmUrl: 'https://www.npmjs.com/package/unocss'
installCommand: npm install unocss
islands: true
esm: true
---

## Introduction

UnoCSS is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install unocss
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>UnoCSS can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

UnoCSS can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
