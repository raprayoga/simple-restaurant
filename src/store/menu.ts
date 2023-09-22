import { createSlice } from '@reduxjs/toolkit'
import { Menu, MenuSliceState } from '@/interface/menu'
import { getItemFromLocalStorage } from '@/utils/store'

const initialState: MenuSliceState = {
  data: [],
}

export const menuSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addMenu(state, action) {
      const data = action.payload
      data.id = Date.now() - 1695307600000
      let menu: Menu[] = getItemFromLocalStorage('menu')
      if (!menu) menu = []
      menu.unshift(action.payload)
      localStorage.setItem('menu', JSON.stringify(menu))

      state.data = menu
    },
    getMenu(state) {
      const menu: Menu[] = getItemFromLocalStorage('menu')
      state.data = menu || []
    },
    deleteItem(state, action) {
      let menu: Menu[] = getItemFromLocalStorage('menu')
      const newMenu = menu.filter((item) => item.id !== action.payload.id)

      localStorage.setItem('menu', JSON.stringify(newMenu))
      state.data = newMenu
    },
  },
})

// Action creators are generated for each case reducer function
export const { addMenu, getMenu, deleteItem } = menuSlice.actions

export default menuSlice.reducer
