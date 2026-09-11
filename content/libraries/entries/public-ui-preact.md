---
entryType: library
name: 'KoliBri Preact'
slug: 'public-ui-preact'
shortDescription: 'Official Preact adapter for KoliBri accessible HTML-standard web components.'
category: 'ui'
compatibilityStatus: 'experimental'
maintenanceStatus: 'active'
typescriptSupport: 'native'
ssrSupport: 'limited'
packageName: '@public-ui/preact'
repositoryUrl: 'https://github.com/public-ui/kolibri'
documentationUrl: 'https://public-ui.github.io/en/docs/get-started/frameworks'
homepageUrl: 'https://public-ui.github.io'
npmUrl: 'https://www.npmjs.com/package/@public-ui/preact'
license: 'EUPL-1.2'
installCommand: 'npm install @public-ui/preact @public-ui/theme-default'
featured: false
islands: false
esm: true
tags:
  - accessibility
  - web-components
  - kolibri
limitations:
  - 'Upstream classifies Preact support as experimental.'
  - 'Requires KoliBri theme registration with `@public-ui/components` before components render correctly.'
  - 'Peer dependency on `@public-ui/react` mirrors the React adapter wrapper; use `--legacy-peer-deps` if npm reports peer conflicts.'
qualityBadges: []
alternatives:
  - shoelace
  - lit
  - kamod-ui
---

## Introduction

`@public-ui/preact` is the Preact framework adapter for [KoliBri](https://public-ui.github.io)—accessible HTML-standard web components. The adapter wraps the React integration; components such as `KolButton` expose KoliBri props with Preact-friendly JSX.

## Installation

```bash
npm install @public-ui/preact @public-ui/theme-default
```

Use `--legacy-peer-deps` when npm reports peer dependency conflicts with `@public-ui/react`.

## Preact configuration

Register a theme before rendering any KoliBri components:

```tsx
import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/loader';
import { DEFAULT } from '@public-ui/theme-default';

await register(DEFAULT, defineCustomElements);
```

## Example

```tsx
import { KolButton } from '@public-ui/preact';

export const App = () => <KolButton _label="Hello World" />;
```

## SSR notes

Custom elements hydrate on the client after theme registration. Server HTML can include component tags, but `register()` and `defineCustomElements` run in the browser bootstrap path.

## Islands notes

KoliBri widgets work as islands when theme registration and loader scripts are initialized once at the document or island root.

## Known limitations

Experimental Preact support. Theme and component registration are mandatory; skipping them yields inert or unstyled components.

## Alternatives

Compare [Shoelace](/libraries/shoelace), [Lit](/libraries/lit), or [Kamod UI](/libraries/kamod-ui) for accessible component strategies.

