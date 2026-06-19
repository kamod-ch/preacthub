const THEME_STORAGE_KEY = "preactpress-theme";

function prefersDarkColorScheme(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function readStoredTheme(): "light" | "dark" | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

export function syncDocumentTheme(): void {
  const stored = readStoredTheme();
  const root = document.documentElement;

  if (stored === null) {
    root.removeAttribute("data-theme");
    root.classList.toggle("dark", prefersDarkColorScheme());
    return;
  }

  root.setAttribute("data-theme", stored);
  root.classList.toggle("dark", stored === "dark");
}

export function startThemeSync(): () => void {
  syncDocumentTheme();

  function onStorage(event: StorageEvent): void {
    if (event.key !== THEME_STORAGE_KEY) return;
    syncDocumentTheme();
  }

  function onSystemThemeChange(): void {
    if (readStoredTheme() !== null) return;
    syncDocumentTheme();
  }

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", onSystemThemeChange);
  window.addEventListener("storage", onStorage);

  return () => {
    media.removeEventListener("change", onSystemThemeChange);
    window.removeEventListener("storage", onStorage);
  };
}
