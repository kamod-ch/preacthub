---
entryType: library
name: 'Lynx React Signals'
slug: 'lynx-js-react-signals'
shortDescription: 'Thread-aware Preact Signals integration for ReactLynx applications.'
category: 'state-management'
compatibilityStatus: 'native'
maintenanceStatus: 'active'
typescriptSupport: 'native'
ssrSupport: 'limited'
packageName: '@lynx-js/react-signals'
repositoryUrl: 'https://github.com/lynx-family/lynx-stack/tree/main/packages/react-signals'
documentationUrl: 'https://www.npmjs.com/package/@lynx-js/react-signals'
npmUrl: 'https://www.npmjs.com/package/@lynx-js/react-signals'
license: 'Apache-2.0'
installCommand: 'npm install @lynx-js/react-signals'
featured: false
islands: false
esm: true
tags:
  - signals
  - lynx
  - mobile
limitations:
  - 'Targets ReactLynx runtimes, not standard browser-only Preact applications.'
  - 'ReactLynx currently requires reading signal values through `.value` rather than passing Signal objects directly in JSX.'
qualityBadges: []
alternatives:
  - preact-signals
---

## Introduction

`@lynx-js/react-signals` exposes Preact Signals APIs (`signal`, `useSignal`) adapted for ReactLynx's multi-thread rendering model. Signals stay reactive on the background thread while first-screen rendering on the main thread uses static values.

## Installation

```bash
npm install @lynx-js/react-signals
```

## Preact configuration

Use this package only inside ReactLynx projects that already depend on Preact Signals semantics. Import from `@lynx-js/react-signals` instead of `@preact/signals` when building Lynx UI modules.

## Example

```tsx
import { signal } from "@lynx-js/react-signals";

const count = signal(0);

export function Counter() {
  return <text>Value: {count.value}</text>;
}
```

## SSR notes

ReactLynx first-screen rendering uses static signal values on the main thread. Validate hydration and background-thread updates within the Lynx toolchain rather than assuming standard Preact SSR behavior.

## Islands notes

Not applicable to conventional Preact island architectures; this adapter is specific to ReactLynx page and component lifecycles.

## Known limitations

This is not a drop-in replacement for `@preact/signals` in normal web apps. Follow Lynx documentation for thread constraints and JSX consumption rules.

## Alternatives

For browser Preact apps, use [Preact Signals](/libraries/preact-signals).

