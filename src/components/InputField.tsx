import React from 'react'
import { clsx } from 'clsx'

type Variant = 'filled' | 'outlined' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

export interface InputFieldProps {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  placeholder?: string
  helperText?: string
  errorMessage?: string
  disabled?: boolean
  invalid?: boolean
  variant?: Variant
  size?: Size
  type?: React.HTMLInputTypeAttribute
  loading?: boolean
  clearable?: boolean
  passwordToggle?: boolean
  id?: string
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(function InputField(
  {
    value,
    onChange,
    label,
    placeholder,
    helperText,
    errorMessage,
    disabled,
    invalid,
    variant = 'outlined',
    size = 'md',
    type = 'text',
    loading = false,
    clearable = false,
    passwordToggle = false,
    id
  },
  ref
) {
  const [internal, setInternal] = React.useState(value ?? '')
  const isControlled = value !== undefined
  const currentValue = isControlled ? value! : internal
  const [showPassword, setShowPassword] = React.useState(false)
  const inputId = id || React.useId()
  const helpId = helperText ? `${inputId}-help` : undefined
  const errId = invalid || errorMessage ? `${inputId}-err` : undefined

  const sizeCls = {
    sm: 'h-9 text-sm px-3 rounded-lg',
    md: 'h-10 text-base px-3.5 rounded-xl',
    lg: 'h-12 text-base px-4 rounded-2xl'
  }[size]

  const variantCls = {
    outlined: 'border bg-white focus-within:border-brand',
    filled: 'bg-muted border border-transparent focus-within:border-brand',
    ghost: 'bg-transparent border border-transparent focus-within:border-brand'
  }[variant]

  const common = 'w-full outline-none placeholder:text-gray-400 bg-transparent'

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!isControlled) setInternal(e.target.value)
    onChange?.(e)
  }

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="inline-block mb-1 text-sm font-medium">
          {label}
        </label>
      )}
      <div
        className={clsx(
          'flex items-center gap-2 transition border rounded-xl',
          sizeCls,
          variantCls,
          disabled && 'opacity-60 cursor-not-allowed',
          (invalid || errorMessage) && 'border-red-500 focus-within:border-red-600',
          loading && 'animate-pulse'
        )}
        aria-disabled={disabled || undefined}
        aria-invalid={invalid || !!errorMessage || undefined}
        aria-busy={loading || undefined}
      >
        <input
          id={inputId}
          ref={ref}
          className={clsx(common, 'flex-1')}
          placeholder={placeholder}
          value={currentValue}
          type={passwordToggle ? (showPassword ? 'text' : 'password') : type}
          onChange={handleChange}
          disabled={disabled}
          aria-describedby={clsx(helpId, errId) || undefined}
        />

        {clearable && currentValue && !disabled && (
          <button
            type="button"
            onClick={() => {
              const next = ''
              if (!isControlled) setInternal(next)
              // emit synthetic event to parent if controlled
              onChange?.({ target: { value: next } } as any)
            }}
            className="text-sm px-2 py-1 rounded-md border hover:bg-muted"
            aria-label="Clear input"
          >
            Clear
          </button>
        )}

        {passwordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="text-sm px-2 py-1 rounded-md border hover:bg-muted"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        )}
      </div>

      {helperText && !errorMessage && (
        <p id={helpId} className="mt-1 text-xs text-gray-600">
          {helperText}
        </p>
      )}

      {errorMessage && (
        <p id={errId} className="mt-1 text-xs text-red-600">
          {errorMessage}
        </p>
      )}
    </div>
  )
})
