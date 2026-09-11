---
entryType: library
name: 'CSS Hooks Preact'
slug: 'css-hooks-preact'
shortDescription: 'CSS-in-JS hooks for conditional inline styles in Preact components.'
category: 'developer-tools'
compatibilityStatus: 'native'
maintenanceStatus: 'active'
typescriptSupport: 'native'
ssrSupport: 'supported'
packageName: '@css-hooks/preact'
repositoryUrl: 'https://github.com/css-hooks/css-hooks'
documentationUrl: 'https://css-hooks.com'
npmUrl: 'https://www.npmjs.com/package/@css-hooks/preact'
license: 'MIT'
installCommand: 'npm install @css-hooks/preact'
featured: false
islands: true
esm: true
tags:
  - styling
  - css-in-js
  - inline-styles
limitations:
  - 'Relies on modern CSS variable features; verify browser support for your audience.'
  - 'SSR and hydration behavior should be validated when styles depend on client-only measurements.'
qualityBadges: []
---

## Introduction

CSS Hooks adds conditional styling to native Preact inline styles using CSS variables—covering pseudo-classes, selectors and container queries without runtime style injection. `@css-hooks/preact` is the dedicated Preact adapter.

## Installation

```bash
npm install @css-hooks/preact
```

## Preact configuration

Import helpers such as `pipe` and `on` from `@css-hooks/preact` and compose them inside component `style` props.

## Example

```tsx
import { pipe, on } from "@css-hooks/preact";

export function SaveButton() {
  return (
    <button
      style={pipe(
        { background: "#004982", color: "#eef0f0" },
        on("&:hover", { background: "#1b659c" }),
        on("&:active", { background: "#9f3131" }),
      )}
    >
      Save changes
    </button>
  );
}
```

## SSR notes

Inline styles serialize with the Preact element tree. Confirm container-query and pseudo-class hooks behave as expected after hydration.

## Islands notes

Hook-based styles work inside islands because they avoid global stylesheets; still scope any shared CSS variables at the island root.

## Known limitations

Upstream browser support starts at Chrome 99+, Safari 15.4+ and Firefox 97+. Complex responsive rules should be tested in target browsers.

## Alternatives

For utility-first class workflows see [Tailwind CSS](/libraries/tailwind-css) or [Panda CSS](/libraries/panda-css).

