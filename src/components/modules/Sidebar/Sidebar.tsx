'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  ArrowPathIcon,
  CalculatorIcon,
  Bars4Icon,
  TableCellsIcon,
} from '@heroicons/react/24/outline'

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => {
  const router = useRouter()

  return (
    <aside
      className="h-screen w-1/5 min-w-[100px] bg-primary px-2.5 py-5"
      {...props}
      ref={ref}
    >
      <h2 className="mx-2.5 my-5 text-2xl font-bold text-white">Restaurant</h2>
      <ul>
        <li
          className={`mx-2.5 my-2 ${
            router.pathname === '/' ? 'text-white' : 'text-gray'
          }`}
        >
          <Link href="/" className="flex">
            <TableCellsIcon className="mr-2 w-4" />
            Order
          </Link>
        </li>
        <li
          className={`mx-2.5 my-2 ${
            router.pathname === '/kitchen' ? 'text-white' : 'text-gray'
          }`}
        >
          <Link href="/kitchen" className="flex">
            <ArrowPathIcon className="mr-2 w-4" />
            Dapur
          </Link>
        </li>
        <li
          className={`mx-2.5 my-2 ${
            router.pathname === '/cashier' ? 'text-white' : 'text-gray'
          }`}
        >
          <Link href="/cashier" className="flex">
            <CalculatorIcon className="mr-2 w-4" />
            Kasir
          </Link>
        </li>
        <li
          className={`mx-2.5 my-2 ${
            router.pathname === '/menu' ? 'text-white' : 'text-gray'
          }`}
        >
          <Link href="/menu" className="flex">
            <Bars4Icon className="mr-2 w-4" />
            Menu
          </Link>
        </li>
      </ul>
    </aside>
  )
})
Sidebar.displayName = 'Sidebar'

export { Sidebar }
