import React, { useEffect } from 'react'
import Menu from '@/components/templates/Menu'
import { getMenu } from '@/store/menu'
import { useDispatch } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'

export default function MenuPage() {
  const dispatch: Dispatch<any> = useDispatch()

  useEffect(() => {
    dispatch(getMenu())
  }, [dispatch])

  return <Menu />
}
