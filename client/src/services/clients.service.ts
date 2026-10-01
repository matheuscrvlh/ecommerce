import type { ApiSuccess } from '../models/api.model'
import type { ClientBody } from '../models/client.model'
import { http } from './http'

export const clientsService = {
  create: (body: ClientBody) => http.post<ApiSuccess>('/client', body),
}
