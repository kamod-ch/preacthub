---
entryType: library
name: Preact Intlayer
slug: preact-intlayer
shortDescription: 'Preact integration for typed, component-scoped translations, locale routing, lazy-loaded content and visual editing.'
category: i18n
packageName: preact-intlayer
repositoryUrl: 'https://github.com/aymericzip/intlayer'
npmUrl: 'https://www.npmjs.com/package/preact-intlayer'
documentationUrl: 'https://intlayer.org/doc/environment/vite-and-preact'
homepageUrl: 'https://intlayer.org/'
license: Apache-2.0
compatibilityStatus: native
typescriptSupport: native
ssrSupport: limited
maintenanceStatus: active
installCommand: npm install intlayer preact-intlayer
tags:
  - i18n
  - localization
  - typed-content
  - routing
  - vite
limitations:
  - The documented setup relies on the Intlayer Vite plugin and generated content files.
  - The package brings several Intlayer runtime dependencies rather than a minimal translation core.
  - SSR behavior depends on the chosen Preact host and locale-routing setup.
lastVerifiedAt: '2026-11-05'
verificationSource: 'https://intlayer.org/doc/environment/vite-and-preact'
lastReleaseAt: '2026-11-03'
lastCommitAt: '2026-11-04'
repositoryArchived: false
notes:
  - 'Evidence level: documented.'
  - 'Latest npm version checked: 9.7.1.'
  - 'The official guide includes provider, hook, locale switcher and localized routing examples for Preact.'
title: Preact Intlayer
description: 'Preact integration for typed, component-scoped translations, locale routing, lazy-loaded content and visual editing.'
featured: false
islands: true
esm: true
qualityBadges: []
alternatives:
  - preact-i18n
  - i18next
  - lingui
---

## Introduction

`preact-intlayer` is Intlayer's native Preact integration. It provides typed component-scoped content, providers and hooks, locale switching, localized routes and optional visual editing.

## Installation

```bash
npm install intlayer preact-intlayer
npm install --save-dev vite-intlayer
```

## Preact configuration

Add the Intlayer Vite plugin, declare localized content files and wrap the application with `IntlayerProvider`.

```ts
import preact from '@preact/preset-vite';
import { intlayer } from 'vite-intlayer';
import { defineConfig } from 'vite';

export default defineConfig({ plugins: [preact(), intlayer()] });
```

## Example

```tsx
import { IntlayerProvider, useIntlayer } from 'preact-intlayer';

function Welcome() {
  const content = useIntlayer('welcome');
  return <h1>{content.title}</h1>;
}

export function App() {
  return (
    <IntlayerProvider>
      <Welcome />
    </IntlayerProvider>
  );
}
```

## SSR notes

SSR behavior depends on the host framework and locale-routing setup. Resolve the locale before rendering, pass the same locale to the client provider and ensure lazy dictionaries needed for the route are available during server output.

## Islands notes

Each island that calls Intlayer hooks needs provider context or a shared hydrated root. Avoid loading the complete translation catalog when only one island and locale are required.

## Known limitations

The integration relies on generated content and the Intlayer Vite plugin. It includes a broader toolchain than a minimal runtime-only translation library.

## Alternatives

For smaller or more established translation layers, compare [Preact i18n](/libraries/preact-i18n), [i18next](/libraries/i18next) and [Lingui](/libraries/lingui).
