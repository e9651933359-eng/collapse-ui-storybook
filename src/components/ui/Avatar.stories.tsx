import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar, type AvatarColor } from './Avatar'

const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  args: { label: 'Анна Иванова', size: 40 },
  decorators: [(Story) => <div style={{ padding: 24 }}><Story /></div>],
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const PersonalOrGroup: Story = {
  args: { emoji: 'АИ', filled: false, shape: 'round' },
}

export const FilledMonogram: Story = { args: { emoji: 'АИ', filled: true, shape: 'round' } }

export const Channel: Story = {
  args: { emoji: '🎨', tone: 'var(--collapse-color-background-solid-accent-primary)', shape: 'squircle' },
}

export const Photo: Story = {
  args: { image: 'assets/figma/message-avatar-photo.png', shape: 'round' },
}

export const ImageShapes: Story = {
  render: () => (
    <div className="ui-story-row">
      <Avatar label="Личный чат" image="assets/avatars/albina.png" shape="round" />
      <Avatar label="Групповой чат" image="assets/avatars/product-launch.png" shape="round" />
      <Avatar label="Канал" image="assets/avatars/partner-support.png" shape="squircle" />
    </div>
  ),
}

export const Statuses: Story = {
  render: () => <div className="ui-story-row"><Avatar label="Онлайн" emoji="АИ" filled={false} status="online" /><Avatar label="Занят" emoji="МИ" filled={false} status="busy" /><Avatar label="Не в сети" emoji="ОП" filled={false} status="offline" /></div>,
}

export const ProfileSize: Story = { args: { emoji: 'АИ', size: 124, filled: false }, parameters: { docs: { description: { story: 'Размер 124 px для профиля — Figma 6974:66545. Кегль монограммы Head/S — техническое допущение: в макете фото.' } } } }
export const Uploader: Story = { args: { emoji: 'АИ', uploader: true } }

const paletteColors: AvatarColor[] = ['default', 1, 2, 3, 4, 5, 6, 7, 8]

export const ColorPalette: Story = {
  name: 'Color 1–8',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {([false, true] as const).map((filled) => (
        <div className="ui-story-row" key={String(filled)} aria-label={filled ? 'Filled' : 'Unfilled'}>
          {paletteColors.map((color) => <Avatar key={color} label={`Color ${color}`} emoji="АИ" color={color} filled={filled} />)}
        </div>
      ))}
    </div>
  ),
}

export const ColorPaletteChannel: Story = {
  name: 'Color 1–8 / squircle',
  render: () => <div className="ui-story-row">{paletteColors.map((color) => <Avatar key={color} label={`Color ${color}`} emoji="🎨" color={color} filled={false} shape="squircle" />)}</div>,
}
