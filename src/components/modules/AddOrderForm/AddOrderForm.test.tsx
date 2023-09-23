import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddOrderForm from './index'
import { formRules } from '@/utils/form-rules'
import { renderWithProviders } from '@/utils/SetupTesting'

const setup = () => {
  renderWithProviders(<AddOrderForm data-testid="form-element" table={0} />)

  const inputElement = screen.getByTestId('input-element')
  const selectElement = screen.getByTestId('select-element')
  const submitElement = screen.getByTestId('button-element')

  const customOption = document.createElement('option')
  customOption.appendChild(document.createTextNode('Water'))
  customOption.setAttribute('value', 'Water')
  selectElement.appendChild(customOption)

  return { inputElement, selectElement, submitElement }
}

const nominalTest = '123'

describe('AddOrderForm test', () => {
  test('Should render error feedback when field empty', async () => {
    const user = userEvent.setup()
    const { inputElement, selectElement, submitElement } = setup()

    await user.click(submitElement)
    expect(screen.getAllByText(formRules.required.message)).toHaveLength(2)

    await user.type(inputElement, nominalTest)
    await user.clear(inputElement)

    await userEvent.selectOptions(selectElement, 'Water')
    expect(screen.getAllByText(formRules.required.message)).toHaveLength(1)
  })

  test('Should launch dialog when successfuly submit', async () => {
    const user = userEvent.setup()
    const { inputElement, selectElement, submitElement } = setup()

    await user.type(inputElement, nominalTest)
    await userEvent.selectOptions(selectElement, 'Water')

    await user.click(submitElement)

    expect(screen.getByText('Yakin membuat order ?')).toBeInTheDocument
    await user.click(screen.getByText('Ya, Lanjutkan'))

    await user.click(submitElement)
  })
})
