import { createContext, useContext } from 'react'
import type { CartItem, StoreProduct } from '../models/store.model'

export type CartContextValue = {
  items: CartItem[]
  count: number
  total: number
  add: (product: StoreProduct) => void
  remove: (productId: number) => void
}

export const CartContext = createContext<CartContextValue | null>(null)

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart deve ser usado dentro de <CartProvider>')
  return context
}
