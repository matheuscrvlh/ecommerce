import { useRegistrationsController } from '../../../controllers/registrations.controller'
import { EntityForm } from '../../components/EntityForm'
import { Icon } from '../../components/Icon'

export function RegistrationsPage() {
  const { forms, active, setActiveKey } = useRegistrationsController()

  return (
    <div className="page">
      <div className="tabs" role="tablist" aria-label="Tipos de cadastro">
        {forms.map((form) => (
          <button
            key={form.key}
            type="button"
            role="tab"
            aria-selected={form.key === active.key}
            className={`tabs__tab${form.key === active.key ? ' tabs__tab--active' : ''}`}
            onClick={() => setActiveKey(form.key)}
          >
            <Icon name={form.icon} size={15} />
            {form.title}
          </button>
        ))}
      </div>

      {/* key força um formulário novo (estado limpo) ao trocar de aba */}
      <EntityForm key={active.key} form={active} />
    </div>
  )
}
