import React, { useState } from 'react'
import Button from '@/components/elements/Button'
import Input from '@/components/elements/Input'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import { formRules, getVariant } from '@/utils/form-rules'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { showToast } from '@/store/toast'
import { OrderForm } from '@/interface/order'
import { sliceState } from '@/interface/state'
import { Select } from '@/components/elements/Select/Select'
import Dialog from '@/components/elements/Dialog'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { updateOrder } from '@/store/order'

export interface AddOrderFormProps
  extends React.HTMLAttributes<HTMLFormElement> {
  table: number
}
const AddOrderForm = React.forwardRef<HTMLFormElement, AddOrderFormProps>(
  ({ table, ...props }, ref) => {
    const dispatch: Dispatch<any> = useDispatch()
    const orders = useSelector((state: sliceState) => state.order.data)
    const menu = useSelector((state: sliceState) => state.menu.data)
    const [isShowDialog, setIsShowDialog] = useState(false)

    const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<OrderForm>({
      mode: 'onChange',
    })

    const confirmSubmit: SubmitHandler<OrderForm> = () => {
      toggleShowDialog(true)
    }

    const onSubmit: SubmitHandler<OrderForm> = (data) => {
      const updatedOrder = JSON.parse(JSON.stringify(orders[table]))
      const menuItemIndex = menu.findIndex((item) => item.id === +data.id)
      if (menuItemIndex < 0) {
        return dispatch(
          showToast({
            message: 'Item menu tidak valid',
            type: 'red',
          })
        )
      }

      updatedOrder.unshift({ ...menu[menuItemIndex], quantity: data.quantity })
      dispatch(updateOrder({ table, order: updatedOrder }))
      reset()
      dispatch(
        showToast({
          message: 'Berhasil menambah order',
          type: 'green',
        })
      )
      toggleShowDialog(false)
    }

    const toggleShowDialog = (value: boolean) => {
      setIsShowDialog(value)
    }

    return (
      <>
        <form {...props} ref={ref} onSubmit={handleSubmit(confirmSubmit)}>
          <div className="flex">
            <div className="w-4/5">
              <div className="flex gap-1">
                <Controller
                  control={control}
                  rules={{
                    required: formRules.required,
                  }}
                  defaultValue=""
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { isDirty, error },
                  }) => (
                    <div className="flex w-8/12 flex-col">
                      <Select
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        theme={getVariant(isDirty, !!error)}
                      >
                        <option className="text-gray">Pilih Menu</option>
                        {menu.map((item) => (
                          <option value={item.id} key={item.id}>
                            {item.menu}
                          </option>
                        ))}
                      </Select>
                      <span className="float-left text-[10px] text-red">
                        &nbsp;
                        {errors.id ? errors.id.message : ''}
                      </span>
                    </div>
                  )}
                  name="id"
                />
                <Controller
                  control={control}
                  rules={{
                    required: formRules.required,
                    min: formRules.minNominal(1),
                  }}
                  defaultValue=""
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { isDirty, error },
                  }) => (
                    <div className="flex w-4/12 flex-col">
                      <Input
                        type="number"
                        placeholder="Qt"
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        theme={getVariant(isDirty, !!error)}
                      />
                      <span className="float-left text-[10px] text-red">
                        {errors.quantity ? errors.quantity.message : ''}
                      </span>
                    </div>
                  )}
                  name="quantity"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <Button className="ml-2 h-2/5 py-6" type="submit">
                Tambah
              </Button>
              <span></span>
            </div>
          </div>
        </form>

        <Dialog
          isShow={isShowDialog}
          className="flex w-[280px] flex-col items-center"
          onClose={() => toggleShowDialog(false)}
        >
          <div className="mb-5 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-red">
            <ExclamationCircleIcon className="w-[30px] stroke-2 text-white" />
          </div>
          <p className="text-sm">Yakin membuat order ?</p>
          <p
            className="my-6 cursor-pointer text-sm font-bold text-primary"
            onClick={handleSubmit(onSubmit)}
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
  }
)
AddOrderForm.displayName = 'AddOrderForm'

export { AddOrderForm }
