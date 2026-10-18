export const shellThemes = ['default', 'deep-violet'] as const
export type ShellTheme = (typeof shellThemes)[number]

export const shellThemeLabels: Record<ShellTheme, string> = {
  default: 'Серый (по умолчанию)',
  'deep-violet': 'Deep Violet',
}

const storageKey = 'collapse-shell-theme'

const isShellTheme = (value: unknown): value is ShellTheme => shellThemes.includes(value as ShellTheme)

/** Тема из ?shell=..., затем из localStorage; иначе серая по умолчанию. */
export function readShellTheme(): ShellTheme {
  try {
    const fromQuery = new URLSearchParams(window.location.search).get('shell')
    if (isShellTheme(fromQuery)) {
      window.localStorage.setItem(storageKey, fromQuery)
      return fromQuery
    }
    const stored = window.localStorage.getItem(storageKey)
    if (isShellTheme(stored)) return stored
  } catch {
    // localStorage может быть недоступен — остаётся тема по умолчанию
  }
  return 'default'
}

/** Ставит data-shell-theme на <html>: тема действует на сайдбар и подложку сразу. */
export function applyShellTheme(theme: ShellTheme, root: HTMLElement = document.documentElement) {
  if (theme === 'default') root.removeAttribute('data-shell-theme')
  else root.setAttribute('data-shell-theme', theme)
}
