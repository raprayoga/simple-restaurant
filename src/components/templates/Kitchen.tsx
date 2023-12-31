import React from 'react'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import OrdersTable from '@/components/modules/OrdersTable'

export default function Kitchen() {
  return (
    <DefaultLayout>
      <h1 className="mb-5 text-3xl font-bold text-primary">Kitchen</h1>
      <OrdersTable />
    </DefaultLayout>
  )
}
