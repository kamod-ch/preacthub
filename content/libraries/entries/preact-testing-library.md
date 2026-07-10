---
entryType: library
name: Preact Testing Library
slug: preact-testing-library
description: Testing Library integration focused on user-centric testing for Preact components.
category: testing
packageName: "@testing-library/preact"
repository: "https://github.com/testing-library/preact-testing-library"
documentation: "https://testing-library.com/docs/preact-testing-library/intro/"
compatibility: native
status: recommended
typescript: true
ssr: false
islands: true
esm: true
license: MIT
tags:
  - testing
  - components
  - accessibility
featured: true
alternatives:
  - preact-devtools
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
