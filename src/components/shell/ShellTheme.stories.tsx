import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { Chat } from '../../types/chat'
import { applyShellTheme, shellThemeLabels, shellThemes, type ShellTheme } from '../../theme/shellTheme'
import { ChatList } from './ChatList'
import { ProductRail } from './ProductRail'

const chats: Chat[] = [
  { id: 'design', title: 'Дизайн платформы', subtitle: '6 участников', avatar: 'ДП', avatarTone: '#dff4ff', kind: 'group', pinned: true, messages: [] },
  { id: 'team', title: 'Команда', subtitle: '15 участников', avatar: 'К', avatarTone: '#f1d8ff', kind: 'group', pinned: true, unread: 4, messages: [] },
  { id: 'direct', title: 'Альбина Бахматулина', subtitle: 'Личный чат', avatar: 'АБ', avatarTone: '#e8ddff', kind: 'direct', messages: [] },
  { id: 'delivery', title: 'Интеграция доставки', subtitle: '12 участников', avatar: 'ИД', avatarTone: '#dce8ff', kind: 'group', unread: 2, messages: [] },
]

function ShellFrame({ theme }: { theme: ShellTheme }) {
  const [selectedId, setSelectedId] = useState('team')
  const [query, setQuery] = useState('')
  const [segment, setSegment] = useState('all')

  return (
    <div data-shell-theme={theme === 'default' ? undefined : theme} style={{ width: 1200, height: 728 }}>
      <section className="chat-shell" aria-label={`Shell: ${shellThemeLabels[theme]}`} style={{ '--chat-list-resizable-width': '320px' } as React.CSSProperties}>
        <ProductRail />
        <ChatList
          chats={chats.filter((chat) => chat.title.toLocaleLowerCase('ru').includes(query.trim().toLocaleLowerCase('ru')))}
          selectedId={selectedId}
          query={query}
          segment={segment}
          onQueryChange={setQuery}
          onSegmentChange={setSegment}
          onOpenFolderSettings={() => undefined}
          onSelect={setSelectedId}
        />
        <div className="chat-workspace chat-workspace--empty"><p>Выберите, с кем хотите начать разговор</p></div>
      </section>
    </div>
  )
}

const meta = {
  title: 'Shell/ShellTheme',
  parameters: { layout: 'fullscreen' },
  // Фрейм сам задаёт тему — глобальный переключатель тулбара на него не влияет.
  decorators: [(Story) => { applyShellTheme('default'); return <Story /> }],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <ShellFrame theme="default" /> }
export const DeepViolet: Story = { render: () => <ShellFrame theme="deep-violet" /> }
