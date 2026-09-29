import type { AvatarColor } from '../components/ui/Avatar'
import type { DiskRef, LinkPreview } from './disk'

export type MessageReaction = {
  emoji: string
  count: number
  reacted?: boolean
}

export type Message = {
  id: string
  author: 'me' | 'other'
  text: string
  time: string
  sender?: string
  avatar?: string
  avatarTone?: string
  avatarColor?: AvatarColor
  avatarFilled?: boolean
  avatarImage?: string
  federation?: boolean
  reply?: { sender: string; text: string }
  pinned?: boolean
  reactions?: MessageReaction[]
  /** Статус исходящего сообщения (Figma Message status). Без поля — «прочитано», как раньше. */
  status?: 'sent' | 'read' | 'loading' | 'error'
  /** Сообщение удалено: показывается плашка «Сообщение удалено». */
  deleted?: boolean
  /** Число комментариев под сообщением канала. */
  comments?: number
  /** Голосовое сообщение. */
  voice?: { duration: string }
  /** Звонок: итог или идущий звонок с кнопкой присоединения. */
  call?: { state: 'ended' | 'started'; description?: string }
  attachments?: Array<{
    id: string
    name: string
    size: number
    type: string
    disk?: DiskRef
  }>
  linkPreview?: LinkPreview
  images?: Array<{
    src: string
    alt: string
  }>
}

export type Chat = {
  id: string
  title: string
  subtitle: string
  avatar: string
  avatarImage?: string
  avatarTone?: string
  avatarColor?: AvatarColor
  avatarFilled?: boolean
  kind?: 'direct' | 'group' | 'channel'
  unread?: number
  pinned?: boolean
  muted?: boolean
  federation?: boolean
  messages: Message[]
}

/** Участник чата для профиля и списка участников. Данные контактов необязательны. */
export type ChatMember = {
  id: string
  name: string
  initials: string
  /** Произвольный фон аватара; перекрывает `color`. */
  tone?: string
  color?: AvatarColor
  image?: string
  email?: string
  phone?: string
  role?: string
  organization?: string
  /** Сотрудник другой организации (Федерация): показывает признак в списке и профиле. */
  external?: boolean
  /** Подпись роли в чате; участник с ней попадает в раздел «Администраторы». */
  adminRole?: string
}
