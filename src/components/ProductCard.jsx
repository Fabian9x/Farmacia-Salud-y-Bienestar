import { Eye, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { openWhatsApp, productMessage } from '../utils/whatsapp'
import WhatsAppIcon from './WhatsAppIcon'

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const imageUrl = `${import.meta.env.BASE_URL}images/products/${product.image}`
  return (
    <article className="product-card">
      <Link className="product-card__image-wrap" to={`/producto/${product.id}`} aria-label={`Ver ${product.name}`}>
        <img src={imageUrl} alt={`${product.name}, ${product.presentation}`} loading="lazy" width="320" height="230" />
        <span className="product-card__category">{product.category}</span>
      </Link>
      <div className="product-card__content">
        <h3><Link to={`/producto/${product.id}`}>{product.name}</Link></h3>
        <p className="product-card__presentation">{product.presentation}</p>
        <div className="product-card__meta">
          <strong>{money.format(product.price)}</strong>
          <span className={product.available ? 'available' : 'on-request'}>{product.available ? 'Disponible' : 'Consultar disponibilidad'}</span>
        </div>
        <div className="product-card__actions">
          <Link className="button button--secondary product-view" to={`/producto/${product.id}`} aria-label={`Ver detalles de ${product.name}`}><Eye size={18} /> Ver</Link>
          {product.available ? (
            <button className="button button--primary product-add" type="button" onClick={() => addItem(product)}><ShoppingBag size={18} /> Agregar</button>
          ) : (
            <button className="button button--outline product-add" type="button" onClick={() => openWhatsApp(productMessage(product.name))}><WhatsAppIcon size={18} aria-hidden="true" /> Consultar</button>
          )}
        </div>
      </div>
    </article>
  )
}
