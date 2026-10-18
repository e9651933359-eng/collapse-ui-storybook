import type { Meta, StoryObj } from '@storybook/react-vite'
import { CommentsLink } from './CommentsLink'

const meta = {
  title: 'Chat/Comments link',
  component: CommentsLink,
  tags: ['autodocs'],
  parameters: { layout: 'centered', docs: { description: { component: 'Блок «N комментариев» под баблом канала. Figma my-Base «Comments» 10092:108369: радиусы 4 сверху и 24 снизу; у исходящего — градиентная подложка бабла. Склонение: 1 комментарий, 2 комментария, 5 комментариев.' } } },
  decorators: [(Story) => <div style={{ width: 400, padding: 24, background: 'var(--surface-primary)', borderRadius: 'var(--radius-xl)' }}><Story /></div>],
  args: { count: 3 },
} satisfies Meta<typeof CommentsLink>

export default meta
type Story = StoryObj<typeof meta>

export const Other: Story = {}
export const Mine: Story = { args: { mine: true } }
export const PluralForms: Story = {
  render: () => <div style={{ display: 'grid', gap: 8 }}>{[1, 2, 5, 11, 21, 104].map((count) => <CommentsLink key={count} count={count} />)}</div>,
}
