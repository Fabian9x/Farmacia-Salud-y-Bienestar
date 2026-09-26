import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { GENERAL_WHATSAPP_MESSAGE } from '../config/business'
import { categories } from '../data/categories'
import { products } from '../data/products'
import { openWhatsApp } from '../utils/whatsapp'
import WhatsAppIcon from '../components/WhatsAppIcon'

function normalize(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

export default function Products() {
  const [params, setParams] = useSearchParams()
  const initialCategory = params.get('categoria') || 'Todos'
  const [category, setCategory] = useState(categories.some((item) => item.name === initialCategory) ? initialCategory : 'Todos')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const needle = normalize(query.trim())
    return products.filter((product) => {
      const inCategory = category === 'Todos' || product.category === category
      const haystack = normalize([product.name, product.category, product.description, ...product.keywords].join(' '))
      return inCategory && (!needle || haystack.includes(needle))
    })
  }, [category, query])

  const selectCategory = (value) => {
    setCategory(value)
    setParams(value === 'Todos' ? {} : { categoria: value })
  }

  return (
    <div className="catalog-page">
      <section className="catalog-hero">
        <div className="container catalog-hero__inner">
          <div><h1>Nuestros productos</h1><p>Explora el catálogo de Farmacia Salud y Bienestar.</p></div>
          <span>{products.length} productos disponibles</span>
        </div>
      </section>

      <section className="container catalog-content" aria-label="Catálogo de productos">
        <div className="catalog-tools">
          <label className="search-field">
            <Search aria-hidden="true" />
            <span className="sr-only">Buscar productos</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Buscar medicamento o producto..." />
            {query && <button type="button" onClick={() => setQuery('')} aria-label="Limpiar búsqueda"><X /></button>}
          </label>
          <div className="filter-label"><SlidersHorizontal size={18} /> Filtrar por categoría</div>
          <div className="filter-chips" role="group" aria-label="Categorías de productos">
            {['Todos', ...categories.map((item) => item.name)].map((name) => (
              <button type="button" key={name} className={category === name ? 'active' : ''} aria-pressed={category === name} onClick={() => selectCategory(name)}>
                {name === 'Vitaminas y suplementos' ? 'Vitaminas' : name}
              </button>
            ))}
          </div>
        </div>

        <div className="catalog-results-heading" aria-live="polite">
          <p><strong>{filtered.length}</strong> {filtered.length === 1 ? 'producto encontrado' : 'productos encontrados'}</p>
          {category !== 'Todos' && <span>en {category}</span>}
        </div>

        {filtered.length > 0 ? (
          <div className="products-grid products-grid--catalog">
            {filtered.map((product) => <ProductCard product={product} key={product.id} />)}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state__icon"><Search /></div>
            <h2>No encontramos productos</h2>
            <p>Intenta buscar con otro nombre o consulta directamente por WhatsApp.</p>
            <div className="empty-state__actions">
              <button type="button" className="button button--secondary" onClick={() => { setQuery(''); selectCategory('Todos') }}>Limpiar búsqueda</button>
              <button type="button" className="button button--primary" onClick={() => openWhatsApp(GENERAL_WHATSAPP_MESSAGE)}><WhatsAppIcon size={18} aria-hidden="true" /> Consultar por WhatsApp</button>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
