# Collapse Chat UI

Рабочий прототип чатов, папок и локальной дизайн-системы Collapse.

## Локальный запуск

```bash
npm ci
npm run dev
```

## Пакет @collapse/ui

Этот репозиторий — единственный источник компонентов, токенов и композиций чатов. Приложения папок и федерации подключают его как пакет:

```json
"@collapse/ui": "github:e9651933359-eng/collapse-ui-storybook#main"
```

- `npm run build:lib` собирает `dist-lib` (ES-модуль, `style.css`, типы); при установке из git запускается автоматически (`prepare`).
- Приложение импортирует `@collapse/ui` и `@collapse/ui/style.css`, а в `vite.config.ts` подключает плагин `collapseAssets` из `@collapse/ui/vite` (копирует иллюстрации в `public/assets`).
- Документация дизайн-системы поставляется в пакете: `node_modules/@collapse/ui/docs/design-system/`.
- Точка входа — `src/index.ts`: новый компонент для приложений нужно экспортировать оттуда.
- Локальная связка с приложением: `npm install ../collapse-ui-storybook` (или `npm link`); приложение уже дедуплицирует React.

## Проверка

```bash
npm run build
npm run build-storybook
npm run build:lib
```

## Публикация

Исходный код хранится в приватном репозитории. В публичные репозитории попадают только готовые статические сборки.

- Чаты: https://fasttrackia47-beep.github.io/collapse-chat-ui/
- Федерация: https://fasttrackia47-beep.github.io/collapse-chat-ui-federation/
