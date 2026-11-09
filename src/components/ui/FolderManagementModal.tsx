import { useEffect, useRef, useState } from 'react'
import type { DragEvent, KeyboardEvent as ReactKeyboardEvent } from 'react'
import { Button } from './Button'
import { ComboBox } from './ComboBox'
import { CreateFolderModal } from './CreateFolderModal'
import type { CreatedFolder, FolderCandidate } from './CreateFolderModal'
import { ModalHeader } from './ModalHeader'
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
  onReorderCustomFolders?: (folderIds: string[]) => void
  onUpdateFolder?: (folderId: string, folder: CreatedFolder) => void
  enabledSystemFolders?: readonly SystemFolder[]
  onSystemFolderChange?: (folder: SystemFolder, enabled: boolean) => void
  /** Порядок включённых системных папок между собой (сами папки включаются через onSystemFolderChange). Без этого пропа включённые папки не перетаскиваются — ревью 09.11.2026. */
  onReorderSystemFolders?: (folderIds: SystemFolder[]) => void
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
  onReorderCustomFolders,
  onUpdateFolder,
  enabledSystemFolders = ['new'],
  onSystemFolderChange,
  onReorderSystemFolders,
  displayMode,
  onDisplayModeChange,
  foldersLayout = 'top',
  onFoldersLayoutChange,
}: FolderManagementModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [view, setView] = useState<'manage' | 'create' | 'edit'>('manage')
  const [editingFolderId, setEditingFolderId] = useState<string | undefined>(initialFolderId)
  const [draggedFolderId, setDraggedFolderId] = useState<string | null>(null)
  const [draggedSystemFolderId, setDraggedSystemFolderId] = useState<SystemFolder | null>(null)
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

  const moveCustomFolder = (movedId: string, targetId: string) => {
    const ids = customFolders.map((folder) => folder.id)
    const from = ids.indexOf(movedId)
    const to = ids.indexOf(targetId)
    if (from < 0 || to < 0 || from === to) return
    ids.splice(from, 1)
    ids.splice(to, 0, movedId)
    onReorderCustomFolders?.(ids)
    setReorderAnnouncement(`${customFolders.find((folder) => folder.id === movedId)?.label}: новая позиция ${to + 1}`)
  }

  const handleCustomFolderKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>, folderId: string) => {
    if (!event.altKey || (event.key !== 'ArrowUp' && event.key !== 'ArrowDown')) return
    event.preventDefault()
    const ids = customFolders.map((folder) => folder.id)
    const index = ids.indexOf(folderId)
    const target = ids[index + (event.key === 'ArrowUp' ? -1 : 1)]
    if (target) moveCustomFolder(folderId, target)
  }

  // Перетаскивание работает только между уже включёнными системными папками — выключенная строка не валидная цель
  // (у неё нет позиции в порядке), так что перетаскивание на неё игнорируется.
  const moveSystemFolder = (movedId: SystemFolder, targetId: SystemFolder) => {
    if (!enabledSystemFolders.includes(targetId)) return
    const ids = [...enabledSystemFolders]
    const from = ids.indexOf(movedId)
    const to = ids.indexOf(targetId)
    if (from < 0 || to < 0 || from === to) return
    ids.splice(from, 1)
    ids.splice(to, 0, movedId)
    onReorderSystemFolders?.(ids)
    setReorderAnnouncement(`${folderItems.find((folder) => folder.id === movedId)?.label}: новая позиция ${to + 1}`)
  }

  const handleSystemFolderKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>, folderId: SystemFolder) => {
    if (!event.altKey || (event.key !== 'ArrowUp' && event.key !== 'ArrowDown')) return
    if (!enabledSystemFolders.includes(folderId)) return
    event.preventDefault()
    const ids = [...enabledSystemFolders]
    const index = ids.indexOf(folderId)
    const target = ids[index + (event.key === 'ArrowUp' ? -1 : 1)]
    if (target) moveSystemFolder(folderId, target)
  }

  const editingFolder = customFolders.find((folder) => folder.id === editingFolderId)
  // Включённые — первыми и в их текущем порядке (перетаскиваемые), выключенные — следом в исходном порядке.
  const orderedSystemFolders = [
    ...enabledSystemFolders.flatMap((id) => folderItems.find((item) => item.id === id) ?? []),
    ...folderItems.filter((item) => !enabledSystemFolders.includes(item.id)),
  ]

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
          {customFolders.length ? (
            <section className="folder-modal__section folder-modal__custom-section" aria-labelledby="custom-folders-title">
              <header className="folder-modal__section-header">
                <h3 id="custom-folders-title">Пользовательские папки</h3>
                <TextButton onClick={() => { setEditingFolderId(undefined); setView('create') }}>Создать папку</TextButton>
              </header>
              <div className="folder-modal__folder-list folder-modal__custom-list" role="list">
                {customFolders.map((folder) => (
                  <div
                    className={`folder-modal__custom-row ${draggedFolderId === folder.id ? 'is-dragging' : ''}`}
                    draggable
                    key={folder.id}
                    role="listitem"
                    tabIndex={0}
                    aria-label={`${folder.label}. Перетащите или нажмите Alt со стрелкой, чтобы изменить порядок`}
                    onClick={() => { setEditingFolderId(folder.id); setView('edit') }}
                    onDragStart={(event: DragEvent<HTMLDivElement>) => { event.dataTransfer.effectAllowed = 'move'; setDraggedFolderId(folder.id) }}
                    onDragEnter={() => { if (draggedFolderId) moveCustomFolder(draggedFolderId, folder.id) }}
                    onDragOver={(event) => event.preventDefault()}
                    onDragEnd={() => setDraggedFolderId(null)}
                    onKeyDown={(event) => handleCustomFolderKeyDown(event, folder.id)}
                  >
                    <span className="folder-modal__custom-icon" aria-hidden="true">{getCustomFolderEmoji(folder.emoji)}</span>
                    <span className="folder-modal__custom-label">{folder.label}</span>
                    <span className="folder-modal__custom-drag" aria-hidden="true">
                      <img src="assets/figma/ic-drag-indicator-filled.svg" alt="" aria-hidden="true" />
                    </span>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <div className="folder-modal__create">
              <p>Создавайте папки, чтобы группировать чаты<br />и каналы по темам</p>
              <Button type="button" onClick={() => { setEditingFolderId(undefined); setView('create') }}>Создать папку</Button>
            </div>
          )}

          <section className="folder-modal__section" aria-labelledby="system-folders-title">
            <h3 id="system-folders-title">Системные папки</h3>
            <div className="folder-modal__folder-list">
              {orderedSystemFolders.map((folder) => {
                const isEnabled = enabledSystemFolders.includes(folder.id)
                return (
                  <div
                    className={`folder-modal__folder-row ${isEnabled ? 'folder-modal__folder-row--draggable' : ''} ${draggedSystemFolderId === folder.id ? 'is-dragging' : ''}`}
                    key={folder.id}
                    draggable={isEnabled}
                    tabIndex={isEnabled ? 0 : undefined}
                    aria-label={isEnabled ? `${folder.label}. Перетащите или нажмите Alt со стрелкой, чтобы изменить порядок` : undefined}
                    onDragStart={isEnabled ? (event: DragEvent<HTMLDivElement>) => { event.dataTransfer.effectAllowed = 'move'; setDraggedSystemFolderId(folder.id) } : undefined}
                    onDragEnter={isEnabled ? () => { if (draggedSystemFolderId) moveSystemFolder(draggedSystemFolderId, folder.id) } : undefined}
                    onDragOver={isEnabled ? (event) => event.preventDefault() : undefined}
                    onDragEnd={isEnabled ? () => setDraggedSystemFolderId(null) : undefined}
                    onKeyDown={isEnabled ? (event) => handleSystemFolderKeyDown(event, folder.id) : undefined}
                  >
                    <span className="folder-modal__folder-icon" aria-hidden="true">
                      {folder.icon}
                    </span>
                    <span className="folder-modal__folder-copy">
                      <span>{folder.label}</span>
                      <small>{folder.description}</small>
                    </span>
                    <Switch
                      selected={isEnabled}
                      label={`${folder.label}: ${isEnabled ? 'показывать' : 'скрыть'}`}
                      onChange={() => toggleFolder(folder.id)}
                    />
                    {isEnabled && (
                      <span className="folder-modal__custom-drag" aria-hidden="true">
                        <img src="assets/figma/ic-drag-indicator-filled.svg" alt="" aria-hidden="true" />
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
            <span className="visually-hidden" aria-live="polite">{reorderAnnouncement}</span>
          </section>

          {onFoldersLayoutChange && (
            <section className="folder-modal__section" aria-labelledby="folder-layout-title">
              <h3 id="folder-layout-title">Расположение папок</h3>
              <ComboBox
                ariaLabel="Расположение папок"
                value={foldersLayout}
                options={layoutOptions}
                onChange={(value) => onFoldersLayoutChange(value as FolderLayout)}
              />
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
