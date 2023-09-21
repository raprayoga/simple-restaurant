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
      data.id = Date.now()
      let menus: Menu[] = getItemFromLocalStorage('menus')
      if (!menus) menus = []
      menus.push(action.payload)
      localStorage.setItem('menus', JSON.stringify(menus))

      state.data = menus
    },
  },
})

// Action creators are generated for each case reducer function
export const { addMenu } = menuSlice.actions

export default menuSlice.reducer
