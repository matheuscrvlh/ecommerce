import { useCallback, useMemo, useState, type ReactNode } from 'react'
import type { CartItem, StoreProduct } from '../models/store.model'
import { CartContext } from './cart.context'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const add = useCallback((product: StoreProduct) => {
    setItems((current) => {
      const existing = current.find((item) => item.product.id === product.id)
      if (!existing) return [...current, { product, quantity: 1 }]
      return current.map((item) => (item === existing ? { ...item, quantity: item.quantity + 1 } : item))
    })
  }, [])

  const remove = useCallback((productId: number) => {
    setItems((current) => current.filter((item) => item.product.id !== productId))
  }, [])

  const value = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0)
    const total = items.reduce((sum, item) => sum + item.quantity * item.product.preco, 0)
    return { items, count, total, add, remove }
  }, [items, add, remove])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
