---
entryType: library
name: 'Strand UI'
slug: 'dillingerstaffing-strand-ui'
shortDescription: 'Preact/React component library on the Strand Design Language with zero-runtime CSS.'
category: 'ui'
compatibilityStatus: 'native'
maintenanceStatus: 'active'
typescriptSupport: 'native'
ssrSupport: 'unknown'
packageName: '@dillingerstaffing/strand-ui'
repositoryUrl: 'https://github.com/dillingerstaffing/strand/tree/main/packages/strand-ui'
documentationUrl: 'https://dillingerstaffing.com/labs/strand'
homepageUrl: 'https://dillingerstaffing.com/labs/strand'
npmUrl: 'https://www.npmjs.com/package/@dillingerstaffing/strand-ui'
license: 'MIT'
installCommand: 'npm install @dillingerstaffing/strand @dillingerstaffing/strand-ui'
featured: false
islands: false
esm: true
tags:
  - design-system
  - accessibility
  - components
limitations:
  - 'Upstream marketing claims WCAG 2.2 AA conformance for the Strand Design Language; validate against your product requirements rather than treating this as independent certification.'
  - 'Requires separate CSS imports from @dillingerstaffing/strand and @dillingerstaffing/strand-ui entry stylesheets.'
qualityBadges: []
alternatives:
  - kamod-ui
  - shoelace
---

## Introduction

`@dillingerstaffing/strand-ui` ships 34 Preact/React components built on the [Strand Design Language](https://github.com/dillingerstaffing/strand/blob/main/docs/design-language.md). Components pair with zero-runtime CSS tokens from the `@dillingerstaffing/strand` package.

## Installation

```bash
npm install @dillingerstaffing/strand @dillingerstaffing/strand-ui
```

Import the design tokens and component styles in your app entry:

```css
@import '@dillingerstaffing/strand/css/reset.css';
@import '@dillingerstaffing/strand/css/tokens.css';
@import '@dillingerstaffing/strand/css/base.css';
@import '@dillingerstaffing/strand-ui/css/strand-ui.css';
```

## Preact configuration

Import components directly from `@dillingerstaffing/strand-ui`. The package targets both Preact and React consumers; keep a single Preact runtime in bundler-driven apps.

## Example

```jsx
import { Button, Card, Stack, Input } from '@dillingerstaffing/strand-ui';

export function App() {
  return (
    <Card variant="elevated" padding="lg">
      <Stack gap={4}>
        <Input placeholder="Enter your email" />
        <Button>Get Started</Button>
      </Stack>
    </Card>
  );
}
```

## SSR notes

Upstream documentation focuses on client-side component rendering with CSS imports. PreactHub has not verified SSR behavior for Strand UI; confirm stylesheet delivery and hydration in your target environment.

## Islands notes

Individual widgets such as forms or cards can be mounted as islands, but global CSS token imports should be shared at the document or island root.

## Known limitations

WCAG 2.2 AA is a vendor-stated design-language goal, not an independent PreactHub verification. Vue and Svelte adapters exist if you need cross-framework parity.

## Alternatives

For accessible component primitives, compare [Kamod UI](/libraries/kamod-ui) or [Shoelace](/libraries/shoelace).

