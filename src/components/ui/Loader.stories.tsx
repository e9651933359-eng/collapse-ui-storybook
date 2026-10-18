import type { Meta, StoryObj } from '@storybook/react-vite'
import { Loader } from './Loader'

const meta = { title: 'UI/Loader', component: Loader } satisfies Meta<typeof Loader>
export default meta
type Story = StoryObj<typeof meta>

export const Sizes: Story = {
  render: () => (
    <div className="ui-story-grid">
      {(['small', 'medium', 'large', 'xlarge'] as const).map((size) => (
        <div className="ui-story-row-labeled" key={size}>
          <span className="ui-story-row-label">{size}</span>
          <Loader size={size} />
        </div>
      ))}
    </div>
  ),
}
export const Tones: Story = { render: () => <div className="ui-story-row"><Loader tone="accent" /><span style={{ background: 'var(--collapse-color-background-solid-base-accent)', padding: 'var(--collapse-spacing-horizontal-l)' }}><Loader tone="light" /></span><Loader tone="ai" /></div> }
