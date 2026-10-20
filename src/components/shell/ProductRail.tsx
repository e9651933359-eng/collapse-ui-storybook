import { useState, type ReactNode } from 'react'
import { Bell, CircleHelp, Search } from 'lucide-react'
import { Avatar } from '../ui/Avatar'
import { Counter } from '../ui/Counter'
import { IconButton } from '../ui/IconButton'

type ProductRailItem = { id: string; label: string; icon: ReactNode }

const items: ProductRailItem[] = [
  { id: 'chats', label: 'Чаты', icon: <img className="rail-icon" src="assets/figma/ic-chat-filled.svg" alt="" /> },
  { id: 'messages', label: 'Обсуждения', icon: <img className="rail-icon" src="assets/figma/ic-messages-filled.svg" alt="" /> },
  { id: 'meetings', label: 'Встречи', icon: <img className="rail-icon" src="assets/figma/ic-video-filled.svg" alt="" /> },
  { id: 'webinars', label: 'Вебинары', icon: <img className="rail-icon" src="assets/figma/ic-webinar-filled.svg" alt="" /> },
  { id: 'tasks', label: 'Задачи', icon: <img className="rail-icon" src="assets/figma/ic-tasks-filled.svg" alt="" /> },
  { id: 'mail', label: 'Почта', icon: <img className="rail-icon" src="assets/figma/ic-mail-filled.svg" alt="" /> },
  { id: 'calendar', label: 'Календарь', icon: <img className="rail-icon" src="assets/figma/ic-calendar-filled.svg" alt="" /> },
  { id: 'services', label: 'Сервисы', icon: <img className="rail-icon" src="assets/figma/ic-services-filled.svg" alt="" /> },
]

export function ProductRail() {
  const [active, setActive] = useState('chats')

  return (
    <nav className="product-rail" aria-label="Разделы MTS Link">
      <div className="product-rail__profile"><Avatar label="Вячеслав" image="assets/figma/avatar-user.png" /></div>
      <div className="product-rail__items">
        {items.map(({ id, label, icon }) => (
          <IconButton
            key={id}
            label={label}
            icon={icon}
            selected={active === id}
            aria-disabled={id !== 'chats' ? true : undefined}
            onClick={() => {
              if (id === 'chats') setActive(id)
            }}
          />
        ))}
        <span className="product-rail__divider" />
        <IconButton label="Настройки" icon={<img className="rail-icon" src="assets/figma/ic-gear-filled.svg" alt="" />} />
      </div>
      <div className="product-rail__bottom">
        <IconButton label="Поиск" icon={<Search className="rail-icon" aria-hidden="true" />} />
        <span className="product-rail__icon-wrap">
          <IconButton label="Уведомления" icon={<Bell className="rail-icon" aria-hidden="true" />} />
          <Counter className="product-rail__badge" tone="accent" size="s">3</Counter>
        </span>
        <IconButton label="Помощь" icon={<CircleHelp className="rail-icon" aria-hidden="true" />} />
        <IconButton label="AI-помощник" icon={<img className="rail-icon" src="assets/figma/ic-ai-filled.svg" alt="" />} />
        <Avatar label="Организация" size={44} tone="var(--collapse-color-background-solid-accent-primary)" shape="squircle" />
      </div>
    </nav>
  )
}
