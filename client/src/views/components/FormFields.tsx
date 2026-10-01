import type { ChangeEvent } from 'react'
import type { FormField, FormValues } from '../../models/form.model'

type FormFieldsProps = {
  fields: FormField[]
  values: FormValues
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  idPrefix: string
}

/** Renderiza os campos definidos no model em um grid de duas colunas */
export function FormFields({ fields, values, onChange, idPrefix }: FormFieldsProps) {
  return (
    <div className="form-grid">
      {fields.map((field) => {
        const id = `${idPrefix}-${field.name}`

        if (field.type === 'checkbox') {
          return (
            <label key={field.name} className="checkbox" htmlFor={id}>
              <input id={id} type="checkbox" name={field.name} checked={Boolean(values[field.name])} onChange={onChange} />
              <span className="checkbox__box" aria-hidden="true" />
              {field.label}
            </label>
          )
        }

        const common = {
          id,
          name: field.name,
          value: String(values[field.name] ?? ''),
          onChange,
          required: field.required,
          placeholder: field.placeholder,
          className: 'input',
        }

        return (
          <div key={field.name} className={`field${field.full ? ' field--full' : ''}`}>
            <label className="field__label" htmlFor={id}>
              {field.label}
              {field.required && <span className="field__required"> *</span>}
            </label>
            {field.type === 'textarea' ? (
              <textarea {...common} rows={4} />
            ) : (
              <input {...common} type={field.type} step={field.step} />
            )}
          </div>
        )
      })}
    </div>
  )
}
