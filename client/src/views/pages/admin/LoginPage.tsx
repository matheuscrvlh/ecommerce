import { Link, Navigate } from 'react-router-dom'
import { ROUTES } from '../../../config/routes'
import { useLoginController } from '../../../controllers/useLoginController'
import { Alert } from '../../components/Alert'
import { Icon } from '../../components/Icon'
import { Logo } from '../../components/Logo'
import { ThemeToggle } from '../../components/ThemeToggle'

export function LoginPage() {
  const { credentials, error, loading, isAuthenticated, redirectTo, handleChange, handleSubmit } = useLoginController()

  if (isAuthenticated) return <Navigate to={redirectTo} replace />

  return (
    <div className="login">
      <section className="login__visual" aria-hidden="true">
        <div className="login__orb" />
        <div className="login__visual-text">
          <span>Painel administrativo</span>
          <strong>Gerencie sua loja em um só lugar</strong>
        </div>
      </section>

      <section className="login__panel">
        <div className="login__top">
          <Logo suffix="Admin" />
          <ThemeToggle />
        </div>

        <form className="login__form" onSubmit={handleSubmit}>
          <div>
            <h1>Bem-vindo de volta</h1>
            <p className="muted">Entre com seu login e senha para acessar o painel.</p>
          </div>

          <div className="field">
            <label className="field__label" htmlFor="login">Login</label>
            <input
              id="login"
              name="login"
              className="input"
              autoComplete="username"
              value={credentials.login}
              onChange={handleChange}
              required
              autoFocus
            />
          </div>

          <div className="field">
            <label className="field__label" htmlFor="senha">Senha</label>
            <input
              id="senha"
              name="senha"
              type="password"
              className="input"
              autoComplete="current-password"
              value={credentials.senha}
              onChange={handleChange}
              required
            />
          </div>

          {error && <Alert variant="error">{error}</Alert>}

          <button type="submit" className="button button--primary button--block" disabled={loading}>
            <Icon name="lock" size={16} />
            {loading ? 'Entrando…' : 'Entrar'}
          </button>

          <Link to={ROUTES.home} className="login__back">
            ← Voltar para a loja
          </Link>
        </form>
      </section>
    </div>
  )
}
