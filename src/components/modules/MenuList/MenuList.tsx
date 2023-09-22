import React, { useEffect, useState } from 'react'
import { sliceState } from '@/interface/state'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItem, getMenu } from '@/store/menu'
import { Dispatch } from '@reduxjs/toolkit'
import Button from '@/components/elements/Button'
import { showToast } from '@/store/toast'
import { CheckIcon } from '@heroicons/react/24/outline'
import Dialog from '@/components/elements/Dialog'

const MenuList = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ ...props }, ref) => {
  const dispatch: Dispatch<any> = useDispatch()
  const menu = useSelector((state: sliceState) => state.menu.data)
  const [isShowDialog, setIsShowDialog] = useState(false)
  const [idDelete, setIdDelete] = useState(0)

  useEffect(() => {
    dispatch(getMenu())
  }, [dispatch])

  const handleDeleteItem = () => {
    dispatch(deleteItem({ id: idDelete }))

    dispatch(
      showToast({
        message: 'Berhasil menghapus item menu',
        type: 'green',
      })
    )
    toggleShowDialog(false)
  }

  const handleConfirmDelete = (id: number) => {
    setIdDelete(id)
    toggleShowDialog(true)
  }

  const toggleShowDialog = (value: boolean) => {
    setIsShowDialog(value)
  }

  return (
    <>
      {idDelete}
      <div className="relative overflow-x-auto" {...props} ref={ref}>
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-shadow text-xs  uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Nama
              </th>
              <th scope="col" className="px-6 py-3">
                Harga
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {menu.map((item) => (
              <tr className="border-b bg-white" key={item.id}>
                <td scope="row" className="whitespace-nowrap px-6 py-4">
                  {item.id}
                </td>
                <td className="px-6 py-4">{item.menu}</td>
                <td className="px-6 py-4">
                  {'Rp ' + new Intl.NumberFormat('id-ID').format(+item.price)}
                </td>
                <td className="px-6 py-4">
                  <Button
                    theme="red"
                    variant="ghost"
                    className="px-3 py-1"
                    onClick={() => handleConfirmDelete(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog
        isShow={isShowDialog}
        className="flex w-[280px] flex-col items-center"
        onClose={() => toggleShowDialog(false)}
      >
        <div className="mb-5 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-green">
          <CheckIcon className="w-[30px] stroke-2 text-white" />
        </div>
        <p className="text-sm">Yakin menghapus item menu ini ?</p>
        <p
          className="my-6 cursor-pointer text-sm font-bold text-primary"
          onClick={() => handleDeleteItem()}
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
MenuList.displayName = 'MenuList'

export { MenuList }
