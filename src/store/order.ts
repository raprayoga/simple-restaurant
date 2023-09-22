import { createSlice } from '@reduxjs/toolkit'
import { getItemFromLocalStorage } from '@/utils/store'
import { Order, OrderSliceState } from '@/interface/order'

const initialState: OrderSliceState = {
  data: [[], [], [], [], [], []],
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    getOrder(state) {
      let orders: Order[][] = getItemFromLocalStorage('orders')
      state.data = orders || []
    },
    updateOrder(state, action) {
      let orders: Order[][] = getItemFromLocalStorage('orders')
      orders[action.payload.table] = action.payload.order

      localStorage.setItem('orders', JSON.stringify(orders))
      state.data = orders
    },
    resetTableOrders(state, action) {
      let orders: Order[][] = getItemFromLocalStorage('orders')
      orders[action.payload.table] = []

      state.data = orders
    },
  },
})

// Action creators are generated for each case reducer function
export const { getOrder, updateOrder, resetTableOrders } = orderSlice.actions

export default orderSlice.reducer
