import { useEffect } from 'react'
import type { Meta } from '@storybook/react'
import MenuList from './index'
import store from '@/store/store'
import { Provider, useDispatch } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { getMenu } from '@/store/menu'

const meta: Meta<typeof MenuList> = {
  component: MenuList,
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

  return <MenuList className="w-full" />
}

export const Default = () => {
  return (
    <Provider store={store}>
      <Component />
    </Provider>
  )
}
