import { Menu, ShoppingBag, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { GENERAL_WHATSAPP_MESSAGE } from '../config/business'
import { openWhatsApp } from '../utils/whatsapp'
import WhatsAppIcon from './WhatsAppIcon'
import Logo from './Logo'
import { useCart } from '../hooks/useCart'

const links = [
  { label: 'Inicio', to: '/' },
  { label: 'Productos', to: '/productos' },
  { label: 'Categorías', to: '/?section=categorias' },
  { label: 'Nosotros', to: '/?section=nosotros' },
  { label: 'Contacto', to: '/?section=contacto' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { count, setCartOpen } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    const section = new URLSearchParams(location.search).get('section')
    if (section) {
      setTimeout(() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' }), 50)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [location.pathname, location.search])

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <div className="container header-inner">
        <Logo />
        <nav id="main-navigation" className={`main-nav ${open ? 'main-nav--open' : ''}`} aria-label="Navegación principal">
          <div className="main-nav__links">
            {links.map((link) => (
              <Link key={link.label} to={link.to} className={location.pathname === link.to ? 'active' : ''}>{link.label}</Link>
            ))}
          </div>
          <button className="button button--whatsapp header-cta" type="button" onClick={() => openWhatsApp(GENERAL_WHATSAPP_MESSAGE)}>
            <WhatsAppIcon size={19} aria-hidden="true" /> Consultar por WhatsApp
          </button>
        </nav>
        <div className="header-actions">
          <button className="cart-trigger" type="button" aria-label={`Abrir carrito, ${count} ${count === 1 ? 'producto' : 'productos'}`} onClick={() => setCartOpen(true)}>
            <ShoppingBag />
            {count > 0 && <span>{count > 99 ? '99+' : count}</span>}
          </button>
          <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  )
}
