import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  BanknotesIcon,
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
          className={`mx-2.5 my-2 flex ${
            router.pathname === '/' ? 'text-white' : 'text-gray'
          }`}
        >
          <BanknotesIcon className="mr-2 w-4" />
          <Link href="/">Order</Link>
        </li>
        <li
          className={`mx-2.5 my-2 flex ${
            router.pathname === '/kitchen' ? 'text-white' : 'text-gray'
          }`}
        >
          <TableCellsIcon className="mr-2 w-4" />
          <Link href="/kitchen">Dapur</Link>
        </li>
        <li
          className={`mx-2.5 my-2 flex ${
            router.pathname === '/cashier' ? 'text-white' : 'text-gray'
          }`}
        >
          <CalculatorIcon className="mr-2 w-4" />
          <Link href="/cashier">Kasir</Link>
        </li>
        <li
          className={`mx-2.5 my-2 flex ${
            router.pathname === '/menu' ? 'text-white' : 'text-gray'
          }`}
        >
          <Bars4Icon className="mr-2 w-4" />
          <Link href="/menu">Menu</Link>
        </li>
      </ul>
    </aside>
  )
})
Sidebar.displayName = 'Sidebar'

export { Sidebar }
