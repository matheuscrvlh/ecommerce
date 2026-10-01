import type { FormField, FormValues } from './form.model'
import { toNumber, toOptionalText, toText } from '../utils/form'

/* ---------- Corpos de requisição (espelham server/src/types) ---------- */

export type ProductBody = {
  marca_id?: number
  nome: string
  slug: string
  descricao?: string
  descricao_curta?: string
  tipo_produto: string
  ativo?: boolean
  publicado?: boolean
}

export type ProductVariantBody = {
  produto_id: string
  sku: number
  ean?: number
  cor?: string
  tamanho?: string
  preco: number
  preco_comparativo?: number
  ativo?: boolean
}

export type BrandBody = {
  nome: string
  slug: string
  url_logo?: string
}

export type CategoryBody = {
  nome: string
  slug: string
  categoria_pai_id?: number
}

export type ProductCategoryBody = {
  produto_id: number
  categoria_id: number
}

/* ---------- Campos de formulário ---------- */

export const productFields: FormField[] = [
  { name: 'nome', label: 'Nome', type: 'text', required: true },
  { name: 'slug', label: 'Slug', type: 'text', required: true, placeholder: 'camiseta-basica' },
  { name: 'tipo_produto', label: 'Tipo de produto', type: 'text', required: true, placeholder: 'simples' },
  { name: 'marca_id', label: 'ID da marca', type: 'number' },
  { name: 'descricao_curta', label: 'Descrição curta', type: 'text', full: true },
  { name: 'descricao', label: 'Descrição', type: 'textarea', full: true },
  { name: 'ativo', label: 'Ativo', type: 'checkbox' },
  { name: 'publicado', label: 'Publicado', type: 'checkbox' },
]

export const variantFields: FormField[] = [
  { name: 'produto_id', label: 'ID do produto', type: 'number', required: true },
  { name: 'sku', label: 'SKU', type: 'number', required: true },
  { name: 'ean', label: 'EAN', type: 'number' },
  { name: 'cor', label: 'Cor', type: 'text' },
  { name: 'tamanho', label: 'Tamanho', type: 'text' },
  { name: 'preco', label: 'Preço', type: 'number', step: '0.01', required: true },
  { name: 'preco_comparativo', label: 'Preço comparativo', type: 'number', step: '0.01' },
  { name: 'ativo', label: 'Ativo', type: 'checkbox' },
]

export const brandFields: FormField[] = [
  { name: 'nome', label: 'Nome', type: 'text', required: true },
  { name: 'slug', label: 'Slug', type: 'text', required: true },
  { name: 'url_logo', label: 'URL do logo', type: 'text', full: true, placeholder: 'https://' },
]

export const categoryFields: FormField[] = [
  { name: 'nome', label: 'Nome', type: 'text', required: true },
  { name: 'slug', label: 'Slug', type: 'text', required: true },
  { name: 'categoria_pai_id', label: 'ID da categoria pai', type: 'number' },
]

export const productCategoryFields: FormField[] = [
  { name: 'produto_id', label: 'ID do produto', type: 'number', required: true },
  { name: 'categoria_id', label: 'ID da categoria', type: 'number', required: true },
]

/* ---------- Mapeadores formulário -> corpo ---------- */

export function toProductBody(values: FormValues): ProductBody {
  return {
    nome: toText(values.nome),
    slug: toText(values.slug),
    tipo_produto: toText(values.tipo_produto),
    marca_id: toNumber(values.marca_id),
    descricao: toOptionalText(values.descricao),
    descricao_curta: toOptionalText(values.descricao_curta),
    ativo: Boolean(values.ativo),
    publicado: Boolean(values.publicado),
  }
}

export function toVariantBody(values: FormValues): ProductVariantBody {
  return {
    produto_id: toText(values.produto_id),
    sku: toNumber(values.sku) as number,
    ean: toNumber(values.ean),
    cor: toOptionalText(values.cor),
    tamanho: toOptionalText(values.tamanho),
    preco: toNumber(values.preco) as number,
    preco_comparativo: toNumber(values.preco_comparativo),
    ativo: Boolean(values.ativo),
  }
}

export function toBrandBody(values: FormValues): BrandBody {
  return {
    nome: toText(values.nome),
    slug: toText(values.slug),
    url_logo: toOptionalText(values.url_logo),
  }
}

export function toCategoryBody(values: FormValues): CategoryBody {
  return {
    nome: toText(values.nome),
    slug: toText(values.slug),
    categoria_pai_id: toNumber(values.categoria_pai_id),
  }
}

export function toProductCategoryBody(values: FormValues): ProductCategoryBody {
  return {
    produto_id: toNumber(values.produto_id) as number,
    categoria_id: toNumber(values.categoria_id) as number,
  }
}
