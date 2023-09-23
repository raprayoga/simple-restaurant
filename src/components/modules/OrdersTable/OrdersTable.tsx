import { sliceState } from '@/interface/state'
import React from 'react'
import { useSelector } from 'react-redux'

const OrdersTable = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => {
  const orders = useSelector((state: sliceState) => state.order.data)

  return (
    <div className="grid grid-cols-fill-16 gap-5" {...props} ref={ref}>
      {orders.map((orderTable, indexTable) => (
        <div key={indexTable}>
          <h3 className="text-lg font-semibold text-primary">
            Meja: {indexTable + 1}
          </h3>
          <table
            className="w-full border border-gray-shadow text-left text-sm"
            data-testid="table-element"
          >
            <thead className="bg-gray-shadow text-xs">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Menu
                </th>
                <th scope="col" className="px-6 py-3">
                  Kuantitas
                </th>
              </tr>
            </thead>
            <tbody>
              {orderTable.length === 0 && (
                <tr className="text-center">
                  <td colSpan={3}>Belum ada order</td>
                </tr>
              )}
              {orderTable.length > 0 &&
                orderTable.map((item) => (
                  <tr className="border-b bg-white" key={item.id}>
                    <td className="px-6 py-4">{item.menu}</td>
                    <td className="px-6 py-4">{item.quantity}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
})
OrdersTable.displayName = 'OrdersTable'

export { OrdersTable }
