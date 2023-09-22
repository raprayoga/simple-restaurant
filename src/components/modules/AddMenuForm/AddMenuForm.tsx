import React from 'react'
import Button from '@/components/elements/Button'
import Input from '@/components/elements/Input'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import { MenuForm } from '@/interface/menu'
import { formRules, getVariant } from '@/utils/form-rules'
import { useDispatch } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { addMenu } from '@/store/menu'
import { showToast } from '@/store/toast'

const AddMenuForm = React.forwardRef<
  HTMLFormElement,
  React.HTMLAttributes<HTMLFormElement>
>(({ ...props }, ref) => {
  const dispatch: Dispatch<any> = useDispatch()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MenuForm>({
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<MenuForm> = (data) => {
    dispatch(addMenu(data))
    reset()
    dispatch(
      showToast({
        message: 'Berhasil menambah menu',
        type: 'green',
      })
    )
  }

  return (
    <form {...props} ref={ref} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex">
        <div className="w-4/5">
          <div className="flex gap-5">
            <Controller
              control={control}
              rules={{
                required: formRules.required,
                maxLength: formRules.maxLength(50),
              }}
              defaultValue=""
              render={({
                field: { onChange, onBlur, value },
                fieldState: { isDirty, error },
              }) => (
                <div className="flex w-1/2 flex-col">
                  <Input
                    placeholder="Menu"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    theme={getVariant(isDirty, !!error)}
                  />
                  <span className="float-left text-[10px] text-red">
                    {errors.menu ? errors.menu.message : ''}
                  </span>
                </div>
              )}
              name="menu"
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
                <div className="flex w-1/2 flex-col">
                  <Input
                    type="number"
                    placeholder="Harga"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    theme={getVariant(isDirty, !!error)}
                  />
                  <span className="float-left text-[10px] text-red">
                    {errors.price ? errors.price.message : ''}
                  </span>
                </div>
              )}
              name="price"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <Button className="ml-5 h-2/5 py-6" type="submit">
            Tambah
          </Button>
          <span></span>
        </div>
      </div>
    </form>
  )
})
AddMenuForm.displayName = 'AddMenuForm'

export { AddMenuForm }
