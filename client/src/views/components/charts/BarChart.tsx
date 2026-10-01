type BarChartProps = {
  values: number[]
}

export function BarChart({ values }: BarChartProps) {
  const max = Math.ceil(Math.max(...values) / 100) * 100
  const ticks = Array.from({ length: max / 100 + 1 }, (_, i) => max - i * 100)

  return (
    <div className="bar-chart" role="img" aria-label="Usuários ativos por dia">
      <div className="bar-chart__axis">
        {ticks.map((tick) => (
          <span key={tick}>{tick}</span>
        ))}
      </div>
      <div className="bar-chart__bars">
        {values.map((value, i) => (
          <span key={i} className="bar-chart__bar" style={{ height: `${(value / max) * 100}%` }} title={String(value)} />
        ))}
      </div>
    </div>
  )
}
