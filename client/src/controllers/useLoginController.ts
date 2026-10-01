import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '../config/routes'
import { useAuth } from '../contexts/auth.context'
import type { LoginCredentials } from '../models/auth.model'

export function useLoginController() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [credentials, setCredentials] = useState<LoginCredentials>({ login: '', senha: '' })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const redirectTo: string = location.state?.from?.pathname ?? ROUTES.admin.dashboard

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setCredentials((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await login({ login: credentials.login.trim(), senha: credentials.senha })
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível entrar.')
    } finally {
      setLoading(false)
    }
  }

  return { credentials, error, loading, isAuthenticated, redirectTo, handleChange, handleSubmit }
}
