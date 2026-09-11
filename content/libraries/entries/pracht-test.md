---
entryType: library
name: 'Pracht Test'
slug: 'pracht-test'
shortDescription: 'Typed testing utilities for Pracht loaders, API routes, middleware, and forms.'
category: 'testing'
compatibilityStatus: 'native'
maintenanceStatus: 'active'
typescriptSupport: 'native'
ssrSupport: 'unsupported'
packageName: '@pracht/test'
repositoryUrl: 'https://github.com/JoviDeCroock/pracht/tree/main/packages/test'
documentationUrl: 'https://pracht.resynapse.dev/docs/recipes/testing'
homepageUrl: 'https://github.com/JoviDeCroock/pracht/tree/main/packages/test'
npmUrl: 'https://www.npmjs.com/package/@pracht/test'
license: 'MIT'
installCommand: 'npm install -D @pracht/test'
featured: false
islands: false
esm: true
tags:
  - testing
  - pracht
  - vitest
limitations:
  - 'First-party Pracht monorepo utility—not a general Preact component testing library.'
  - 'Provides factories and response readers only; bring your own assertion framework (Vitest, etc.).'
qualityBadges: []
alternatives:
  - preact-testing-library
---

## Introduction

`@pracht/test` supplies typed factories and runners for [Pracht](https://github.com/JoviDeCroock/pracht) apps: loader/API/middleware args, middleware chain execution, form submission helpers, and minimal response readers—without booting a server.

## Installation

```bash
npm install -D @pracht/test
```

## Preact configuration

Use alongside Vitest or any test runner in Pracht projects. Import factories from `@pracht/test` and your route modules from the Pracht app tree.

## Example

```ts
import {
  createLoaderArgs,
  createMiddlewareArgs,
  runMiddleware,
  submitForm,
  readJson,
  readRedirect,
} from "@pracht/test";
import { loader } from "./routes/dashboard";
import { middleware as auth } from "./middleware/auth";
import { POST } from "./api/contact";

const data = await loader(createLoaderArgs({ url: "/dashboard", headers: { cookie: "session=x" } }));

const denied = await runMiddleware(auth, createMiddlewareArgs({ url: "/dashboard" }));
expect(readRedirect(denied).location).toBe("/login");

const response = await submitForm(POST, { name: "Alice", email: "alice@example.com" });
expect(await readJson(response)).toEqual({ ok: true });
```

## SSR notes

Server-route testing utility. Exercises Pracht loader and API handlers in-process rather than rendering Preact trees.

## Islands notes

Not applicable—targets Pracht server modules and middleware, not client island hydration.

## Known limitations

Capability middleware tests should use `createCapabilityTestHost()` from `@pracht/core/server` for the full dispatch pipeline.

## Alternatives

For Preact component tests outside Pracht, use [Preact Testing Library](/libraries/preact-testing-library).

