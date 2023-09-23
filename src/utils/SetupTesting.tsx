import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import toastReducer from '@/store/toast'
import menuSlice from '@/store/menu'
import orderSlice from '@/store/order'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.

localStorage.setItem(
  'menu',
  JSON.stringify([
    {
      menu: 'nasi uduk',
      price: '7000',
      id: 67324360,
    },
  ])
)
localStorage.setItem(
  'orders',
  JSON.stringify([
    [
      {
        menu: 'nasi uduk',
        price: '7000',
        id: 67324360,
        quantity: '2',
      },
    ],
    [],
    [],
    [
      {
        menu: 'es teh manis',
        price: '4000',
        id: 56238262,
        quantity: '2',
      },
    ],
    [],
    [
      {
        menu: 'nasi uduk',
        price: '7000',
        id: 67324360,
        quantity: '2',
      },
    ],
  ])
)

export function renderWithProviders(
  ui: React.ReactElement,
  {
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: {
        toast: toastReducer,
        menu: menuSlice,
        order: orderSlice,
      },
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
