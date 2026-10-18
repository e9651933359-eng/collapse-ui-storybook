import type { Meta, StoryObj } from '@storybook/react-vite'
import { SystemMessage } from './SystemMessage'
import { ChatSurface } from './story-utils'

const meta = {
  title: 'Chat/System message',
  component: SystemMessage,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Системное сообщение (бот, сервис, звонок). Figma my-Base «SystemMessagesDesktop» 10100:73473: тип кнопок Call / Bot / No button × Comment × Reactions. Кнопка звонка — success Button, действия бота — Assistive chips (*ItemsBot).' } } },
  decorators: [(Story) => <ChatSurface width={680}><Story /></ChatSurface>],
  args: { title: 'Информация', text: 'Lorem ipsum dolor sit amet, consectetur', time: '12:32' },
} satisfies Meta<typeof SystemMessage>

export default meta
type Story = StoryObj<typeof meta>

const reactions = [{ emoji: '🙂', count: 1 }, { emoji: '🙂', count: 1 }]

export const NoButton: Story = {}
export const NoButtonWithReactions: Story = { args: { reactions, pinned: true } }
export const Call: Story = { args: { action: 'call' } }
export const CallWithReactions: Story = { args: { action: 'call', reactions, pinned: true } }
export const Bot: Story = { args: { action: 'bot', botActions: ['Действие', 'Действие', 'Действие'] } }
export const BotWithReactions: Story = { args: { action: 'bot', botActions: ['Действие', 'Действие', 'Действие'], reactions, pinned: true } }
export const WithComments: Story = { args: { comments: 3 } }
