import type { FunctionalComponent } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { Badge, Button, InputGroup, InputGroupAddon, InputGroupInput } from "@kamod-ch/ui";
import type { LibraryDirectoryMeta } from "../types";
import { applyDirectorySearch, tagUrl, topTags } from "../utils";

function SearchIcon() {
  return (
    <svg
      class="ph-hero-search-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" stroke-linecap="round" />
    </svg>
  );
}

export const HeroSection: FunctionalComponent<{
  directory: LibraryDirectoryMeta;
  isHome: boolean;
  inlineDirectorySearch?: boolean;
}> = ({ directory, isHome, inlineDirectorySearch = false }) => {
  const popularTags = topTags(directory.libraries);
  const formAction = isHome ? "/" : "/libraries";
  const [query, setQuery] = useState("");
  const debounceRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("q") ?? "");
  }, []);

  function submitSearch(value: string): void {
    if (inlineDirectorySearch) {
      applyDirectorySearch(value);
      return;
    }
    const url = new URL(formAction, window.location.origin);
    const trimmed = value.trim();
    if (trimmed) url.searchParams.set("q", trimmed);
    window.location.href = `${url.pathname}${url.search}`;
  }

  function handleInput(value: string): void {
    setQuery(value);
    if (!inlineDirectorySearch) return;
    window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => submitSearch(value), 300);
  }

  return (
    <section class="ph-hero ph-libraries-hero">
      <div class="ph-hero-grid-bg" aria-hidden="true" />
      <div class="ph-hero-glow" aria-hidden="true" />
      <Badge variant="outline" class="ph-hero-badge">
        <span class="ph-hero-badge-inner">
          <span class="ph-hero-badge-dot" aria-hidden="true" />
          {directory.stats.total} libraries indexed
        </span>
      </Badge>
      <h1>
        Discover libraries that <span class="ph-hero-accent">actually work</span> with Preact.
      </h1>
      <p>
        A curated directory with verified compatibility ratings, SSR and islands guidance,
        and practical setup notes for the entire Preact ecosystem.
      </p>
      <form
        class="ph-hero-search"
        action={formAction}
        method="get"
        onSubmit={(event) => {
          event.preventDefault();
          submitSearch(query);
        }}
      >
        <div class="ph-hero-search-field">
          <InputGroup class="ph-hero-search-group">
            <InputGroupAddon align="inline-start" class="ph-hero-search-addon">
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput
              name="q"
              type="search"
              value={query}
              placeholder={`Search ${directory.stats.total} libraries...`}
              aria-label="Search Preact libraries"
              class="ph-hero-search-input"
              autocomplete="off"
              spellcheck={false}
              onInput={(event) => handleInput(event.currentTarget.value)}
            />
          </InputGroup>
        </div>
        <Button type="submit" class="ph-hero-search-button ph-button-primary">
          Search libraries <span aria-hidden="true">→</span>
        </Button>
        <Button href="/libraries" variant="outline" class="ph-hero-browse-button">
          Start browsing libraries
        </Button>
      </form>
      {popularTags.length ? (
        <div class="ph-popular-tags" aria-label="Popular tags">
          <span>Popular:</span>
          {popularTags.map((tag) =>
            inlineDirectorySearch ? (
              <button key={tag} type="button" class="ph-popular-tag" onClick={() => { setQuery(tag); submitSearch(tag); }}>
                {tag}
              </button>
            ) : (
              <a key={tag} href={tagUrl(tag, isHome)}>
                {tag}
              </a>
            ),
          )}
        </div>
      ) : null}
    </section>
  );
};
