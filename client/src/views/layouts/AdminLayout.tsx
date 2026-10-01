import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { ADMIN_NAV } from '../../config/navigation'
import { ROUTES } from '../../config/routes'
import { useAuth } from '../../contexts/auth.context'
import { Icon } from '../components/Icon'
import { Logo } from '../components/Logo'
import { ThemeToggle } from '../components/ThemeToggle'

export function AdminLayout() {
  const { user, logout } = useAuth()
  const { pathname } = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const current = ADMIN_NAV.find((item) => pathname.startsWith(item.to))
  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className="admin">
      <aside className={`sidebar${sidebarOpen ? ' sidebar--open' : ''}`}>
        <div className="sidebar__brand">
          <Logo suffix="Admin" />
          <button type="button" className="icon-button sidebar__close" onClick={closeSidebar} aria-label="Fechar menu">
            <Icon name="x" />
          </button>
        </div>

        <nav className="sidebar__nav" aria-label="Menu do painel">
          {ADMIN_NAV.map((item) => (
            <NavLink key={item.to} to={item.to} className="sidebar__link" onClick={closeSidebar}>
              <span className="sidebar__icon">
                <Icon name={item.icon} size={15} />
              </span>
              {item.label}
            </NavLink>
          ))}

          <span className="sidebar__section">Loja</span>
          <Link to={ROUTES.home} className="sidebar__link">
            <span className="sidebar__icon">
              <Icon name="store" size={15} />
            </span>
            Ver loja
          </Link>
        </nav>

        <div className="sidebar__help">
          <span className="sidebar__help-icon">
            <Icon name="help" size={16} />
          </span>
          <strong>Precisa de ajuda?</strong>
          <span>Consulte a documentação da API</span>
          <Link to={ROUTES.admin.settings} className="button button--glass button--block" onClick={closeSidebar}>
            Configurações
          </Link>
        </div>
      </aside>

      {sidebarOpen && <div className="sidebar__backdrop" onClick={closeSidebar} />}

      <div className="admin__main">
        <header className="topbar">
          <div className="topbar__title">
            <button type="button" className="icon-button topbar__menu" onClick={() => setSidebarOpen(true)} aria-label="Abrir menu">
              <Icon name="menu" />
            </button>
            <div>
              <span className="topbar__breadcrumb">Painel / {current?.label ?? 'Início'}</span>
              <h1>{current?.label ?? 'Painel'}</h1>
            </div>
          </div>

          <div className="topbar__actions">
            <label className="search">
              <Icon name="search" size={15} />
              <input type="search" placeholder="Buscar…" aria-label="Buscar" />
            </label>
            <ThemeToggle />
            <span className="topbar__user">
              <Icon name="user" size={16} />
              {user?.login}
            </span>
            <button type="button" className="icon-button" onClick={logout} aria-label="Sair" title="Sair">
              <Icon name="logout" />
            </button>
          </div>
        </header>

        <main className="admin__content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
