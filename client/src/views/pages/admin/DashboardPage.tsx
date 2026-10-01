import { Link } from 'react-router-dom'
import { ROUTES } from '../../../config/routes'
import { useAuth } from '../../../contexts/auth.context'
import { useDashboardController } from '../../../controllers/useDashboardController'
import { formatChange, formatCurrency, formatNumber } from '../../../utils/format'
import { Alert } from '../../components/Alert'
import { AreaChart } from '../../components/charts/AreaChart'
import { BarChart } from '../../components/charts/BarChart'
import { Gauge } from '../../components/charts/Gauge'
import { Icon } from '../../components/Icon'

const ORDER_STATUS = {
  pago: { label: 'Pago', icon: 'check' },
  enviado: { label: 'Enviado', icon: 'truck' },
  pendente: { label: 'Pendente', icon: 'bell' },
  cancelado: { label: 'Cancelado', icon: 'x' },
} as const

export function DashboardPage() {
  const { user } = useAuth()
  const { data, error, loading } = useDashboardController()

  if (error) return <Alert variant="error">{error}</Alert>
  if (loading || !data) return <p className="muted">Carregando…</p>

  return (
    <div className="dashboard">
      <Alert variant="info">Dados de exemplo — conecte as rotas de métricas da API em dashboard.service.ts.</Alert>

      {/* Indicadores */}
      <section className="stats">
        {data.stats.map((stat) => (
          <article key={stat.label} className="card stat">
            <div>
              <span className="stat__label">{stat.label}</span>
              <strong className="stat__value">
                {stat.value}
                <span className={stat.change >= 0 ? 'text-success' : 'text-danger'}>{formatChange(stat.change)}</span>
              </strong>
            </div>
            <span className="icon-badge">
              <Icon name={stat.icon} />
            </span>
          </article>
        ))}
      </section>

      {/* Boas-vindas, conversão e pedidos */}
      <section className="dashboard__row dashboard__row--hero">
        <article className="card welcome">
          <div className="welcome__glow" aria-hidden="true" />
          <div className="welcome__content">
            <span className="muted">Bem-vindo de volta,</span>
            <h2>{user?.login}</h2>
            <p className="muted">
              Bom te ver novamente!
              <br />
              Confira o desempenho da loja hoje.
            </p>
          </div>
          <Link to={ROUTES.admin.registrations} className="welcome__link">
            Cadastrar produto <Icon name="arrowRight" size={14} />
          </Link>
        </article>

        <article className="card">
          <h2 className="card__title">Taxa de conversão</h2>
          <p className="card__subtitle">De todas as visitas</p>
          <Gauge value={data.conversionRate / 100}>
            <span className="gauge__icon">
              <Icon name="smile" size={22} />
            </span>
          </Gauge>
          <div className="gauge-legend">
            <span>0%</span>
            <div>
              <strong>{data.conversionRate}%</strong>
              <small>Baseado em pedidos</small>
            </div>
            <span>100%</span>
          </div>
        </article>

        <article className="card">
          <h2 className="card__title">Acompanhamento de pedidos</h2>
          <div className="tracking">
            <div className="tracking__list">
              <div className="inset">
                <span className="muted">Pedidos</span>
                <strong>{formatNumber(data.ticket.pedidos)} pedidos</strong>
              </div>
              <div className="inset">
                <span className="muted">Ticket médio</span>
                <strong>{formatCurrency(data.ticket.ticketMedio)}</strong>
              </div>
            </div>
            <Gauge value={data.ticket.nota / 10} variant="success">
              <span className="muted">Avaliação</span>
              <strong className="gauge__score">{data.ticket.nota}</strong>
              <span className="muted">Nota geral</span>
            </Gauge>
          </div>
        </article>
      </section>

      {/* Gráficos */}
      <section className="dashboard__row dashboard__row--charts">
        <article className="card">
          <h2 className="card__title">Visão geral de vendas</h2>
          <p className="card__subtitle">
            <span className="text-success">(+{data.sales.growth}%) a mais</span> em {new Date().getFullYear()}
          </p>
          <div className="chart-legend">
            {data.sales.series.map((serie, i) => (
              <span key={serie.name}>
                <i className={`chart-legend__dot chart-legend__dot--${i}`} /> {serie.name}
              </span>
            ))}
          </div>
          <AreaChart labels={data.sales.labels} series={data.sales.series} />
        </article>

        <article className="card">
          <BarChart values={data.activeUsers.values} />
          <h2 className="card__title">Usuários ativos</h2>
          <p className="card__subtitle">
            <span className="text-success">(+{data.activeUsers.growth})</span> em relação à semana passada
          </p>
          <div className="mini-stats">
            {data.activeUsers.stats.map((stat) => (
              <div key={stat.label} className="mini-stat">
                <span className="mini-stat__label">
                  <span className="icon-badge icon-badge--sm">
                    <Icon name={stat.icon} size={12} />
                  </span>
                  {stat.label}
                </span>
                <strong>{stat.value}</strong>
                <span className="progress">
                  <span style={{ width: `${stat.progress}%` }} />
                </span>
              </div>
            ))}
          </div>
        </article>
      </section>

      {/* Tabela e linha do tempo */}
      <section className="dashboard__row dashboard__row--charts">
        <article className="card">
          <h2 className="card__title">Produtos mais vendidos</h2>
          <p className="card__subtitle">
            <span className="text-success">
              <Icon name="check" size={12} />
            </span>{' '}
            {data.topProducts.length} produtos em destaque este mês
          </p>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Vendidos</th>
                  <th>Receita</th>
                  <th>Estoque</th>
                </tr>
              </thead>
              <tbody>
                {data.topProducts.map((product) => (
                  <tr key={product.nome}>
                    <td>
                      <strong>{product.nome}</strong>
                      <small className="muted">{product.categoria}</small>
                    </td>
                    <td>{formatNumber(product.vendidos)}</td>
                    <td>{formatCurrency(product.receita)}</td>
                    <td>
                      <span className="table__progress">
                        {product.estoque}%
                        <span className="progress">
                          <span style={{ width: `${product.estoque}%` }} />
                        </span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="card">
          <h2 className="card__title">Pedidos recentes</h2>
          <p className="card__subtitle">
            <span className="text-success">+30%</span> este mês
          </p>
          <ol className="timeline">
            {data.recentOrders.map((order) => (
              <li key={order.titulo} className={`timeline__item timeline__item--${order.status}`}>
                <span className="timeline__icon">
                  <Icon name={ORDER_STATUS[order.status].icon} size={12} />
                </span>
                <div>
                  <strong>{order.titulo}</strong>
                  <small className="muted">
                    {order.data} · {ORDER_STATUS[order.status].label}
                  </small>
                </div>
              </li>
            ))}
          </ol>
        </article>
      </section>
    </div>
  )
}
