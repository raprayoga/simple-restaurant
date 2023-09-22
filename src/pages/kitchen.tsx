import React, { useEffect } from 'react'
import Kitchen from '@/components/templates/Kitchen'
import { Dispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { getOrder } from '@/store/order'

export default function KitchenPage() {
  const dispatch: Dispatch<any> = useDispatch()

  useEffect(() => {
    dispatch(getOrder())
  }, [dispatch])

  return <Kitchen />
}
