export type LoginCredentials = {
  login: string
  senha: string
}

export type LoginResponse = {
  token: string
}

/** Payload gerado pelo servidor em auth.controllers.ts */
export type JwtPayload = {
  id: number
  user: string
  iat: number
  exp: number
}

export type AuthUser = {
  id: number
  login: string
  expiresAt: number
}
