export interface OrderForm {
  id: string
  quantity: string
}

export interface Order {
  id: number
  menu: string
  quantity: string
  price: number
}

export interface OrderSliceState {
  data: Order[][]
}
