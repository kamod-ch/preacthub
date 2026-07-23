import { Button, InputGroup, InputGroupAddon, InputGroupInput } from "@kamod-ch/ui";
import { useEffect, useState } from "preact/hooks";
import { applyDirectorySearch, DIRECTORY_SEARCH_EVENT, tagUrl, topTags } from "../utils";
import type { PreactLibrary } from "../../../src/lib/libraries";

function SearchIcon() {
  return (
    <svg class="ph-hero-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.8" />
      <path d="M16.5 16.5L21 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
    </svg>
  );
}

function readQueryFromUrl(): string {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("q") ?? "";
}

export function DirectorySearchBar({
  mode,
  libraries = [],
  initialQuery,
  showPopularTags = false,
}: {
  mode: "home" | "directory";
  libraries?: PreactLibrary[];
  initialQuery?: string;
  showPopularTags?: boolean;
}) {
  const [query, setQuery] = useState(initialQuery ?? "");
  const popular = showPopularTags ? topTags(libraries) : [];

  useEffect(() => {
    if (mode !== "directory") return;
    setQuery(readQueryFromUrl());

    function onDirectorySearch(event: Event): void {
      const detail = (event as CustomEvent<{ q: string }>).detail;
      setQuery(detail.q ?? "");
    }

    function onPopState(): void {
      setQuery(readQueryFromUrl());
    }

    window.addEventListener(DIRECTORY_SEARCH_EVENT, onDirectorySearch);
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener(DIRECTORY_SEARCH_EVENT, onDirectorySearch);
      window.removeEventListener("popstate", onPopState);
    };
  }, [mode]);

  function submit(event: Event) {
    event.preventDefault();
    const trimmed = query.trim();
    if (mode === "home") {
      const url = trimmed ? `/libraries?q=${encodeURIComponent(trimmed)}` : "/libraries";
      window.location.assign(url);
      return;
    }
    applyDirectorySearch(trimmed);
  }

  return (
    <div class="ph-directory-search">
      <form class="ph-hero-search" role="search" onSubmit={submit}>
        <div class="ph-hero-search-field">
          <InputGroup class="ph-hero-search-group">
            <InputGroupAddon class="ph-hero-search-addon" aria-hidden="true">
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput
              type="search"
              class="ph-hero-search-input"
              name="q"
              value={query}
              placeholder="Search libraries, packages or tags"
              aria-label="Search libraries"
              onInput={(event) => setQuery(event.currentTarget.value)}
            />
          </InputGroup>
        </div>
        <Button type="submit" class="ph-button-primary ph-hero-search-button">
          Search
        </Button>
      </form>
      {popular.length > 0 ? (
        <div class="ph-popular-tags" aria-label="Popular tags">
          <span>Popular:</span>
          {popular.map((tag) => (
            <a
              key={tag}
              class="ph-popular-tag"
              href={tagUrl(tag)}
              onClick={(event) => {
                if (mode !== "directory") return;
                event.preventDefault();
                setQuery(tag);
                applyDirectorySearch(tag);
              }}
            >
              {tag}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
