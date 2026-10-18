import type { Meta, StoryObj } from '@storybook/react-vite'
import { MessageBubble } from './MessageBubble'

const meta = {
  title: 'Chat/MessageBubble',
  component: MessageBubble,
  tags: ['autodocs'],
  decorators: [(Story) => (
    <div style={{ width: 640, minHeight: 240, padding: 72, display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--surface-primary)', borderRadius: 'var(--radius-xl)' }}>
      <Story />
    </div>
  )],
  parameters: {
    docs: {
      description: {
        component: 'Подтверждённые варианты Collapse: входящее и исходящее текстовое сообщение, ответ, реакции и закрепление.',
      },
    },
  },
} satisfies Meta<typeof MessageBubble>

export default meta
type Story = StoryObj<typeof meta>

export const Incoming: Story = {
  args: { message: { id: 'incoming', author: 'other', sender: 'Анна Иванова', avatar: 'АИ', text: 'Привет! Как дела?', time: '12:32' } },
}

export const IncomingWithPhoto: Story = {
  args: { message: { id: 'incoming-photo', author: 'other', sender: 'Михаил', avatarImage: 'assets/figma/message-avatar-photo.png', text: 'Тогда фиксирую этот вариант для прототипа.', time: '12:32' } },
}

export const WithImage: Story = {
  args: {
    message: {
      id: 'image',
      author: 'other',
      sender: 'Михаил',
      avatar: 'МИ',
      text: 'Фото с рабочего обсуждения.',
      time: '12:33',
      images: [{ src: 'assets/figma/message-avatar-photo.png', alt: 'Фотография с рабочего обсуждения' }],
    },
  },
}

export const Outgoing: Story = {
  args: { message: { id: 'outgoing', author: 'me', text: 'Да, всё вижу. Выглядит хорошо.', time: '12:34' } },
}

export const WithReply: Story = {
  args: {
    message: {
      id: 'reply',
      author: 'me',
      text: 'Да, всё вижу. Переключение между чатами выглядит хорошо.',
      time: '12:34',
      reply: { sender: 'Анна Иванова', text: 'Посмотри первый вариант навигации' },
    },
  },
}

export const WithReactions: Story = {
  args: {
    message: {
      id: 'reactions',
      author: 'other',
      sender: 'Анна Иванова',
      text: 'Коллеги, первый вариант готов.',
      time: '12:35',
      reactions: [
        { emoji: '👍', count: 3, reacted: true },
        { emoji: '🔥', count: 2 },
      ],
    },
  },
}

export const Pinned: Story = {
  args: { message: { id: 'pinned', author: 'other', sender: 'Михаил', text: 'Фиксирую этот вариант для прототипа.', time: '12:36', pinned: true } },
}

export const Federation: Story = {
  args: { federation: true, message: { id: 'federation', author: 'other', sender: 'Альбина Бахматулина', avatar: 'АБ', text: 'Сообщение от сотрудника другой организации.', time: '12:38' } },
}

export const LongThread: Story = {
  args: { message: { id: 'long-thread-preview', author: 'other', sender: 'Анна Иванова', avatar: 'АИ', text: 'Длинная переписка.', time: '12:40' } },
  parameters: { docs: { description: { story: 'Длинная переписка: 18 сообщений, чередующие входящие и исходящие варианты.' } } },
  render: () => <>
    {Array.from({ length: 18 }, (_, index) => (
      <MessageBubble
        key={index}
        message={{
          id: `long-thread-${index}`,
          author: index % 3 === 1 ? 'me' : 'other',
          sender: index % 3 === 1 ? undefined : 'Анна Иванова',
          avatar: index % 3 === 1 ? undefined : 'АИ',
          text: index % 3 === 1 ? 'Принято, добавлю это в общий план.' : 'Обновила статус по задаче и приложила актуальные материалы.',
          time: `1${Math.floor(index / 4)}:${String(index * 5).padStart(2, '0')}`,
        }}
      />
    ))}
  </>,
}

export const OutgoingStatuses: Story = {
  args: { message: { id: 'outgoingstatuses', author: 'me', text: '', time: '12:32' } },
  render: () => (
    <>
      {(['sent', 'read', 'loading', 'error'] as const).map((status) => (
        <MessageBubble key={status} message={{ id: `status-${status}`, author: 'me', text: `Статус: ${status}`, time: '12:32', status }} />
      ))}
    </>
  ),
  parameters: { docs: { description: { story: 'Отправлено, прочитано, отправляется, ошибка — Figma «Message status». Без поля status исходящее сообщение считается прочитанным.' } } },
}

export const Deleted: Story = {
  args: { message: { id: 'deleted', author: 'me', text: '', time: '12:32' } },
  render: () => (
    <>
      <MessageBubble message={{ id: 'del-other', author: 'other', sender: 'Анна Иванова', avatar: 'АИ', text: '', time: '12:32', deleted: true }} />
      <MessageBubble message={{ id: 'del-me', author: 'me', text: '', time: '12:33', deleted: true }} />
    </>
  ),
}

export const WithComments: Story = {
  args: { message: { id: 'withcomments', author: 'me', text: '', time: '12:32' } },
  render: () => (
    <>
      <MessageBubble message={{ id: 'com-other', author: 'other', sender: 'Редакция', avatar: 'Р', text: 'Публикация канала: итоги недели.', time: '12:32', comments: 3 }} />
      <MessageBubble message={{ id: 'com-me', author: 'me', text: 'Моя публикация в канале.', time: '12:33', comments: 1 }} />
    </>
  ),
}

export const Voice: Story = {
  args: { message: { id: 'voice', author: 'me', text: '', time: '12:32' } },
  render: () => (
    <>
      <MessageBubble message={{ id: 'voice-other', author: 'other', sender: 'Михаил', avatar: 'МИ', text: '', time: '12:32', voice: { duration: '00:06' } }} />
      <MessageBubble message={{ id: 'voice-me', author: 'me', text: '', time: '12:33', voice: { duration: '00:14' } }} />
    </>
  ),
}

export const Call: Story = {
  args: { message: { id: 'call', author: 'me', text: '', time: '12:32' } },
  render: () => (
    <>
      <MessageBubble message={{ id: 'call-ended', author: 'me', text: '', time: '12:32', call: { state: 'ended' } }} />
      <MessageBubble message={{ id: 'call-started', author: 'other', sender: 'Анна Иванова', avatar: 'АИ', text: '', time: '12:35', call: { state: 'started' } }} />
    </>
  ),
}

