import { useState, type ChangeEvent, type FormEvent } from 'react'
import type { ApiSuccess } from '../models/api.model'
import { initialValues, type FormField, type FormValues } from '../models/form.model'

export type FormConfig<TBody> = {
  fields: FormField[]
  toBody: (values: FormValues) => TBody
  submit: (body: TBody) => Promise<ApiSuccess>
  /** Retorna uma mensagem de erro ou null quando válido */
  validate?: (values: FormValues) => string | null
}

type Status = { loading: boolean; error: string | null; success: string | null }

const IDLE: Status = { loading: false, error: null, success: null }

/** Controller genérico para formulários que enviam dados à API */
export function useFormController<TBody>({ fields, toBody, submit, validate }: FormConfig<TBody>) {
  const [values, setValues] = useState<FormValues>(() => initialValues(fields))
  const [status, setStatus] = useState<Status>(IDLE)

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = event.target
    const next = type === 'checkbox' ? (event.target as HTMLInputElement).checked : value
    setValues((current) => ({ ...current, [name]: next }))
  }

  function reset() {
    setValues(initialValues(fields))
    setStatus(IDLE)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const validationError = validate?.(values) ?? null
    if (validationError) {
      setStatus({ loading: false, error: validationError, success: null })
      return
    }

    setStatus({ loading: true, error: null, success: null })
    try {
      const response = await submit(toBody(values))
      setValues(initialValues(fields))
      setStatus({ loading: false, error: null, success: response.success ?? 'Cadastro realizado com sucesso.' })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro inesperado.'
      setStatus({ loading: false, error: message, success: null })
    }
  }

  return { fields, values, status, handleChange, handleSubmit, reset }
}

export type FormController = ReturnType<typeof useFormController>
