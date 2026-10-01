export type FieldType = 'text' | 'number' | 'email' | 'password' | 'tel' | 'textarea' | 'checkbox'

export type FormField = {
  name: string
  label: string
  type: FieldType
  required?: boolean
  placeholder?: string
  step?: string
  /** Ocupa a linha inteira do grid do formulário */
  full?: boolean
}

export type FormValue = string | boolean
export type FormValues = Record<string, FormValue>

export function initialValues(fields: FormField[]): FormValues {
  return Object.fromEntries(fields.map((field) => [field.name, field.type === 'checkbox' ? false : '']))
}
