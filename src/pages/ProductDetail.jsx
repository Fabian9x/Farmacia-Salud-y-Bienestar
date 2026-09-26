import { ArrowLeft, Check, ShieldCheck, ShoppingBag } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import QuantityControl from '../components/QuantityControl'
import Seo from '../components/Seo'
import { GENERAL_WHATSAPP_MESSAGE } from '../config/business'
import { absoluteAsset, absoluteUrl } from '../config/site'
import { useCart } from '../hooks/useCart'
import { products } from '../data/products'
import { productPath, slugify } from '../utils/productPath'
import { openWhatsApp } from '../utils/whatsapp'
import WhatsAppIcon from '../components/WhatsAppIcon'

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find((item) => slugify(item.name) === id || item.id === Number(id))
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  useEffect(() => {
    setQuantity(1)
  }, [id])

  const related = useMemo(() => {
    if (!product) return []
    const sameCategory = products.filter((item) => item.id !== product.id && item.category === product.category)
    const fallback = products.filter((item) => item.id !== product.id && item.category !== product.category)
    return [...sameCategory, ...fallback].slice(0, 4)
  }, [product])

  const seo = useMemo(() => {
    if (!product) return null
    const path = productPath(product)
    const url = absoluteUrl(path)
    const image = absoluteAsset(`/images/products/${product.image}`)
    const description = `${product.name}, ${product.presentation}. Precio: ${money.format(product.price)}. Consulta disponibilidad y pide por WhatsApp.`

    return {
      path,
      image,
      description,
      structuredData: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Product',
            '@id': `${url}#product`,
            name: product.name,
            image: [image],
            description: product.description,
            sku: `FSB-${String(product.id).padStart(3, '0')}`,
            category: product.category,
            url,
            brand: { '@type': 'Brand', name: product.name.split(' ')[0] },
            offers: {
              '@type': 'Offer',
              url,
              priceCurrency: 'USD',
              price: product.price.toFixed(2),
              availability: product.available ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
              itemCondition: 'https://schema.org/NewCondition',
              seller: { '@type': 'Organization', name: 'Farmacia Salud y Bienestar' },
            },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Inicio', item: absoluteUrl('/') },
              { '@type': 'ListItem', position: 2, name: 'Productos', item: absoluteUrl('/productos') },
              { '@type': 'ListItem', position: 3, name: product.name, item: url },
            ],
          },
        ],
      },
    }
  }, [product])

  if (!product) return <Navigate to="/productos" replace />

  return (
    <div className="product-page">
      <Seo
        title={`${product.name} ${product.presentation} | Farmacia Salud y Bienestar`}
        description={seo.description}
        path={seo.path}
        image={seo.image}
        type="product"
        structuredData={seo.structuredData}
      />
      <div className="container product-breadcrumbs" aria-label="Migas de pan">
        <Link to="/productos"><ArrowLeft /> Volver al catálogo</Link>
        <span aria-hidden="true">/</span><span>{product.category}</span>
      </div>

      <section className="container product-detail" aria-labelledby="product-title">
        <div className="product-detail__visual">
          <span className="product-detail__category">{product.category}</span>
          <img src={`${import.meta.env.BASE_URL}images/products/${product.image}`} alt={`${product.name}, ${product.presentation}`} width="640" height="520" />
        </div>
        <div className="product-detail__info">
          <p className={`stock-state ${product.available ? 'available' : 'on-request'}`}><span />{product.available ? 'Disponible' : 'Consultar disponibilidad'}</p>
          <h1 id="product-title">{product.name}</h1>
          <p className="product-detail__presentation">{product.presentation}</p>
          <strong className="product-detail__price">{money.format(product.price)}</strong>
          <div className="product-detail__pulse" aria-hidden="true"><span /></div>
          <p className="product-detail__description">{product.description} La información mostrada es referencial; consulta disponibilidad antes de solicitarlo.</p>

          {product.available ? (
            <div className="product-purchase">
              <label>Cantidad</label>
              <div className="product-purchase__controls">
                <QuantityControl value={quantity} onChange={setQuantity} />
                <button className="button button--primary add-to-cart" type="button" onClick={() => addItem(product, quantity)}><ShoppingBag /> Agregar al carrito</button>
              </div>
            </div>
          ) : (
            <button className="button button--whatsapp product-consult" type="button" onClick={() => openWhatsApp(`Hola, quisiera consultar la disponibilidad de ${product.name}.`)}><WhatsAppIcon aria-hidden="true" /> Consultar por WhatsApp</button>
          )}

          <ul className="product-assurances">
            <li><Check /> Atención personalizada</li>
            <li><ShieldCheck /> Consulta segura por WhatsApp</li>
          </ul>
        </div>
      </section>

      <section className="container related-products">
        <div className="section-heading-row"><div className="section-title"><h2>También te puede interesar</h2><p>Más opciones disponibles en nuestro catálogo.</p></div><Link className="text-link" to="/productos">Ver todos los productos</Link></div>
        <div className="products-grid">{related.map((item) => <ProductCard product={item} key={item.id} />)}</div>
      </section>

      <section className="product-help">
        <div className="container"><div><h2>¿Necesitas orientación?</h2><p>Consulta directamente con la farmacia antes de realizar tu pedido.</p></div><button className="button button--light" type="button" onClick={() => openWhatsApp(GENERAL_WHATSAPP_MESSAGE)}><WhatsAppIcon aria-hidden="true" /> Escribir por WhatsApp</button></div>
      </section>
    </div>
  )
}
