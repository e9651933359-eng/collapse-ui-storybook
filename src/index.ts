/**
 * Публичная точка входа пакета `@collapse/ui`.
 * Приложения (папки, федерация) берут отсюда компоненты, токены и композиции чатов;
 * единственный источник правды — этот репозиторий и его Storybook.
 */
import './theme/tokens.css'
import './styles.css'
import './components/ui/ui.css'

export * from './components/ui'
export * from './components/feedback'
export * from './components/option-menu'
export * from './components/shell/ChatList'
export * from './components/shell/ProductRail'
export * from './components/ui/FolderManagementModal'
export * from './components/ui/folderEmoji'

export * from './features/chat/ChatWorkspace'
export * from './features/chat/MessageBubble'
export * from './features/chat/MessageEditor'
export * from './features/chat/ChatListItem'
export * from './features/chat/mockData'
export * from './features/chat/order'
export * from './features/chat/unread'
export * from './features/chat/profile/ChatMembersModal'
export * from './features/chat/profile/ChatProfileModal'
export * from './features/chat/profile/UserProfile'
export * from './features/chat/profile/members'
export * from './features/chat/message-parts'
export * from './features/federation'

export * from './theme/shellTheme'
export type * from './types/chat'
export type * from './types/disk'
