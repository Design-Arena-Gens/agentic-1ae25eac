import { ReactNode } from 'react'
import { IconType } from 'react-icons'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'danger'
  icon?: IconType
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  icon: Icon,
  disabled = false,
  type = 'button',
  className = '',
}: ButtonProps) {
  const baseStyles = 'flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variantStyles = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {Icon && <Icon className="w-5 h-5" aria-hidden="true" />}
      <span>{children}</span>
    </button>
  )
}
