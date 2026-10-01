import { useCart } from '../../../contexts/cart.context'
import { useCatalogController } from '../../../controllers/useCatalogController'
import { Icon } from '../../components/Icon'
import { ProductCard } from '../../components/ProductCard'

export function CatalogPage() {
  const { filtered, categories, category, setCategory, search, setSearch, loading } = useCatalogController()
  const { add } = useCart()

  return (
    <section className="container section">
      <header className="section__header section__header--stack">
        <div>
          <h1>Produtos</h1>
          <p className="muted">{filtered.length} produto(s) encontrado(s)</p>
        </div>
        <label className="search search--wide">
          <Icon name="search" size={15} />
          <input
            type="search"
            placeholder="Buscar por nome ou marca…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Buscar produtos"
          />
        </label>
      </header>

      <div className="category-list" role="group" aria-label="Filtrar por categoria">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            className={`category-pill${item === category ? ' category-pill--active' : ''}`}
            aria-pressed={item === category}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="muted">Carregando produtos…</p>
      ) : filtered.length === 0 ? (
        <p className="empty">Nenhum produto encontrado para essa busca.</p>
      ) : (
        <div className="product-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={add} />
          ))}
        </div>
      )}
    </section>
  )
}
