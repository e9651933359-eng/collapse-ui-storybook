import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { ComboBox } from './ComboBox'

const options = [
  { value: 'names', label: 'Только названия' },
]

function ComboBoxDemo({ defaultOpen = false }: { defaultOpen?: boolean }) {
  const [value, setValue] = useState('names')
  return (
    <div className="combo-box-story-canvas">
      <div style={{ width: 428 }}>
        <ComboBox
          ariaLabel="Отображение папок"
          defaultOpen={defaultOpen}
          value={value}
          options={options}
          onChange={setValue}
        />
      </div>
    </div>
  )
}

const meta = {
  title: 'UI/ComboBox',
  component: ComboBox,
  args: { ariaLabel: 'Отображение папок', value: 'names', options },
} satisfies Meta<typeof ComboBox>

export default meta
type Story = StoryObj<typeof meta>

export const Enabled: Story = { render: () => <ComboBoxDemo /> }
export const Active: Story = { render: () => <ComboBoxDemo defaultOpen /> }

/**
 * Ревью 09.11.2026: в «Управлении папками» выпадающее меню «Отображение папок» обрезалось нижним
 * краем модалки — у неё `overflow: hidden` + скролл тела. Меню теперь рендерится через портал
 * в document.body с `position: fixed`, поэтому остаётся видимым целиком, даже когда поле зажато
 * в тесном скроллящемся контейнере с обрезанными углами.
 */
export const InClippedScrollContainer: Story = {
  render: () => {
    const [value, setValue] = useState('names')
    return (
      <div className="folder-modal-story-canvas">
        <div style={{ width: 320, height: 160, overflow: 'hidden', borderRadius: 24, background: 'var(--collapse-color-surface-solid-primary)', boxShadow: 'var(--collapse-effect-shadow-02)' }}>
          <div style={{ height: '100%', overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 120 }}>
            <span>Контент модалки выше…</span>
            <ComboBox ariaLabel="Отображение папок" defaultOpen value={value} options={options} onChange={setValue} />
          </div>
        </div>
      </div>
    )
  },
}
