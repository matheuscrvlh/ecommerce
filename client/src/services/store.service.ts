import type { StoreProduct } from '../models/store.model'
import { storeProductsMock } from '../mocks/store.mock'

/**
 * A API ainda não possui rotas GET de produtos.
 * Quando existir, troque o mock por: http.get<StoreProduct[]>('/products')
 */
export const storeService = {
  listProducts: async (): Promise<StoreProduct[]> => storeProductsMock,
}
