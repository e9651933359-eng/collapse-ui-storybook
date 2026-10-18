import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProductRail } from './ProductRail'

const meta = {
  title: 'Shell/ProductRail',
  component: ProductRail,
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ height: 760, background: 'var(--shell-backdrop)' }}><Story /></div>],
} satisfies Meta<typeof ProductRail>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

// Тема сайдбара и подложки задаётся глобалом Shell theme (тулбар Storybook); здесь она включена сразу.
export const DeepViolet: Story = { globals: { shellTheme: 'deep-violet' } }
