import { useEffect, useState } from 'react'
import type { DashboardData } from '../models/dashboard.model'
import { dashboardService } from '../services/dashboard.service'

export function useDashboardController() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    dashboardService
      .getOverview()
      .then((overview) => active && setData(overview))
      .catch((err: Error) => active && setError(err.message))
    return () => {
      active = false
    }
  }, [])

  return { data, error, loading: !data && !error }
}
