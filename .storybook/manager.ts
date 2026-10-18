import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming'

/** Оформление Storybook для показа дизайна: фирменные цвета Collapse, без кодовых панелей. */
const collapseTheme = create({
  base: 'light',
  brandTitle: 'Collapse UI',
  brandUrl: './',
  colorPrimary: '#7047fe',
  colorSecondary: '#7047fe',
  appBg: '#f9fafc',
  appContentBg: '#ffffff',
  appBorderColor: '#e8e8ee',
  barBg: '#ffffff',
  barTextColor: '#6b6b7b',
  barSelectedColor: '#7047fe',
  textColor: '#1c1b24',
  fontBase: '"Inter", "Helvetica Neue", Arial, sans-serif',
})

addons.setConfig({
  theme: collapseTheme,
  // Панель Controls скрыта: чистый просмотр. Открывается клавишей A, если нужно покрутить параметры.
  showPanel: false,
  panelPosition: 'right',
  sidebar: { showRoots: true },
})
