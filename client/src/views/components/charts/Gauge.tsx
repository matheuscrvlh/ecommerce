import { useId, type ReactNode } from 'react'

type GaugeProps = {
  /** Valor entre 0 e 1 */
  value: number
  variant?: 'primary' | 'success'
  children?: ReactNode
}

const SIZE = 160
const CENTER = SIZE / 2
const RADIUS = 66
const START = -120
const SWEEP = 240

function point(angle: number) {
  const rad = (angle * Math.PI) / 180
  return `${CENTER + RADIUS * Math.sin(rad)},${CENTER - RADIUS * Math.cos(rad)}`
}

function arc(from: number, to: number) {
  const large = to - from > 180 ? 1 : 0
  return `M${point(from)} A${RADIUS},${RADIUS} 0 ${large} 1 ${point(to)}`
}

/** Arco de progresso no estilo do medidor de satisfação do Vision UI */
export function Gauge({ value, variant = 'primary', children }: GaugeProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const end = START + SWEEP * Math.min(Math.max(value, 0), 1)

  return (
    <div className={`gauge gauge--${variant}`}>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true">
        <defs>
          <linearGradient id={`${uid}-gauge`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" className="gauge__stop-start" />
            <stop offset="100%" className="gauge__stop-end" />
          </linearGradient>
        </defs>
        <path d={arc(START, START + SWEEP)} className="gauge__track" />
        <path d={arc(START, end)} className="gauge__value" stroke={`url(#${uid}-gauge)`} />
      </svg>
      <div className="gauge__content">{children}</div>
    </div>
  )
}
