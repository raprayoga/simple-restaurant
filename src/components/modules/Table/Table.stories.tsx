import type { Meta } from '@storybook/react'
import Table from './index'
import { useState } from 'react'

const meta: Meta<typeof Table> = {
  component: Table,
  args: {
    className: 'w-full',
  },
  tags: ['autodocs'],
}

export default meta

const Component = () => {
  const [table, setTable] = useState(0)

  return (
    <Table
      table={table}
      setTable={(value) => {
        setTable(value)
      }}
    />
  )
}

export const Default = () => {
  return <Component />
}
