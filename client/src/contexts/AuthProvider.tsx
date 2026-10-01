import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { AuthUser, LoginCredentials } from '../models/auth.model'
import { authService } from '../services/auth.service'
import { onUnauthorized } from '../services/http'
import { tokenStorage } from '../services/tokenStorage'
import { decodeJwt, isTokenExpired } from '../utils/jwt'
import { AuthContext } from './auth.context'

/** Lê a sessão salva e descarta tokens inválidos ou expirados */
function readSession(): AuthUser | null {
  const token = tokenStorage.get()
  if (!token) return null

  const payload = decodeJwt(token)
  if (!payload || isTokenExpired(payload)) {
    tokenStorage.clear()
    return null
  }

  return { id: payload.id, login: payload.user, expiresAt: payload.exp * 1000 }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(readSession)

  const logout = useCallback(() => {
    tokenStorage.clear()
    setUser(null)
  }, [])

  const login = useCallback(async (credentials: LoginCredentials) => {
    const { token } = await authService.login(credentials)
    tokenStorage.set(token)
    setUser(readSession())
  }, [])

  // Encerra a sessão se a API recusar o token
  useEffect(() => {
    onUnauthorized(logout)
    return () => onUnauthorized(null)
  }, [logout])

  // Encerra a sessão quando o token expirar
  useEffect(() => {
    if (!user) return
    const timeout = setTimeout(logout, user.expiresAt - Date.now())
    return () => clearTimeout(timeout)
  }, [user, logout])

  const value = useMemo(
    () => ({ user, isAuthenticated: user !== null, login, logout }),
    [user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
