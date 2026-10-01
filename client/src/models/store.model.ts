/** Produto exibido na vitrine pública */
export type StoreProduct = {
  id: number
  nome: string
  slug: string
  marca: string
  categoria: string
  preco: number
  precoComparativo?: number
  /** Cores do placeholder de imagem enquanto não houver upload */
  cores: [string, string]
}

export type CartItem = {
  product: StoreProduct
  quantity: number
}
