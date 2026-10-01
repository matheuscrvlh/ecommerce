import { env } from '../../../config/env'
import { useAuth } from '../../../contexts/auth.context'
import { useTheme, type Theme } from '../../../contexts/theme.context'
import { Icon, type IconName } from '../../components/Icon'

const THEMES: { value: Theme; label: string; description: string; icon: IconName }[] = [
  { value: 'dark', label: 'Escuro', description: 'Padrão do painel', icon: 'moon' },
  { value: 'light', label: 'Claro', description: 'Ideal para ambientes iluminados', icon: 'sun' },
]

export function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { logout } = useAuth()

  return (
    <div className="page page--grid">
      <article className="card">
        <header className="card__header">
          <span className="icon-badge">
            <Icon name="sun" />
          </span>
          <div>
            <h2 className="card__title">Aparência</h2>
            <p className="card__subtitle">Tema aplicado ao painel e à loja</p>
          </div>
        </header>

        <div className="theme-options" role="radiogroup" aria-label="Tema">
          {THEMES.map((option) => (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={theme === option.value}
              className={`theme-option theme-option--${option.value}${theme === option.value ? ' theme-option--active' : ''}`}
              onClick={() => setTheme(option.value)}
            >
              <span className="theme-option__preview" aria-hidden="true">
                <span />
                <span />
              </span>
              <span className="theme-option__label">
                <Icon name={option.icon} size={14} /> {option.label}
              </span>
              <small className="muted">{option.description}</small>
            </button>
          ))}
        </div>
      </article>

      <article className="card">
        <header className="card__header">
          <span className="icon-badge">
            <Icon name="server" />
          </span>
          <div>
            <h2 className="card__title">API</h2>
            <p className="card__subtitle">Definido nas variáveis de ambiente (.env)</p>
          </div>
        </header>
        <dl className="details">
          <div>
            <dt>VITE_API_URL</dt>
            <dd><code>{env.apiUrl}</code></dd>
          </div>
          <div>
            <dt>VITE_APP_NAME</dt>
            <dd><code>{env.appName}</code></dd>
          </div>
        </dl>
      </article>

      <article className="card">
        <header className="card__header">
          <span className="icon-badge">
            <Icon name="shield" />
          </span>
          <div>
            <h2 className="card__title">Segurança</h2>
            <p className="card__subtitle">O token JWT expira em 8 horas</p>
          </div>
        </header>
        <button type="button" className="button button--danger" onClick={logout}>
          <Icon name="logout" size={16} /> Encerrar sessão
        </button>
      </article>
    </div>
  )
}
