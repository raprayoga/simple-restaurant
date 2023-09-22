import React, { useState, useEffect } from 'react'
import Cashier from '@/components/templates/Cashier'
import { Dispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { getOrder } from '@/store/order'

export default function CashierPage() {
  const dispatch: Dispatch<any> = useDispatch()
  const [table, setTable] = useState(0)

  const handleCHangeTable = (table: number) => {
    setTable(table)
  }

  useEffect(() => {
    dispatch(getOrder())
  }, [dispatch])

  return <Cashier table={table} setTable={handleCHangeTable} />
}
