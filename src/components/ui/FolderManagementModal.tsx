import { useEffect, useRef, useState } from 'react'
import type { DragEvent, KeyboardEvent as ReactKeyboardEvent } from 'react'
import { ComboBox } from './ComboBox'
import { CreateFolderModal } from './CreateFolderModal'
import type { CreatedFolder, FolderCandidate } from './CreateFolderModal'
import { ModalHeader } from './ModalHeader'
import { Radio } from './Radio'
import { Switch } from './Switch'
import { TextButton } from './TextButton'
import type { SegmentDisplayMode } from './SegmentControls'
import { folderEmoji, getCustomFolderEmoji } from './folderEmoji'

export type ManagedFolder = CreatedFolder & { id: string }

type FolderManagementModalProps = {
  initialFolderId?: string
  initialSelectedChatIds?: readonly string[]
  initialView?: 'manage' | 'create' | 'edit'
  open: boolean
  onClose: () => void
  candidates?: FolderCandidate[]
  customFolders?: readonly ManagedFolder[]
  onCreateFolder?: (folder: CreatedFolder) => void
  onUpdateFolder?: (folderId: string, folder: CreatedFolder) => void
  enabledSystemFolders?: readonly SystemFolder[]
  onSystemFolderChange?: (folder: SystemFolder, enabled: boolean) => void
  /**
   * Единый порядок включённых папок — системных и пользовательских вперемешку, как они идут
   * в самом списке чатов (ChatList/SegmentControls). Без 'all': она всегда первая и не перетаскивается.
   * Используется для общего списка «Папки» в этой модалке — ревью 09.11.2026.
   */
  folderOrder?: readonly string[]
  /** Перетаскивание внутри общего списка «Папки» (системные и пользовательские папки вместе). */
  onReorderFolders?: (folderIds: string[]) => void
  displayMode: SegmentDisplayMode
  onDisplayModeChange: (mode: SegmentDisplayMode) => void
  /** Текущее расположение папок; вместе с onFoldersLayoutChange включает секцию «Расположение папок». */
  foldersLayout?: FolderLayout
  onFoldersLayoutChange?: (layout: FolderLayout) => void
}

/** Расположение панели папок: над списком чатов или вертикальной колонкой слева от него. */
export type FolderLayout = 'top' | 'left'

export type SystemFolder = 'new' | 'chats' | 'channels'

const folderItems: Array<{
  id: SystemFolder
  label: string
  description: string
  icon: string
}> = [
  {
    id: 'new',
    label: 'Новые',
    description: 'Чаты и каналы с непрочитанными сообщениями',
    icon: folderEmoji.new,
  },
  {
    id: 'chats',
    label: 'Чаты',
    description: 'Все личные и групповые чаты',
    icon: folderEmoji.chats,
  },
  {
    id: 'channels',
    label: 'Каналы',
    description: 'Все каналы',
    icon: folderEmoji.channels,
  },
]

const displayOptions = [
  { value: 'names', label: 'Только название' },
  { value: 'names-and-icons', label: 'Название и иконки' },
  { value: 'icons', label: 'Только иконки' },
]

const layoutOptions = [
  { value: 'top', label: 'Над чатами' },
  { value: 'left', label: 'Слева от чатов' },
]

export function FolderManagementModal({
  open,
  initialView = 'manage',
  initialFolderId,
  initialSelectedChatIds = [],
  onClose,
  candidates = [],
  customFolders = [],
  onCreateFolder,
  onUpdateFolder,
  enabledSystemFolders = ['new'],
  onSystemFolderChange,
  folderOrder = [],
  onReorderFolders,
  displayMode,
  onDisplayModeChange,
  foldersLayout = 'top',
  onFoldersLayoutChange,
}: FolderManagementModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [view, setView] = useState<'manage' | 'create' | 'edit'>('manage')
  const [editingFolderId, setEditingFolderId] = useState<string | undefined>(initialFolderId)
  const [draggedFolderId, setDraggedFolderId] = useState<string | null>(null)
  const [reorderAnnouncement, setReorderAnnouncement] = useState('')

  useEffect(() => {
    if (!open) {
      setView(initialView)
      setEditingFolderId(initialFolderId)
      return
    }

    setView(initialView)
    setEditingFolderId(initialFolderId)

    closeButtonRef.current?.focus()
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [initialFolderId, initialView, open, onClose])

  if (!open) return null

  const toggleFolder = (id: SystemFolder) => {
    onSystemFolderChange?.(id, !enabledSystemFolders.includes(id))
  }

  const editingFolder = customFolders.find((folder) => folder.id === editingFolderId)

  // Единый список «Папки»: включённые системные и пользовательские папки вперемешку, в порядке folderOrder —
  // как в самом списке чатов. «Все» в folderOrder не входит, добавляется отдельно и не перетаскивается — ревью 09.11.2026.
  type CombinedFolderEntry = { id: string; kind: 'system' | 'custom'; label: string; icon: string }
  const combinedFolders: CombinedFolderEntry[] = folderOrder.flatMap((id): CombinedFolderEntry[] => {
    const systemItem = folderItems.find((item) => item.id === id)
    if (systemItem) return [{ id, kind: 'system', label: systemItem.label, icon: systemItem.icon }]
    const customItem = customFolders.find((item) => item.id === id)
    if (customItem) return [{ id, kind: 'custom', label: customItem.label, icon: getCustomFolderEmoji(customItem.emoji) }]
    return []
  })

  const moveFolder = (movedId: string, targetId: string) => {
    const ids = combinedFolders.map((entry) => entry.id)
    const from = ids.indexOf(movedId)
    const to = ids.indexOf(targetId)
    if (from < 0 || to < 0 || from === to) return
    ids.splice(from, 1)
    ids.splice(to, 0, movedId)
    onReorderFolders?.(ids)
    setReorderAnnouncement(`${combinedFolders.find((entry) => entry.id === movedId)?.label}: новая позиция ${to + 1}`)
  }

  const handleFolderKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>, folderId: string) => {
    if (!event.altKey || (event.key !== 'ArrowUp' && event.key !== 'ArrowDown')) return
    event.preventDefault()
    const ids = combinedFolders.map((entry) => entry.id)
    const index = ids.indexOf(folderId)
    const target = ids[index + (event.key === 'ArrowUp' ? -1 : 1)]
    if (target) moveFolder(folderId, target)
  }

  return (
    <div
      className="collapse-modal-scrim folder-modal-scrim"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      {view === 'create' || view === 'edit' ? (
        <CreateFolderModal
          key={`${view}:${editingFolderId ?? 'new'}`}
          candidates={candidates}
          mode={view}
          initialFolder={view === 'edit' ? editingFolder : undefined}
          initialSelectedIds={view === 'create' ? initialSelectedChatIds : undefined}
          onBack={() => setView('manage')}
          onClose={onClose}
          onCreate={(folder) => {
            if (view === 'edit' && editingFolderId) onUpdateFolder?.(editingFolderId, folder)
            else onCreateFolder?.(folder)
            onClose()
          }}
        />
      ) : <section
        className="collapse-modal-surface folder-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="folder-modal-title"
      >
        <ModalHeader
          ref={closeButtonRef}
          closeIcon={<img src="assets/figma/ic-cancel-outline.svg" alt="" aria-hidden="true" />}
          onClose={onClose}
          title="Управление папками"
          titleId="folder-modal-title"
        />

        <div className="folder-modal__body">
          <section className="folder-modal__section folder-modal__custom-section" aria-labelledby="folders-title">
            <header className="folder-modal__section-header">
              <h3 id="folders-title">Папки</h3>
              <TextButton onClick={() => { setEditingFolderId(undefined); setView('create') }}>Создать папку</TextButton>
            </header>
            <div className="folder-modal__folder-list folder-modal__custom-list" role="list">
              <div className="folder-modal__custom-row folder-modal__custom-row--fixed" role="listitem" aria-label="Все">
                <span className="folder-modal__custom-icon" aria-hidden="true">{folderEmoji.all}</span>
                <span className="folder-modal__custom-label">Все</span>
              </div>
              {combinedFolders.map((entry) => (
                <div
                  className={`folder-modal__custom-row ${draggedFolderId === entry.id ? 'is-dragging' : ''}`}
                  draggable
                  key={entry.id}
                  role="listitem"
                  tabIndex={0}
                  aria-label={`${entry.label}. Перетащите или нажмите Alt со стрелкой, чтобы изменить порядок`}
                  onClick={entry.kind === 'custom' ? () => { setEditingFolderId(entry.id); setView('edit') } : undefined}
                  onDragStart={(event: DragEvent<HTMLDivElement>) => { event.dataTransfer.effectAllowed = 'move'; setDraggedFolderId(entry.id) }}
                  onDragEnter={() => { if (draggedFolderId) moveFolder(draggedFolderId, entry.id) }}
                  onDragOver={(event) => event.preventDefault()}
                  onDragEnd={() => setDraggedFolderId(null)}
                  onKeyDown={(event) => handleFolderKeyDown(event, entry.id)}
                >
                  <span className="folder-modal__custom-icon" aria-hidden="true">{entry.icon}</span>
                  <span className="folder-modal__custom-label">{entry.label}</span>
                  <span className="folder-modal__custom-drag" aria-hidden="true">
                    <img src="assets/figma/ic-drag-indicator-filled.svg" alt="" aria-hidden="true" />
                  </span>
                </div>
              ))}
            </div>
            <span className="visually-hidden" aria-live="polite">{reorderAnnouncement}</span>
          </section>

          <section className="folder-modal__section" aria-labelledby="system-folders-title">
            <h3 id="system-folders-title">Системные папки</h3>
            <div className="folder-modal__folder-list">
              {folderItems.map((folder) => {
                const isEnabled = enabledSystemFolders.includes(folder.id)
                return (
                  <div className="folder-modal__folder-row" key={folder.id}>
                    <span className="folder-modal__folder-icon" aria-hidden="true">
                      {folder.icon}
                    </span>
                    <span className="folder-modal__folder-copy">
                      <span>{folder.label}</span>
                      <small>{folder.description}</small>
                    </span>
                    <Switch
                      size="s"
                      selected={isEnabled}
                      label={`${folder.label}: ${isEnabled ? 'показывать' : 'скрыть'}`}
                      onChange={() => toggleFolder(folder.id)}
                    />
                  </div>
                )
              })}
            </div>
          </section>

          {onFoldersLayoutChange && (
            <section className="folder-modal__section" aria-labelledby="folder-layout-title">
              <h3 id="folder-layout-title">Расположение папок</h3>
              {/* Бинарный выбор — радио-кнопки вместо дропдауна, по образцу коллег. Ревью 09.11.2026. */}
              <div className="folder-modal__radio-list" role="radiogroup" aria-labelledby="folder-layout-title">
                {layoutOptions.map((option) => (
                  <Radio
                    key={option.value}
                    name="folder-layout"
                    label={option.label}
                    checked={foldersLayout === option.value}
                    onChange={() => onFoldersLayoutChange(option.value as FolderLayout)}
                  />
                ))}
              </div>
            </section>
          )}

          <section className="folder-modal__section" aria-labelledby="folder-display-title">
            <h3 id="folder-display-title">Отображение папок</h3>
            <ComboBox
              ariaLabel="Отображение папок"
              value={displayMode}
              options={displayOptions}
              onChange={(value) => onDisplayModeChange(value as SegmentDisplayMode)}
            />
          </section>
        </div>
      </section>}
    </div>
  )
}
