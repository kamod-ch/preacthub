---
entryType: library
name: Preact Testing Library
slug: preact-testing-library
shortDescription: >-
  Testing Library integration focused on user-centric testing for Preact
  components.
category: testing
compatibilityStatus: native
typescriptSupport: native
ssrSupport: unsupported
maintenanceStatus: active
tags:
  - testing
  - components
  - accessibility
packageName: '@testing-library/preact'
repositoryUrl: 'https://github.com/testing-library/preact-testing-library'
npmUrl: 'https://www.npmjs.com/package/%40testing-library%2Fpreact'
documentationUrl: 'https://testing-library.com/docs/preact-testing-library/intro/'
license: MIT
installCommand: npm install @testing-library/preact
alternatives:
  - preact-devtools
featured: true
islands: true
esm: true
---

## Introduction

If you already like Testing Library's approach, this is the natural choice for Preact component tests.

## Installation

```bash
npm install -D @testing-library/preact
```

## Preact configuration

Works with Vitest or Jest-style environments that provide a DOM.

## Example

```tsx
import { render, screen } from "@testing-library/preact";
import { Counter } from "./Counter";

render(<Counter />);
screen.getByRole("button", { name: /count/i });
```

## SSR notes

This package is test-only and usually runs in jsdom rather than on a real server renderer.

## Islands notes

Very useful for testing interactive islands in isolation.
