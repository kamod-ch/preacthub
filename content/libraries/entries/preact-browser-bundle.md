---
entryType: library
name: 'Preact Browser Bundle'
slug: 'preact-browser-bundle'
shortDescription: 'Single-file CDN distribution bundling Preact, HTM, and Preact Signals with no dependencies.'
category: 'build-tools'
compatibilityStatus: 'native'
maintenanceStatus: 'active'
typescriptSupport: 'none'
ssrSupport: 'unsupported'
packageName: 'preact-browser-bundle'
repositoryUrl: 'https://github.com/linfx7/preact-browser-bundle'
documentationUrl: 'https://github.com/linfx7/preact-browser-bundle'
homepageUrl: 'https://github.com/linfx7/preact-browser-bundle'
npmUrl: 'https://www.npmjs.com/package/preact-browser-bundle'
installCommand: 'npm install preact-browser-bundle'
featured: false
islands: true
esm: true
tags:
  - cdn
  - distribution
  - no-build
limitations:
  - 'Upstream explicitly recommends installing preact, htm, and @preact/signals separately for normal npm projects rather than depending on this bundle.'
  - 'Distribution artifact for script-tag or offline CDN use—not a typical application dependency.'
qualityBadges: []
alternatives:
  - preact
  - htm
  - preact-signals
---

## Introduction

`preact-browser-bundle` ships one standalone ESM file containing [Preact](https://preactjs.com), [HTM](https://github.com/developit/htm), and [@preact/signals](https://github.com/preactjs/signals). It targets CDN imports and offline single-file distribution rather than bundler-based apps.

## Installation

For CDN or offline script use, import the published standalone file:

```html
<script type="module">
  import { html, render, signal } from "https://cdn.jsdelivr.net/npm/preact-browser-bundle/dist/standalone.js";
</script>
```

The npm package exists mainly to mirror that artifact; upstream discourages npm installs for bundled apps.

## Preact configuration

When you must use npm, import from `preact-browser-bundle/dist/standalone.js`. For Vite, Rsbuild, or Nx workflows, prefer separate `preact`, `htm`, and `@preact/signals` packages so tooling can tree-shake and type-check.

## Example

```html
<div id="app"></div>
<script type="module">
  import { html, render, signal } from "https://cdn.jsdelivr.net/npm/preact-browser-bundle/dist/standalone.js";

  const count = signal(0);

  function App() {
    return html`
      <div>
        <h1>Hello World!</h1>
        <button onClick=${() => (count.value += 1)}>
          Increment with signal
        </button>
        <p>Counter: ${count.value}</p>
      </div>
    `;
  }

  render(html`<${App} />`, document.getElementById("app"));
</script>
```

## SSR notes

Standalone browser bundle only. Node or SSR pipelines should install the individual packages instead.

## Islands notes

Ideal for progressive enhancement: load one script and mount small interactive islands without a build step.

## Known limitations

Not intended as a normal dependency. Version tracks bundled upstream releases (currently aligned with Preact 10.29.x).

## Alternatives

Install [Preact](/libraries/preact), [HTM](/libraries/htm), and [Preact Signals](/libraries/preact-signals) separately for typed, tree-shakeable projects.

