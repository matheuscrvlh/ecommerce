import type { ReactNode } from 'react'
import { Icon } from './Icon'

type AlertProps = {
  variant: 'error' | 'success' | 'info'
  children: ReactNode
}

export function Alert({ variant, children }: AlertProps) {
  const icon = variant === 'success' ? 'check' : variant === 'error' ? 'x' : 'help'

  return (
    <div className={`alert alert--${variant}`} role={variant === 'error' ? 'alert' : 'status'}>
      <Icon name={icon} size={16} />
      <span>{children}</span>
    </div>
  )
}
