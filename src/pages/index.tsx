import React, { useEffect, useState } from 'react'
import Kitchen from '@/components/templates/Kitchen'
import { Dispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { getOrder } from '@/store/order'
import { getMenu } from '@/store/menu'

export default function KitchenPage() {
  const dispatch: Dispatch<any> = useDispatch()
  const [table, setTable] = useState(0)

  const handleCHangeTable = (table: number) => {
    setTable(table)
  }

  useEffect(() => {
    dispatch(getOrder())
    dispatch(getMenu())
  }, [dispatch])

  return <Kitchen table={table} setTable={handleCHangeTable} />
}
