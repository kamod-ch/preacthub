---
entryType: library
name: React Aria
slug: react-aria
shortDescription: Accessible behavior primitives and hooks for complex UI controls.
category: ui
compatibilityStatus: unverified
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - accessibility
  - ui
  - primitives
packageName: react-aria
repositoryUrl: 'https://github.com/adobe/react-spectrum'
npmUrl: 'https://www.npmjs.com/package/react-aria'
documentationUrl: 'https://react-spectrum.adobe.com/react-aria/'
homepageUrl: 'https://react-spectrum.adobe.com/react-aria/'
license: Apache-2.0
installCommand: npm install react-aria
alternatives:
  - floating-ui
islands: true
esm: true
---

## Introduction

React Aria provides strong accessibility primitives, but its exact Preact compatibility should be checked case by case.

## Installation

```bash
npm install react-aria
```

## Preact configuration

Expect to validate behavior through `preact/compat` and component-level testing.

## Example

```tsx
import { Button } from "react-aria-components";

export function SaveButton() {
  return <Button>Save</Button>;
}
```

## SSR notes

SSR support depends on the exact component set and hydration path you use.

## Islands notes

When using this library inside an island, keep browser-specific setup inside the island component or an effect, and pass only serializable props from the server-rendered page.
