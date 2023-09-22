import { configureStore } from '@reduxjs/toolkit'
import toastReducer from './toast'
import menuSlice from './menu'

export default configureStore({
  reducer: {
    toast: toastReducer,
    menu: menuSlice,
  },
})
