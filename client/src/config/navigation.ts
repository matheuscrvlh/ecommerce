import type { IconName } from '../views/components/Icon'
import { ROUTES } from './routes'

export type NavItem = {
  label: string
  to: string
  icon: IconName
}

export const ADMIN_NAV: NavItem[] = [
  { label: 'Dashboard', to: ROUTES.admin.dashboard, icon: 'home' },
  { label: 'Cadastros', to: ROUTES.admin.registrations, icon: 'box' },
  { label: 'Usuários', to: ROUTES.admin.users, icon: 'users' },
  { label: 'Configurações', to: ROUTES.admin.settings, icon: 'settings' },
]

export const PUBLIC_NAV = [
  { label: 'Início', to: ROUTES.home },
  { label: 'Produtos', to: ROUTES.catalog },
]
