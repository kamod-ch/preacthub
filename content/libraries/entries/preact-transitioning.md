---
entryType: library
name: Preact Transitioning
slug: preact-transitioning
shortDescription: 'Preact components for enter, exit and grouped CSS transitions with an API inspired by react-transition-group.'
category: animation
packageName: preact-transitioning
repositoryUrl: 'https://github.com/fakundo/preact-transitioning'
npmUrl: 'https://www.npmjs.com/package/preact-transitioning'
documentationUrl: 'https://fakundo.github.io/preact-transitioning/'
homepageUrl: 'https://github.com/fakundo/preact-transitioning'
license: MIT
compatibilityStatus: native
typescriptSupport: native
ssrSupport: limited
maintenanceStatus: active
installCommand: npm install preact-transitioning
tags:
  - animation
  - transitions
  - css
  - transition-group
limitations:
  - Transitions depend on DOM lifecycle timing and CSS classes after hydration.
  - 'The API is intentionally close to react-transition-group, so Preact-specific edge cases should be tested.'
  - Complex timeline or gesture animation requires a different tool.
lastVerifiedAt: '2026-11-05'
verificationSource: 'https://fakundo.github.io/preact-transitioning/'
lastReleaseAt: '2025-10-22'
lastCommitAt: '2026-09-11'
repositoryArchived: false
notes:
  - 'Evidence level: documented.'
  - 'Latest npm version checked: 1.5.3.'
  - A newer commit history after the latest release indicates continued maintenance.
title: Preact Transitioning
description: 'Preact components for enter, exit and grouped CSS transitions with an API inspired by react-transition-group.'
featured: false
islands: true
esm: true
qualityBadges: []
alternatives:
  - preact-transition-group
  - motion
  - animejs
---

## Introduction

`preact-transitioning` provides native Preact components for enter, exit and grouped CSS transitions. Its API is inspired by `react-transition-group` without requiring a React compatibility alias.

## Installation

```bash
npm install preact-transitioning
```

## Preact configuration

Import transition components directly and define the corresponding CSS classes. Keep stable keys for children managed by a transition group.

## Example

```tsx
import { useState } from 'preact/hooks';
import { FadeTransition } from 'preact-transitioning';

export function Disclosure() {
  const [open, setOpen] = useState(false);
  return (
    <section>
      <button onClick={() => setOpen(value => !value)}>Toggle</button>
      <FadeTransition in={open} unmountOnExit>
        <p>Animated content</p>
      </FadeTransition>
    </section>
  );
}
```

## SSR notes

Server output should represent a stable initial transition state. CSS transition timing and DOM lifecycle callbacks begin only after hydration, so test initially hidden and initially visible content separately.

## Islands notes

Transitions can remain inside a small interactive island. Ensure teardown cancels pending timers or listeners when navigation removes the island during an active transition.

## Known limitations

The React-inspired API may still expose timing edge cases under rapid Preact updates. It is intended for CSS transitions rather than gesture-driven or sequenced animation.

## Alternatives

See [Preact Transition Group](/libraries/preact-transition-group) for the older established binding, [Motion](/libraries/motion) for a broader animation system or [animejs](/libraries/animejs) for imperative timelines.
