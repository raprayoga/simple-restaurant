import type { Meta } from '@storybook/react'
import OrdersTable from './index'
import store from '@/store/store'
import { Provider, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getOrder } from '@/store/order'
import { Dispatch } from '@reduxjs/toolkit'

const meta: Meta<typeof OrdersTable> = {
  component: OrdersTable,
  args: {
    className: 'w-[500px] text-green',
  },
  tags: ['autodocs'],
}

export default meta

function Component() {
  const dispatch: Dispatch<any> = useDispatch()

  useEffect(() => {
    dispatch(getOrder())
  }, [dispatch])

  return <OrdersTable />
}

export const Default = () => {
  return (
    <Provider store={store}>
      <Component />
    </Provider>
  )
}
