import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import OrdersTable from './index'
import { renderWithProviders } from '@/utils/SetupTesting'

describe('OrdersTable test', () => {
  test('Should launch dialog when reset', async () => {
    renderWithProviders(<OrdersTable />)

    expect(screen.getAllByTestId('table-element')).toHaveLength(6)
  })
})
