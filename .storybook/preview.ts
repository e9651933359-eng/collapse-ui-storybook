import type { Preview } from '@storybook/react-vite'
import '../src/theme/tokens.css'
import '../src/styles.css'
import '../src/components/ui/ui.css'
import './preview.css'
import { applyShellTheme, shellThemeLabels, shellThemes, type ShellTheme } from '../src/theme/shellTheme'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    backgrounds: { default: 'collapse', values: [{ name: 'collapse', value: '#f9fafc' }] },
  },
  globalTypes: {
    shellTheme: {
      description: 'Цвет сайдбара и общей подложки',
      toolbar: {
        title: 'Shell theme',
        icon: 'paintbrush',
        dynamicTitle: true,
        items: shellThemes.map((value) => ({ value, title: shellThemeLabels[value] })),
      },
    },
  },
  initialGlobals: { shellTheme: 'default' },
  decorators: [
    (Story, context) => {
      applyShellTheme((context.globals.shellTheme ?? 'default') as ShellTheme)
      return Story()
    },
  ],
}

export default preview
