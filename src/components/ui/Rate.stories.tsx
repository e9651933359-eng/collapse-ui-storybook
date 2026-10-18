import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Rate } from './Rate'

function InteractiveRate() { const [value, setValue] = useState(3); return <Rate value={value} onChange={setValue} /> }
const meta = { title: 'UI/Rate', component: Rate, args: { value: 3 } } satisfies Meta<typeof Rate>
export default meta
type Story = StoryObj<typeof meta>

export const Interactive: Story = { render: () => <InteractiveRate /> }
const rateSizeLabels = { s: 'Small · 16', m: 'Medium · 24', l: 'Large · 32' } as const

export const Sizes: Story = {
  render: () => (
    <div className="ui-story-grid">
      {(['s', 'm', 'l'] as const).map((size) => (
        <div className="ui-story-row-labeled" key={size}>
          <span className="ui-story-row-label">{rateSizeLabels[size]}</span>
          <Rate value={4} size={size} />
        </div>
      ))}
    </div>
  ),
}
export const Disabled: Story = { args: { disabled: true } }
