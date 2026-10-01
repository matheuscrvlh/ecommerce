import type { JwtPayload } from '../models/auth.model'

/** Decodifica o payload do JWT (sem validar assinatura — isso é papel do servidor) */
export function decodeJwt(token: string): JwtPayload | null {
  try {
    const payload = token.split('.')[1]
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')
    return JSON.parse(atob(padded)) as JwtPayload
  } catch {
    return null
  }
}

export function isTokenExpired(payload: JwtPayload | null): boolean {
  return !payload?.exp || payload.exp * 1000 <= Date.now()
}
