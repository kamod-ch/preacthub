---
entryType: library
name: Zod
slug: zod
shortDescription: TypeScript-first schema validation often paired with Preact forms and loaders.
category: forms
compatibilityStatus: unverified
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - validation
  - typescript
  - forms
packageName: zod
repositoryUrl: 'https://github.com/colinhacks/zod'
npmUrl: 'https://www.npmjs.com/package/zod'
documentationUrl: 'https://zod.dev'
homepageUrl: 'https://zod.dev'
license: MIT
installCommand: npm install zod
alternatives:
  - valibot
featured: true
islands: true
esm: true
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

## Islands notes

When using this library inside an island, keep browser-specific setup inside the island component or an effect, and pass only serializable props from the server-rendered page.
