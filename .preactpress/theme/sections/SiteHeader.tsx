import type { FunctionalComponent } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { Button } from "@kamod-ch/ui";
import {
  isActive,
  toggleStoredTheme,
  withBase,
  type LayoutProps,
} from "@kamod-ch/preactpress/client";
import { BrandLogo } from "../BrandLogo";
import { resolveNavLink } from "../utils";

function SiteThemeToggle() {
  return (
    <Button
      type="button"
      size="sm"
      variant="ghost"
      class="ph-icon-button ph-theme-toggle"
      onClick={() => {
        if (typeof window !== "undefined") toggleStoredTheme();
      }}
      aria-label="Toggle light and dark mode"
      aria-pressed={typeof document !== "undefined" ? document.documentElement.dataset.theme === "dark" : undefined}
    >
      <span class="ph-theme-moon" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
        </svg>
      </span>
      <span class="ph-theme-sun" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg>
      </span>
    </Button>
  );
}

function GitHubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 6l12 12M18 6 6 18" stroke-linecap="round" />
      </svg>
    );
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round" />
    </svg>
  );
}

export const SiteHeader: FunctionalComponent<{
  site: LayoutProps["site"];
  themeConfig: LayoutProps["themeConfig"];
  routePath: string;
}> = ({ site, themeConfig, routePath }) => {
  const isHome = routePath === "/";
  const navItems = (themeConfig.nav ?? [
    { text: "Browse", link: "/libraries" },
    { text: "Categories", link: "/libraries#categories" },
    { text: "Submit", link: "/submit" },
  ]).filter((item) => item.link !== "/submit");
  const githubLink = themeConfig.socialLinks?.find((link) => link.icon === "github");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileNavOpen || typeof window === "undefined") return;
    function onKeyDown(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        setMobileNavOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileNavOpen]);

  return (
    <header class="ph-header">
      <div class="ph-shell ph-header-inner">
        <a class="ph-brand" href={withBase(site.base, "/")} aria-label="PreactHub home">
          <BrandLogo />
        </a>
        <nav class="ph-nav" aria-label="Main navigation">
          {navItems.map((item) => {
            const href = resolveNavLink(item.link ?? "/", isHome);
            return (
              <a
                href={href}
                aria-current={isActive(routePath, item.link) ? "page" : undefined}
                class={isActive(routePath, item.link) ? "active" : undefined}
              >
                {item.text}
              </a>
            );
          })}
        </nav>
        <div class="ph-header-actions">
          {githubLink ? (
            <a
              class="ph-github-link"
              href={githubLink.link}
              aria-label={githubLink.ariaLabel ?? "GitHub"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
            </a>
          ) : null}
          <SiteThemeToggle />
          <Button href="/submit" size="sm" class="ph-submit-nav ph-button-primary">
            Submit Library
          </Button>
          <button
            ref={menuButtonRef}
            type="button"
            class="ph-mobile-menu-button"
            aria-label={mobileNavOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileNavOpen}
            aria-controls="ph-mobile-nav"
            onClick={() => setMobileNavOpen((value) => !value)}
          >
            <MenuIcon open={mobileNavOpen} />
          </button>
        </div>
      </div>
      {mobileNavOpen ? (
        <div id="ph-mobile-nav" class="ph-shell ph-mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item) => {
            const href = resolveNavLink(item.link ?? "/", isHome);
            return (
              <a
                href={href}
                aria-current={isActive(routePath, item.link) ? "page" : undefined}
                class={isActive(routePath, item.link) ? "active" : undefined}
                onClick={() => setMobileNavOpen(false)}
              >
                {item.text}
              </a>
            );
          })}
          {githubLink ? (
            <a href={githubLink.link} target="_blank" rel="noopener noreferrer" onClick={() => setMobileNavOpen(false)}>
              GitHub
            </a>
          ) : null}
          <a href="/submit" class="ph-mobile-nav-cta" onClick={() => setMobileNavOpen(false)}>
            Submit Library
          </a>
        </div>
      ) : null}
    </header>
  );
};
