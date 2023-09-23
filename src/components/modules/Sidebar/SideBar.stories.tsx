import type { Meta } from '@storybook/react'
import Sidebar from './index'
import { Provider } from 'react-redux'
import store from '@/store/store'

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  tags: ['autodocs'],
}

export default meta

export const Default = () => {
  return (
    <Provider store={store}>
      <Sidebar />
    </Provider>
  )
}
