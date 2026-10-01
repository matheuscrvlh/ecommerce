import { Link } from 'react-router-dom'
import { ROUTES } from '../../../config/routes'
import { useClientRegisterController } from '../../../controllers/useClientRegisterController'
import { Alert } from '../../components/Alert'
import { FormFields } from '../../components/FormFields'

export function RegisterPage() {
  const { fields, values, status, handleChange, handleSubmit } = useClientRegisterController()

  return (
    <section className="container section register">
      <form className="card register__card" onSubmit={handleSubmit}>
        <div>
          <h1>Criar conta</h1>
          <p className="muted">Cadastre-se para acompanhar pedidos e comprar mais rápido.</p>
        </div>

        <FormFields fields={fields} values={values} onChange={handleChange} idPrefix="cliente" />

        {status.error && <Alert variant="error">{status.error}</Alert>}
        {status.success && <Alert variant="success">{status.success}</Alert>}

        <button type="submit" className="button button--primary button--block" disabled={status.loading}>
          {status.loading ? 'Cadastrando…' : 'Criar conta'}
        </button>

        <Link to={ROUTES.catalog} className="register__link">
          Continuar comprando
        </Link>
      </form>
    </section>
  )
}
