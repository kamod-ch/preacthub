import type { FunctionalComponent } from "preact";
import type { RefObject } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { Button } from "@kamod-ch/ui";
import {
  isActive,
  normalizeLink,
  toggleStoredTheme,
  withBase,
  type LayoutProps,
} from "@kamod-ch/preactpress/client";
import {
  aiCategories,
  categoryRoute,
  preactCategories,
  type LibraryCategory,
} from "../../../src/lib/categories";
import { BrandLogo } from "../BrandLogo";
import { CategoryIcon } from "../libraries/CategoryIcon";

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

function isPreactSectionActive(routePath: string): boolean {
  return routePath === "/libraries" || routePath.startsWith("/libraries/");
}

function isAiSectionActive(routePath: string): boolean {
  return routePath === "/ai" || routePath.startsWith("/categories/");
}

function isOverviewActive(routePath: string, overviewHref: string): boolean {
  return normalizeLink(routePath) === normalizeLink(overviewHref);
}

function NavMenuItem({
  href,
  label,
  slug,
  count,
  routePath,
  onNavigate,
}: {
  href: string;
  label: string;
  slug?: string;
  count?: number;
  routePath: string;
  onNavigate?: () => void;
}) {
  const active = isActive(routePath, href);
  return (
    <a
      href={href}
      role="menuitem"
      class={`ph-nav-dropdown-item${active ? " active" : ""}`}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
    >
      {slug ? (
        <span class="ph-nav-dropdown-item-icon" aria-hidden="true">
          <CategoryIcon slug={slug} />
        </span>
      ) : null}
      <span class="ph-nav-dropdown-item-label">{label}</span>
      {count != null ? <span class="ph-nav-dropdown-item-count">{count}</span> : null}
    </a>
  );
}

function NavCatalogDropdown({
  label,
  section,
  overviewHref,
  overviewLabel,
  categories,
  menuId,
  routePath,
  open,
  onToggle,
  menuRef,
  toggleRef,
  categoryCounts,
}: {
  label: string;
  section: "preact" | "ai";
  overviewHref: string;
  overviewLabel: string;
  categories: readonly LibraryCategory[];
  menuId: string;
  routePath: string;
  open: boolean;
  onToggle: () => void;
  menuRef: RefObject<HTMLDivElement>;
  toggleRef: RefObject<HTMLButtonElement>;
  categoryCounts?: Record<string, number>;
}) {
  const active = section === "preact" ? isPreactSectionActive(routePath) : isAiSectionActive(routePath);
  const overviewActive = isOverviewActive(routePath, overviewHref);

  return (
    <div class={`ph-nav-split${active ? " active" : ""}${open ? " open" : ""}`} ref={menuRef}>
      <a
        href={overviewHref}
        class={`ph-nav-split-label${overviewActive ? " active" : ""}`}
        aria-current={overviewActive ? "page" : undefined}
      >
        {label}
      </a>
      <button
        ref={toggleRef}
        type="button"
        class="ph-nav-split-toggle"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        aria-label={`${label} categories`}
        onClick={onToggle}
      >
        <span class="ph-nav-chevron" aria-hidden="true">▾</span>
      </button>
      {open ? (
        <div id={menuId} class="ph-nav-dropdown-menu" role="menu">
          <a
            href={overviewHref}
            role="menuitem"
            class={`ph-nav-dropdown-item ph-nav-dropdown-overview${overviewActive ? " active" : ""}`}
            aria-current={overviewActive ? "page" : undefined}
          >
            <span class="ph-nav-dropdown-item-label">{overviewLabel}</span>
          </a>
          {categories.map((cat) => (
            <NavMenuItem
              key={cat.slug}
              href={categoryRoute(cat.slug)}
              label={cat.name}
              slug={cat.slug}
              count={categoryCounts?.[cat.slug]}
              routePath={routePath}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function MobileNavGroup({
  label,
  overviewHref,
  overviewLabel,
  categories,
  groupId,
  open,
  onToggle,
  onNavigate,
  categoryCounts,
  routePath,
}: {
  label: string;
  overviewHref: string;
  overviewLabel: string;
  categories: readonly LibraryCategory[];
  groupId: string;
  open: boolean;
  onToggle: () => void;
  onNavigate: () => void;
  categoryCounts?: Record<string, number>;
  routePath: string;
}) {
  const overviewActive = isOverviewActive(routePath, overviewHref);

  return (
    <div class="ph-mobile-nav-split">
      <a
        href={overviewHref}
        class={`ph-mobile-nav-split-label${overviewActive ? " active" : ""}`}
        aria-current={overviewActive ? "page" : undefined}
        onClick={onNavigate}
      >
        {label}
      </a>
      <button
        type="button"
        class="ph-mobile-nav-split-toggle"
        aria-expanded={open}
        aria-controls={groupId}
        aria-label={`${label} categories`}
        onClick={onToggle}
      >
        <span class="ph-nav-chevron" aria-hidden="true">{open ? "▴" : "▾"}</span>
      </button>
      {open ? (
        <div id={groupId} class="ph-mobile-nav-group" role="group" aria-label={`${label} categories`}>
          <a
            href={overviewHref}
            class={`ph-mobile-nav-subitem${overviewActive ? " active" : ""}`}
            onClick={onNavigate}
          >
            {overviewLabel}
          </a>
          {categories.map((cat) => {
            const href = categoryRoute(cat.slug);
            const active = isActive(routePath, href);
            const count = categoryCounts?.[cat.slug];
            return (
              <a
                key={cat.slug}
                href={href}
                class={`ph-mobile-nav-subitem${active ? " active" : ""}`}
                aria-current={active ? "page" : undefined}
                onClick={onNavigate}
              >
                <span class="ph-mobile-nav-subitem-icon" aria-hidden="true">
                  <CategoryIcon slug={cat.slug} />
                </span>
                <span class="ph-mobile-nav-subitem-label">{cat.name}</span>
                {count != null ? <span class="ph-mobile-nav-subitem-count">{count}</span> : null}
              </a>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export const SiteHeader: FunctionalComponent<{
  site: LayoutProps["site"];
  themeConfig: LayoutProps["themeConfig"];
  routePath: string;
  categoryCounts?: Record<string, number>;
}> = ({ site, themeConfig, routePath, categoryCounts }) => {
  const githubLink = themeConfig.socialLinks?.find((link) => link.icon === "github");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [preactMenuOpen, setPreactMenuOpen] = useState(false);
  const [aiMenuOpen, setAiMenuOpen] = useState(false);
  const [mobilePreactOpen, setMobilePreactOpen] = useState(false);
  const [mobileAiOpen, setMobileAiOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const preactMenuRef = useRef<HTMLDivElement>(null);
  const aiMenuRef = useRef<HTMLDivElement>(null);
  const preactToggleRef = useRef<HTMLButtonElement>(null);
  const aiToggleRef = useRef<HTMLButtonElement>(null);

  const closeDesktopMenus = () => {
    setPreactMenuOpen(false);
    setAiMenuOpen(false);
  };

  useEffect(() => {
    if (!mobileNavOpen || typeof window === "undefined") return;
    if (isPreactSectionActive(routePath)) {
      setMobilePreactOpen(true);
      setMobileAiOpen(false);
    } else if (isAiSectionActive(routePath)) {
      setMobileAiOpen(true);
      setMobilePreactOpen(false);
    }
  }, [mobileNavOpen, routePath]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    function onKeyDown(event: KeyboardEvent): void {
      if (event.key !== "Escape") return;
      if (preactMenuOpen) {
        setPreactMenuOpen(false);
        preactToggleRef.current?.focus();
        return;
      }
      if (aiMenuOpen) {
        setAiMenuOpen(false);
        aiToggleRef.current?.focus();
        return;
      }
      if (mobileNavOpen) {
        setMobileNavOpen(false);
        setMobilePreactOpen(false);
        setMobileAiOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileNavOpen, preactMenuOpen, aiMenuOpen]);

  useEffect(() => {
    if ((!preactMenuOpen && !aiMenuOpen) || typeof window === "undefined") return;
    function onPointerDown(event: MouseEvent): void {
      const target = event.target as Node;
      const insidePreact = preactMenuRef.current?.contains(target);
      const insideAi = aiMenuRef.current?.contains(target);
      if (!insidePreact && !insideAi) {
        closeDesktopMenus();
      }
    }
    window.addEventListener("mousedown", onPointerDown);
    return () => window.removeEventListener("mousedown", onPointerDown);
  }, [preactMenuOpen, aiMenuOpen]);

  const closeMobile = () => {
    setMobileNavOpen(false);
    setMobilePreactOpen(false);
    setMobileAiOpen(false);
  };

  return (
    <header class="ph-header">
      <div class="ph-shell ph-header-inner">
        <a class="ph-brand" href={withBase(site.base, "/")} aria-label="PreactHub home">
          <BrandLogo />
        </a>
        <nav class="ph-nav" aria-label="Main navigation">
          <NavCatalogDropdown
            label="Preact"
            section="preact"
            overviewHref="/libraries"
            overviewLabel="Browse libraries"
            categories={preactCategories}
            menuId="ph-preact-nav-menu"
            routePath={routePath}
            open={preactMenuOpen}
            onToggle={() => {
              setPreactMenuOpen((value) => !value);
              setAiMenuOpen(false);
            }}
            menuRef={preactMenuRef}
            toggleRef={preactToggleRef}
            categoryCounts={categoryCounts}
          />
          <NavCatalogDropdown
            label="AI Tools"
            section="ai"
            overviewHref="/ai"
            overviewLabel="Browse AI tools"
            categories={aiCategories}
            menuId="ph-ai-nav-menu"
            routePath={routePath}
            open={aiMenuOpen}
            onToggle={() => {
              setAiMenuOpen((value) => !value);
              setPreactMenuOpen(false);
            }}
            menuRef={aiMenuRef}
            toggleRef={aiToggleRef}
            categoryCounts={categoryCounts}
          />
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
            Submit
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
          <MobileNavGroup
            label="Preact"
            overviewHref="/libraries"
            overviewLabel="Browse libraries"
            categories={preactCategories}
            groupId="ph-mobile-preact-group"
            open={mobilePreactOpen}
            onToggle={() => {
              setMobilePreactOpen((value) => !value);
              setMobileAiOpen(false);
            }}
            onNavigate={closeMobile}
            categoryCounts={categoryCounts}
            routePath={routePath}
          />
          <MobileNavGroup
            label="AI Tools"
            overviewHref="/ai"
            overviewLabel="Browse AI tools"
            categories={aiCategories}
            groupId="ph-mobile-ai-group"
            open={mobileAiOpen}
            onToggle={() => {
              setMobileAiOpen((value) => !value);
              setMobilePreactOpen(false);
            }}
            onNavigate={closeMobile}
            categoryCounts={categoryCounts}
            routePath={routePath}
          />
          {githubLink ? (
            <a href={githubLink.link} target="_blank" rel="noopener noreferrer" onClick={closeMobile}>
              GitHub
            </a>
          ) : null}
          <a href="/submit" class="ph-mobile-nav-cta" onClick={closeMobile}>
            Submit
          </a>
        </div>
      ) : null}
    </header>
  );
};
