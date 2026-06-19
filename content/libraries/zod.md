---
entryType: library
name: Zod
slug: zod
description: TypeScript-first schema validation often paired with Preact forms and loaders.
category: forms
packageName: "zod"
repository: "https://github.com/colinhacks/zod"
documentation: "https://zod.dev"
homepage: "https://zod.dev"
compatibility: unknown
status: stable
typescript: true
ssr: true
islands: true
esm: true
license: MIT
tags:
  - validation
  - typescript
  - forms
featured: true
alternatives:
  - valibot
---

## Introduction

Zod is not a Preact UI library, but it is frequently part of Preact form validation and loader validation workflows.

## Installation

```bash
npm install zod
```

## Preact configuration

No framework adapter is required for schema parsing itself.

## Example

```ts
import { z } from "zod";

const signupSchema = z.object({ email: z.email() });
```

## SSR notes

Pure validation logic works the same on the server and client.
