export interface MenuForm {
  menu: string
  price: string
}

export interface Menu {
  id: number
  menu: string
  price: string
}

export interface MenuSliceState {
  data: Menu[]
}
