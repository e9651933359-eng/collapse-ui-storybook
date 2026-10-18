import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Switch } from './Switch'

function InteractiveSwitch() { const [selected, setSelected] = useState(false); return <Switch selected={selected} onChange={setSelected} label="Уведомления" /> }

const meta = { title: 'UI/Switch', component: Switch, args: { selected: true, label: 'Уведомления' } } satisfies Meta<typeof Switch>
export default meta
type Story = StoryObj<typeof meta>

export const Interactive: Story = { render: () => <InteractiveSwitch /> }

const stateRows = [
  { key: 'default', label: 'Default', props: {} },
  { key: 'hovered', label: 'Hovered', props: { hovered: true } },
  { key: 'pressed', label: 'Pressed', props: { pressed: true } },
  { key: 'disabled', label: 'Disabled', props: { disabled: true } },
] as const

/**
 * Все состояния на одном экране, а не в отдельных story: так видно, что именно меняется
 * (заливка, положение ручки) между default/hovered/pressed/disabled, не кликая по очереди.
 */
export const States: Story = {
  render: () => (
    <div className="ui-story-grid">
      {stateRows.map((row) => (
        <div className="ui-story-row-labeled" key={row.key}>
          <span className="ui-story-row-label">{row.label}</span>
          <div className="ui-story-row"><Switch label="Вкл" selected {...row.props} /><span>Вкл</span></div>
          <div className="ui-story-row"><Switch label="Выкл" selected={false} {...row.props} /><span>Выкл</span></div>
        </div>
      ))}
    </div>
  ),
}
