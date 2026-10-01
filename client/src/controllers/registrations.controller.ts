import { useState } from 'react'
import type { IconName } from '../views/components/Icon'
import {
  brandFields,
  categoryFields,
  productCategoryFields,
  productFields,
  toBrandBody,
  toCategoryBody,
  toProductBody,
  toProductCategoryBody,
  toVariantBody,
  variantFields,
} from '../models/catalog.model'
import { toUserBody, userFields } from '../models/user.model'
import { catalogService } from '../services/catalog.service'
import { usersService } from '../services/users.service'
import type { FormConfig } from './useFormController'

type FormMeta = {
  key: string
  title: string
  description: string
  icon: IconName
}

export type RegistrationForm = FormMeta & FormConfig<unknown>

/** Valida a combinação model/service com tipos e expõe uma forma comum para as views */
function defineForm<TBody>(form: FormMeta & FormConfig<TBody>): RegistrationForm {
  return form as unknown as RegistrationForm
}

/** Liga cada cadastro (model) ao endpoint correspondente (service) */
export const REGISTRATION_FORMS: RegistrationForm[] = [
  defineForm({
    key: 'produtos',
    title: 'Produtos',
    description: 'Cadastre o produto base. Preço e estoque ficam nas variantes.',
    icon: 'box',
    fields: productFields,
    toBody: toProductBody,
    submit: catalogService.createProduct,
  }),
  defineForm({
    key: 'variantes',
    title: 'Variantes',
    description: 'SKU, cor, tamanho e preço de um produto existente.',
    icon: 'layers',
    fields: variantFields,
    toBody: toVariantBody,
    submit: catalogService.createVariant,
  }),
  defineForm({
    key: 'marcas',
    title: 'Marcas',
    description: 'Marcas exibidas nos produtos da loja.',
    icon: 'tag',
    fields: brandFields,
    toBody: toBrandBody,
    submit: catalogService.createBrand,
  }),
  defineForm({
    key: 'categorias',
    title: 'Categorias',
    description: 'Organize a vitrine em categorias e subcategorias.',
    icon: 'grid',
    fields: categoryFields,
    toBody: toCategoryBody,
    submit: catalogService.createCategory,
  }),
  defineForm({
    key: 'vinculos',
    title: 'Produto × Categoria',
    description: 'Vincule um produto a uma categoria.',
    icon: 'link',
    fields: productCategoryFields,
    toBody: toProductCategoryBody,
    submit: catalogService.linkProductCategory,
  }),
]

export const USER_FORM = defineForm({
  key: 'usuario',
  title: 'Novo usuário administrador',
  description: 'Usuários com acesso ao painel administrativo.',
  icon: 'user',
  fields: userFields,
  toBody: toUserBody,
  submit: usersService.create,
})

export function useRegistrationsController() {
  const [activeKey, setActiveKey] = useState(REGISTRATION_FORMS[0].key)
  const active = REGISTRATION_FORMS.find((form) => form.key === activeKey) ?? REGISTRATION_FORMS[0]

  return { forms: REGISTRATION_FORMS, active, setActiveKey }
}
