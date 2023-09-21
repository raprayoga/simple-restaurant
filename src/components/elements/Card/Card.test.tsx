import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Card from './index'

const variants: { theme: 'primary' | 'white' | 'green'; style: string }[] = [
  { theme: 'primary', style: 'bg-primary' },
  { theme: 'primary', style: 'bg-white border border-gray' },
  { theme: 'green', style: 'border border-green shadow shadow-green' },
]

describe('Card correctly', () => {
  test.each(variants)('sould render card correctly ', ({ theme, style }) => {
    render(
      <Card className={style} theme={theme}>
        Card
      </Card>
    )

    const cardElement = screen.getByTestId('card-element')
    expect(cardElement).toHaveClass(style)
  })
})
