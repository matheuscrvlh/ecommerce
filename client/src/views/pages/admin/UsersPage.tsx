import { USER_FORM } from '../../../controllers/registrations.controller'
import { useAuth } from '../../../contexts/auth.context'
import { formatDateTime } from '../../../utils/format'
import { Alert } from '../../components/Alert'
import { EntityForm } from '../../components/EntityForm'
import { Icon } from '../../components/Icon'

export function UsersPage() {
  const { user } = useAuth()

  return (
    <div className="page page--split">
      <EntityForm form={USER_FORM} />

      <aside className="page__aside">
        <article className="card">
          <header className="card__header">
            <span className="icon-badge">
              <Icon name="user" />
            </span>
            <div>
              <h2 className="card__title">Sessão atual</h2>
              <p className="card__subtitle">Usuário autenticado via JWT</p>
            </div>
          </header>
          <dl className="details">
            <div>
              <dt>Login</dt>
              <dd>{user?.login}</dd>
            </div>
            <div>
              <dt>ID</dt>
              <dd>#{user?.id}</dd>
            </div>
            <div>
              <dt>Sessão expira em</dt>
              <dd>{user ? formatDateTime(user.expiresAt) : '—'}</dd>
            </div>
          </dl>
        </article>

        <Alert variant="info">A listagem de usuários aparece aqui quando a API tiver a rota GET /users.</Alert>
      </aside>
    </div>
  )
}
