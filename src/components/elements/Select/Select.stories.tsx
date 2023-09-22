import type { Meta, StoryObj } from '@storybook/react'
import Select from './index'

const meta: Meta<typeof Select> = {
  component: Select,
  args: {
    className: 'w-[500px] text-green',
  },
  tags: ['autodocs'],
}

export default meta

export const Default = () => {
  return (
    <Select>
      <option>1</option>
      <option>2</option>
      <option>3</option>
    </Select>
  )
}
