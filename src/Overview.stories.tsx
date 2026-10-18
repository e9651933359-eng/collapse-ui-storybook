import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = { title: 'Collapse UI/Обзор', parameters: { layout: 'fullscreen' } } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

const sections = [
  { group: 'Core', title: 'Основа', text: 'Цвета, типографика, размеры и состояния — токены Collapse.', story: 'core-atoms--colors' },
  { group: 'UI', title: 'Компоненты', text: 'Кнопки, поля, чипы, табы, аватары, таблицы и другие компоненты со всеми состояниями.', story: 'ui-button--priorities' },
  { group: 'Chat', title: 'Чат', text: 'Сообщения: текст, голосовые, звонки, опросы, комментарии; редактор сообщения и профили.', story: 'chat-messagebubble--incoming' },
  { group: 'Shell', title: 'Оболочка', text: 'Список чатов, боковая панель продукта и цветовые темы подложки.', story: 'shell-shelltheme--default' },
  { group: 'Federation', title: 'Федерация', text: 'Общение с сотрудниками других организаций: создание, участники, профиль.', story: 'federation-createflow--start-chat' },
]

/** Стартовая страница для показа: что внутри и куда смотреть. Ссылки открывают нужную историю в Storybook. */
export const Overview: Story = {
  render: () => (
    <main className="overview">
      <h1>Collapse UI</h1>
      <p className="overview__lead">Дизайн-система и интерактивные прототипы чатов, папок и федерации. Все компоненты кликабельны: наведение, нажатие, фокус и отключённые состояния работают как в продукте.</p>
      <div className="overview__grid">
        {sections.map((section) => (
          <a key={section.group} className="overview__card" href={`?path=/story/${section.story}`} target="_top">
            <h2>{section.title}</h2>
            <p>{section.text}</p>
          </a>
        ))}
      </div>
      <p className="overview__hint">Совет: цвет сайдбара и подложки переключается в верхней панели (Shell theme). Клавиша A открывает панель параметров.</p>
    </main>
  ),
}
