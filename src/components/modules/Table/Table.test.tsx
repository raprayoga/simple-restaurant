import React, { useState } from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Table from './index'

export default function Component() {
  const [table, setTable] = useState(0)

  const handleCHangeTable = (table: number) => {
    setTable(table)
  }
  return <Table table={table} setTable={handleCHangeTable} />
}

describe('Table test', () => {
  test('Should active when click', async () => {
    const user = userEvent.setup()
    render(<Component />)

    expect(screen.getByText('Meja 1')).toHaveClass('bg-primary text-white')

    const tableThree = screen.getByText('Meja 3')
    await user.click(tableThree)
    expect(tableThree).toHaveClass('bg-primary text-white')
  })
})
