import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'
import { FolderManagementModal } from './FolderManagementModal'
import type { ManagedFolder, SystemFolder } from './FolderManagementModal'
import type { SegmentDisplayMode } from './SegmentControls'

const candidates = [
  { id: 'design', label: 'Дизайн', avatar: '🎨', avatarColor: 4 as const, shape: 'squircle' as const },
  { id: 'team', label: 'Команда', avatar: '◒', avatarColor: 7 as const },
  { id: 'mts', label: 'МТС', avatar: 'М Т С', avatarColor: 7 as const },
  { id: 'updates', label: 'Обновления продукта', avatar: '👀', avatarColor: 2 as const, shape: 'squircle' as const },
]

function ModalDemo() {
  const [open, setOpen] = useState(true)
  const [displayMode, setDisplayMode] = useState<SegmentDisplayMode>('names')
  const [customFolders, setCustomFolders] = useState<ManagedFolder[]>([
    { id: 'folder-product', label: 'Продукт', emoji: '🔥', chatIds: ['design', 'updates'] },
    { id: 'folder-team', label: 'Команда', emoji: '💚', chatIds: ['team'] },
    { id: 'folder-default', label: 'Без эмодзи', chatIds: [] },
  ])
  // Единый порядок включённых папок — системных и пользовательских вперемешку, как в App.tsx.
  const [folderOrder, setFolderOrder] = useState<string[]>(['new', 'folder-product', 'channels', 'folder-team', 'folder-default'])
  const enabledFolders = folderOrder.filter((id): id is SystemFolder => (['new', 'chats', 'channels'] as string[]).includes(id))

  return (
    <div className="folder-modal-story-canvas">
      {!open && (
        <Button type="button" onClick={() => setOpen(true)}>
          Открыть управление папками
        </Button>
      )}
      <FolderManagementModal
        open={open}
        candidates={candidates}
        customFolders={customFolders}
        enabledSystemFolders={enabledFolders}
        folderOrder={folderOrder}
        displayMode={displayMode}
        onDisplayModeChange={setDisplayMode}
        onCreateFolder={(folder) => {
          const id = `folder-${customFolders.length + 1}`
          setCustomFolders((current) => [...current, { ...folder, id }])
          setFolderOrder((current) => [...current, id])
        }}
        onReorderFolders={(ids) => {
          setFolderOrder(ids)
          const customIds = new Set(customFolders.map((folder) => folder.id))
          setCustomFolders((current) => ids.filter((id) => customIds.has(id)).flatMap((id) => current.find((folder) => folder.id === id) ?? []))
        }}
        onUpdateFolder={(id, folder) => setCustomFolders((current) => current.map((item) => item.id === id ? { ...item, ...folder } : item))}
        onSystemFolderChange={(folder, enabled) => setFolderOrder((current) => enabled
          ? (current.includes(folder) ? current : [...current, folder])
          : current.filter((id) => id !== folder))}
        onClose={() => setOpen(false)}
      />
    </div>
  )
}

const meta = {
  title: 'UI/FolderManagementModal',
  component: FolderManagementModal,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof FolderManagementModal>

export default meta
type Story = StoryObj<typeof meta>

export const Interactive: Story = {
  args: { open: true, candidates, displayMode: 'names', onDisplayModeChange: () => undefined, onClose: () => undefined },
  render: () => <ModalDemo />,
  parameters: { docs: { description: { story: 'Все экраны модалки используют общий предел 700 px и сохраняют минимум 16 px до краёв экрана.' } } },
}

export const CreateFromChatContext: Story = {
  args: {
    open: true,
    initialView: 'create',
    initialSelectedChatIds: ['team'],
    candidates,
    displayMode: 'names',
    onDisplayModeChange: () => undefined,
    onClose: () => undefined,
  },
}

export const EditExistingFolder: Story = {
  args: {
    open: true,
    initialView: 'edit',
    initialFolderId: 'folder-notifications',
    customFolders: [
      { id: 'folder-notifications', label: 'Уведомления', emoji: '🔔', chatIds: [] },
    ],
    candidates,
    displayMode: 'names',
    onDisplayModeChange: () => undefined,
    onUpdateFolder: () => undefined,
    onClose: () => undefined,
  },
}

export const EditFolderWithSelection: Story = {
  args: {
    ...EditExistingFolder.args,
    initialFolderId: 'folder-product',
    customFolders: [
      { id: 'folder-product', label: 'Продукт', emoji: '🔥', chatIds: ['updates', 'team'] },
    ],
  },
  parameters: { docs: { description: { story: 'В списке выбора сначала идут ранее выбранные («Команда», «Обновления продукта»), затем остальные — обе группы по алфавиту.' } } },
}
