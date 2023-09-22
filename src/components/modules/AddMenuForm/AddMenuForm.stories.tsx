import type { Meta, StoryObj } from '@storybook/react'
import AddMenuForm from './index'
import store from '@/store/store'
import { Provider } from 'react-redux'

const meta: Meta<typeof AddMenuForm> = {
  component: AddMenuForm,
  args: {
    className: 'w-[500px] text-green',
  },
  tags: ['autodocs'],
}

export default meta

export const Default = () => {
  return (
    <Provider store={store}>
      <AddMenuForm className="w-full" />
    </Provider>
  )
}
