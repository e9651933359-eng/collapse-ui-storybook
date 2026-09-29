import type { AvatarColor } from '../../components/ui/Avatar'

export type FederationAvailabilityContext = {
  featureEnabled: boolean
  organizationEnabled: boolean
  permission: 'none' | 'view' | 'manage'
  connectedOrganizationCount: number
}

export type FederationAvailability = {
  visible: boolean
  canCreateChat: boolean
  reason?: 'feature-disabled' | 'organization-disabled' | 'permission-denied' | 'no-connections'
}

export type FederationChatMeta = {
  chatId: string
  organizations: string[]
  externalParticipantCount: number
  externalParticipants: Array<{ id: string; name: string; organization: string }>
}

export type FederationOrganization = {
  id: string
  name: string
  external: boolean
  available: boolean
  unavailableReason?: string
}

export type FederationParticipant = {
  id: string
  name: string
  email: string
  organizationId: string
  initials: string
  color: AvatarColor
  image?: string
  phone?: string
  role?: string
}

export function getParticipantWord(count: number) {
  if (count % 10 === 1 && count % 100 !== 11) return 'участник'
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return 'участника'
  return 'участников'
}

export const federationDemoContext: FederationAvailabilityContext = {
  featureEnabled: true,
  organizationEnabled: true,
  permission: 'manage',
  connectedOrganizationCount: 3,
}

export const federationChatMetadata: FederationChatMeta[] = [
  { chatId: 'federation-albina', organizations: ['MTS Link', 'Альфа-Банк'], externalParticipantCount: 1, externalParticipants: [{ id: 'albina', name: 'Альбина Бахматулина', organization: 'Альфа-Банк' }] },
  { chatId: 'federation-product', organizations: ['MTS Link', 'Альфа-Банк'], externalParticipantCount: 3, externalParticipants: [{ id: 'stepan', name: 'Степан Васта', organization: 'Альфа-Банк' }, { id: 'albina', name: 'Альбина Бахматулина', organization: 'Альфа-Банк' }, { id: 'oleg', name: 'Олег Морозов', organization: 'Альфа-Банк' }] },
  { chatId: 'federation-launch', organizations: ['MTS Link', 'Ozon'], externalParticipantCount: 5, externalParticipants: [{ id: 'maxim', name: 'Максим Орлов', organization: 'Ozon' }, { id: 'elena', name: 'Елена Левина', organization: 'Ozon' }, { id: 'dmitry', name: 'Дмитрий Серов', organization: 'Ozon' }, { id: 'ira', name: 'Ирина Волкова', organization: 'Ozon' }, { id: 'anton-ozon', name: 'Антон Беляев', organization: 'Ozon' }] },
  { chatId: 'federation-support', organizations: ['MTS Link', 'VK'], externalParticipantCount: 2, externalParticipants: [{ id: 'irina', name: 'Ирина Смирнова', organization: 'VK' }, { id: 'maria', name: 'Мария Лебедева', organization: 'VK' }] },
  { chatId: 'research-sync', organizations: ['MTS Link', 'VK'], externalParticipantCount: 2, externalParticipants: [{ id: 'irina', name: 'Ирина Смирнова', organization: 'VK' }, { id: 'maria', name: 'Мария Лебедева', organization: 'VK' }] },
  { chatId: 'partner-analytics', organizations: ['MTS Link', 'Ozon'], externalParticipantCount: 3, externalParticipants: [{ id: 'maxim', name: 'Максим Орлов', organization: 'Ozon' }, { id: 'elena', name: 'Елена Левина', organization: 'Ozon' }, { id: 'dmitry', name: 'Дмитрий Серов', organization: 'Ozon' }] },
  { chatId: 'elena-direct', organizations: ['MTS Link', 'Ozon'], externalParticipantCount: 1, externalParticipants: [{ id: 'elena', name: 'Елена Левина', organization: 'Ozon' }] },
  { chatId: 'payments-integration', organizations: ['MTS Link', 'Альфа-Банк'], externalParticipantCount: 3, externalParticipants: [{ id: 'oleg', name: 'Олег Морозов', organization: 'Альфа-Банк' }, { id: 'anton', name: 'Антон Вершинин', organization: 'Альфа-Банк' }, { id: 'andrey', name: 'Андрей Звонов', organization: 'Альфа-Банк' }] },
  { chatId: 'andrey-direct', organizations: ['MTS Link', 'Альфа-Банк'], externalParticipantCount: 1, externalParticipants: [{ id: 'andrey', name: 'Андрей Звонов', organization: 'Альфа-Банк' }] },
  { chatId: 'security-review', organizations: ['MTS Link', 'Альфа-Банк'], externalParticipantCount: 2, externalParticipants: [{ id: 'anton', name: 'Антон Вершинин', organization: 'Альфа-Банк' }, { id: 'stepan', name: 'Степан Васта', organization: 'Альфа-Банк' }] },
  { chatId: 'customer-research', organizations: ['MTS Link', 'VK'], externalParticipantCount: 2, externalParticipants: [{ id: 'maria', name: 'Мария Лебедева', organization: 'VK' }, { id: 'irina', name: 'Ирина Смирнова', organization: 'VK' }] },
  { chatId: 'partner-onboarding', organizations: ['MTS Link', 'VK'], externalParticipantCount: 2, externalParticipants: [{ id: 'irina', name: 'Ирина Смирнова', organization: 'VK' }, { id: 'maria', name: 'Мария Лебедева', organization: 'VK' }] },
  { chatId: 'boris-direct', organizations: ['MTS Link', 'Альфа-Банк'], externalParticipantCount: 1, externalParticipants: [{ id: 'boris', name: 'Борис Агафонов', organization: 'Альфа-Банк' }] },
]

export const federationOrganizations: FederationOrganization[] = [
  { id: 'mts', name: 'МТС', external: false, available: true },
  { id: 'alfa', name: 'Альфа-Банк', external: true, available: true },
  { id: 'ozon', name: 'Ozon', external: true, available: true },
  { id: 'vk', name: 'VK', external: true, available: true },
  { id: 'rosnano', name: 'Роснано', external: true, available: false, unavailableReason: 'Нет активной связи между организациями' },
]

// Demo portraits are local copies of randomuser.me photos; they are not Collapse assets.
const photo = (id: string) => `assets/avatars/people/${id}.jpg`

export const federationParticipants: FederationParticipant[] = [
  { id: 'marina', name: 'Марина Кузнецова', email: 'm.kuznetsova@mts-link.ru', organizationId: 'mts', initials: 'МК', color: 'default', image: photo('marina'), role: 'Продакт-менеджер' },
  { id: 'igor', name: 'Игорь Смирнов', email: 'i.smirnov@mts-link.ru', organizationId: 'mts', initials: 'ИС', color: 2, image: photo('igor'), role: 'Разработчик' },
  { id: 'anna', name: 'Анна Фамильевна', email: 'a.familieva@mts-link.ru', organizationId: 'mts', initials: 'АФ', color: 3, image: photo('anna'), role: 'Дизайнер' },
  { id: 'orlova', name: 'Екатерина Орлова', email: 'e.orlova@mts-link.ru', organizationId: 'mts', initials: 'ЕО', color: 5, image: photo('orlova'), role: 'Руководитель направления' },
  { id: 'nikitina', name: 'Ольга Никитина', email: 'o.nikitina@mts-link.ru', organizationId: 'mts', initials: 'ОН', color: 1, image: photo('nikitina'), role: 'Аналитик' },
  { id: 'sokolova', name: 'Дарья Соколова', email: 'd.sokolova@mts-link.ru', organizationId: 'mts', initials: 'ДС', color: 8, image: photo('sokolova'), role: 'UX-исследователь' },
  { id: 'pavlova', name: 'Юлия Павлова', email: 'y.pavlova@mts-link.ru', organizationId: 'mts', initials: 'ЮП', color: 3, image: photo('pavlova'), role: 'Менеджер проекта' },
  { id: 'egorova', name: 'Наталья Егорова', email: 'n.egorova@mts-link.ru', organizationId: 'mts', initials: 'НЕ', color: 'default', image: photo('egorova'), role: 'HR-партнёр' },
  { id: 'morozova', name: 'Ксения Морозова', email: 'k.morozova@mts-link.ru', organizationId: 'mts', initials: 'КМ', color: 2, image: photo('morozova'), role: 'Дизайнер' },
  { id: 'lebedeva', name: 'Виктория Лебедева', email: 'v.lebedeva@mts-link.ru', organizationId: 'mts', initials: 'ВЛ', color: 5, image: photo('lebedeva'), role: 'Тестировщик' },
  { id: 'kozlova', name: 'Алина Козлова', email: 'a.kozlova@mts-link.ru', organizationId: 'mts', initials: 'АК', color: 1, image: photo('kozlova'), role: 'Маркетолог' },
  { id: 'popova', name: 'Светлана Попова', email: 's.popova@mts-link.ru', organizationId: 'mts', initials: 'СП', color: 8, image: photo('popova'), role: 'Бухгалтер' },
  { id: 'vasilyeva', name: 'Полина Васильева', email: 'p.vasilyeva@mts-link.ru', organizationId: 'mts', initials: 'ПВ', color: 3, image: photo('vasilyeva'), role: 'Разработчик' },
  { id: 'fedorova', name: 'Татьяна Фёдорова', email: 't.fedorova@mts-link.ru', organizationId: 'mts', initials: 'ТФ', color: 'default', image: photo('fedorova'), role: 'Юрист' },
  { id: 'novikova', name: 'Евгения Новикова', email: 'e.novikova@mts-link.ru', organizationId: 'mts', initials: 'ЕН', color: 5, image: photo('novikova'), role: 'Специалист поддержки' },
  { id: 'grigorieva', name: 'Мария Григорьева', email: 'm.grigorieva@mts-link.ru', organizationId: 'mts', initials: 'МГ', color: 2, image: photo('grigorieva'), role: 'Контент-менеджер' },
  { id: 'ivanov', name: 'Алексей Иванов', email: 'a.ivanov@mts-link.ru', organizationId: 'mts', initials: 'АИ', color: 3, image: photo('ivanov'), role: 'Технический директор' },
  { id: 'kozlov', name: 'Дмитрий Козлов', email: 'd.kozlov@mts-link.ru', organizationId: 'mts', initials: 'ДК', color: 1, image: photo('kozlov'), role: 'Разработчик' },
  { id: 'petrov', name: 'Сергей Петров', email: 's.petrov@mts-link.ru', organizationId: 'mts', initials: 'СП', color: 'default', image: photo('petrov'), role: 'DevOps-инженер' },
  { id: 'volkov', name: 'Андрей Волков', email: 'a.volkov@mts-link.ru', organizationId: 'mts', initials: 'АВ', color: 8, image: photo('volkov'), role: 'Архитектор' },
  { id: 'zaytsev', name: 'Павел Зайцев', email: 'p.zaytsev@mts-link.ru', organizationId: 'mts', initials: 'ПЗ', color: 5, image: photo('zaytsev'), role: 'Аналитик данных' },
  { id: 'belov', name: 'Николай Белов', email: 'n.belov@mts-link.ru', organizationId: 'mts', initials: 'НБ', color: 2, image: photo('belov'), role: 'Руководитель релизов' },
  { id: 'tarasov', name: 'Роман Тарасов', email: 'r.tarasov@mts-link.ru', organizationId: 'mts', initials: 'РТ', color: 3, image: photo('tarasov'), role: 'Backend-разработчик' },
  { id: 'medvedev', name: 'Артём Медведев', email: 'a.medvedev@mts-link.ru', organizationId: 'mts', initials: 'АМ', color: 'default', image: photo('medvedev'), role: 'Frontend-разработчик' },
  { id: 'romanov', name: 'Кирилл Романов', email: 'k.romanov@mts-link.ru', organizationId: 'mts', initials: 'КР', color: 1, image: photo('romanov'), role: 'Продакт-менеджер' },
  { id: 'korolev', name: 'Максим Королёв', email: 'm.korolev@mts-link.ru', organizationId: 'mts', initials: 'МК', color: 8, image: photo('korolev'), role: 'Специалист по безопасности' },
  { id: 'gusev', name: 'Илья Гусев', email: 'i.gusev@mts-link.ru', organizationId: 'mts', initials: 'ИГ', color: 5, image: photo('gusev'), role: 'Мобильный разработчик' },
  { id: 'titov', name: 'Владимир Титов', email: 'v.titov@mts-link.ru', organizationId: 'mts', initials: 'ВТ', color: 2, image: photo('titov'), role: 'Руководитель отдела продаж' },
  { id: 'makarov', name: 'Евгений Макаров', email: 'e.makarov@mts-link.ru', organizationId: 'mts', initials: 'ЕМ', color: 3, image: photo('makarov'), role: 'Инженер по качеству' },
  { id: 'abramov', name: 'Георгий Абрамов', email: 'g.abramov@mts-link.ru', organizationId: 'mts', initials: 'ГА', color: 'default', image: photo('abramov'), role: 'Системный аналитик' },
  { id: 'albina', name: 'Альбина Бахматулина', email: 'user_name@alfabank.ru', organizationId: 'alfa', initials: 'АБ', color: 'default', image: 'assets/avatars/albina.png', phone: '+7 920 123-45-67', role: 'Ведущий специалист технической поддержки' },
  { id: 'andrey', name: 'Андрей Звонов', email: 'a.zvonov@alfabank.ru', organizationId: 'alfa', initials: 'АЗ', color: 'default', image: photo('andrey'), role: 'Руководитель проекта' },
  { id: 'anton', name: 'Антон Вершинин', email: 'a.vershinin@alfabank.ru', organizationId: 'alfa', initials: 'АВ', color: 'default', image: photo('anton'), role: 'Аналитик' },
  { id: 'shats', name: 'Антон Шац', email: 'a.shats@alfabank.ru', organizationId: 'alfa', initials: 'АШ', color: 'default', image: photo('shats'), role: 'Разработчик' },
  { id: 'boris', name: 'Борис Агафонов', email: 'b.agafonov@alfabank.ru', organizationId: 'alfa', initials: 'БА', color: 5, image: photo('boris'), role: 'Эксперт по клиентскому опыту' },
  { id: 'bulychev', name: 'Борис Булычев', email: 'b.bulychev@alfabank.ru', organizationId: 'alfa', initials: 'ББ', color: 1, image: photo('bulychev'), role: 'Ведущий специалист' },
  { id: 'stepan', name: 'Степан Васта', email: 's.vasta@alfabank.ru', organizationId: 'alfa', initials: 'СВ', color: 'default', image: photo('stepan'), role: 'Руководитель продукта' },
  { id: 'oleg', name: 'Олег Морозов', email: 'o.morozov@alfabank.ru', organizationId: 'alfa', initials: 'ОМ', color: 3, image: photo('oleg'), role: 'Аналитик' },
  { id: 'maxim', name: 'Максим Орлов', email: 'm.orlov@ozon.ru', organizationId: 'ozon', initials: 'МО', color: 3, image: photo('maxim'), role: 'Руководитель проекта' },
  { id: 'elena', name: 'Елена Левина', email: 'e.levina@ozon.ru', organizationId: 'ozon', initials: 'ЕЛ', color: 5, image: photo('elena'), role: 'Дизайнер' },
  { id: 'dmitry', name: 'Дмитрий Серов', email: 'd.serov@ozon.ru', organizationId: 'ozon', initials: 'ДС', color: 1, image: photo('dmitry'), role: 'Разработчик' },
  { id: 'ira', name: 'Ирина Волкова', email: 'i.volkova@ozon.ru', organizationId: 'ozon', initials: 'ИВ', color: 8, image: photo('ira'), role: 'Аналитик' },
  { id: 'anton-ozon', name: 'Антон Беляев', email: 'a.belyaev@ozon.ru', organizationId: 'ozon', initials: 'АБ', color: 3, image: photo('anton-ozon'), role: 'Продакт-менеджер' },
  { id: 'irina', name: 'Ирина Смирнова', email: 'i.smirnova@vk.com', organizationId: 'vk', initials: 'ИС', color: 2, image: photo('irina'), role: 'Специалист поддержки' },
  { id: 'maria', name: 'Мария Лебедева', email: 'm.lebedeva@vk.com', organizationId: 'vk', initials: 'МЛ', color: 5, image: photo('maria'), role: 'Менеджер по работе с партнёрами' },
]

export function getFederationOrganization(organizationId: string) {
  return federationOrganizations.find((organization) => organization.id === organizationId)
}

export function getFederationParticipants(organizationId: string) {
  return federationParticipants.filter((participant) => participant.organizationId === organizationId)
}

export function getFederationAvailability(context: FederationAvailabilityContext): FederationAvailability {
  if (!context.featureEnabled) return { visible: false, canCreateChat: false, reason: 'feature-disabled' }
  if (!context.organizationEnabled) return { visible: false, canCreateChat: false, reason: 'organization-disabled' }
  if (context.permission === 'none') return { visible: false, canCreateChat: false, reason: 'permission-denied' }
  if (context.connectedOrganizationCount < 1) return { visible: true, canCreateChat: false, reason: 'no-connections' }
  return { visible: true, canCreateChat: context.permission === 'manage' }
}

export function getFederationChatMeta(chatId: string) {
  return federationChatMetadata.find((item) => item.chatId === chatId)
}
