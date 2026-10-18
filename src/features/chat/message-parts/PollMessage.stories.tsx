import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { PollMessage } from './PollMessage'
import { PollList } from './PollList'
import { PollStatusBar } from './PollStatusBar'
import { ChatSurface } from './story-utils'

const options = [
  { id: 'a', label: 'Вариант ответа 1', count: 2, percent: 50 },
  { id: 'b', label: 'Вариант ответа 2', count: 1, percent: 25 },
  { id: 'c', label: 'Вариант ответа 3', count: 1, percent: 25 },
]

const meta = {
  title: 'Chat/Poll',
  component: PollMessage,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Опрос в чате. Figma my-Base «BubblePollDesktop» 17198:25566, «Poll» 17198:26124, «Poll list» 17198:26142, «PollStatusBar» 18791:34863. Голосование (радио или чекбоксы + «Голосовать») и результаты (проценты и полоса прогресса). Контролы и Progress — существующие компоненты UI Kit.' } } },
  decorators: [(Story) => <ChatSurface width={680}><Story /></ChatSurface>],
  args: { question: 'Сколько будет 2+2?', options, time: '12:32', sender: 'Имя Фамилия', author: 'other' },
} satisfies Meta<typeof PollMessage>

export default meta
type Story = StoryObj<typeof meta>

export const Voting: Story = {}
export const Multiple: Story = { args: { multiple: true } }
export const Results: Story = { args: { voted: true, votedFor: ['a'] } }
export const WithReactionsAndComments: Story = { args: { voted: true, votedFor: ['a'], reactions: [{ emoji: '🙂', count: 1 }, { emoji: '🔥', count: 3 }], pinned: true, comments: 3 } }
export const Mine: Story = { args: { author: 'me', sender: undefined, voted: true, votedFor: ['b'], comments: 3 } }

export const PollListStates: Story = {
  render: function Render() {
    const [single, setSingle] = useState<string[]>([])
    const [multiple, setMultiple] = useState<string[]>(['a'])
    return (
      <div style={{ display: 'grid', gap: 24 }}>
        <PollList options={options} condition="question" type="single" name="s" selected={single} onSelectedChange={setSingle} />
        <PollList options={options} condition="question" type="multiple" selected={multiple} onSelectedChange={setMultiple} />
        <PollList options={options} condition="answer" type="single" name="r" selected={['a']} />
        <PollList options={options} condition="answer" type="multiple" selected={['a', 'c']} />
      </div>
    )
  },
}

export const StatusBar: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 8, width: 360 }}>
      <PollStatusBar state="text" label="Text" />
      <PollStatusBar state="button" />
      <PollStatusBar state="button" disabled />
    </div>
  ),
}
