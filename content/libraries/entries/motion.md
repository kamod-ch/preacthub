---
entryType: library
name: Motion
slug: motion
description: Modern animation APIs for layout, gestures and transitions.
category: animation
packageName: "motion"
repository: "https://github.com/motiondivision/motion"
documentation: "https://motion.dev"
homepage: "https://motion.dev"
compatibility: unknown
status: stable
typescript: true
ssr: true
islands: true
esm: true
license: MIT
tags:
  - animation
  - transitions
  - gestures
alternatives:
  - floating-ui
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
