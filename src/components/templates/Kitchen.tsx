import React from 'react'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import AddOrderForm from '@/components/modules/AddOrderForm'
import OrderList from '@/components/modules/OrderList'
import Table from '@/components/modules/Table'

export interface KitchenProps {
  table: number
  setTable: (value: number) => void
}

export default function Kitchen({ table, setTable }: KitchenProps) {
  return (
    <DefaultLayout>
      <h1 className="mb-5 text-3xl font-bold text-primary">Dapur</h1>
      <div className="flex">
        <div className="min-h-[80vh] w-7/12 border-r-2 border-gray-shadow pr-5">
          <h2 className="mb-5 text-2xl font-bold text-primary">Meja</h2>
          <Table table={table} setTable={setTable} />
        </div>
        <div className="w-5/12 pl-5">
          <h2 className="mb-5 text-2xl font-bold text-primary">Order</h2>
          <AddOrderForm table={table} />
          <OrderList table={table} className="mt-10" />
        </div>
      </div>
    </DefaultLayout>
  )
}
