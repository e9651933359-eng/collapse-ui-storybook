// Vite-плагин для приложений на `@collapse/ui`: копирует иллюстрации и фото библиотеки
// (`assets/…`) в public приложения, чтобы относительные пути `assets/figma/...` работали.
import { cpSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const packageRoot = dirname(fileURLToPath(import.meta.url))

export function collapseAssets() {
  return {
    name: 'collapse-ui-assets',
    config(config) {
      const root = resolve(config.root ?? process.cwd())
      const target = join(root, 'public', 'assets')
      mkdirSync(target, { recursive: true })
      cpSync(join(packageRoot, 'public', 'assets'), target, { recursive: true })
    },
  }
}

export default collapseAssets
