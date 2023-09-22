import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import store from '@/store/store'
import { Provider } from 'react-redux'
import ToastFloat from '@/components/modules/ToastFloat/ToastFloat'
import { useEffect } from 'react'
import { getItemFromLocalStorage } from '@/utils/store'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const orders: any[] = getItemFromLocalStorage('orders')
    const menu: any[] = getItemFromLocalStorage('menu')
    console.log(orders)
    console.log(menu)
    if (menu === null) {
      localStorage.setItem('menu', JSON.stringify([]))
    }
    if (orders === null) {
      localStorage.setItem('orders', JSON.stringify([[], [], [], [], [], []]))
    }

    console.log('USE EFFECT')
  }, [])

  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastFloat />
    </Provider>
  )
}
