import { Link } from 'react-router-dom'
import { ROUTES } from '../../../config/routes'

export function NotFoundPage() {
  return (
    <main className="not-found">
      <strong>404</strong>
      <h1>Página não encontrada</h1>
      <p className="muted">O endereço acessado não existe ou foi removido.</p>
      <Link to={ROUTES.home} className="button button--primary">
        Voltar ao início
      </Link>
    </main>
  )
}
