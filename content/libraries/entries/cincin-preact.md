---
entryType: library
name: 'cincin Preact'
slug: 'cincin-preact'
shortDescription: 'Native Preact toast bindings with an accessible skin and headless presentation hooks.'
category: 'ui'
compatibilityStatus: 'experimental'
maintenanceStatus: 'active'
typescriptSupport: 'bundled-types'
ssrSupport: 'limited'
packageName: 'cincin-preact'
repositoryUrl: 'https://github.com/nbarinov/cincin/tree/main/packages/cincin-preact'
documentationUrl: 'https://cincin.nbarinov.io/'
homepageUrl: 'https://cincin.nbarinov.io/'
npmUrl: 'https://www.npmjs.com/package/cincin-preact'
license: 'MIT'
installCommand: 'npm install cincin-preact'
featured: false
islands: true
esm: true
tags:
  - toast
  - notifications
  - headless
limitations:
  - 'Early 0.2.x package requiring Preact 10.23 or newer and a modern ESM-capable build pipeline.'
  - "The package-wide toast store is client-oriented; server calls do not produce useful notifications and request isolation remains the application's responsibility."
qualityBadges: []
alternatives:
  - shoelace
  - kamod-ui
---

## Introduction

`cincin-preact` provides native Preact bindings for the cincin toast engine. Use the styled `Toaster` for a quick notification stack or import `usePresenter`, `useToasts`, and `useToastSwipe` from `cincin-preact/core` to build a custom skin.

## Installation

```bash
npm install cincin-preact
```

The package is modern ESM and requires Preact 10.23 or newer. Yarn users may need to install the `cincin` peer explicitly.

## Preact configuration

Mount one `<Toaster />` near the application root and call the exported `toast` store from client actions. No React compatibility alias is required; the adapter imports only Preact and Preact hooks.

## Example

```tsx
import { Toaster, toast } from 'cincin-preact';

export function App() {
  return (
    <>
      <button onClick={() => toast.success({ title: 'Saved' })}>
        Save
      </button>
      <Toaster position="bottom-right" />
    </>
  );
}
```

## SSR notes

A Toaster can appear in a server-rendered tree, but notifications and DOM interactions are client-side. Calls to the singleton store on the server are not useful; avoid carrying toast state between requests.

## Islands notes

The Toaster works well as a client island. Ensure producers run after hydration and share the same cincin store instance as the mounted island.

## Known limitations

Swipe behavior, focus management, timers, and document direction rely on browser APIs. Validate the default Alt+T shortcut and live-region behavior against the host application's accessibility model.

## Alternatives

For broader web-component UI, compare [Shoelace](/libraries/shoelace); for Preact-native application components, see [Kamod UI](/libraries/kamod-ui).

