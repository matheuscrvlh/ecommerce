import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { ROUTES } from '../config/routes'
import { AdminLayout } from '../views/layouts/AdminLayout'
import { PublicLayout } from '../views/layouts/PublicLayout'
import { DashboardPage } from '../views/pages/admin/DashboardPage'
import { LoginPage } from '../views/pages/admin/LoginPage'
import { RegistrationsPage } from '../views/pages/admin/RegistrationsPage'
import { SettingsPage } from '../views/pages/admin/SettingsPage'
import { UsersPage } from '../views/pages/admin/UsersPage'
import { CatalogPage } from '../views/pages/public/CatalogPage'
import { HomePage } from '../views/pages/public/HomePage'
import { NotFoundPage } from '../views/pages/public/NotFoundPage'
import { RegisterPage } from '../views/pages/public/RegisterPage'
import { PrivateRoute } from './PrivateRoute'

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: ROUTES.home, element: <HomePage /> },
      { path: ROUTES.catalog, element: <CatalogPage /> },
      { path: ROUTES.register, element: <RegisterPage /> },
    ],
  },
  { path: ROUTES.admin.login, element: <LoginPage /> },
  {
    path: ROUTES.admin.root,
    element: <PrivateRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to={ROUTES.admin.dashboard} replace /> },
          { path: ROUTES.admin.dashboard, element: <DashboardPage /> },
          { path: ROUTES.admin.registrations, element: <RegistrationsPage /> },
          { path: ROUTES.admin.users, element: <UsersPage /> },
          { path: ROUTES.admin.settings, element: <SettingsPage /> },
        ],
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
