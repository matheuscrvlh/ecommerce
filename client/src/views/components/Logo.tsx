import { env } from '../../config/env'
import { Icon } from './Icon'

export function Logo({ suffix }: { suffix?: string }) {
  return (
    <span className="logo">
      <span className="logo__mark">
        <Icon name="store" size={16} />
      </span>
      <span className="logo__text">
        {env.appName}
        {suffix && <span className="logo__suffix"> {suffix}</span>}
      </span>
    </span>
  )
}
