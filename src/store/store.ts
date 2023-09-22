import { configureStore } from '@reduxjs/toolkit'
import toastReducer from './toast'
import menuSlice from './menu'
import orderSlice from './order'

export default configureStore({
  reducer: {
    toast: toastReducer,
    menu: menuSlice,
    order: orderSlice,
  },
})
