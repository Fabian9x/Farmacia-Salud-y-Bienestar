import { ArrowRight, PackageCheck, Tags, UserRoundCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import CategoryCard from '../components/CategoryCard'
import Hero from '../components/Hero'
import ProductCard from '../components/ProductCard'
import SectionTitle from '../components/SectionTitle'
import Seo from '../components/Seo'
import WhatsAppIcon from '../components/WhatsAppIcon'
import { BUSINESS, GENERAL_WHATSAPP_MESSAGE } from '../config/business'
import { absoluteAsset, absoluteUrl } from '../config/site'
import { categories } from '../data/categories'
import { products } from '../data/products'
import { openWhatsApp } from '../utils/whatsapp'

const benefits = [
  { icon: UserRoundCheck, title: 'Atención cercana', text: 'Te ayudamos a elegir.' },
  { icon: Tags, title: 'Precios visibles', text: 'Compra con claridad.' },
  { icon: PackageCheck, title: 'Pedido fácil', text: 'Termina por WhatsApp.' },
]

const homeStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Pharmacy',
      '@id': `${absoluteUrl('/')}#pharmacy`,
      name: BUSINESS.name,
      url: absoluteUrl('/'),
      logo: absoluteAsset('/logo.png'),
      image: absoluteAsset('/images/farmacia-local.jpg'),
      telephone: BUSINESS.whatsappDisplay,
      address: {
        '@type': 'PostalAddress',
        streetAddress: BUSINESS.address,
        addressCountry: 'EC',
      },
      openingHours: 'Mo-Su 08:00-22:00',
      sameAs: [BUSINESS.social.facebook, BUSINESS.social.tiktok],
      priceRange: '$',
      currenciesAccepted: 'USD',
    },
    {
      '@type': 'WebSite',
      '@id': `${absoluteUrl('/')}#website`,
      url: absoluteUrl('/'),
      name: BUSINESS.name,
      inLanguage: 'es-EC',
      publisher: { '@id': `${absoluteUrl('/')}#pharmacy` },
    },
  ],
}

export default function Home() {
  const featured = products.filter((product) => product.featured).slice(0, 8)

  return (
    <>
      <Seo
        title="Farmacia Salud y Bienestar | Productos y pedidos por WhatsApp"
        description="Compra medicamentos y productos para tu bienestar. Revisa precios, agrega al carrito y finaliza tu pedido por WhatsApp."
        image={absoluteAsset('/images/farmacia-local.jpg')}
        structuredData={homeStructuredData}
      />
      <Hero />

      <section className="benefits" aria-label="Beneficios">
        <div className="container benefits-row">
          {benefits.map(({ icon: Icon, title, text }) => (
            <article className="benefit" key={title}>
              <Icon aria-hidden="true" />
              <div><h2>{title}</h2><p>{text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section categories-section" id="categorias">
        <div className="container">
          <SectionTitle title="Compra por categoría" subtitle="Encuentra tus productos más rápido." />
          <div className="categories-grid">
            {categories.map((category, index) => <CategoryCard category={category} index={index} key={category.name} />)}
          </div>
        </div>
      </section>

      <section className="section products-section" id="productos-destacados">
        <div className="container">
          <div className="section-heading-row">
            <SectionTitle title="Productos destacados" subtitle="Agrégalos al carrito y consulta disponibilidad." />
            <Link className="text-link" to="/productos">Ver catálogo completo <ArrowRight size={18} /></Link>
          </div>
          <div className="products-grid">
            {featured.map((product) => <ProductCard product={product} key={product.id} />)}
          </div>
        </div>
      </section>

      <section className="whatsapp-banner">
        <div className="container whatsapp-banner__inner">
          <div className="whatsapp-banner__icon"><WhatsAppIcon aria-hidden="true" /></div>
          <div><h2>¿No lo ves en el catálogo?</h2><p>Pregúntanos por WhatsApp.</p></div>
          <button className="button button--light" type="button" onClick={() => openWhatsApp(GENERAL_WHATSAPP_MESSAGE)}>Consultar por WhatsApp <ArrowRight size={19} /></button>
        </div>
      </section>

      <section className="section contact-section" id="contacto">
        <div className="container contact-layout">
          <div className="contact-intro">
            <SectionTitle title="Hablemos" subtitle="Consulta productos y disponibilidad." />
            <button className="button button--primary" type="button" onClick={() => openWhatsApp(GENERAL_WHATSAPP_MESSAGE)}><WhatsAppIcon size={19} aria-hidden="true" /> Escribir por WhatsApp</button>
          </div>
          <div className="contact-details">
            <article><span>Teléfono</span><strong>{BUSINESS.phone}</strong></article>
            <article><span>WhatsApp</span><strong>{BUSINESS.whatsappDisplay}</strong></article>
            <article><span>Dirección</span><strong>{BUSINESS.address}</strong></article>
            <article className="hours-card"><span>Horario</span>{BUSINESS.schedule.map((item) => <p key={item.days}><strong>{item.days}</strong><b>{item.hours}</b></p>)}</article>
          </div>
        </div>
      </section>
    </>
  )
}
