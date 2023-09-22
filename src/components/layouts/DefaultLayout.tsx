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
      <main className="mt-5 min-h-screen w-full px-12">{children}</main>
    </div>
  )
}
