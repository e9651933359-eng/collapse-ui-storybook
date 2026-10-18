import type { Meta, StoryObj } from '@storybook/react-vite'
import { DeletedMessage } from './DeletedMessage'
import { ChatSurface } from './story-utils'

const meta = {
  title: 'Chat/Deleted message',
  component: DeletedMessage,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Плашка «Сообщение удалено». Figma my-Base «DeletedMessageDesktop» 10227:75515: Other (Group) с аватаром-корзиной, Other, My; каждый вариант с комментариями и без.' } } },
  decorators: [(Story) => <ChatSurface width={520}><Story /></ChatSurface>],
} satisfies Meta<typeof DeletedMessage>

export default meta
type Story = StoryObj<typeof meta>

export const OtherGroup: Story = { args: { type: 'other-group' } }
export const Other: Story = { args: { type: 'other' } }
export const My: Story = { args: { type: 'my' } }
export const WithComments: Story = {
  render: () => (
    <>
      <DeletedMessage type="other-group" comments={3} />
      <DeletedMessage type="other" comments={3} />
      <DeletedMessage type="my" comments={3} />
    </>
  ),
}
export const WithoutTail: Story = { args: { type: 'other', bubbleTail: false } }
