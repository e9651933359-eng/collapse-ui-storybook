/** Минимальный тип плагина: не зависит от версии Vite в приложении. */
export interface CollapseAssetsPlugin {
  name: string
  config(config: { root?: string }): void
}

/** Копирует иллюстрации и фото `@collapse/ui` в `public/assets` приложения. */
export function collapseAssets(): CollapseAssetsPlugin
export default collapseAssets
