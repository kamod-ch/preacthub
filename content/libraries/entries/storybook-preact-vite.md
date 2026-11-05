---
entryType: library
name: Storybook for Preact with Vite
slug: storybook-preact-vite
shortDescription: 'Storybook framework for developing, documenting and testing Preact components in isolation with Vite.'
category: developer-tools
packageName: '@storybook/preact-vite'
repositoryUrl: 'https://github.com/storybookjs/storybook/tree/next/code/frameworks/preact-vite'
npmUrl: 'https://www.npmjs.com/package/@storybook/preact-vite'
documentationUrl: 'https://storybook.js.org/docs/get-started/frameworks/preact-vite'
homepageUrl: 'https://storybook.js.org/'
license: MIT
compatibilityStatus: native
typescriptSupport: native
ssrSupport: unknown
maintenanceStatus: active
installCommand: npm install --save-dev @storybook/preact-vite storybook
tags:
  - storybook
  - component-workshop
  - vite
  - testing
  - documentation
limitations:
  - Targets Preact projects built with Vite.
  - Storybook builds a separate component workshop; it does not verify application SSR behavior by itself.
  - Addons should be checked for renderer-specific React assumptions.
lastVerifiedAt: '2026-11-05'
verificationSource: 'https://storybook.js.org/docs/get-started/frameworks/preact-vite'
lastReleaseAt: '2026-10-27'
lastCommitAt: '2026-11-05'
repositoryArchived: false
notes:
  - 'Evidence level: documented.'
  - 'Latest npm version checked: 10.6.5.'
  - Official documentation explicitly describes the framework as Storybook for Preact applications built with Vite.
title: Storybook for Preact with Vite
description: 'Storybook framework for developing, documenting and testing Preact components in isolation with Vite.'
featured: false
islands: false
esm: true
qualityBadges: []
alternatives:
  - vitest-browser-preact
  - preact-testing-library
---

## Introduction

`@storybook/preact-vite` is Storybook's official framework package for Preact projects built with Vite. It renders Preact stories in an isolated workshop for component development, documentation and browser-based interaction tests.

## Installation

```bash
npm install --save-dev storybook @storybook/preact-vite
```

The recommended setup command detects an existing Preact and Vite application:

```bash
npm create storybook@latest
```

## Preact configuration

Set the Storybook framework in `.storybook/main.ts`. The framework package installs the Preact renderer and Vite builder together.

```ts
import type { StorybookConfig } from '@storybook/preact-vite';

const config: StorybookConfig = {
  framework: '@storybook/preact-vite',
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
};

export default config;
```

## Example

```tsx
import type { Meta, StoryObj } from '@storybook/preact';
import { Counter } from './Counter';

const meta = {
  component: Counter,
  args: { initialCount: 0 },
} satisfies Meta<typeof Counter>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
```

## SSR notes

Storybook builds a separate static component workshop and does not prove that a component is safe in the application's SSR pipeline. Browser-only stories should guard DOM APIs in the same way as production code.

## Known limitations

The framework targets Vite-based Preact projects. Verify third-party addons independently because some addons may assume React renderer internals.

## Alternatives

Use [Vitest Browser Preact](/libraries/vitest-browser-preact) for focused browser tests or [Preact Testing Library](/libraries/preact-testing-library) for component-level test utilities.
