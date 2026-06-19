---
entryType: library
name: React Aria
slug: react-aria
description: Accessible behavior primitives and hooks for complex UI controls.
category: ui
packageName: "react-aria"
repository: "https://github.com/adobe/react-spectrum"
documentation: "https://react-spectrum.adobe.com/react-aria/"
homepage: "https://react-spectrum.adobe.com/react-aria/"
compatibility: unknown
status: stable
typescript: true
ssr: true
islands: true
esm: true
license: Apache-2.0
tags:
  - accessibility
  - ui
  - primitives
alternatives:
  - floating-ui
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
