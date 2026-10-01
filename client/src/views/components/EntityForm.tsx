import type { RegistrationForm } from '../../controllers/registrations.controller'
import { useFormController } from '../../controllers/useFormController'
import { Alert } from './Alert'
import { FormFields } from './FormFields'
import { Icon } from './Icon'

/** Card de cadastro genérico: recebe a definição e cuida de envio e feedback */
export function EntityForm({ form }: { form: RegistrationForm }) {
  const { fields, values, status, handleChange, handleSubmit, reset } = useFormController(form)

  return (
    <form className="card" onSubmit={handleSubmit}>
      <header className="card__header">
        <span className="icon-badge">
          <Icon name={form.icon} />
        </span>
        <div>
          <h2 className="card__title">{form.title}</h2>
          <p className="card__subtitle">{form.description}</p>
        </div>
      </header>

      <FormFields fields={fields} values={values} onChange={handleChange} idPrefix={form.key} />

      {status.error && <Alert variant="error">{status.error}</Alert>}
      {status.success && <Alert variant="success">{status.success}</Alert>}

      <footer className="form-actions">
        <button type="button" className="button button--ghost" onClick={reset} disabled={status.loading}>
          Limpar
        </button>
        <button type="submit" className="button button--primary" disabled={status.loading}>
          {status.loading ? 'Salvando…' : 'Salvar'}
        </button>
      </footer>
    </form>
  )
}
