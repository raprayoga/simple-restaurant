import { useEffect } from 'react'
import type { Meta } from '@storybook/react'
import AddOrderForm from './index'
import store from '@/store/store'
import { Provider, useDispatch } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { getMenu } from '@/store/menu'

const meta: Meta<typeof AddOrderForm> = {
  component: AddOrderForm,
  args: {
    className: 'w-[500px] text-green',
  },
  tags: ['autodocs'],
}

export default meta

function Component() {
  const dispatch: Dispatch<any> = useDispatch()

  useEffect(() => {
    dispatch(getMenu())
  }, [dispatch])

  return <AddOrderForm table={0} className="w-full" />
}

export const Default = () => {
  return (
    <Provider store={store}>
      <Component />
    </Provider>
  )
}
