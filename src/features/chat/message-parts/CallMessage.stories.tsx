import type { Meta, StoryObj } from '@storybook/react-vite'
import { CallMessage } from './CallMessage'
import { BubbleFrame, ChatSurface } from './story-utils'

const meta = {
  title: 'Chat/Call message',
  component: CallMessage,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Содержимое бабла звонка. Figma my-Base «Call» 11696:71972: Call is over (иконка, длительность, информация), Call start с кнопкой «Присоединиться» справа (Horizontally) или снизу (Vertically).' } } },
  decorators: [(Story) => <ChatSurface width={460}><BubbleFrame><Story /></BubbleFrame></ChatSurface>],
} satisfies Meta<typeof CallMessage>

export default meta
type Story = StoryObj<typeof meta>

export const Ended: Story = { args: { state: 'ended' } }
export const StartedHorizontal: Story = { args: { state: 'started', layout: 'horizontal' } }
export const StartedVertical: Story = { args: { state: 'started', layout: 'vertical' } }
