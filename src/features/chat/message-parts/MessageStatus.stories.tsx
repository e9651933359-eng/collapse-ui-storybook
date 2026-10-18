import type { Meta, StoryObj } from '@storybook/react-vite'
import { MessageStatus, messageStatusLabels, type MessageStatusType } from './MessageStatus'

const statuses = Object.keys(messageStatusLabels) as MessageStatusType[]

const meta = {
  title: 'Chat/Message status',
  component: MessageStatus,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Статус исходящего сообщения. Figma my-Base «Message status» 10092:121775: Sended, Readed, Loading, Error; вариант Light — для тёмных подложек (медиа).' } } },
  args: { status: 'read', light: false },
  argTypes: { status: { control: 'select', options: statuses } },
} satisfies Meta<typeof MessageStatus>

export default meta
type Story = StoryObj<typeof meta>

export const Read: Story = {}
export const Sent: Story = { args: { status: 'sent' } }
export const Loading: Story = { args: { status: 'loading' } }
export const Failed: Story = { name: 'Error', args: { status: 'error' } }

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'auto repeat(4, 56px)', alignItems: 'center', gap: 16, padding: 24, borderRadius: 'var(--radius-xl)', background: 'var(--surface-primary)' }}>
      <span />
      {statuses.map((status) => <span key={status} style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{status}</span>)}
      <span style={{ color: 'var(--text-tertiary)' }}>Light = false</span>
      {statuses.map((status) => <MessageStatus key={status} status={status} />)}
      <span style={{ color: 'var(--text-tertiary)' }}>Light = true</span>
      {statuses.map((status) => <span key={status} style={{ display: 'inline-grid', placeItems: 'center', width: 40, height: 28, borderRadius: 14, background: 'var(--collapse-color-background-opacity-base-accent)' }}><MessageStatus status={status} light /></span>)}
    </div>
  ),
}
