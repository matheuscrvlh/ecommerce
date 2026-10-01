import { Link } from 'react-router-dom'
import { ROUTES } from '../../../config/routes'
import { useCart } from '../../../contexts/cart.context'
import { useCatalogController } from '../../../controllers/useCatalogController'
import { Icon, type IconName } from '../../components/Icon'
import { ProductCard } from '../../components/ProductCard'

const BENEFITS: { icon: IconName; title: string; text: string }[] = [
  { icon: 'truck', title: 'Frete grátis', text: 'Acima de R$ 299' },
  { icon: 'wallet', title: '10x sem juros', text: 'No cartão de crédito' },
  { icon: 'refresh', title: 'Troca fácil', text: 'Até 30 dias' },
  { icon: 'shield', title: 'Compra segura', text: 'Dados protegidos' },
]

export function HomePage() {
  const { products, categories } = useCatalogController()
  const { add } = useCart()

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__text">
            <span className="hero__eyebrow">Nova coleção</span>
            <h1>Estilo e tecnologia para o seu dia a dia</h1>
            <p>Descubra produtos selecionados com preços especiais e entrega rápida para todo o Brasil.</p>
            <div className="hero__actions">
              <Link to={ROUTES.catalog} className="button button--primary">
                Ver produtos <Icon name="arrowRight" size={16} />
              </Link>
              <Link to={ROUTES.register} className="button button--glass">
                Criar conta
              </Link>
            </div>
          </div>
          <div className="hero__art" aria-hidden="true">
            <div className="hero__orb" />
            <div className="hero__card">
              <Icon name="store" size={28} />
              <strong>Até 30% OFF</strong>
              <span>em produtos selecionados</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container benefits">
        {BENEFITS.map((benefit) => (
          <div key={benefit.title} className="benefit">
            <span className="icon-badge">
              <Icon name={benefit.icon} />
            </span>
            <div>
              <strong>{benefit.title}</strong>
              <span>{benefit.text}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="container section">
        <header className="section__header">
          <h2>Categorias</h2>
        </header>
        <div className="category-list">
          {categories.slice(1).map((category) => (
            <Link key={category} to={ROUTES.catalog} className="category-pill">
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="container section">
        <header className="section__header">
          <h2>Destaques</h2>
          <Link to={ROUTES.catalog} className="section__link">
            Ver todos <Icon name="arrowRight" size={14} />
          </Link>
        </header>
        <div className="product-grid">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} onAdd={add} />
          ))}
        </div>
      </section>
    </>
  )
}
