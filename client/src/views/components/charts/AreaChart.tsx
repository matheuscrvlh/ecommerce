import { useId } from 'react'
import type { ChartSeries } from '../../../models/dashboard.model'

type AreaChartProps = {
  labels: string[]
  series: ChartSeries[]
}

const WIDTH = 640
const HEIGHT = 280
const PAD = { top: 12, right: 20, bottom: 30, left: 40 }

/** Curva suave (bezier horizontal) ligando os pontos */
function smoothPath(points: [number, number][]) {
  return points.reduce((path, [x, y], index) => {
    if (index === 0) return `M${x},${y}`
    const [prevX, prevY] = points[index - 1]
    const midX = (prevX + x) / 2
    return `${path} C${midX},${prevY} ${midX},${y} ${x},${y}`
  }, '')
}

export function AreaChart({ labels, series }: AreaChartProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const max = Math.ceil(Math.max(...series.flatMap((s) => s.values)) / 100) * 100
  const ticks = Array.from({ length: max / 100 + 1 }, (_, i) => i * 100)

  const plotW = WIDTH - PAD.left - PAD.right
  const plotH = HEIGHT - PAD.top - PAD.bottom
  const x = (i: number) => PAD.left + (i / (labels.length - 1)) * plotW
  const y = (value: number) => PAD.top + plotH - (value / max) * plotH
  const bottom = PAD.top + plotH

  return (
    <svg className="area-chart" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label="Gráfico de vendas por mês">
      <defs>
        {series.map((_, i) => (
          <linearGradient key={i} id={`${uid}-fill-${i}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" className={`area-chart__stop area-chart__stop--${i}`} stopOpacity={i === 0 ? 0.45 : 0.85} />
            <stop offset="100%" className={`area-chart__stop area-chart__stop--${i}`} stopOpacity={0} />
          </linearGradient>
        ))}
      </defs>

      {ticks.map((tick) => (
        <g key={tick}>
          <line className="chart-grid" x1={PAD.left} x2={WIDTH - PAD.right} y1={y(tick)} y2={y(tick)} />
          <text className="chart-label" x={PAD.left - 10} y={y(tick)} textAnchor="end" dominantBaseline="middle">
            {tick}
          </text>
        </g>
      ))}

      {labels.map((label, i) => (
        <text key={label} className="chart-label" x={x(i)} y={HEIGHT - 8} textAnchor="middle">
          {label}
        </text>
      ))}

      {/* Série de trás primeiro para a de frente ficar visível */}
      {[...series].reverse().map((serie) => {
        const index = series.indexOf(serie)
        const line = smoothPath(serie.values.map((value, i) => [x(i), y(value)]))
        const area = `${line} L${x(serie.values.length - 1)},${bottom} L${x(0)},${bottom} Z`
        return (
          <g key={serie.name}>
            <path d={area} fill={`url(#${uid}-fill-${index})`} />
            <path d={line} className={`area-chart__line area-chart__line--${index}`} />
          </g>
        )
      })}
    </svg>
  )
}
