import type { FormField, FormValues } from './form.model'
import { toNumber, toText } from '../utils/form'

export type UserBody = {
  nome: string
  login: string
  senha: string
  email: string
  telefone: number
  cpf: number
}

export const userFields: FormField[] = [
  { name: 'nome', label: 'Nome', type: 'text', required: true, placeholder: 'Nome completo' },
  { name: 'login', label: 'Login', type: 'text', required: true, placeholder: 'usuario.admin' },
  { name: 'email', label: 'E-mail', type: 'email', required: true, placeholder: 'admin@loja.com' },
  { name: 'senha', label: 'Senha', type: 'password', required: true },
  { name: 'cpf', label: 'CPF', type: 'text', required: true, placeholder: 'Somente números' },
  { name: 'telefone', label: 'Telefone', type: 'tel', required: true, placeholder: 'DDD + número' },
]

export function toUserBody(values: FormValues): UserBody {
  return {
    nome: toText(values.nome),
    login: toText(values.login),
    senha: toText(values.senha),
    email: toText(values.email),
    cpf: toNumber(values.cpf) as number,
    telefone: toNumber(values.telefone) as number,
  }
}
