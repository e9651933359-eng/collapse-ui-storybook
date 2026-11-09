import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../ui/Button'
import { Popover } from './Popover'

const meta = { title: 'Feedback/Popover', component: Popover, parameters: { layout: 'centered' }, args: { children: <Button>Открыть</Button>, content: <div style={{ width: 220, padding: 12 }}>Контент Popover<br /><button type="button">Действие</button></div> } } satisfies Meta<typeof Popover>
export default meta
type Story = StoryObj<typeof meta>
export const Interactive: Story = { render: (args) => <div style={{ padding: 160, borderRadius: 32, background: 'var(--collapse-color-surface-solid-primary)' }}><Popover {...args}><Button>Открыть</Button></Popover></div> }
export const GapClear: Story = { args: { defaultOpen: true, gap: 'clear' }, render: (args) => <div style={{ padding: 160, borderRadius: 32, background: 'var(--collapse-color-surface-solid-primary)' }}><Popover {...args}><Button>Открыть</Button></Popover></div> }

/**
 * `placement="auto-end"`: вертикаль подбирается по месту во вьюпорте, а не фиксируется вызывающим кодом.
 * Триггер прижат к низу тесного контейнера — панели не хватает места снизу, поэтому она открывается вверх.
 * Ревью 09.11.2026: меню файла в ленте сообщений (`DiskAttachmentRow`) раньше было жёстко `top-end`
 * и обрезалось у верхнего края прокручиваемой ленты.
 */
export const AutoPlacementFlipsUp: Story = {
  args: { defaultOpen: true, gap: 'clear', placement: 'auto-end', content: <div style={{ width: 220, padding: 12 }}>Открылось вверх, снизу не было места<br /><button type="button">Действие</button></div> },
  render: (args) => (
    <div style={{ width: 320, height: 120, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', padding: 16, borderRadius: 32, background: 'var(--collapse-color-surface-solid-primary)' }}>
      <Popover {...args}><Button>Триггер у нижнего края</Button></Popover>
    </div>
  ),
}
