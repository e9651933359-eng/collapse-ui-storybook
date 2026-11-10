# Collapse Base

Основной источник: [Figma Base](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base). Core-токены: [`CORE.md`](CORE.md). Фактическое покрытие: [`COMPONENT_INVENTORY.md`](COMPONENT_INVENTORY.md).

## Единый источник истины

- React-компоненты находятся в `src/components/ui`, Feedback — в `src/components/feedback`, Option Menu — в `src/components/option-menu`.
- Стили Base находятся в `src/components/ui/ui.css` и используют `--collapse-*`.
- Размеры компонентов определены в `src/theme/core/dimensions.css`; локальные экраны не копируют padding, gap, radius и border.
- Исправление визуального состояния сначала делается в компоненте и Storybook, затем проверяется в прототипе.

## Партия 1: actions, inputs, selection, avatar

### Button и IconButton

Источник: [Buttons, 1114:642](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-642).

- Button: Priority `Primary / Accent / Secondary / Tertiary`, Size `S 40 / M 48 / L 56`, состояния Enabled, Hovered, Pressed, Disabled, Loading; Type Default, Error, Success.
- IconButton: те же Priority, Size, State и Type. Floating Button: S 40, M 48, L 56. Все икон-кнопки в продуктовых композициях, включая закрытие модальных окон, используют этот компонент. Hover — `StateLayers/OnBase/Secondary` и compact Shadow02.
- Hover, pressed, focus-visible, disabled и loading реализованы в базовых компонентах.
- Button Split и Hyper-link вынесены в отдельные компоненты в партии 4–5.

### TextButton

- `TextButton` — текстовое действие без заливки для «Изменить», «Создать папку» и сходных компактных действий. Доступны `accent`, `base`, `error`, hover, pressed, focus-visible и disabled.
- Цвет берётся из Core `Text/Solid/Accent/Primary`, а состояния — из общих State Layers; локальные экраны цвет не переопределяют.
- Источник продукта: [chat folders, 40000004:30791](https://www.figma.com/design/XjoKr5oZ1vXrB2TuYY7ydZ/?node-id=40000004-30791). Узел не вернулся через Figma MCP; подтверждены приложенный макет и существующие Core-токены.
- Storybook: `UI/TextButton / States`.

### TextField и TextArea

Источники: [Text field, 1114:414](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-414), [Text area, 12861:2982](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=12861-2982).

- TextField: Default/Hover/Active/Disabled, error, placeholder/text, leading/trailing, supporting и counter.
- TextArea: Enabled/Hovered/Selected/Disabled, error, leading/trailing, supporting и counter; min-height 76, max-height 156.
- Поле имеет min-width 110, высоту 56, radius 24, border 2; focus — accent border 2.5.
- PIN-field реализован отдельно; chips content для TextArea остаётся редкой неподтверждённой SLOT-комбинацией.

### CheckBox, Radio, Switch

Источники: [CheckBox / Radio, 1114:428](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-428), [Switch, 1114:400](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-400).

- CheckBox: M 44/20, S 32/18, selected, indeterminate, ellipse, disabled, loading.
- Radio: M/S, selected, disabled, loading.
- Нативная клавиатура: Tab и Space; label переключает значение один раз; mixed передаётся через `indeterminate`.
- Для кликабельных строк `CheckBox visualOnly` отображает состояние без вложенного интерактивного элемента; роль и переключение принадлежат родительской строке.
- Switch: размер `m` 52×28 (источник — Figma), On/Off, Hover, Pressed через native active или демонстрационный `pressed`, Disabled, focus-visible; `role=switch`, `aria-checked`. Off использует обводку 2 и handle 12; On — accent track без обводки и handle 20 с отступом 4. Handle во всех состояниях центрируется по вертикали; Pressed — handle 24. Hover подсвечивает весь трек внешним accent state layer, но не меняет выбранное значение.
- Switch `size="s"` (40×28, handle 10/16/18, state-layer 28) — **техническое допущение**: в Figma (1114:400) описан только один размер Switch, маленький проектировался по образцу CheckBox/Radio S (масштаб ≈0.77 от m). Токены `--collapse-size-switch-s-*` в `dimensions.css`. Используется в `FolderManagementModal` (строки «Системные папки» — список плотный, большой свитчер был избыточен); `FederationCreateFlow` и `ChatProfileModal` пока остаются на `m`, не проверялись визуально под `s`. Ревью 09.11.2026.
- Серверный optimistic update и rollback принадлежат продукту и не встроены в Base.
- ProductRail: кликабелен только раздел «Чаты» (демо-ограничение сайдбара). Остальные пункты сохраняют hover/focus-visible, но `onClick` не переключает состояние; добавлен `aria-disabled` для ассистивных технологий, кнопка остаётся не `disabled`, чтобы оставить визуальные состояния.

### Avatar

Источник: [Avatar, 1114:526](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-526).

- User/ORG, icon/monogram/image, default/expressive shapes, uploader overlay и status.
- Размеры: 28, 40, 44 и 124 (`--collapse-size-avatar-profile`, профиль — Figma 6974:66545; монограмма 124 использует Head/S как техническое допущение, в макете фото). Storybook: `Avatar / ProfileSize`.
- Сохранено правило чатов: user/group — круг, channel — squircle 16; border только у фотографии.
- User monogram поддерживает подтверждённые `Filled=false` и `Filled=true`. Unfilled: accent tint-dim фон и тёмный accent-текст; filled: accent primary фон и белый текст. Типографика — `Paragraph/M/Medium` 16/22.
- Сообщения используют тот же `Avatar`: светлая монограмма для пользователя без фото и фото с полупрозрачной обводкой. Отдельного локального avatar-стиля у `MessageBubble` нет.
- Цвет монограммы задаёт только вариант `Avatar`; текстовые стили родительской композиции не должны переопределять его. Поэтому один avatar в списке и шапке выглядит одинаково.
- Палитра Color: prop `color` (`'default' | 1…8`) — единственный способ задать цвет аватара по правилам Base. Источник: Figma `Avatar/User`, свойство `Color` ([1114:526](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-526)). `Filled=true` — фон `Background/Solid/Secondary/Type{N}` + `Text/Solid/Base/Light/FullStatic` (белый); `Filled=false` — фон `Background/Solid/Secondary/Type{N}Tint` + `Text/Solid/Accent/Accent`. Токены: `--collapse-color-background-solid-secondary-type{N}` и `…-type{N}-tint`; значения — в [`CORE.md`](CORE.md). `default` — accent primary / accent tint-dim.
- Prop `tone` (`avatarTone` в данных) оставлен только для совместимости: произвольный фон перекрывает `color`. Демо-данные обычных чатов, Федерации и stories переведены на `avatarColor` (значения по ближайшему цвету палитры в Lab; градиенты — по первому цвету), поэтому аватары в списках, шапках и выборе чатов для папок берут цвет и цвет текста из палитры.
- Значение `Color=AI` не реализовано: Figma MCP не вернул значения градиента `LinkAI/Default`; не подставляем догадкой.
- Storybook: `UI/Avatar / Color 1–8`, `Color 1–8 / squircle`.

### ChatListItem (компактная строка)

- Строка списка чатов: высота `--collapse-size-chat-row` 44, аватар `--collapse-size-chat-row-avatar` 36, padding 4/12/4/4 (слева 4, как у коллег; внешний отступ строки 8). Источник — замер прототипа коллег (link-chats-survey); в Figma NavList строка 48/аватар 40 — **техническое допущение**, вкладки папок не затронуты.
- Название чата в строке: 14 px (`--collapse-chat-row-title-size`, 21.10.2026) — отдельный точечный токен, не общий `Paragraph/S` (15 px, используется по всему киту вне строки списка). Вес (500) совпадал с прототипом коллег изначально, не менялся — визуальное ощущение «жирнее» было из-за кегля, не веса.
- Счётчик строки — Counter `size="m"` `shape="default"`: 20 px высотой, шрифт Caption/M 12 px (как у коллег; Figma — 13). Вкладки папок используют S и не затронуты.
- Счётчики строки шире круга: padding по горизонтали 8 (`--collapse-spacing-horizontal-s`), «5» = 25×20, «12» = 30×20, «@» = 26×20 — замер прототипа коллег, техническое допущение.
- Пин показывается только у закреплённого чата без непрочитанных и без упоминания (как в Telegram); иначе виден «@» и/или счётчик. Иконка — собственный солидный SVG (`assets/figma/ic-pin-filled.svg`, 16×16, без внутренней обводки) вместо контурной lucide `Pin`, источник — прототип коллег.
- Разрыв между «@» и счётчиком непрочитанных увеличен вдвое: `--collapse-spacing-horizontal-l` (16 вместо 8) — по замечанию о расстоянии между иконкой и числом.
- Глиф «@» в Counter визуально смещён у большинства шрифтов; добавлена точечная поправка `[data-content='at']` (line-height 1, padding-bottom 1) — техническое допущение.
- Поле поиска в списке чатов — отдельный токен `--collapse-size-search-field` (36, было 44) и добавлен hover (`--surface-hover`) отдельно от focus-состояния — по замеру прототипа коллег.
- Counter S: кегль 10 px (`--collapse-counter-font-size-s`, замер прототипа коллег; было 12) — касается вкладок папок; горизонтальные вкладки теперь тоже используют Counter S (16 px), как у коллег.
- Counter S/M (21.10.2026, точная сверка с прототипом коллег — визуально казался «крупнее»): line-height S выровнен в 10 px (`--collapse-counter-line-height-s`, было 12 — Figma формально задаёт 12, здесь приоритет у замера коллег, техническое допущение); добавлен общий токен `--collapse-counter-letter-spacing: -0.084px` (было +0.1 от Caption/L) — применяется к обоим размерам вместо базового Caption/L; паддинг S выровнен в `2 × 4` (`--collapse-spacing-horizontal-xxs` / `-xs`, было `2` со всех сторон). Вес шрифта (500) совпадал изначально, не менялся. Проверено построчным сравнением computed-стилей (font-size/line-height/letter-spacing/padding) с живым прототипом коллег — различий не осталось.
- Иконки внизу ProductRail (поиск, уведомления, помощь) при hover/focus-visible поворачиваются на −18° (токены `--collapse-motion-*-icon-spring`, `--collapse-motion-rotate-icon-hover`; замер прототипа коллег — техническое допущение), reduced motion отключает анимацию.
- Пустое состояние чата: плитка 44 (`--collapse-size-empty-state-tile`, radius M, фон `--surface-hover`) с иконкой lucide MessagesSquare 24 — по скриншоту прототипа коллег, техническое допущение.
- Аватар в списке по умолчанию Unfilled (светлый tint), как в Storybook `Shell/ChatList` и Figma `Avatar/User Filled=false`; `avatarFilled: true` включает тёмный.
- Бейдж «Вас упомянули»: поле `Chat.mentioned`, Counter accent M с «@» перед счётчиком непрочитанных; показывается только при `unread > 0`. Storybook: `Chat/ChatListItem / Mentioned`.
- Демо-данные: личные контакты с портретами (`public/assets/avatars/*.jpg`, сгенерированы Figma AI, пол соответствует имени) занимают ≈60% первого экрана списка; логотип МТС — `avatars/mts.png` с расширенными красными полями, чтобы круг аватара не срезал буквы. Портреты — 256 px эскизы генерации.

### MessageBubble media

- Bubble поддерживает необязательные изображения перед текстом. Для демо используются локальные ассеты, lazy loading и размеры из `--collapse-size-message-media-*`.
- Точная сетка Media Image на странице Bubble не прочитана. Ограничение изображения 320×220 px — техническое допущение для прокручиваемой демо-переписки, а не правило Collapse. Кнопки и подпись поверх медиа — `MediaButton` и `MediaLabel` (партия 6).
- Storybook: `Chat/MessageBubble / WithImage`.

### SegmentControls и системные папки

Источники: [SegmentControls, 1114:513](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-513), [логика системных папок, 8335:172698](https://www.figma.com/design/XjoKr5oZ1vXrB2TuYY7ydZ/?node-id=8335-172698).

- Компонент разделяет `tabs="fill"` (равная ширина тегов, заполнение области) и `tabs="dynamic"` (Hug: ширина по содержимому). По умолчанию Dynamic; общий `ChatList` явно выбирает Dynamic для папок и федерации. Режим ширины независим от `displayMode`.
- В Dynamic теги, текст, иконки, счётчики и SettingsAction не сжимаются. Узкая панель обрезает полосу по границе контейнера; скрытые сегменты доступны горизонтальной прокруткой и через Tab. Без текста тег уменьшается до ширины иконки с отступами, но не ниже 40 px. Длинное название не накладывается на соседний тег.
- При выборе частично видимого сегмента или изменении списка активный сегмент доскролливается до ближайшего края без лишнего центрирования. Ручная позиция сохраняется до следующего изменения, требующего автодоскролла. Вертикальный wheel преобразуется в горизонтальный только пока полоса может двигаться в его направлении; на границе событие остаётся вертикальному скроллу страницы. Storybook: `HorizontalOverflow`, `RestoredOverflowSelection`.
- S: полоса 32 px, тег 24 px, padding полосы и gap тегов 4 px; padding тега по горизонтали 10 px, gap внутри 8 px, иконка 20 px. Размеры подтверждены [макетом с отступами, 2149:17602](https://www.figma.com/design/4oIceSwgxmkADQYLhOoXF0/?node-id=2149-17602); обрезка — [2149:17603](https://www.figma.com/design/4oIceSwgxmkADQYLhOoXF0/?node-id=2149-17603). Base-страница `1114:513` не вернулась через MCP; названия вариантов Fill/Dynamic подтверждены запросом и приложенным скриншотом свойств, а не восстановлены из недоступной страницы.
- Все стили SegmentControls находятся в общем `ui.css`; экран задаёт только внешнее размещение. Storybook: `DynamicHug`, `Fill` (изменяемая ширина), `DynamicLongLabels`, `NamesAndIcons`, `IconsOnly`.
- «Все» — фиксированный первый сегмент и не участвует в перестановке.
- Базовый набор эмодзи хранится в `ui/folderEmoji.ts`: «Все» 🗂️, «Новые» 🔔, «Чаты» 💬, «Каналы» 📢, пользовательская папка по умолчанию 📂. Набор утверждён пользовательским комментарием, это продуктовая настройка, а не восстановленное правило Figma. Один набор используется в папках, федерации, форме создания и управлении папками. Пустая строка и отсутствие эмодзи дают 📂; выбранная пользователем эмодзи сохраняется. В режиме «Только название» эмодзи скрываются как и другие иконки. Нативный вид эмодзи зависит от ОС.
- Системная папка появляется сразу после включения. Каждая новая включённая папка добавляется в конец; порядок равен последовательности включения. Отключение удаляет сегмент.
- Остальные сегменты можно переставлять drag-and-drop. Для клавиатуры используется `Alt + ArrowLeft/ArrowRight`; перестановка сопровождается Core motion и отключается через `prefers-reduced-motion`.
- Порядок и видимость хранятся продуктовым экраном и передаются в `SegmentControls` и `FolderManagementModal`; компоненты не поддерживают независимые копии состояния.
- Счётчик папки показывает количество непрочитанных чатов, а не сумму непрочитанных сообщений. Чаты с выключенными уведомлениями (`muted`) в него не входят; если в папке непрочитаны только muted-чаты, счётчик папки не показывается. Собственный unread-счётчик muted-чата остаётся серым (`default`), активного — фиолетовым (`accent`).
- После открытия чата из «Новых» его собственный счётчик сразу обнуляется, а счётчик папки пересчитывается. Сам выбранный чат остаётся в «Новых» до выбора другого чата или перехода в другой сегмент; это удержание хранится только продуктовым экраном, а не в `SegmentControls`.
- Режим отображения папок предлагает три продуктовых значения: «Только название», «Название и иконки», «Только иконки». Этот список подтверждён дизайнерским комментарием; исходный Figma-узел показывал только первое значение.
- Режим отображения хранится экраном и одним значением управляет одновременно `FolderManagementModal` и `SegmentControls`; поэтому переключение сразу меняет список папок.
- Минимальная ширина каждого сегмента — `--collapse-size-control-s` (40 px), включая режим «Только иконки». Источник: дизайнерский комментарий к [40000059:22115](https://www.figma.com/design/XjoKr5oZ1vXrB2TuYY7ydZ/?node-id=40000059-22115).
- `SettingsAction` справа сразу открывает `FolderManagementModal`; у неё нет контекстного меню. Контекстное меню вызывается только на самой папке: правым кликом либо `Shift + F10`/клавишей контекстного меню. Оно использует общий `Menu`: для «Все» — «Управлять папками»; для системной папки — «Скрыть папку» и, только при наличии непрочитанных, «Пометить как прочитанное»; для пользовательской — «Редактировать папку», условное «Пометить как прочитанное» и «Удалить папку». `Escape` закрывает меню и возвращает фокус на папку; после удаления открывается «Все».
- Контекстное меню выравнивается по левому краю вызвавшего сегмента и открывается в состоянии Enabled: hover появляется только после движения указателя или клавиатурной навигации.
- Источник сценариев: [8318:167378](https://www.figma.com/design/XjoKr5oZ1vXrB2TuYY7ydZ/?node-id=8318-167378).
- Storybook: `UI/SegmentControls`, `Shell/ChatList / FolderCounterRules`, `Shell/ChatList / NewFolderKeepsSelected`.
- Расположение папок (`foldersLayout`: `top` по умолчанию / `left`) хранит экран и передаёт и в `ChatList`, и в `FolderManagementModal` (секция «Расположение папок», обычный `ComboBox`: «Над чатами» / «Слева от чатов»). В режиме `left` `SegmentControls` получает `orientation="vertical"`: колонка 88px внутри панели списка (`--collapse-size-folder-rail-width`), пункт 64×64 (`--collapse-size-folder-rail-item`), радиус `--radius-m`, отступы 12px/2px, иконка 20px над подписью Caption/M/Medium, счётчик 16px в правом верхнем углу, «+» (создание папки) 40×40 под списком, настройки прижаты к низу. Ширина списка чатов не уменьшается: панель шире на 88px. Секция «Отображение папок» видна независимо от расположения, в том числе в `left` (до 07.11.2026 скрывалась багом, исправлено — см. раздел «Модалка „Управление папками“» ниже). Перестановка — drag-and-drop или `Alt + ArrowUp/ArrowDown`; контекстное меню открывается справа от пункта. Размеры сняты с референса link-chats-survey (20.10.2026); первый пункт референса («Обсуждения») сознательно не реализован — первая папка «Все». Если «Все» ещё не выбрана, в `left` она подсвечена как активная.
- Storybook: `UI/SegmentControls / Vertical`, `Shell/ChatList / FoldersLeft`.

### Пользовательские папки

- В `FolderManagementModal` пользовательские папки отображаются над системными. Строка содержит emoji, название и `IcDragIndicatorFilled`; порядок меняется drag-and-drop или `Alt + ArrowUp/ArrowDown`.
- Выбор emoji в форме собран из существующего `EmojiPicker`; отдельная копия пикера не создаётся. Источники: [создание, 8281:73064](https://www.figma.com/design/XjoKr5oZ1vXrB2TuYY7ydZ/?node-id=8281-73064), [управление и DnD, 8683:161798](https://www.figma.com/design/XjoKr5oZ1vXrB2TuYY7ydZ/?node-id=8683-161798).
- В форме выбора сначала показана категория «Папки» с базовым набором; остальные категории общего пикера остаются доступными. Storybook: `UI/SegmentControls / DefaultFolderEmoji`, `UI/FolderManagementModal / Interactive` (папка без выбранной эмодзи).
- Форма создания использует основное действие «Создать папку», форма редактирования — «Сохранить». Storybook: `UI/FolderManagementModal / EditExistingFolder`.
- Пустая пользовательская папка показывает подтверждённый текст и действие «Выбрать чаты и каналы», которое открывает тот же экран редактирования: [8611:35248](https://www.figma.com/design/XjoKr5oZ1vXrB2TuYY7ydZ/?node-id=8611-35248), [8614:35830](https://www.figma.com/design/XjoKr5oZ1vXrB2TuYY7ydZ/?node-id=8614-35830).
- В выборе чатов и каналов для папки аватар чата показывается так же, как в списке чатов: фото (`avatarImage`), если оно есть, иначе монограмма палитры Avatar.
- Список выбора чатов и каналов: сначала идут выбранные на момент открытия списка, затем остальные; обе группы — по алфавиту (`ru`, без учёта регистра). Порядок фиксируется при открытии и не меняется при переключении чекбоксов, поиск сохраняет порядок. Правило общее для создания и редактирования папки. Storybook: `UI/FolderManagementModal / EditFolderWithSelection`.
- Удаление подтверждается общей композицией `ConfirmDialog`; Storybook: `UI/ConfirmDialog / DeleteFolder`.

### Message Editor

Источник: [Local DS Чаты, 337:1351](https://www.figma.com/design/EyCGbFUOroCmeeGpFT5NQ5/?node-id=337-1351).

- Редактор использует подтверждённые композиции `Input`, `MarkdownPanel`, `BottomPanel`, `AttachContainer`, `SendButton` и запись голосового сообщения. Контейнер имеет radius 24, поле — минимальную высоту 52, панели — высоту 44, действия — 32; значения вынесены в `--collapse-*` tokens.
- Редактор занимает всю доступную ширину до `--collapse-size-message-editor-max` (700 px) и центрируется; на узком экране сжимается до ширины родителя. В `ChatWorkspace` его горизонтальные отступы совпадают с отступами шапки — `Spacing/L` (16 px). Лимит 700 px — продуктовое требование из пользовательского комментария, а не восстановленное правило Figma. Storybook: `Chat/MessageEditor / MaxWidth`.
- Лента сообщений (`.message-feed__content`) ограничена тем же токеном `--collapse-size-message-editor-max` (700 px) и центрируется, поэтому колонка сообщений и Message Editor имеют одну ширину; боковые отступы ленты — `Spacing/L` (16 px), как у редактора. Ранее было жёстко 820 px и 32 px. Общий слой: затрагивает `/chats` и `/federation` одинаково.
- Панель поддерживает жирный, курсив, зачёркивание, подчёркивание, ссылку, строчный и блочный код. Enter отправляет сообщение, Shift+Enter добавляет строку.
- Emoji открывает общий `EmojiPicker`; упоминания вставляются из списка участников; скрепка запускает нативный выбор нескольких файлов. Drag-and-drop использует тот же сценарий.
- Вложения показываются общим `ListItemFile` размера S. Пока файл загружается, отображаются статичная иконка файла и прогресс без вращения; готовый файл можно удалить или отправить.
- При пустом редакторе показан микрофон. Запись можно отменить или отправить; максимальная длительность — 5 минут.
- Storybook: `Chat/MessageEditor / Empty`, `Filled`, `Interactive`.
- Файлы с МТС Диска включены во всех чатах (в том числе `/chats` и Федерация): кнопка папки открывает выбор с Диска, локальные файлы «загружаются на Диск» с ошибками, повтором и тостом, права в чате не проверяются, вставленная ссылка получает превью. Правила и демо-триггеры — в [`DISK.md`](DISK.md). Storybook: `Chat/MessageEditor / DiskScenarios`, `DiskInFederation`.
- Технические допущения прототипа: загрузка файла и запись голоса локальные и имитируются без сервера; список участников демонстрационный; markdown преобразуется на клиенте в поддерживаемые безопасные элементы.

### ModalPage и SearchField

- Общие `collapse-modal-scrim` и `collapse-modal-surface` задают всем модальным сценариям минимальный отступ 16 px и максимальную высоту `--collapse-size-modal-max-height` (700 px). На экране ниже 732 px поверхность занимает доступную высоту внутри отступов, а содержимое прокручивается внутри модалки. Лимит 700 px — продуктовое требование из пользовательского комментария, а не восстановленное правило Figma.
- `ModalPage` — общая оболочка продуктовых модальных сценариев: заголовок, back/close actions, прокручиваемое содержимое и footer-slot. Поддерживает центрированное размещение, правую панель профиля и высоту `viewport` в пределах общего ограничения.
- Клик по затемнению закрывает `ModalPage`; клик внутри поверхности модалки не закрывает её.
- Фокус: `ModalPage` забирает фокус только при открытии и только если он ещё не внутри модалки (`autoFocus` поля не перехватывается). Актуальный `onClose` хранится в ref, поэтому нестабильная функция из родителя не перезапускает эффект и не уводит фокус из полей при вводе. То же правило у `ConfirmDialog`. Storybook: `UI/ModalPage / InputKeepsFocus`.
- По умолчанию (`scroll="body"`) прокручивается весь body модалки. В режиме `scroll="content"` body не прокручивается, а его единственный дочерний блок занимает всю высоту body. Это нужно, чтобы поиск и фильтры над длинным списком оставались на месте, а прокручивался только список со своим overflow. Шапка и footer не прокручиваются в обоих режимах. Storybook: `UI/ModalPage / ContentScroll`.
- Общий `ModalHeader` повторяет `TitleModal` из Figma: между элементами используется `Spacing/S Nudge` 6 px, текстовый слот имеет дополнительный левый `Spacing/S` 8 px, а заголовок всегда выровнен по левому краю. `ModalPage` и модальные окна управления папками используют этот компонент.
- `SearchField` — общий компактный поиск высотой 44 px. Федерация использует его в выборе сотрудников; продуктовая логика фильтрации остаётся в feature-модуле.
- Источники: [создание группового чата](https://www.figma.com/design/XjoKr5oZ1vXrB2TuYY7ydZ/?node-id=6786-80704), [профили](https://www.figma.com/design/XjoKr5oZ1vXrB2TuYY7ydZ/?node-id=6825-16657).
- Storybook: `UI/ModalHeader`, `UI/ModalPage`, `UI/FolderManagementModal / Interactive`, `UI/SearchField`.

## Партия 2: chips, status, tabs, counters, progress

- [Chips, 1114:470](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-470): Filter, Assistive, Multiple, List, Open; базовые размеры, tones и состояния. Полные SLOT-комбинации частичны.
- [Status, 1114:580](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-580): XS/S/M/L, bullet/icon, шесть tones, filled.
- [Counter, 1114:592](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-592): S/M, Negative/Accent/Warning/Default, Primary/Secondary/Tertiary. `Shape=Default` — базовое значение компонента и круглая форма с `CornerRadius/None`. Подтверждённые варианты: [M / 1–9, 5417:8796](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=5417-8796) — `20 × 20`, `Caption/L/Medium`, line-height `16`, отступы `2 × 4`; [S / 1–9, 6488:3956](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=6488-3956) — `16 × 16`, `Caption/M/Medium`, line-height `12`, отступ `2`. Варианты `10+` используют увеличенный горизонтальный отступ: [M, 10394:7640](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=10394-7640), [S, 10394:7644](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=10394-7644). В списке чатов активный unread использует `accent`, muted — `default`; сегменты папок используют M / `Shape=Default`.
- [Loader, 1114:616](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-616): 16/20/24/32, Accent/Light/AI.
- Progress реализован по `linear-determinate` и `linear-indeterminate` с этой же страницы; отдельная страница Progress пуста.
- Толщина Progress: дорожка, активная полоса и stop-точка одной толщины — M 4 px (`--collapse-size-progress-track`), S 2 px (`--collapse-size-progress-track-s`); контейнер 12 px (высота S в `ListItemFile` подобрана продуктово и не менялась). Ранее активная полоса занимала всю высоту контейнера и выглядела втрое толще дорожки. Источник: [linear-determinate, 4388:13103](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=4388-13103); толщина измерена по рендеру узлов `Progress=50, Size=M/S`.
- [Tabs, 12622:647](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=12622-647): Accent/Default, selected/hover/disabled/focus, icon/counter; `type="line"` — табы с подчёркиванием (14589:3328), horizontal overflow, ArrowLeft/ArrowRight/Home/End.

## Партия 3: supporting Base

- [Uploader, 15552:4393](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=15552-4393): enabled/hovered/pressed/disabled/error, click и drop.
- [List item, 1114:456](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-456): M/L, hover/pressed/disabled, leading/content/trailing/divider. Hover использует скруглённый `StateLayers/OnBase/Tertiary`, pressed — `StateLayers/OnBase/Secondary`; disabled не получает state layer.
- ListItemFile дополнен необязательными `errorText`, `onRetry` (кнопка повтора в `error`, корзина в `error` видна и у Secondary), `moreContent` (меню «Ещё» через Popover) и `morePlacement`; без них поведение прежнее. `FileCard` — баннер-карточка документа или ссылки в сообщении (`UI/FileCard`) с миниатюрой-заглушкой `FilePreviewStub`; размеры (424 / 76 / 56 px) взяты из компонента Figma `8678:102365`, который привязан к дублю ДС.
- [ListItemFile, 4386:2897](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=4386-2897): M/L, enabled/loading/error, default/secondary, delete/more. В loading иконка файла статична, состояние передаётся прогрессом. Цвет тега расширения повторяет `FileType`: DOC/EXE/JPG/DMG/ICO — accent, PPT/PDF — error, HTML/CSS/XLS/CSV/JAVA/JSON — success; родственные DOCX/PPTX/XLSX используют цвет своего семейства. Для Secondary удаление показывается как `IcCancelFilled` поверх правого верхнего угла только при hover или фокусе; корзина остаётся действием Default-варианта.
- [Rate, 3110:8538](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=3110-8538): S/M/L, 0–5, клавиатурно доступные radio-кнопки.
- [ActionCard, 7850:9955](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=7850-9955): S/M, Top/Bottom/Circular, Default/Accent/Success/Warning/Error; составные раскладки описаны в партии 4.
- [Surface, 9722:12170](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=9722-12170): Default/Left/Right и Primary/Clear; Header и BottomNavSurface описаны в партии 4.

## Партия 4: composite actions and navigation

### ProductRail

- Общий продуктовый сайдбар использует `shell/ProductRail` во всех чат-сценариях.
- Отдельной точки входа «Каналы» в сайдбаре нет; каналы доступны через системный фильтр общего списка чатов.
- Storybook: `Shell/ProductRail / Default`.
- Storybook: `Shell/ProductRail / DeepViolet`, `Shell/ShellTheme / Default`, `Shell/ShellTheme / DeepViolet`.
- Пункты рейла (включая кнопку выделенного состояния): `--collapse-size-control-s` (40px), радиус `--radius-m` (16px) — ректангл с большим скруглением, не circle; значения сверены с референсом (20.10.2026).
- Нижний блок рейла: поиск, уведомления (со счётчиком `Counter`, демо-значение — реальной системы уведомлений нет), помощь (`lucide-react: Search, Bell, CircleHelp` — технически допущение, готовых Figma-иконок под эти пункты не было), AI-помощник, аватар организации.

#### Shell theme (сайдбар и общая подложка)

- Тема включается атрибутом `data-shell-theme` на `<html>` или на предке `.chat-shell`; без атрибута действует серая тема (`Surface/Solid/Foundation`). **С 09.11.2026 продуктовый дефолт приложения — `deep-violet`** (см. ниже), серая остаётся доступна явно.
- Доступные темы: `default`, `deep-violet`. Токены и источники — `src/theme/shell-theme.css`, помощники — `src/theme/shellTheme.ts`.
- `deep-violet`: подложка и сайдбар `#211a3a` (Figma «SideBar · Deep Violet», [node 2197:25830](https://www.figma.com/design/4oIceSwgxmkADQYLhOoXF0/?node-id=2197-25830), переменная `Custom bg sidebar`); выбранный пункт `#f7f6fb` (`Background/Solid/Base/LightStatic`); иконки белые.
- В тёмной теме список чатов — светлая панель с радиусом слева, а `chat-workspace` — с радиусом справа; шов между ними прямой.
- Переключение: тулбар Storybook «Shell theme»; в приложении — `?shell=deep-violet` / `?shell=default` (значение запоминается в localStorage и дальше используется без параметра в адресе).
- **Дефолт — ревью 09.11.2026**: `readShellTheme()` (`src/theme/shellTheme.ts`) при пустых query и localStorage раньше возвращал `'default'` (серая), теперь — `'deep-violet'`. Продуктовое решение: тёмная подложка — целевой вид и для `/chats`, и для `/federation`; серая остаётся доступна по `?shell=default`. До этого тёмная тема была видна только тем, кто уже открывал ссылку с `?shell=deep-violet` (значение оседало в их localStorage) — у всех остальных, включая свежую публикацию на GitHub Pages, по умолчанию была серая. Это не регрессия и не «лишняя ветка» — просто опциональный переключатель, который не был включён по умолчанию до этого ревью.
- Техническое допущение: цвета разделителя (`#ffffff29`) и hover (`#ffffff1f`) в макете не заданы токенами; бейдж-счётчик на сайдбаре и аватар со статусом из макета не реализованы — в задачу входил только цвет подложки.

- [Button Split, 1787:4324](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1787-4324): S/M/L, независимые действия двух частей, Default/Error/Warning/Success, hover/pressed/disabled/focus.
- [PIN Field, 1919:4389](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1919-4389): 4/6 цифр, masked/number, active/filled/completed, ввод одной доступной native-точкой.
- [Navigation / NavList, 9631:6818](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=9631-6818): segment/button, selected, user/org/icon slots, supporting/status, badge/call/pin/counter.

### FederationTag, ListItem view-only, Avatar 124

- `FederationTag` — warning-плашка с `FederationIcon` слева (Figma 40000074:62321, 6932:42733); фон `--collapse-color-background-opacity-warning-primary`. Storybook: `Base/FederationTag`.
- `ListItem interactive={false}` — статичная строка (`<div>`, `is-static`) без hover/active; `overline` — подпись Caption/M над значением. Storybook: `Base/ListItem / ViewOnly`.
- `Avatar size={124}` — токен `--collapse-size-avatar-profile` (Figma 40000074:62316), типографика Head/S.

### ChatListItem / контекстное меню

- Продуктовая композиция `features/chat/ChatListItem` использует общие `Avatar`, `IconButton` и `Option Menu`; отдельные копии этих компонентов не создаются.
- Общий `shell/ChatList` всегда выводит закреплённые чаты первыми после применения поиска или фильтра. Новый закреплённый чат становится первым в списке. Закреплённые чаты можно менять местами drag-and-drop или `Alt + ArrowUp/ArrowDown`; незакреплённая группа сохраняет исходный порядок.
- Выбор чата сразу обнуляет его счётчик непрочитанных в состоянии текущей страницы. В демо состояние не сохраняется между загрузками: после обновления страницы исходные счётчики снова берутся из mock-данных.
- В trailing-слоте непрочитанный каунтер имеет приоритет над пином: у закреплённого чата с непрочитанными показывается только каунтер; после прочтения на его месте появляется пин.
- Строка — 304×48 px. На hover и `:focus-visible` от клавиатуры trailing pin/counter заменяется круглым `IconButton` 40×40 с иконкой `IcMoreHorizontalOutline`. Обычный мышиный фокус после выбора чата не удерживает hover-состояние.
- Меню содержит подтверждённые действия: «Закрепить»/«Открепить», «Пометить как прочитанное», «Выключить уведомления», «Добавить в папку». «Управлять папками» доступно только из контекстного меню сегмента «Все».
- «Пометить как прочитанное» не рендерится, если у чата нет непрочитанных сообщений; disabled-строка для этого состояния не используется.
- «Добавить в папку» открывает вложенный `Menu`: текущие папки отмечены чекбоксом; выбор добавляет или удаляет чат и закрывает меню после одной операции. Высота меню ограничена токеном 400 px; при переполнении работает прокрутка.
- «Создать папку» открывает существующий экран создания папки. При запуске из контекстного меню чата или канала вызвавшая строка уже выбрана и показана в области «Выбранные чаты и каналы». При десяти папках действие скрывается — это правило подтверждено документацией макета.
- Подтверждённый источник: [добавление и удаление через контекстное меню, 8335:171757](https://www.figma.com/design/XjoKr5oZ1vXrB2TuYY7ydZ/?node-id=8335-171757).
- Storybook: `Chat/ChatListItem / HoverAndContextMenu`.
- Техническое допущение: после выключения уведомлений обратное действие называется «Включить уведомления»; обратное состояние в исходном фрейме не показано.
- [Header и BottomNavSurface, 9722:12170](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=9722-12170): back, leading, title/supporting, actions, content slot; Default/Accent/Clear для нижней поверхности.
- [ActionCard layouts, 7850:9955](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=7850-9955): Full(4), ProminentBottom(3), Split(2).

## Партия 5: data and rich selection

- [EmojiPicker, 11923:77179](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=11923-77179): 352×340, поиск, категории, scroll/segment sync, empty, выбор, скрытая полоса прокрутки, tooltip delay 1000 ms.
- [Table, 19031:5188](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=19031-5188): Default/Radio/CheckBox, header/content, selected/disabled, строки 62, горизонтальная прокрутка.
- [ChipsField, 1114:470](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1114-470): добавление Enter/запятая, независимое удаление, Backspace, error/disabled/focus.
- [Hyper-link, 1940:2001](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=1940-2001): S/M/L, Accent/Default/Secondary, regular/medium, enabled/hovered/visited/disabled.

## Партия 6: семейство сообщений (страница Bubble)

Источник: my-Base, страница [Bubble, 3953:21293](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=3953-21293). Код: `src/features/chat/message-parts/`, Storybook — группы `Chat/…` ниже. Для существующих сообщений без новых полей `Message` вид не меняется (кроме иконки статуса, см. ниже).

| Компонент | Figma | Storybook | Что покрыто |
|---|---|---|---|
| MessageStatus | [10092:121775](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=10092-121775) | `Chat/Message status` | Sent / Read / Loading / Error, `light` для тёмных подложек; иконка 16 px |
| CommentsLink | [10092:108369](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=10092-108369) | `Chat/CommentsLink` | своё/чужое, склонение «комментарий/комментария/комментариев», hover/pressed/focus |
| DeletedMessage | [10227:75515](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=10227-75515) | `Chat/DeletedMessage` | Other (Group) / Other / My, с комментариями и без, без хвоста |
| SystemMessage | [10100:73473](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=10100-73473) | `Chat/SystemMessage` | без кнопки, Call (success), Bot (Assistive chips), реакции, закреп, комментарии |
| CallMessage | [11696:71972](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=11696-71972) | `Chat/CallMessage` | Ended, Started horizontal / vertical |
| VoiceMessage | [10115:69192](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=10115-69192) | `Chat/VoiceMessage` | default, loading, not-loaded, playback, pause, disabled; интерактивная story |
| PollMessage / PollList / PollStatusBar | [17198:25566](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=17198-25566), [17198:26142](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=17198-26142), [18791:34863](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=18791-34863) | `Chat/Poll` | голосование (Single/Multiple), результаты, мой опрос, реакции и комментарии, статус-бар Text/Button |
| MediaButton / MediaLabel | [10092:125388](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=10092-125388), [10092:125424](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=10092-125424), [10098:69404](https://www.figma.com/design/2XiluT9TBfe4yvP4GXTqUp/my-Base?node-id=10098-69404) | `Chat/Media controls` | Loading / Download / Send, Large / Medium, Default / Accent, hover; подпись размера файла |

Правила и интеграция:

- `Message` получил необязательные поля `status`, `deleted`, `comments`, `voice`, `call`; `MessageBubble` принимает `onOpenComments`. Всё выключено по умолчанию, обычные чаты и Федерация не затронуты.
- Статус исходящих берётся из `MessageStatus`; прежний `CheckCheck` 14 px заменён иконкой 16 px по Figma. Цвет статуса теперь задаёт сам компонент, а не правило `.message--mine .message__meta svg:last-child`.
- Бабл с комментариями получает «шов»: верхний блок с радиусом 4 px снизу, блок комментариев — 4 px сверху и 24 px снизу; хвост переносится на блок комментариев (`--collapse-radius-bubble-seam`).
- Новые токены: `--collapse-size-message-status`, `--collapse-size-voice-*`, `--collapse-size-call-message-width`, `--collapse-size-media-button-l/m`, `--collapse-size-media-label-height`, `--collapse-radius-bubble-seam`, цвета `--collapse-color-background-opacity-accent-primary` (13782:22407) и `--collapse-color-background-opacity-base-dark-static-accent-tint` (10098:69414), `--collapse-caption-m-semibold-weight` (19261:27095). Каждый токен подписан узлом Figma.
- Исправлена общая ошибка CheckBox/Radio: CSS `:indeterminate` срабатывает на группе radio без выбранного значения и рисовал «−» во всех radio. Теперь indeterminate-стили не применяются к `choice-control--radio`.
- Исправлен hover у отключённого ChipsField: chips внутри `is-disabled` больше не реагируют на указатель.

Технические допущения (в Figma MCP не подтверждены):

- SVG-иконки Figma недоступны для скачивания, поэтому Phone/Info/Play/Pause/X/ArrowDown/ChevronRight/Pin — приближения `lucide-react`; иконка расшифровки «→T» нарисована вручную по скриншоту.
- VoiceMessage: `Default` и `Not listened` визуально совпадают в MCP, индикатор «не прослушано» не показан. Состояние `Not loading` трактуется как «файл ещё не скачан» (кнопка скачивания).
- Результаты опроса используют `Progress size="s"`: линия и трек 2 px по Figma 4388:13103 (подтверждено веткой federation-fixes).
- Форма волны (`s/m/l` = 4/12/24 px) взята с узла Record 13870:22087; для реальных записей волна — данные продукта.
- Не найдено в Figma или недоступно через MCP, поэтому не реализовано: сетка Media Image (несколько изображений), вариант Forwarded, контейнеры Files и Buttons, SliderThumb/Record как отдельные компоненты, мобильные варианты сообщений.
- Расхождение, не исправленное: стиль `.message__reaction` в чатах отличается от Figma Reactions (плашка 55×28 с подкрашенным фоном); SystemMessage и PollMessage используют существующий стиль для единообразия с чатами.

## Story: сопоставимость размеров и состояний

Правило: размер или визуальное состояние (hovered/pressed/disabled и т.п.) никогда не выносится в
отдельную story, которую нужно открывать по очереди через сайдбар — на отдельном экране нельзя
сравнить, что именно изменилось. Все варианты одного измерения собираются в одну story-матрицу:
строка — вариант (с подписью `.ui-story-row-label`), внутри строки — сами элементы; обёртка
`.ui-story-grid` + `.ui-story-row-labeled` (см. `ui.css`). Если вариант и так виден по видимому
тексту/контенту элемента (например, `HyperLink`/`Sizes` сам рендерит текст `s`/`m`/`l`), подпись
строки необязательна, иначе — обязательна.

Исправлено по этому правилу: `Button/Sizes`, `Rate/Sizes`, `Switch` (6 отдельных state-story
заменены на одну `States`), `Counter/Sizes`, `Loader/Sizes`.

## Hover-состояния

Ревью hover в Storybook: наведение на каждый интерактивный элемент всех stories и сравнение «до/после».

Правила:

- Hover — state layer: `StateLayers/OnBase/Tertiary` для строк и пунктов, `OnBase/Secondary` для круглых кнопок, `OnAccent/Secondary` для accent-элементов, `OnError/Secondary` для error-состояний.
- Если у состояния есть своя заливка (error, active, локальный override), hover накладывается слоем `background-image: linear-gradient(...)`, а не заменяет `background`; иначе локальный стиль гасит hover.
- Неактивные элементы (`disabled`, loading) hover не получают: `:hover:where(:not(:disabled))` — `:where` не меняет специфичность, поэтому pressed (`:active`) продолжает перебивать hover.
- Техническое допущение: у выбранных элементов (selected tab, chip, segment, NavListItem, реакция, emoji-сегмент, selected IconButton) hover вид не меняет; в Figma это не подтверждено.
- Стиль `cursor: grab` у перетаскиваемых сегментов и чатов — намеренный.

Исправлено в этом ревью: ComboBox (поле), DropField (error-состояние и локальные стили Федерации), Uploader в error, ссылка действия InfoBar, плашка `FederationNotice` с действием, иконка папки в окне создания папки, сортировка в выборе файлов Диска; hover убран у disabled/loading в Tabs, Rate, NavListItem, ChipsField (включая chips внутри отключённого поля), Button и IconButton. Новые компоненты семейства сообщений (CommentsLink, VoiceMessage, MediaButton, PollStatusBar, IconButton звонка) проверены тем же способом: disabled-элементы hover не получают.

Не покрыто Storybook: кнопка профиля в шапке чата (`chat-header__identity--action`) не имеет hover и не представлена ни в одной story.

## Технические допущения

- `EmptyState` (`ui/EmptyState`) — технический компонент пустого списка: иконка, заголовок, пояснение; в Figma Base отдельного макета нет, значения собраны из токенов Core. Storybook: `UI/EmptyState`.
- CSS-анимация Loader и indeterminate Progress используется вместо четырёх статичных фаз Figma.
- Surface Gradient собран из подтверждённых Surface Primary/Secondary; точное направление градиента не подтверждено.
- Uploader вызывает `onFiles`; загрузка, лимиты, валидация и сообщения сервера принадлежат продукту.
- ActionCardGroup намеренно остаётся отдельной композицией над единичным ActionCard.
- EmojiPicker поставляется с демонстрационным набором emoji; полный каталог и локализованный поисковый индекс — данные продукта.
- Table использует семантический HTML table; ширины колонок распределяются браузером, если продукт не передал свой layout.
- PIN Field не содержит таймер повторной отправки и сетевую проверку кода — это поведение продукта.
- Motion duration/easing продолжают использовать ранее отмеченные технические tokens Core.

## Федеративное расширение чатов

- `FederationIcon` использует точный SVG `IcFederationOutline` из Figma в размерах XS/S/M. `FederationLabel` даёт общую композицию «текст + иконка».
- `ListItem` управляет позицией и размером федеративной иконки через `federationIconPosition` и `federationIconSize`; значения по умолчанию сохраняют прежний вид.
- `ListItem`, `NavListItem`, `AppHeader`, `Status`, `OptionMenuItem`, `Table`, `ChatListItem`, `MessageBubble` и `MessageEditor` принимают необязательный `federation`; по умолчанию он выключен.
- В `ChatListItem` федеративный индикатор занимает слот перед названием чата. Остальные компоненты управляют позицией через собственную композицию.
- `MessageEditor` принимает общий slot `topPanel`; федеративное содержание остаётся в `features/federation`.
- `ChatList` принимает заголовок и функцию рендера индикатора, поэтому федеративный экран не копирует список чатов.
- Условия доступности и метаданные организаций находятся только в `features/federation`.
- Storybook: `UI/FederationIcon`, federation-варианты общих компонентов, `Federation/FederationNotice`.
- `ConfirmDialog` поддерживает нейтральное подтверждение `intent="default"` для предупреждения о доступе внешнего сотрудника; удаление папки по умолчанию сохраняет `intent="error"`.
- Подробности и допущения: [`FEDERATION.md`](FEDERATION.md).

## FileTypeIcon: папка

`FileTypeIcon extension="folder"` рисует иконку папки из Figma 8734:83895 (карточка 40×40, папка 28 px, `assets/figma/file-type-folder.svg`). Остальные расширения без изменений.

## Модалка «Управление папками» и ComboBox — ревью 07.11.2026

- Высота `.folder-modal` больше не фиксирована (`--collapse-size-folder-management-height` удалён). Модалка сайзится по контенту: пустое состояние остаётся компактным как есть; при разросшемся контенте (много пользовательских папок + секции расположения/отображения) модалка упирается в новый токен `--collapse-size-modal-viewport-gap` (64px) от верхнего и нижнего края вьюпорта, дальше прокручивается только `.folder-modal__body` (шапка остаётся на месте). Правило `max-height` задано через `.collapse-modal-surface.folder-modal` — двойной класс нужен, чтобы перебить специфичность общего `.collapse-modal-surface { max-height: min(700px, 100%) }` из `ui.css`.
- Секция «Отображение папок» раньше скрывалась условием `foldersLayout !== 'left'` — баг, не продуктовое правило (см. исправленную формулировку выше). Теперь видна при любом расположении папок.
- `ComboBox` получил автоориентацию меню: без явного пропа `placement` компонент измеряет после открытия (`useLayoutEffect`, по `getBoundingClientRect` поля и реальной высоте отрисованного меню) место сверху/снизу и открывается вниз, переключаясь вверх только когда снизу не хватает места. Явный `placement="top"/"bottom"` по-прежнему принудительно фиксирует сторону — в `FolderManagementModal` оба `ComboBox` больше его не передают. Storybook `UI/ComboBox` не демонстрирует авто-режим отдельной историей — оба существующих стори (`Enabled`, `Active`) используют его по умолчанию.
- Шеврон `ComboBox` не разворачивался при открытии — класс `.combo-box.is-active` на корневом элементе уже выставлялся, но правила вращения для `.combo-box__action img` не было. Добавлено по аналогии с `.collapse-drop-field__chevron svg` (`option-menu.css`): `transform: rotate(180deg)` на `.is-active`, с `transition` и отключением в `prefers-reduced-motion`.
## Подпись в шапке чата — ревью 07.11.2026

- Правило (общее для `/chats` и `/federation`, компонент `ChatWorkspace`): групповой чат или канал (`chat.kind === 'group' | 'channel'`) — вторая строка под названием показывает количество участников («N участников»); личная переписка 1 на 1 (`chat.kind === 'direct'`) — вторая строка не выводится вовсе.
- До исправления `chat-header__subtitle` печатал поле `chat.subtitle` буквально вне зависимости от типа чата. Поле `subtitle` в демо-данных смешивает два смысла (текст последнего сообщения и «N участников»), поэтому у части личных чатов в шапке показывался текст сообщения, а у части групп/каналов — не количество участников. Подпись в шапке больше не читает `chat.subtitle` напрямую.
- Количество считается через `getChatSubtitle(chat, memberCount)` (`features/chat/profile/members.ts`) из реального состава участников — тот же `memberCount`, что уже передаётся в `ChatProfileModal`. Склонение слова «участник» — `getParticipantWord`, общая утилита; Федерация переиспользует её через ре-экспорт `features/federation/model.ts`, а не держит копию.
- Поле `Chat.subtitle` в строке списка чатов (`ChatListItem`) не отображается и не затронуто этим изменением — там второй строки нет ни у групп, ни у личных чатов (так было и до ревью).
- Побочный эффект в Федерации: у личных федеративных чатов пропал текст «Личный чат» / название организации из шапки — он не был частью задокументированного правила (`docs/design-system/FEDERATION.md`: «в шапке федеративной группы или канала подпись содержит только общее количество участников» — только для группы/канала), а принадлежность к организации уже показывают `FederationLabel` рядом с именем и `FederationTag` в профиле.
## Popover: авто-ориентация и файл в сообщении без превью — ревью 09.11.2026

- `Popover` получил `placement="auto-start" | "auto-end"` (общий с `ComboBox`, см. раздел модалки «Управление папками» выше, паттерн: `useLayoutEffect` меряет `getBoundingClientRect` триггера и высоту панели, сравнивает место сверху/снизу до края вьюпорта). Горизонталь (`start`/`end`) остаётся зафиксированной вызывающим кодом, вертикаль (`top`/`bottom`) подбирается автоматически. `top-*`/`bottom-*` без `auto` работают как раньше — без изменений для `MessageEditor` (панели у композера всегда открываются вверх) и `CreateFolderModal`.
- Баг: меню файла в отправленном сообщении (`DiskAttachmentRow`, кнопка «…» → «Скопировать ссылку» / «Удалить из чата») было жёстко `morePlacement="top-end"`. У первых сообщений в ленте сверху не хватало места, и верх меню обрезался скроллом ленты. Заменено на `morePlacement="auto-end"` — у `DiskAttachmentRow` (строка файла) и `LinkPreviewCard` (карточка ссылки), тот же компонент `FileCard`/`Popover`.
- `DiskAttachmentRow` всегда рендерит `ListItemFile` (строка без превью) — убран прежний второй вариант через `FileCard` с миниатюрой для `doc/docx/xls/xlsx/ppt/pptx/pdf`. Превью в ленте сообщений не несло пользы, только увеличивало высоту строки; иконки расширения в `ListItemFile` достаточно. `LinkPreviewCard` (карточка ссылки) по-прежнему использует `FileCard` с превью — для ссылки заголовок и источник важны, это не «файл», а отдельный случай.
- Storybook: `Feedback/Popover / AutoPlacementFlipsUp` (триггер прижат к низу тесного контейнера — панель открывается вверх); `Disk/Scenarios / SentFile` теперь показывает строку без превью.
- Поиск в сайдбаре чатов (`ChatList`) остаётся без крестика очистки — это осознанная общая конвенция: `SearchField` везде подавляет нативный `::-webkit-search-cancel-button` (`ui.css`), и у поля чатов тот же `type` без крестика. Отдельно: `ChatList` не переиспользует `SearchField`, а дублирует разметку (`.search-field` вместо `.collapse-search-field`) — несогласованность не трогали, не входило в эту задачу.
## ComboBox через портал, перетаскивание системных папок, список чатов в пикере — ревью 09.11.2026

- Баг: выпадающее меню `ComboBox` «Отображение папок» в `FolderManagementModal` обрезалось нижним краем модалки. Причина: `.folder-modal` держит `overflow: hidden` (для скруглённых углов), а `.folder-modal__body` — `overflow-y: auto` (внутренний скролл содержимого); меню было `position: absolute` внутри этой иерархии и при открытии рядом с нижним краем модалки попадало под оба обрезания. Автоориентация верх/низ (ревью 07.11.2026) считала место от `window.innerHeight`, а не от границ модалки, поэтому решение «открыть вниз» не спасало от обрезания самой модалкой.
  Исправлено: `ComboBox.tsx` рендерит меню через `createPortal` в `document.body` и позиционирует его как `position: fixed` по `getBoundingClientRect()` поля (два прохода `useLayoutEffect`/`useEffect`: сперва временная позиция под полем, затем — после реальной высоты меню — точная позиция с учётом автоориентации; пересчитывается на `scroll`/`resize`, пока меню открыто). Обработчик закрытия по клику вне поля (`closeOnOutsideClick`) теперь проверяет и `rootRef`, и `menuRef` — раньше клик по опции меню в портале засчитывался как «клик снаружи» и закрывал список до срабатывания `onClick`. CSS `.combo-box__menu` больше не задаёт `position`/`top`/`left`/`width` — это теперь инлайн-стили из JS; классы-модификаторы `--top`/`--bottom` сохранены только для внешнего вида, геометрию больше не определяют. Storybook: `UI/ComboBox / InClippedScrollContainer` — поле в тесном скроллящемся контейнере со скруглением и `overflow: hidden`, меню остаётся видимым целиком.
- Включённые системные папки («Системные папки» в `FolderManagementModal`) теперь перетаскиваются так же, как пользовательские: при включении переключателем у строки появляется ручка-гриппер (`ic-drag-indicator-filled.svg`), строку можно таскать (`draggable`/`onDragStart`/`onDragEnter`/`onDragEnd`) или двигать `Alt+ArrowUp/ArrowDown`; выключенные папки остаются без ручки и не участвуют в перетаскивании (не валидная цель для `onDragEnter`). Порядок считается только среди включённых — выключенные сохраняют исходную позицию в списке. Новый проп `onReorderSystemFolders?: (folderIds: SystemFolder[]) => void`; в `App.tsx` он переставляет системные id внутри общего `folderOrder` по тому же алгоритму, что и `onReorderCustomFolders` для пользовательских. Общий `aria-live`-регион объявления о перестановке (`reorderAnnouncement`) теперь один на обе секции (раньше дублировался).
- Баг: в пикере «Выберите чаты и каналы» (`CreateFolderModal`, режим `picker`) под прокручиваемым списком оставалось пустое белое поле перед футером — список не дорастал до низа модалки. Причина — токен `--collapse-size-folder-picker-list-max` (500px), захардкоженный `max-height` на `.folder-picker__list`: флекс пытался растянуть список на всё доступное место, но `max-height` обрезал рост раньше, чем список доходил до футера. Токен и правило удалены; `.folder-picker__list` остался с `flex: 1; min-height: 0; overflow: auto` — высоту теперь ограничивает только сама модалка (общий паттерн `--collapse-size-modal-viewport-gap`, 64px от края вьюпорта).
- Баг (по комментарию пользователя, сверено с Figma — [пустая папка, 8611:35248](https://www.figma.com/design/XjoKr5oZ1vXrB2TuYY7ydZ/?node-id=8611-35248), [пикер, 8614:35830](https://www.figma.com/design/XjoKr5oZ1vXrB2TuYY7ydZ/?node-id=8614-35830)): кнопка «Выбрать чаты и каналы» в пустом состоянии папки держала `leadingIcon={<Plus />}`, которой в Figma нет — у `State-layer` в обоих макетах только текст. Из-за этого паддинг выглядел асимметричным: слева 16px (паддинг) + 20px (иконка) + 10px (gap) = 46px, справа — честные 16px. Иконку убрали, паддинг стал 16/16, как в макете.

## Управление папками: единый список «Папки» вместо раздельного перетаскивания — ревью 09.11.2026

- Уточнение к разделу выше («перетаскивание системных папок»): по сверке с референсом коллег включённые системные папки должны попадать не в своё перетаскиваемое под-подмножество внутри «Системные папки», а в ОБЩИЙ список «Папки» вместе с пользовательскими — именно так, как папки идут в самом списке чатов (`ChatList`/`SegmentControls`). Прежняя реализация (отдельный `draggable` внутри секции «Системные папки») не совпадала с этим поведением и заменена.
- `FolderManagementModal` теперь рендерит одну секцию «Папки»: первой строкой — несущая, не перетаскиваемая «Все», затем единый перетаскиваемый список `combinedFolders` (включённые системные + пользовательские папки вперемешку, в порядке нового пропа `folderOrder: readonly string[]` — то же значение, что уже хранится в `App.tsx` и управляет порядком `SegmentControls`). Секция «Системные папки» ниже оставлена только для переключателей вкл/выкл, без ручек и `draggable` — порядок там больше не меняется, всегда в каноническом порядке (`Новые`, `Чаты`, `Каналы`).
- Пропы `onReorderCustomFolders`/`onReorderSystemFolders` объединены в один `onReorderFolders?: (folderIds: string[]) => void`, оперирующий общим списком id. В `App.tsx` он одним `setFolderOrder(folderIds)` переставляет общий порядок и синхронно пересобирает `customFolders` в том же порядке.
- Старая заглушка пустого состояния («Создавайте папки, чтобы группировать...», показывалась только когда `customFolders.length === 0`) убрана вместе с CSS (`.folder-modal__create`) — список «Папки» теперь не бывает по-настоящему пустым (всегда есть хотя бы «Все» + папка «Новые» по умолчанию), и кнопка «Создать папку» в заголовке секции доступна всегда.
- Storybook (`UI/FolderManagementModal / Interactive`) обновлён: единое состояние `folderOrder` вместо раздельных `enabledFolders`/порядка кастомных папок, демонстрирует перетаскивание между системной и пользовательской папкой в одном списке.
## Разделитель вертикальной колонки папок — ревью 09.11.2026

- Добавлен вертикальный разделитель между колонкой папок (`foldersLayout="left"`) и списком чатов — по референсу [link-chats-survey](https://link-chats-survey.pages.dev/#chat?variant=1), тому же, что уже задокументирован у токена `--collapse-size-folder-rail-width`. Без него отступ поля поиска визуально «плавал», не имея якоря. `.chat-list-panel--left > .segment-controls { border-right: 1px solid var(--border-tertiary) }` — тот же нейтральный токен, что у `.product-rail__divider`. На верхнем расположении (`foldersLayout="top"`) ничего не меняется — разделитель есть только у вертикальной колонки. Storybook: `Shell/ChatList / FoldersLeft`.

**Уточнение — ревью 09.11.2026:** цвет разделителя оказался заметно резче, чем у референса. Сверка через DevTools на живом [link-chats-survey](https://link-chats-survey.pages.dev/#chat?variant=1) (`.border-e` колонки папок) показала `border-right: 1px solid oklab(0 0 0 / 0.0486)` — то есть чёрный с альфой ≈4.9%, а наш `--border-tertiary` (`--collapse-color-border-opacity-base-tertiary-dim`) — это `#28263529`, альфа ≈16%, втрое контрастнее. Ближайший по непрозрачности существующий core-токен — `--collapse-color-border-opacity-base-tertiary-tint` (`#2826350a`, альфа ≈3.9%; уже используется в `.collapse-surface--primary`). Завели алиас `--border-tertiary-tint` в `tokens.css` и переключили на него разделитель колонки папок. Новых цветов не вводили — переиспользовали существующий core-токен другой насыщенности.

## Счётчик непрочитанных в вертикальной колонке папок поднят к углу иконки — ревью 09.11.2026

- По скриншоту пользователя бейдж `Counter` в `.segment-controls--vertical` лежал вровень с серединой/низом иконки, перекрывая её, а не на верхнем правом углу, как в референсе (бейдж «выглядывает» над иконкой). Причина: `top: var(--collapse-spacing-horizontal-m)` (12px от верхней границы плитки 64×64), а иконка внутри плитки центрируется по вертикали (flex `justify-content: center` у `.segment-controls__item`) и фактически начинается на той же ~12px — бейдж совпадал по высоте с иконкой, а не выступал над ней.
- Подняли до `top: var(--collapse-spacing-horizontal-xs)` (4px) — бейдж теперь примерно на 8px выше верхнего края иконки, с небольшим перекрытием её нижней частью, как в референсе. Горизонтальное положение (`right: var(--collapse-spacing-horizontal-m-nudge)`) не трогали — оно уже совпадало. Горизонтальное расположение (`displayMode`/`orientation="horizontal"`) не затронуто — правка только в `.segment-controls--vertical .segment-controls__counter`.

## Свитчеры «Системные папки» компактнее + «Расположение папок» через Radio — ревью 09.11.2026

- Свитчеры в секции «Системные папки» (`FolderManagementModal`) переключены на новый `Switch size="s"` (40×28 вместо 52×28) — список плотный (иконка + название + описание + свитчер в строке 56px), полноразмерный `m`-свитчер визуально перевешивал строку. Токены `--collapse-size-switch-s-*` — техническое допущение, см. раздел CheckBox/Radio/Switch выше.
- «Расположение папок» (бинарный выбор `top`/`left`) переведён с `ComboBox` на пару `Radio` (переиспользование существующего компонента, тот же паттерн, что в `PollList`) — по референсу коллег и потому, что для двух опций дропдаун избыточен, радио считывается быстрее. Новый класс обёртки `.folder-modal__radio-list` (styles.css), сам `Radio` без изменений. «Отображение папок» (3 опции: текст / текст+иконки / иконки) осознанно оставлена дропдауном — это самостоятельная наша фича сверх референса коллег, под дропдаун там подходящий формат, убирать не стали.
- Storybook (`UI/FolderManagementModal / Interactive`) дополнен состоянием `foldersLayout`/`onFoldersLayoutChange`, чтобы секция «Расположение папок» была видна в демо (раньше проп не прокидывался и секция не рендерилась).

## Бейджи-кружки с эмодзи папки — серый фон вместо акцентного сиреневого — ревью 09.11.2026

- Круглые бейджи с эмодзи папки (`.folder-modal__custom-icon` — список «Папки» в `FolderManagementModal`, и `.folder-create-modal__folder-icon` — триггер выбора эмодзи в «Новая/Редактирование папки») использовали `--collapse-color-background-opacity-accent-secondary` (фирменный сиреневый). По отзыву — слишком ярко для декоративного повторяющегося элемента, акцент стоит держать за реальными действиями. Переключили оба на `--background-secondary-tint` — тот же токен, что у `Button priority="secondary"` (кнопка «Выбрать чаты и каналы» в той же модалке), чтобы серый был тем самым узнаваемым нейтральным, а не новым оттенком.
- У `.folder-create-modal__folder-icon` заодно привели hover/active в соответствие: было `state-layer-on-accent-secondary`/`state-layer-on-accent-dim-secondary` (акцентные слои, уместные при акцентном фоне), стало `state-layer-on-base-tertiary`/`state-layer-on-base-secondary` — та же пара, что везде в системе для hover/active на нейтральном фоне (см. `.icon-button`, `.collapse-list-item`, `.collapse-nav-list-item` и т.д.). Цвет иконки (`color: var(--collapse-color-icon-solid-accent-primary)`) не трогали — на содержимое (эмодзи-глиф) не влияет, эмодзи рисуется своим цветом независимо от CSS `color`.
- Новых токенов не вводили — только переиспользование существующего `--background-secondary-tint` и стандартной пары state-layer токенов.

**Уточнение — ревью 09.11.2026:** первая версия радио-группы (`.folder-modal__radio-list`) была плоским списком без фона, с круглом слева от подписи (дефолтная раскладка `Radio`) — не совпадала с паттерном «Системные папки» и с референсом коллег (там строки в одной карточке, подпись слева, круг справа). Переверстали: радио-группа теперь переиспользует `.folder-modal__folder-list`/`.folder-modal__folder-row` (та же карточка-контейнер с фоном `--background-container-group`, тот же разделитель между строками, те же внутренние отступы `--space-s --space-l`, что и у «Системные папки»). В каждой строке — `.folder-modal__folder-copy` с подписью (растягивается на `flex: 1`, за счёт чего прижимает контрол вправо — тот же механизм, что у `Switch` в соседней секции) и `<Radio>` без своего `label`-пропа (подпись не дублируется, но `aria-label` на инпуте сохраняет доступность), круг стал последним элементом строки. Вся строка кликабельна (`onClick` на `.folder-modal__folder-row` вызывает тот же `onChange`, что и сам `Radio`) — так удобнее попадать курсором/тапом, как в референсе. `.folder-modal__radio-list` как отдельный класс удалён за ненадобностью; добавлен только `cursor: pointer` для строк радио-группы (`.folder-modal__folder-list[role="radiogroup"] > .folder-modal__folder-row`). Новых токенов и копий размеров не вводили — только переиспользование существующего паттерна карточки.

## Баг: «Отображение папок» не действовало на вертикальную колонку — ревью 09.11.2026

- По отчёту: переключение `displayMode` («Только название» / «Название и иконки» / «Только иконки») в `FolderManagementModal` не влияло на вертикальную колонку папок слева от чатов (`foldersLayout="left"`) — она всегда показывала иконку+подпись независимо от выбора.
- Причина — в `SegmentControls.tsx` условия `showIcon`/`showLabel` были жёстко закорочены на `vertical ||`, то есть для `orientation="vertical"` `displayMode` игнорировался полностью: `showIcon = (vertical || displayMode !== 'names') && …`, `showLabel = vertical || displayMode !== 'icons' || …`. И `orientation`, и `displayMode` — независимые пропсы (ориентация — геометрия колонки, displayMode — что показывать), но в коде вертикальная ориентация трактовалась как отдельный жёстко заданный режим отображения, перекрывающий `displayMode`.
- Исправлено: `showIcon = displayMode !== 'names' && Boolean(option.icon)`, `showLabel = displayMode !== 'icons' || !option.icon` — без привязки к `vertical`, то же правило, что и для горизонтальной раскладки. Проверено во всех трёх режимах `displayMode` при `foldersLayout="left"` в реальном приложении (`npm run dev`): «Только название» — в плитке только подпись без иконки; «Название и иконки» — прежнее поведение; «Только иконки» — в плитке только иконка, подпись скрыта (как и ожидалось по репорту). Переполнение/обрезка текста и позиция `Counter` не пострадали — в CSS изменений не потребовалось, компоновка плитки (flex-column, center) уже была общей для всех вариантов содержимого.
- Обновлён и комментарий у пропа `orientation` в `SegmentControlsProps` — раньше он утверждал, что vertical «всегда с иконками и подписями», что было одновременно описанием бага и причиной бага.

## Баг: лишний внутренний скролл в списке «Папки» — ревью 10.11.2026

- По отчёту: в карточке «Папки» появляется скролл, хотя визуально кажется, что весь список помещается. Причина — у `.folder-modal__custom-list` был захардкожен `max-height: calc(--collapse-size-nav-item * 3)` (ровно 3 строки) со своим `overflow-y: auto` и скрытым (`scrollbar-width: none` / `::-webkit-scrollbar{display:none}`) скроллбаром. Пока в списке было ≤3 строки («Все» + системные + свои), всё помещалось и бага не было видно; как только их становится 4 и больше (например «Все» + «Новые» + «Чаты» + одна своя папка — ровно случай из репорта), верхняя строка («Все») обрезается и уезжает во внутренний скролл, а поскольку сам скроллбар спрятан стилями — визуально это выглядит как «часть списка пропала», а не как «есть скролл, долистай».
- Это тот же класс проблемы, что уже чинили для `.folder-picker__list` (см. более раннюю запись в этом файле, ревью 09.11.2026) — двойной вложенный скролл, когда у `.folder-modal__body` уже есть собственный скролл на весь контент модалки (модалка ограничена `100vh/100dvh - 64px*2`).
- Исправлено: убран `max-height`/`overflow-y: auto` у `.folder-modal__custom-list`, список растёт по контенту; переполнение, если папок действительно много, подхватывает внешний `.folder-modal__body`. Проверено: при 4 строках (`Все` + `Новые` + `Чаты` + своя папка `wqsdasds`) — `scrollHeight === clientHeight`, внутреннего скролла нет, все строки видны целиком (замерено через `getBoundingClientRect`/`scrollHeight` в реальном приложении, не только на глаз).
