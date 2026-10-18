import type { Meta, StoryObj } from '@storybook/react-vite'
import { Plus } from 'lucide-react'
import { Button } from './Button'

const meta = {
  title: 'UI/Button',
  component: Button,
  args: { children: 'Создать папку', priority: 'secondary', size: 's' },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const SecondarySmall: Story = {}
export const SecondarySmallHovered: Story = { args: { className: 'is-hovered' } }
export const Priorities: Story = {
  render: () => <div className="ui-story-row">{(['primary', 'accent', 'secondary', 'tertiary'] as const).map((priority) => <Button key={priority} priority={priority} leadingIcon={<Plus />}>{priority}</Button>)}</div>,
}
const sizeLabels = { s: 'Small · 40', m: 'Medium · 48', l: 'Large · 56' } as const

/**
 * Размер меняет только высоту кнопки (40/48/56 px), ширина следует за текстом — поэтому короткая
 * подпись из одной буквы выглядит как кружок, а не как кнопка. Матрица ниже показывает все
 * размеры сразу на всех priority, с читаемым текстом и настоящим цветом/формой кнопки.
 */
export const Sizes: Story = {
  render: () => (
    <div className="ui-story-grid">
      {(['primary', 'accent', 'secondary', 'tertiary'] as const).map((priority) => (
        <div className="ui-story-row-labeled" key={priority}>
          <span className="ui-story-row-label">{priority}</span>
          {(['s', 'm', 'l'] as const).map((size) => <Button key={size} priority={priority} size={size}>{sizeLabels[size]}</Button>)}
        </div>
      ))}
    </div>
  ),
}
export const SemanticAndSystemStates: Story = {
  render: () => <div className="ui-story-row"><Button priority="accent" intent="error">Ошибка</Button><Button priority="accent" intent="success">Готово</Button><Button disabled>Недоступно</Button><Button loading>Загрузка</Button></div>,
}
