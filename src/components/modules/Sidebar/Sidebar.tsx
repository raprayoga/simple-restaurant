'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  InboxArrowDownIcon,
  ArrowPathIcon,
  CalculatorIcon,
  Bars4Icon,
  TableCellsIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline'
import Dialog from '@/components/elements/Dialog'
import Button from '@/components/elements/Button'

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => {
  const router = useRouter()
  const [isShowDialog, setIsShowDialog] = useState(false)

  const handleReset = () => {
    localStorage.setItem('menu', JSON.stringify([]))
    localStorage.setItem('orders', JSON.stringify([[], [], [], [], [], []]))
  }

  const toggleShowDialog = (value: boolean) => {
    setIsShowDialog(value)
  }

  return (
    <>
      <aside
        className="h-screen w-1/5 min-w-[100px] bg-primary px-2.5 py-5"
        {...props}
        ref={ref}
      >
        <h2 className="mx-2.5 my-5 text-2xl font-bold text-white">
          Restaurant
        </h2>
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
              <InboxArrowDownIcon className="mr-2 w-4" />
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
          <li
            className="mx-2.5 my-2 flex cursor-pointer text-gray"
            onClick={() => toggleShowDialog(true)}
          >
            <ArrowPathIcon className="mr-2 w-4" />
            Reset
          </li>
        </ul>
      </aside>

      <Dialog
        isShow={isShowDialog}
        className="flex w-[280px] flex-col items-center"
        onClose={() => toggleShowDialog(false)}
      >
        <div className="mb-5 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-red">
          <ExclamationCircleIcon className="w-[30px] stroke-2 text-white" />
        </div>
        <p className="text-sm">Yakin reset semua data ?</p>
        <p
          className="my-6 cursor-pointer text-sm font-bold text-primary"
          onClick={handleReset}
        >
          Ya, Lanjutkan
        </p>
        <Button
          className="cursor-pointer text-sm font-bold text-red"
          theme="red"
          variant="ghost"
          onClick={() => toggleShowDialog(false)}
        >
          Batalkan
        </Button>
      </Dialog>
    </>
  )
})
Sidebar.displayName = 'Sidebar'

export { Sidebar }
