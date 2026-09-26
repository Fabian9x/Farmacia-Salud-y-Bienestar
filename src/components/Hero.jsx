import { ArrowRight, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { GENERAL_WHATSAPP_MESSAGE } from '../config/business'
import { openWhatsApp } from '../utils/whatsapp'
import WhatsAppIcon from './WhatsAppIcon'

export default function Hero() {
  return (
    <section className="hero" id="nosotros" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="hero-badge"><ShieldCheck size={18} /> Farmacia local · atención cercana</div>
          <h1 id="hero-title">Todo para tu salud, <em>cerca de ti</em></h1>
          <p>Elige tus productos, agrégalos al carrito y envía el pedido por WhatsApp.</p>
          <div className="hero-actions">
            <Link className="button button--primary" to="/productos">Ver productos <ArrowRight size={19} /></Link>
            <button className="button button--secondary" type="button" onClick={() => openWhatsApp(GENERAL_WHATSAPP_MESSAGE)}><WhatsAppIcon size={19} aria-hidden="true" /> Pedir por WhatsApp</button>
          </div>
        </div>
        <figure className="hero-store">
          <img src={`${import.meta.env.BASE_URL}images/farmacia-local.jpg`} alt="Fachada e ingreso de Farmacia Salud y Bienestar" width="936" height="1280" fetchpriority="high" />
          <figcaption><strong>Siempre cerca de ti</strong><span>Atención personalizada</span></figcaption>
        </figure>
      </div>
    </section>
  )
}
