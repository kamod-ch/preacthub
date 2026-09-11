---
entryType: library
name: 'Visual Controller for Preact'
slug: 'peter-naydenov-visual-controller-for-preact'
shortDescription: 'Region-based controller for mounting multiple independent Preact apps on one page.'
category: 'developer-tools'
compatibilityStatus: 'native'
maintenanceStatus: 'active'
typescriptSupport: unknown
ssrSupport: 'unsupported'
packageName: '@peter.naydenov/visual-controller-for-preact'
repositoryUrl: 'https://github.com/PeterNaydenov/visual-controller-for-preact'
documentationUrl: 'https://github.com/PeterNaydenov/visual-controller-for-preact'
npmUrl: 'https://www.npmjs.com/package/@peter.naydenov/visual-controller-for-preact'
license: 'MIT'
installCommand: 'npm install @peter.naydenov/visual-controller-for-preact'
featured: false
islands: true
esm: true
tags:
  - microfrontends
  - multi-root
  - composition
limitations:
  - 'Region markers and publish/destroy lifecycle assume a browser DOM; server rendering is not supported.'
  - 'Each published app shares dependencies through props; coordinate versions to avoid duplicate Preact runtimes.'
qualityBadges: []
alternatives:
  - preact-habitat
---

## Introduction

Visual Controller for Preact coordinates multiple Preact applications on a single static page. Regions are defined with invisible DOM markers via `set`, then apps are mounted, swapped, or destroyed through alias-based `publish` calls—useful for microfrontend-style integration without hard-coded container ids.

## Installation

```bash
npm install @peter.naydenov/visual-controller-for-preact
```

## Preact configuration

Create one `VisualController` instance per page, register regions with `html.set`, and publish Preact components by alias. The v2 API replaces older id-based mounting with marker regions and alias-first `publish` calls.

## Example

```js
import VisualController from '@peter.naydenov/visual-controller-for-preact';
import HeaderApp from './apps/header.jsx';
import SidebarApp from './apps/sidebar.jsx';
import CartApp from './apps/cart.jsx';

const html = new VisualController({});

html.set(({ start, end }) => {
  document.querySelector('header').append(start, end);
  return 'header';
});

html.set(({ start, end }) => {
  document.querySelector('aside').append(start, end);
  return 'sidebar';
});

html.set(({ start, end }) => {
  document.querySelector('main').append(start, end);
  return 'cart';
});

html.publish('header', HeaderApp);
html.publish('sidebar', SidebarApp);
html.publish('cart', CartApp);
```

## SSR notes

The controller inserts markers and mounts Preact trees client-side. Static HTML can surround regions, but app rendering happens after `publish` in the browser.

## Islands notes

Each published region behaves like an independent island with its own mount lifecycle. `destroy` removes rendered output while keeping markers for later swaps.

## Known limitations

Shared props pass dependencies across apps; lifecycle and SSR constraints must be validated for your integration pattern. Upgrading from id-based APIs requires migrating to `set` regions.

## Alternatives

For embedding Preact widgets into server-rendered pages, see [Preact Habitat](/libraries/preact-habitat).

