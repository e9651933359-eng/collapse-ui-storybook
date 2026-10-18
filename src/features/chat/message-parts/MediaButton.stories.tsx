import type { Meta, StoryObj } from '@storybook/react-vite'
import { MediaButton, type MediaButtonType } from './MediaButton'
import { MediaLabel } from './MediaLabel'

const types: Array<[MediaButtonType, string]> = [['loading', 'Loading / Downloading'], ['download', 'Download'], ['send', 'Send']]

const meta = {
  title: 'Chat/Media controls',
  component: MediaButton,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Кнопки и лейбл для изображений в диалоге. Figma my-Base «Buttons (media)» Large 10092:125388 / Medium 10092:125424 и «Label (media)» 10098:69404. Размер файла показываем с одним знаком после точки.' } } },
} satisfies Meta<typeof MediaButton>

export default meta
type Story = StoryObj<typeof meta>

export const Download: Story = { args: { type: 'download' } }
export const Loading: Story = { args: { type: 'loading' } }
export const Send: Story = { args: { type: 'send', background: 'accent' } }

export const AllButtons: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'auto repeat(4, auto)', gap: 16, alignItems: 'center', padding: 24, borderRadius: 'var(--radius-xl)', background: 'var(--surface-primary)' }}>
      <span />
      <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Large · Default</span>
      <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Large · Accent</span>
      <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Medium · Default</span>
      <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Medium · Accent</span>
      {types.flatMap(([type, label]) => [false, true].map((hovered) => [
        <span key={`${type}-${hovered}-l`} style={{ fontSize: 13 }}>{label}{hovered ? ' + [HOVER]' : ''}</span>,
        <MediaButton key={`${type}-${hovered}-ld`} type={type} hovered={hovered} />,
        <MediaButton key={`${type}-${hovered}-la`} type={type} background="accent" hovered={hovered} />,
        <MediaButton key={`${type}-${hovered}-md`} type={type} size="medium" hovered={hovered} />,
        <MediaButton key={`${type}-${hovered}-ma`} type={type} size="medium" background="accent" hovered={hovered} />,
      ]))}
    </div>
  ),
}

export const Labels: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, padding: 24, borderRadius: 'var(--radius-xl)', background: 'var(--surface-primary)', justifyItems: 'start' }}>
      <MediaLabel condition="default" />
      <MediaLabel condition="loading" />
      <MediaLabel condition="error" />
    </div>
  ),
}
