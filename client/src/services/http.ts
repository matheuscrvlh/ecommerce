import { env } from '../config/env'
import { tokenStorage } from './tokenStorage'

export class HttpError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'HttpError'
    this.status = status
  }
}

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  /** Envia o token JWT no header Authorization */
  auth?: boolean
}

let unauthorizedHandler: (() => void) | null = null

/** Registrado pelo AuthProvider para encerrar a sessão quando a API responder 401 */
export function onUnauthorized(handler: (() => void) | null) {
  unauthorizedHandler = handler
}

export async function request<T>(path: string, { method = 'GET', body, auth = false }: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = {}
  if (body !== undefined) headers['Content-Type'] = 'application/json'

  if (auth) {
    const token = tokenStorage.get()
    if (token) headers.Authorization = `Bearer ${token}`
  }

  let response: Response
  try {
    response = await fetch(`${env.apiUrl}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new HttpError('Não foi possível conectar ao servidor.', 0)
  }

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    if (response.status === 401 && auth) unauthorizedHandler?.()
    throw new HttpError(data?.error ?? 'Erro inesperado. Tente novamente.', response.status)
  }

  return data as T
}

export const http = {
  get: <T>(path: string, auth = false) => request<T>(path, { auth }),
  post: <T>(path: string, body: unknown, auth = false) => request<T>(path, { method: 'POST', body, auth }),
}
