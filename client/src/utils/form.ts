import type { FormValue } from '../models/form.model'

export function toText(value: FormValue | undefined): string {
  return typeof value === 'string' ? value.trim() : ''
}

export function toOptionalText(value: FormValue | undefined): string | undefined {
  return toText(value) || undefined
}

/** Converte para número; retorna undefined quando o campo estiver vazio */
export function toNumber(value: FormValue | undefined): number | undefined {
  const text = toText(value).replace(',', '.')
  if (!text) return undefined
  const number = Number(text.replace(/[^\d.-]/g, ''))
  return Number.isNaN(number) ? undefined : number
}
