import type { IconName } from '../views/components/Icon'

export type StatCard = {
  label: string
  value: string
  change: number
  icon: IconName
}

export type ChartSeries = {
  name: string
  values: number[]
}

export type MiniStat = {
  label: string
  value: string
  progress: number
  icon: IconName
}

export type TopProduct = {
  nome: string
  categoria: string
  vendidos: number
  receita: number
  estoque: number
}

export type RecentOrder = {
  titulo: string
  data: string
  status: 'pago' | 'enviado' | 'pendente' | 'cancelado'
}

export type DashboardData = {
  stats: StatCard[]
  conversionRate: number
  ticket: { pedidos: number; ticketMedio: number; nota: number }
  sales: { labels: string[]; series: ChartSeries[]; growth: number }
  activeUsers: { values: number[]; growth: number; stats: MiniStat[] }
  topProducts: TopProduct[]
  recentOrders: RecentOrder[]
}
