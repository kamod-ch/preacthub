---
entryType: library
name: tsParticles Preact
slug: tsparticles-preact
shortDescription: >-
  Official Preact component for configurable particle, confetti and animated canvas effects using the modular
  tsParticles engine.
category: animation
packageName: '@tsparticles/preact'
repositoryUrl: 'https://github.com/tsparticles/tsparticles/tree/main/wrappers/preact'
npmUrl: 'https://www.npmjs.com/package/@tsparticles/preact'
documentationUrl: 'https://github.com/tsparticles/tsparticles/tree/main/wrappers/preact#readme'
homepageUrl: 'https://particles.js.org/'
license: MIT
compatibilityStatus: native
typescriptSupport: native
ssrSupport: limited
maintenanceStatus: active
installCommand: npm install @tsparticles/preact @tsparticles/engine
tags:
  - particles
  - canvas
  - confetti
  - animation
  - effects
limitations:
  - The canvas engine must initialize in the browser and should not run during server rendering.
  - The published peer dependency currently declares Preact 10 only; Preact 11 compatibility is not documented upstream.
  - Loading the full tsParticles bundle can be large; use selected engine packages when possible.
  - Continuous animation should respect reduced-motion preferences and performance budgets.
lastVerifiedAt: '2026-11-05'
verificationSource: 'https://github.com/tsparticles/tsparticles/tree/main/wrappers/preact#readme'
lastReleaseAt: '2026-11-02'
lastCommitAt: '2026-11-04'
repositoryArchived: false
notes:
  - 'Evidence level: documented.'
  - 'Latest npm version checked: 4.5.1.'
  - The monorepo labels this package as the official tsParticles Preact component and provides usage examples.
title: tsParticles Preact
description: >-
  Official Preact component for configurable particle, confetti and animated canvas effects using the modular
  tsParticles engine.
featured: false
islands: true
esm: true
qualityBadges: []
alternatives:
  - animejs
  - motion
  - gsap
---

## Introduction

`@tsparticles/preact` is the official Preact wrapper for the modular tsParticles canvas engine. It renders configurable particles, confetti, animated backgrounds and interactive effects.

## Installation

```bash
npm install @tsparticles/preact @tsparticles/engine
```

Install a bundle such as `@tsparticles/slim` or selected plugins for the effects you use.

## Preact configuration

Initialize the engine once in the browser, load the required plugins and render the `Particles` component after initialization completes.

## Example

```tsx
import { useEffect, useState } from 'preact/hooks';
import Particles, { initParticlesEngine } from '@tsparticles/preact';
import { loadSlim } from '@tsparticles/slim';

export function ParticleBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(engine => loadSlim(engine)).then(() => setReady(true));
  }, []);

  return ready ? (
    <Particles options={{ particles: { number: { value: 30 } } }} />
  ) : null;
}
```

## SSR notes

The canvas engine is browser-only. Render a deterministic placeholder on the server and initialize tsParticles after mount; do not access canvas or window APIs during SSR.

## Islands notes

Particle effects should be isolated and lazy-hydrated. Destroy effects when their island unmounts and avoid hydrating decorative backgrounds before primary content.

## Known limitations

The full bundle is large; load only the engine features needed by the effect. The current peer range declares Preact 10, so Preact 11 needs an integration test. Continuous canvas animation can consume CPU and battery, so respect reduced-motion settings and performance budgets.

## Alternatives

For element animation rather than canvas particles, compare [animejs](/libraries/animejs), [Motion](/libraries/motion) and [GSAP](/libraries/gsap).
