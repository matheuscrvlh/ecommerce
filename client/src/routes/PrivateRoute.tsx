import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { ROUTES } from '../config/routes'
import { useAuth } from '../contexts/auth.context'

/** Bloqueia rotas do painel para quem não tem um JWT válido */
export function PrivateRoute() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.admin.login} replace state={{ from: location }} />
  }

  return <Outlet />
}
