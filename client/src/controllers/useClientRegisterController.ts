import { clientFields, toClientBody, validateClient } from '../models/client.model'
import { clientsService } from '../services/clients.service'
import { useFormController } from './useFormController'

export function useClientRegisterController() {
  return useFormController({
    fields: clientFields,
    toBody: toClientBody,
    submit: clientsService.create,
    validate: validateClient,
  })
}
