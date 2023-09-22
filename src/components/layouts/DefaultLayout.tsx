import React from 'react'
import Sidebar from '@/components/modules/Sidebar'

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="min-h-screen w-full px-12 pt-5">{children}</main>
    </div>
  )
}
