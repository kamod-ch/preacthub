---
entryType: library
name: Motion
slug: motion
shortDescription: 'Modern animation APIs for layout, gestures and transitions.'
category: animation
compatibilityStatus: unverified
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - animation
  - transitions
  - gestures
packageName: motion
repositoryUrl: 'https://github.com/motiondivision/motion'
npmUrl: 'https://www.npmjs.com/package/motion'
documentationUrl: 'https://motion.dev'
homepageUrl: 'https://motion.dev'
license: MIT
installCommand: npm install motion
alternatives:
  - floating-ui
islands: true
esm: true
---

## Introduction

Motion is the successor to older Framer Motion distribution patterns and remains interesting for interactive UI transitions.

## Installation

```bash
npm install motion
```

## Preact configuration

Verify the exact Preact integration path before relying on it in production.

## Example

```tsx
import { motion } from "motion/react";

export function FadeIn() {
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} />;
}
```

## SSR notes

Animation-heavy libraries should be reviewed for server/client rendering parity.

## Islands notes

When using this library inside an island, keep browser-specific setup inside the island component or an effect, and pass only serializable props from the server-rendered page.
