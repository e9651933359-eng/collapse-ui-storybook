# MessageBubble

`MessageBubble` отображает подтверждённые текстовые варианты сообщений Collapse.

## Реализовано

- входящее сообщение с круглым аватаром снаружи и именем отправителя внутри баббла;
- исходящее сообщение с существующим статусом прочтения;
- ответ на сообщение;
- закреплённое сообщение;
- реакции и их переключение;
- панель действий по hover и keyboard focus (`:focus-visible`); после клика мышью панель закрывается, когда курсор уходит с сообщения.

Компонент принимает объект `Message`. Реакции доступны через `message.reactions`; изменения можно отслеживать через `onReactionChange`. Для кнопок ответа и дополнительного меню предусмотрены `onReply` и `onMore`.

Демо-данные всех чатов и каналов содержат от 18 до 30 сообщений. Первые сообщения задают тему конкретного диалога, а продолжение сохраняет его тип: личное обсуждение, командная переписка или публикации канала.

Аватар входящего сообщения задаётся через `avatar`, `avatarTone` или `avatarImage`. Обводка автоматически появляется только у `avatarImage`. Основные правила аватаров и типографики зафиксированы в [`CORE.md`](../../../docs/design-system/CORE.md).

## Расширенные варианты сообщения (страница Bubble)

Все поля необязательны; без них сообщение выглядит как раньше.

- `status`: `sent | read | loading | error` — статус исходящего сообщения (`MessageStatus`), по умолчанию `read`.
- `deleted` — удалённое сообщение (`DeletedMessage`: Other / Other (Group) / My).
- `comments` — число комментариев; бабл получает «шов» и блок `CommentsLink`, клик — `onOpenComments(message)`.
- `voice: { duration }` — голосовое сообщение (`VoiceMessage`), состояние воспроизведения хранится внутри `MessageBubble`.
- `call: { state: 'ended' | 'started'; description? }` — звонок (`CallMessage`).

Отдельные композиции без `Message`: `SystemMessage`, `PollMessage`, `MediaButton`, `MediaLabel` — см. [`BASE.md`](../../../docs/design-system/BASE.md), партия 6. Компоненты лежат в `message-parts/`, Storybook: `Chat/MessageBubble`, `Chat/Message status`, `Chat/CommentsLink`, `Chat/DeletedMessage`, `Chat/SystemMessage`, `Chat/CallMessage`, `Chat/VoiceMessage`, `Chat/Poll`, `Chat/Media controls`.

## Не реализовано

Сетка Media Image, вариант Forwarded, контейнеры Files и Buttons, мобильные варианты: на странице Bubble они не прочитаны через Figma MCP или не найдены. Иконки звонка и голосового сообщения — приближения `lucide-react`.
