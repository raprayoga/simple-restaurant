import React from 'react'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import AddMenuForm from '@/components/modules/AddMenuForm'
import MenuList from '@/components/modules/MenuList'

export default function Menu() {
  return (
    <DefaultLayout>
      <h1 className="mb-5 text-3xl font-bold text-primary">Menu</h1>
      <AddMenuForm />
      <MenuList />
    </DefaultLayout>
  )
}
