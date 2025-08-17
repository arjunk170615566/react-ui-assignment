import { render, screen, fireEvent } from '@testing-library/react'
import { InputField } from '../components/InputField'
import React from 'react'

describe('InputField', () => {
  it('renders label and updates value', () => {
    const onChange = vi.fn()
    render(<InputField label="Name" placeholder="Type..." onChange={onChange} />)
    expect(screen.getByText('Name')).toBeInTheDocument()
    const input = screen.getByPlaceholderText('Type...') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'Arjun' } })
    expect(onChange).toHaveBeenCalled()
  })

  it('shows error message when invalid', () => {
    render(<InputField invalid errorMessage="Required" />)
    expect(screen.getByText('Required')).toBeInTheDocument()
  })
})
