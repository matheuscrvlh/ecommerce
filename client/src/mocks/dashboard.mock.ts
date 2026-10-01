import type { DashboardData } from '../models/dashboard.model'

export const dashboardMock: DashboardData = {
  stats: [
    { label: 'Vendas hoje', value: 'R$ 53.000', change: 55, icon: 'wallet' },
    { label: 'Visitantes hoje', value: '2.300', change: 5, icon: 'globe' },
    { label: 'Novos clientes', value: '+3.052', change: -14, icon: 'file' },
    { label: 'Total de vendas', value: 'R$ 173.000', change: 8, icon: 'cart' },
  ],
  conversionRate: 95,
  ticket: { pedidos: 145, ticketMedio: 1465, nota: 9.3 },
  sales: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    growth: 5,
    series: [
      { name: 'Loja online', values: [500, 250, 300, 220, 500, 250, 300, 230, 300, 350, 250, 400] },
      { name: 'Marketplace', values: [200, 230, 300, 350, 370, 420, 550, 350, 400, 500, 330, 550] },
    ],
  },
  activeUsers: {
    values: [330, 250, 110, 300, 490, 350, 270, 130, 425],
    growth: 23,
    stats: [
      { label: 'Usuários', value: '32.984', progress: 60, icon: 'users' },
      { label: 'Cliques', value: '2,42m', progress: 90, icon: 'zap' },
      { label: 'Vendas', value: 'R$ 2.400', progress: 30, icon: 'cart' },
      { label: 'Itens', value: '320', progress: 50, icon: 'tag' },
    ],
  },
  topProducts: [
    { nome: 'Tênis Runner Pro', categoria: 'Calçados', vendidos: 412, receita: 164758.8, estoque: 60 },
    { nome: 'Camiseta Essential', categoria: 'Roupas', vendidos: 980, receita: 88102, estoque: 85 },
    { nome: 'Fone Bluetooth Air', categoria: 'Eletrônicos', vendidos: 233, receita: 69876.7, estoque: 25 },
    { nome: 'Mochila Urbana', categoria: 'Acessórios', vendidos: 190, receita: 43510, estoque: 100 },
    { nome: 'Relógio Smart Fit', categoria: 'Eletrônicos', vendidos: 64, receita: 38336, estoque: 40 },
  ],
  recentOrders: [
    { titulo: 'R$ 2.400 — Pedido #1042', data: '22 SET 19:20', status: 'pago' },
    { titulo: 'Pedido #1041 enviado', data: '21 SET 23:00', status: 'enviado' },
    { titulo: 'Novo pedido #1040', data: '21 SET 21:34', status: 'pendente' },
    { titulo: 'Pagamento #1039 recusado', data: '20 SET 02:20', status: 'cancelado' },
    { titulo: 'R$ 890 — Pedido #1038', data: '18 SET 04:54', status: 'pago' },
  ],
}
