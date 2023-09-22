import type { Meta } from '@storybook/react'
import MenuList from './index'
import store from '@/store/store'
import { Provider } from 'react-redux'

const meta: Meta<typeof MenuList> = {
  component: MenuList,
  args: {
    className: 'w-[500px] text-green',
  },
  tags: ['autodocs'],
}

export default meta

export const Default = () => {
  return (
    <Provider store={store}>
      <MenuList className="w-full" />
    </Provider>
  )
}
