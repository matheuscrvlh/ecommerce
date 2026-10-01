import type { ApiSuccess } from '../models/api.model'
import type { UserBody } from '../models/user.model'
import { http } from './http'

export const usersService = {
  create: (body: UserBody) => http.post<ApiSuccess>('/user', body, true),
}
