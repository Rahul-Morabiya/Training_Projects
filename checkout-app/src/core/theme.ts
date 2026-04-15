export type Theme = "light" | "dark";

const KEY = "theme";

export function initTheme() {
  const saved = (localStorage.getItem(KEY) as Theme) || "dark";
  applyTheme(saved);
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;

  root.classList.remove("theme-light", "theme-dark");
  root.classList.add(`theme-${theme}`);

  localStorage.setItem(KEY, theme);
}

export function getTheme(): Theme {
  return (localStorage.getItem(KEY) as Theme) || "dark";
}