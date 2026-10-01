import type { ApiSuccess } from '../models/api.model'
import type {
  BrandBody,
  CategoryBody,
  ProductBody,
  ProductCategoryBody,
  ProductVariantBody,
} from '../models/catalog.model'
import { http } from './http'

export const catalogService = {
  createProduct: (body: ProductBody) => http.post<ApiSuccess>('/product', body, true),
  createVariant: (body: ProductVariantBody) => http.post<ApiSuccess>('/product/variant', body, true),
  createBrand: (body: BrandBody) => http.post<ApiSuccess>('/brand', body, true),
  createCategory: (body: CategoryBody) => http.post<ApiSuccess>('/category', body, true),
  linkProductCategory: (body: ProductCategoryBody) => http.post<ApiSuccess>('/product/category', body, true),
}
