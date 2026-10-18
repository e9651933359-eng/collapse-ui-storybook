import type { Meta, StoryObj } from '@storybook/react-vite'
import { Counter } from './Counter'

const meta = { title: 'UI/Counter', component: Counter, args: { children: 3 } } satisfies Meta<typeof Counter>
export default meta
type Story = StoryObj<typeof meta>

export const Tones: Story = { render: () => <div className="ui-story-row">{(['negative', 'accent', 'warning', 'default'] as const).map((tone) => <Counter key={tone} tone={tone}>12</Counter>)}</div> }
export const Sizes: Story = {
  render: () => (
    <div className="ui-story-grid">
      {(['s', 'm'] as const).map((size) => (
        <div className="ui-story-row-labeled" key={size}>
          <span className="ui-story-row-label">{size === 's' ? 'Small' : 'Medium'}</span>
          <Counter size={size}>3</Counter>
          <Counter size={size}>12</Counter>
        </div>
      ))}
    </div>
  ),
}
export const Emphasis: Story = { render: () => <div className="ui-story-row">{(['primary', 'secondary', 'tertiary'] as const).map((emphasis) => <Counter key={emphasis} emphasis={emphasis}>{emphasis}</Counter>)}</div> }
export const Shapes: Story = { render: () => <div className="ui-story-row"><Counter tone="accent" shape="default">3</Counter><Counter shape="expressive">12</Counter></div> }
