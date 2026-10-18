import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { VoiceMessage, type VoiceMessageState } from './VoiceMessage'
import { BubbleFrame, ChatSurface } from './story-utils'

const states: Array<[VoiceMessageState, string]> = [
  ['loading', 'Loading'],
  ['not-loaded', 'Not loading'],
  ['default', 'Default / Not listened'],
  ['playback', 'Playback'],
  ['pause', 'Pause'],
  ['disabled', 'Disabled'],
]

const meta = {
  title: 'Chat/Voice message',
  component: VoiceMessage,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Голосовое сообщение. Figma my-Base «Voice message» 10115:69192: кнопка 40px, время, волна (Record, столбики 2px), кнопка расшифровки 44×28. Состояния: загрузка с отменой, не загружено (скачать), воспроизведение, пауза, disabled.' } } },
  decorators: [(Story) => <ChatSurface width={460}><BubbleFrame><Story /></BubbleFrame></ChatSurface>],
} satisfies Meta<typeof VoiceMessage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { state: 'default', time: '00:06' } }
export const Loading: Story = { args: { state: 'loading' } }
export const NotLoaded: Story = { args: { state: 'not-loaded' } }
export const Playback: Story = { args: { state: 'playback', time: '00:02', progress: 0.15 } }
export const Pause: Story = { args: { state: 'pause', time: '00:02', progress: 0.15 } }
export const Disabled: Story = { args: { state: 'disabled' } }

export const AllStates: Story = {
  render: () => (
    <>
      {states.map(([state, label]) => (
        <div key={state} style={{ display: 'grid', gap: 4 }}>
          <span style={{ color: 'var(--text-tertiary)', fontSize: 12 }}>{label}</span>
          <VoiceMessage state={state} time={state === 'playback' || state === 'pause' ? '00:02' : '00:06'} />
        </div>
      ))}
    </>
  ),
}

function InteractiveVoice() {
  const [state, setState] = useState<VoiceMessageState>('default')
  return <VoiceMessage state={state} time="00:06" progress={0.4} onToggle={() => setState((current) => (current === 'playback' ? 'pause' : 'playback'))} />
}

export const Interactive: Story = { render: () => <InteractiveVoice /> }
