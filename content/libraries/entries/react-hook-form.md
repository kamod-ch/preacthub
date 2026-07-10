---
entryType: library
name: React Hook Form
slug: react-hook-form
description: Popular form state and validation workflow for hook-based component trees.
category: forms
packageName: "react-hook-form"
repository: "https://github.com/react-hook-form/react-hook-form"
documentation: "https://react-hook-form.com"
homepage: "https://react-hook-form.com"
compatibility: unknown
status: stable
typescript: true
ssr: true
islands: true
esm: true
license: MIT
tags:
  - forms
  - validation
  - hooks
alternatives:
  - zod
  - valibot
---

## Introduction

React Hook Form is a common choice for complex forms with strong TypeScript ergonomics.

## Installation

```bash
npm install react-hook-form
```

## Preact configuration

Compatibility should be validated with `preact/compat` in your concrete app stack.

## Example

```tsx
import { useForm } from "react-hook-form";

export function SignupForm() {
  const { register, handleSubmit } = useForm<{ email: string }>();
  return (
    <form onSubmit={handleSubmit(console.log)}>
      <input {...register("email")} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## SSR notes

Generally safe for form rendering, but event and ref behavior should still be tested in production-like conditions.

## Islands notes

When using this library inside an island, keep browser-specific setup inside the island component or an effect, and pass only serializable props from the server-rendered page.
