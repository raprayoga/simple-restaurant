import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Select from './index'

const variants: { theme: 'default' | 'danger'; style: string }[] = [
  { theme: 'default', style: 'border-gray focus:shadow-primary' },
  { theme: 'danger', style: 'border-red focus:shadow-red' },
]

const setup = (props: React.ComponentProps<typeof Select>) => {
  const utils = render(
    <Select {...props}>
      <option value={1}>1</option>
      <option value={2}>2</option>
      <option value={3}>3</option>
    </Select>
  )

  const selectElement = screen.getByTestId('select-element')

  return { ...utils, selectElement }
}

describe('select test', () => {
  test.each(variants)('Should render variant correctly', ({ theme, style }) => {
    const { selectElement } = setup({ theme })

    expect(selectElement).toHaveClass(style)
  })

  test('sould handle select user', () => {
    const { selectElement } = setup({})

    fireEvent.click(selectElement)
    fireEvent.click(screen.getByText(1))
    expect(selectElement).toHaveValue('1')
  })
})
