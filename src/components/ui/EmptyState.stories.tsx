import type { Meta, StoryObj } from '@storybook/react-vite'
import { Image, Link2 } from 'lucide-react'
import { EmptyState } from './EmptyState'

const meta = { title: 'UI/EmptyState', component: EmptyState, parameters: { docs: { description: { component: 'Пустое состояние списка. Технический компонент: в Figma Base отдельного макета нет, размеры и типографика собраны из токенов Core.' } } }, args: { title: 'Пока нет медиафайлов', description: 'Фото и видео из переписки появятся здесь' } } satisfies Meta<typeof EmptyState>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithIcon: Story = { args: { icon: <Image /> } }
export const Links: Story = { args: { icon: <Link2 />, title: 'Пока нет ссылок', description: 'Ссылки из сообщений будут собраны здесь' } }
export const TitleOnly: Story = { args: { description: undefined } }
