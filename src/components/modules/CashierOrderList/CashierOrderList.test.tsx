import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CashierOrderList from './index'
import { renderWithProviders } from '@/utils/SetupTesting'
HTMLCanvasElement.prototype.getContext = jest.fn()
const setup = () => {
  renderWithProviders(<CashierOrderList table={0} />)

  const resetButtonElement = screen.getByText('Kosongkan Meja')

  return { resetButtonElement }
}

describe('CashierOrderList test', () => {
  test('Should launch dialog when reset', async () => {
    const user = userEvent.setup()
    const { resetButtonElement } = setup()

    await user.click(resetButtonElement)

    expect(screen.getByText('Yakin kosongkan meja ?')).toBeInTheDocument
    await user.click(screen.getByText('Ya, Lanjutkan'))

    await user.click(resetButtonElement)
  })
})
