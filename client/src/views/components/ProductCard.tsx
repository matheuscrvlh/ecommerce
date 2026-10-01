import type { StoreProduct } from '../../models/store.model'
import { formatCurrency } from '../../utils/format'
import { Icon } from './Icon'

type ProductCardProps = {
  product: StoreProduct
  onAdd: (product: StoreProduct) => void
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  const [from, to] = product.cores
  const discount = product.precoComparativo
    ? Math.round((1 - product.preco / product.precoComparativo) * 100)
    : 0

  return (
    <article className="product-card">
      <div className="product-card__image" style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}>
        <Icon name="store" size={40} />
        {discount > 0 && <span className="product-card__badge">-{discount}%</span>}
      </div>
      <div className="product-card__body">
        <span className="product-card__brand">
          {product.marca} · {product.categoria}
        </span>
        <h3 className="product-card__name">{product.nome}</h3>
        <div className="product-card__prices">
          <strong>{formatCurrency(product.preco)}</strong>
          {product.precoComparativo && <s>{formatCurrency(product.precoComparativo)}</s>}
        </div>
        <span className="product-card__installments">ou 10x de {formatCurrency(product.preco / 10)}</span>
        <button type="button" className="button button--primary button--block" onClick={() => onAdd(product)}>
          <Icon name="cart" size={16} /> Adicionar
        </button>
      </div>
    </article>
  )
}
