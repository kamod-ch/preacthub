---
entryType: library
name: 'Vitest Browser Preact'
slug: 'vitest-browser-preact'
shortDescription: 'Browser-context renderer for Preact components in Vitest 4+.'
category: 'testing'
compatibilityStatus: 'native'
maintenanceStatus: 'active'
typescriptSupport: 'native'
ssrSupport: 'unsupported'
packageName: 'vitest-browser-preact'
repositoryUrl: 'https://github.com/JoviDeCroock/vitest-browser-preact'
documentationUrl: 'https://github.com/JoviDeCroock/vitest-browser-preact'
npmUrl: 'https://www.npmjs.com/package/vitest-browser-preact'
license: 'MIT'
installCommand: 'npm install -D vitest-browser-preact'
featured: false
islands: false
esm: true
tags:
  - vitest
  - browser
  - testing
limitations:
  - 'Requires Vitest 4.0.0 or higher with the browser test runner enabled.'
qualityBadges: []
alternatives:
  - preact-testing-library
---

## Introduction

`vitest-browser-preact` adds a Preact-aware `render` helper to Vitest's browser mode so component tests run against real browser DOM APIs instead of emulated environments.

## Installation

```bash
npm install -D vitest-browser-preact
```

## Preact configuration

Import `render` from `vitest-browser-preact` inside browser tests, or rely on the injected `page.render` helper when Vitest exposes the browser page object.

## Example

```tsx
import { render } from "vitest-browser-preact";
import { expect, test } from "vitest";
import { Counter } from "./Counter";

test("increments in the browser", async () => {
  const screen = render(<Counter initialCount={1} />);
  await expect.element(screen.getByText("Count is 1")).toBeVisible();
  await screen.getByRole("button", { name: "Increment" }).click();
  await expect.element(screen.getByText("Count is 2")).toBeVisible();
});
```

## SSR notes

Testing utility only; not used in production SSR pipelines.

## Islands notes

Useful for verifying island components with real layout, focus and pointer behavior in browser tests.

## Known limitations

Requires Vitest 4 browser mode. Wrapper components and custom containers are supported through the render options object.

## Alternatives

For jsdom-style unit tests, [Preact Testing Library](/libraries/preact-testing-library) remains the lighter default.

