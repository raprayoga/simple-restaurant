import type { Meta } from '@storybook/react'
import AddOrderForm from './index'
import store from '@/store/store'
import { Provider } from 'react-redux'

const meta: Meta<typeof AddOrderForm> = {
  component: AddOrderForm,
  args: {
    className: 'w-[500px] text-green',
  },
  tags: ['autodocs'],
}

export default meta

export const Default = () => {
  return (
    <Provider store={store}>
      <AddOrderForm className="w-full" table={0} />
    </Provider>
  )
}
