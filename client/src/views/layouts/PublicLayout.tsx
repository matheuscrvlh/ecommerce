import { Link, NavLink, Outlet } from 'react-router-dom'
import { env } from '../../config/env'
import { PUBLIC_NAV } from '../../config/navigation'
import { ROUTES } from '../../config/routes'
import { useCart } from '../../contexts/cart.context'
import { formatCurrency } from '../../utils/format'
import { Icon } from '../components/Icon'
import { Logo } from '../components/Logo'
import { ThemeToggle } from '../components/ThemeToggle'

export function PublicLayout() {
  const { count, total } = useCart()

  return (
    <div className="store">
      <div className="store__announcement">Frete grátis para compras acima de R$ 299 · Parcele em até 10x sem juros</div>

      <header className="store-header">
        <div className="container store-header__inner">
          <Link to={ROUTES.home} aria-label="Página inicial">
            <Logo />
          </Link>

          <nav className="store-header__nav" aria-label="Navegação da loja">
            {PUBLIC_NAV.map((item) => (
              <NavLink key={item.to} to={item.to} end className="store-header__link">
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="store-header__actions">
            <ThemeToggle />
            <Link to={ROUTES.register} className="icon-button" aria-label="Criar conta" title="Criar conta">
              <Icon name="user" />
            </Link>
            <span className="cart-button" title={count ? `Total: ${formatCurrency(total)}` : 'Carrinho vazio'}>
              <Icon name="cart" />
              {count > 0 && <span className="cart-button__count">{count}</span>}
            </span>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="store-footer">
        <div className="container store-footer__inner">
          <div>
            <Logo />
            <p>Sua loja online. Produtos selecionados com entrega para todo o Brasil.</p>
          </div>
          <div>
            <h4>Loja</h4>
            <Link to={ROUTES.catalog}>Produtos</Link>
            <Link to={ROUTES.register}>Criar conta</Link>
          </div>
          <div>
            <h4>Atendimento</h4>
            <span>Seg. a sex. — 9h às 18h</span>
            <span>contato@loja.com</span>
          </div>
          <div>
            <h4>Administração</h4>
            <Link to={ROUTES.admin.login}>Acessar painel</Link>
          </div>
        </div>
        <div className="container store-footer__bottom">
          © {new Date().getFullYear()} {env.appName}. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  )
}
