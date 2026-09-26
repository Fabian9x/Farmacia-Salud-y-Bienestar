import { GENERAL_WHATSAPP_MESSAGE } from '../config/business'
import { openWhatsApp } from '../utils/whatsapp'
import Footer from './Footer'
import Header from './Header'
import CartDrawer from './CartDrawer'
import WhatsAppIcon from './WhatsAppIcon'

export default function Layout({ children }) {
  return (
    <>
      <a className="skip-link" href="#main-content">Saltar al contenido</a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <CartDrawer />
      <button className="floating-whatsapp" type="button" aria-label="Escríbenos por WhatsApp" data-tooltip="Escríbenos" onClick={() => openWhatsApp(GENERAL_WHATSAPP_MESSAGE)}>
        <WhatsAppIcon aria-hidden="true" />
      </button>
    </>
  )
}
