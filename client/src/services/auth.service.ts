import type { LoginCredentials, LoginResponse } from '../models/auth.model'
import { http } from './http'

export const authService = {
  login: (credentials: LoginCredentials) => http.post<LoginResponse>('/login', credentials),
}
