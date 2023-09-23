import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddMenuForm from './index'
import { formRules } from '@/utils/form-rules'
import { Provider } from 'react-redux'
import store from '@/store/store'

const setup = () => {
  const utils = render(
    <Provider store={store}>
      <AddMenuForm data-testid="form-element" />
    </Provider>
  )

  return { ...utils }
}

const textTest = 'abc'
const nominalTest = '123'

describe('AddMenuForm test', () => {
  test('Should render error feedback when field empty', async () => {
    const user = userEvent.setup()
    setup()

    await user.click(screen.getByTestId('button-element'))
    expect(screen.getAllByText(formRules.required.message)).toHaveLength(2)

    const menuInput = screen.getByPlaceholderText('Menu')
    const priceInput = screen.getByPlaceholderText('Harga')
    await user.type(menuInput, textTest)
    await user.clear(menuInput)
    await user.type(priceInput, nominalTest)
    await user.clear(priceInput)
    expect(screen.getAllByText(formRules.required.message)).toHaveLength(2)
  })

  test('Should render error feedback when input price 0', async () => {
    const user = userEvent.setup()
    setup()

    await user.type(screen.getByPlaceholderText('Harga'), '0')
    expect(
      screen.getByText(formRules.minNominal(1).message)
    ).toBeInTheDocument()
  })

  test('Should reset when successfuly submit', async () => {
    const user = userEvent.setup()
    setup()

    const menuInput = screen.getByPlaceholderText('Menu')
    const priceInput = screen.getByPlaceholderText('Harga')
    await user.type(menuInput, textTest)
    await user.type(priceInput, nominalTest)

    await user.click(screen.getByTestId('button-element'))

    expect(menuInput).not.toHaveValue(textTest)
    expect(priceInput).not.toHaveValue(nominalTest)
  })
})
