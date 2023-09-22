import React, { useEffect, useState } from 'react'
import Order from '@/components/templates/Order'
import { Dispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { getOrder } from '@/store/order'
import { getMenu } from '@/store/menu'

export default function OrderPage() {
  const dispatch: Dispatch<any> = useDispatch()
  const [table, setTable] = useState(0)

  const handleCHangeTable = (table: number) => {
    setTable(table)
  }

  useEffect(() => {
    dispatch(getOrder())
    dispatch(getMenu())
  }, [dispatch])

  return <Order table={table} setTable={handleCHangeTable} />
}
