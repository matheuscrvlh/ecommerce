import type { FormField, FormValues } from './form.model'
import { toNumber, toText } from '../utils/form'

export type ClientBody = {
  nome: string
  senha: string
  cpf: number
  email: string
  telefone: number
}

export const clientFields: FormField[] = [
  { name: 'nome', label: 'Nome completo', type: 'text', required: true, full: true },
  { name: 'email', label: 'E-mail', type: 'email', required: true, full: true },
  { name: 'cpf', label: 'CPF', type: 'text', required: true, placeholder: 'Somente números' },
  { name: 'telefone', label: 'Telefone', type: 'tel', required: true, placeholder: 'DDD + número' },
  { name: 'senha', label: 'Senha', type: 'password', required: true },
  { name: 'confirmarSenha', label: 'Confirmar senha', type: 'password', required: true },
]

export function validateClient(values: FormValues): string | null {
  if (values.senha !== values.confirmarSenha) return 'As senhas não conferem.'
  if (toText(values.senha).length < 6) return 'A senha deve ter pelo menos 6 caracteres.'
  return null
}

export function toClientBody(values: FormValues): ClientBody {
  return {
    nome: toText(values.nome),
    email: toText(values.email),
    senha: toText(values.senha),
    cpf: toNumber(values.cpf) as number,
    telefone: toNumber(values.telefone) as number,
  }
}
