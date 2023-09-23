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

  const menuInputElement = screen.getByPlaceholderText('Menu')
  const priceInputElement = screen.getByPlaceholderText('Harga')
  const submitElement = screen.getByTestId('button-element')

  return { ...utils, menuInputElement, priceInputElement, submitElement }
}

const textTest = 'abc'
const nominalTest = '123'

describe('AddMenuForm test', () => {
  test('Should render error feedback when field empty', async () => {
    const user = userEvent.setup()
    const { menuInputElement, priceInputElement, submitElement } = setup()

    await user.click(submitElement)
    expect(screen.getAllByText(formRules.required.message)).toHaveLength(2)

    await user.type(menuInputElement, textTest)
    await user.clear(menuInputElement)
    await user.type(priceInputElement, nominalTest)
    await user.clear(priceInputElement)
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
    const { menuInputElement, priceInputElement, submitElement } = setup()

    await user.type(menuInputElement, textTest)
    await user.type(priceInputElement, nominalTest)

    await user.click(submitElement)

    expect(menuInputElement).not.toHaveValue(textTest)
    expect(priceInputElement).not.toHaveValue(nominalTest)
  })
})
