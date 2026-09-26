import { Clock3, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BUSINESS } from '../config/business'
import Logo from './Logo'
import WhatsAppIcon from './WhatsAppIcon'

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.2 8.1V6.4c0-.8.5-1 1-1h2.6V1.2L14.3 1C10.5 1 9.6 3.3 9.6 5.9v2.2H7v4.7h2.6V23h4.6V12.8h3.1l.5-4.7h-3.6Z" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16.7 1c.4 2.5 1.8 4 4.3 4.2v4.3a8.3 8.3 0 0 1-4.2-1v7.4a7.1 7.1 0 1 1-6.1-7v4.4a2.8 2.8 0 1 0 1.7 2.6V1h4.3Z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo footer />
          <p>Productos de farmacia, cuidado personal y bienestar con atención cercana y responsable.</p>
          <div className="footer-social" aria-label="Redes sociales">
            <a href={BUSINESS.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Visitar Facebook de Farmacia Salud y Bienestar">
              <FacebookIcon />
              <span>Facebook</span>
            </a>
            <a href={BUSINESS.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="Visitar TikTok de Farmacia Salud y Bienestar">
              <TikTokIcon />
              <span>TikTok</span>
            </a>
          </div>
        </div>
        <nav className="footer-nav" aria-label="Enlaces del pie de página">
          <h3>Explora</h3>
          <Link to="/">Inicio</Link>
          <Link to="/productos">Productos</Link>
          <Link to="/?section=categorias">Categorías</Link>
          <Link to="/?section=nosotros">Nosotros</Link>
          <Link to="/?section=contacto">Contacto</Link>
        </nav>
        <div className="footer-contact">
          <h3>Contacto</h3>
          <p><Phone size={17} /> {BUSINESS.phone}</p>
          <p><WhatsAppIcon size={17} aria-hidden="true" /> {BUSINESS.whatsappDisplay}</p>
          <p><MapPin size={17} /> {BUSINESS.address}</p>
          <p><Clock3 size={17} /> {BUSINESS.schedule[0].days}: {BUSINESS.schedule[0].hours}</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© 2026 Farmacia Salud y Bienestar. Todos los derechos reservados.</p>
        <p>Precios y disponibilidad sujetos a confirmación.</p>
      </div>
    </footer>
  )
}
