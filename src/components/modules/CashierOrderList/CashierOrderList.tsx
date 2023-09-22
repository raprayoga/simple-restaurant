import React, { useState } from 'react'
import { sliceState } from '@/interface/state'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@/components/elements/Button'
import Dialog from '@/components/elements/Dialog'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { resetTableOrders } from '@/store/order'
import { Dispatch } from '@reduxjs/toolkit'
import { showToast } from '@/store/toast'
import { Margin, usePDF } from 'react-to-pdf'

export interface CashierOrderListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  table: number
}

const CashierOrderList = React.forwardRef<
  HTMLDivElement,
  CashierOrderListProps
>(({ table, ...props }, ref) => {
  const dispatch: Dispatch<any> = useDispatch()
  const orders = useSelector((state: sliceState) => state.order.data)
  const [isShowDialog, setIsShowDialog] = useState(false)
  const { toPDF, targetRef } = usePDF({
    filename: `struk_meja_${table + 1}.pdf`,
    page: { margin: Margin.MEDIUM },
  })

  const totalPrice = orders[table].reduce(
    (total, order) => total + order.price * +order.quantity,
    0
  )

  const handleResetTable = () => {
    dispatch(resetTableOrders({ table }))
    dispatch(
      showToast({
        message: 'Berhasil kosongkan meja',
        type: 'green',
      })
    )
    toggleShowDialog(false)
  }

  const toggleShowDialog = (value: boolean) => {
    setIsShowDialog(value)
  }

  const handlePrintStroke = () => {
    toPDF()

    dispatch(
      showToast({
        message: 'Cetak Struk diproses, silahkan cek file download',
        type: 'green',
      })
    )
  }

  return (
    <>
      <div className="relative overflow-x-auto" {...props} ref={ref}>
        <div className="mb-3 flex gap-2">
          <Button theme="green" onClick={handlePrintStroke}>
            Cetak Struk
          </Button>
          <Button
            variant="ghost"
            theme="red"
            onClick={() => toggleShowDialog(true)}
          >
            Kosongkan Meja
          </Button>
        </div>
        <table className="w-full text-left text-sm" ref={targetRef}>
          <thead className="bg-gray-shadow text-xs">
            <tr>
              <th scope="col" className="px-6 py-3">
                Menu
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Qt
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {orders[table].length === 0 && (
              <tr className="text-center">
                <td colSpan={4}>Belum ada order</td>
              </tr>
            )}
            {orders[table].length > 0 &&
              orders[table].map((item) => (
                <tr className="border-b bg-white" key={item.id}>
                  <td className="px-6 py-4">{item.menu}</td>
                  <td className="px-6 py-4">
                    {'Rp ' + new Intl.NumberFormat('id-ID').format(+item.price)}
                  </td>
                  <td className="px-6 py-4">{item.quantity}</td>
                  <td className="px-6 py-4">
                    {'Rp ' +
                      new Intl.NumberFormat('id-ID').format(
                        +item.quantity * item.price
                      )}
                  </td>
                </tr>
              ))}
            {orders[table].length > 0 && (
              <tr className="border-b bg-gray-shadow">
                <td className="px-6 py-4" colSpan={3}>
                  Total
                </td>
                <td className="px-6 py-4">{totalPrice}</td>
              </tr>
            )}
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
        <p className="text-sm">Yakin kosongkan meja ?</p>
        <p
          className="my-6 cursor-pointer text-sm font-bold text-primary"
          onClick={handleResetTable}
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
})
CashierOrderList.displayName = 'CashierOrderList'

export { CashierOrderList }
