import type { DashboardData } from '../models/dashboard.model'
import { dashboardMock } from '../mocks/dashboard.mock'

/**
 * A API ainda não possui rotas de métricas.
 * Quando existir, troque o mock por: http.get<DashboardData>('/dashboard', true)
 */
export const dashboardService = {
  getOverview: async (): Promise<DashboardData> => dashboardMock,
}
