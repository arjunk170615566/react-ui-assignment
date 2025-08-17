import type { Meta, StoryObj } from '@storybook/react'
import { InputField } from '../components/InputField'
import React from 'react'

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  tags: ['autodocs'],
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    helperText: 'Helper text'
  }
}

export default meta
type Story = StoryObj<typeof InputField>

export const Outlined: Story = {
  args: { variant: 'outlined' }
}

export const Filled: Story = {
  args: { variant: 'filled' }
}

export const Ghost: Story = {
  args: { variant: 'ghost' }
}

export const Invalid: Story = {
  args: { invalid: true, errorMessage: 'This field is required' }
}

export const Loading: Story = {
  args: { loading: true }
}

export const WithPasswordToggle: Story = {
  args: { type: 'password', passwordToggle: true }
}

export const WithClear: Story = {
  args: { clearable: true, value: 'Hello' }
}

