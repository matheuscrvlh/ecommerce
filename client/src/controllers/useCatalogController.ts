import { useEffect, useMemo, useState } from 'react'
import type { StoreProduct } from '../models/store.model'
import { storeService } from '../services/store.service'

export const ALL_CATEGORIES = 'Todas'

export function useCatalogController() {
  const [products, setProducts] = useState<StoreProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(ALL_CATEGORIES)

  useEffect(() => {
    let active = true
    storeService
      .listProducts()
      .then((list) => active && setProducts(list))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [])

  const categories = useMemo(
    () => [ALL_CATEGORIES, ...new Set(products.map((product) => product.categoria))],
    [products],
  )

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return products.filter(
      (product) =>
        (category === ALL_CATEGORIES || product.categoria === category) &&
        (!term || `${product.nome} ${product.marca}`.toLowerCase().includes(term)),
    )
  }, [products, search, category])

  return { products, filtered, categories, category, setCategory, search, setSearch, loading }
}
