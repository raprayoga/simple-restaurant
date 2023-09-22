import React, { useState } from 'react'
import Button from '@/components/elements/Button'
import Dialog from '@/components/elements/Dialog'
import { sliceState } from '@/interface/state'
import { showToast } from '@/store/toast'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { Dispatch } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { updateOrder } from '@/store/order'

export interface OrderListProps extends React.HTMLAttributes<HTMLDivElement> {
  table: number
}

const OrderList = React.forwardRef<HTMLDivElement, OrderListProps>(
  ({ table, ...props }, ref) => {
    const dispatch: Dispatch<any> = useDispatch()
    const orders = useSelector((state: sliceState) => state.order.data)
    const [isShowDialog, setIsShowDialog] = useState(false)
    const [indexDelete, setIndexDelete] = useState(0)

    const handleDeleteItem = () => {
      const updatedOrder = JSON.parse(JSON.stringify(orders[table]))
      updatedOrder.splice(indexDelete, 1)

      dispatch(
        updateOrder({
          table,
          order: updatedOrder,
        })
      )

      dispatch(
        showToast({
          message: 'Berhasil menghapus item menu',
          type: 'green',
        })
      )
      toggleShowDialog(false)
    }

    const handleConfirmDelete = (index: number) => {
      setIndexDelete(index)
      toggleShowDialog(true)
    }

    const toggleShowDialog = (value: boolean) => {
      setIsShowDialog(value)
    }

    return (
      <>
        <div className="relative overflow-x-auto" {...props} ref={ref}>
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-shadow text-xs">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Menu
                </th>
                <th scope="col" className="px-6 py-3">
                  Kuantitas
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {orders[table].length === 0 && (
                <tr className="text-center">
                  <td colSpan={3}>Belum ada order</td>
                </tr>
              )}
              {orders[table].length > 0 &&
                orders[table].map((item, index) => (
                  <tr className="border-b bg-white" key={item.id}>
                    <td className="px-6 py-4">{item.menu}</td>
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4">
                      <Button
                        theme="red"
                        variant="ghost"
                        className="px-3 py-1"
                        onClick={() => handleConfirmDelete(index)}
                      >
                        Cancel
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <Dialog
          isShow={isShowDialog}
          className="flex w-[280px] flex-col items-center"
          onClose={() => toggleShowDialog(false)}
        >
          <div className="mb-5 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-red">
            <ExclamationCircleIcon className="w-[30px] stroke-2 text-white" />
          </div>
          <p className="text-sm">Yakin menghapus order ini ?</p>
          <p
            className="my-6 cursor-pointer text-sm font-bold text-primary"
            onClick={() => handleDeleteItem()}
          >
            Ya, Lanjutkan
          </p>
          <Button
            className="cursor-pointer text-sm font-bold text-red"
            theme="red"
            variant="ghost"
            onClick={() => toggleShowDialog(false)}
          >
            Batalkan
          </Button>
        </Dialog>
      </>
    )
  }
)
OrderList.displayName = 'OrderList'

export { OrderList }
