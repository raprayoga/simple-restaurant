import { ToastSliceState } from './toast'
import { MenuSliceState } from './menu'
import { OrderSliceState } from './order'

export interface sliceState {
  toast: ToastSliceState
  menu: MenuSliceState
  order: OrderSliceState
}
