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