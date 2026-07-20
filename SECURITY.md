# Security Policy

## Supported versions

| Version | Supported |
| --- | --- |
| 0.1.x | Yes |

PreactHub is a static site. Security-relevant surface area is limited to the build pipeline, hosted static assets, and third-party scripts optionally enabled via environment variables.

## Reporting a vulnerability

If you discover a security issue in PreactHub (build tooling, deployed static content, or GitHub Actions workflows), please report it responsibly:

1. **Do not** open a public GitHub issue for undisclosed vulnerabilities.
2. Email or contact the maintainers via the [Kamod](https://www.kamod.ch) contact channels linked from the repository profile, or open a private security advisory on GitHub if enabled for this repository.
3. Include steps to reproduce, affected URLs or workflow files, and impact assessment.

We aim to acknowledge reports within **5 business days** and provide a remediation timeline when applicable.

## Scope notes

- **In scope:** XSS via catalog markdown, secrets committed to the repository, broken CSP/analytics injection, supply-chain issues in CI, misconfigured All-Inkl FTPS deploy.
- **Out of scope:** Vulnerabilities in listed third-party libraries (report to upstream), issues requiring write access to the PreactHub GitHub org, generic DNS/hosting misconfiguration outside repository control.

## Safe defaults

- Analytics (Plausible) is **opt-in** via `PREACTHUB_ANALYTICS=plausible`; disabled by default in local builds.
- Catalog markdown does not render raw HTML (`markdown.html: false`).
- No user accounts, sessions, or server-side request handlers in the static 0.1 release.

## Dependency updates

Maintainers monitor `npm audit` advisories for direct dependencies. Transitive advisories are tracked in project plans and addressed on a best-effort basis for patch releases.
