import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useCart } from '../hooks/useCart'
import { openWhatsApp, orderMessage } from '../utils/whatsapp'
import WhatsAppIcon from './WhatsAppIcon'

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export default function CartDrawer() {
  const { items, total, isCartOpen, setCartOpen, setQuantity, removeItem } = useCart()
  const closeRef = useRef(null)

  useEffect(() => {
    if (!isCartOpen) return undefined
    const previousFocus = document.activeElement
    document.body.classList.add('cart-is-open')
    closeRef.current?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setCartOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.classList.remove('cart-is-open')
      document.removeEventListener('keydown', onKeyDown)
      previousFocus?.focus()
    }
  }, [isCartOpen, setCartOpen])

  if (!isCartOpen) return null

  return (
    <div className="cart-layer">
      <button className="cart-backdrop" type="button" aria-label="Cerrar carrito" onClick={() => setCartOpen(false)} />
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <header className="cart-drawer__header">
          <div><span>Tu selección</span><h2 id="cart-title">Tu carrito</h2></div>
          <button ref={closeRef} className="icon-button" type="button" aria-label="Cerrar carrito" onClick={() => setCartOpen(false)}><X /></button>
        </header>

        {items.length === 0 ? (
          <div className="cart-empty">
            <div><ShoppingBag /></div>
            <h3>Tu carrito está vacío</h3>
            <p>Agrega productos y luego envía la consulta completa por WhatsApp.</p>
            <button className="button button--secondary" type="button" onClick={() => setCartOpen(false)}>Seguir explorando</button>
          </div>
        ) : (
          <>
            <div className="cart-lines">
              {items.map((item) => (
                <article className="cart-line" key={item.id}>
                  <img src={`${import.meta.env.BASE_URL}images/products/${item.image}`} alt="" width="78" height="68" />
                  <div className="cart-line__details">
                    <h3>{item.name}</h3>
                    <p>{item.presentation}</p>
                    <strong>{money.format(item.price)}</strong>
                    <div className="cart-line__actions">
                      <div className="quantity-control quantity-control--compact" aria-label={`Cantidad de ${item.name}`}>
                        <button type="button" onClick={() => setQuantity(item.id, item.quantity - 1)} aria-label={`Reducir ${item.name}`}><Minus /></button>
                        <output>{item.quantity}</output>
                        <button type="button" onClick={() => setQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= 99} aria-label={`Aumentar ${item.name}`}><Plus /></button>
                      </div>
                      <button className="remove-item" type="button" onClick={() => removeItem(item.id)} aria-label={`Eliminar ${item.name}`}><Trash2 /> Eliminar</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <footer className="cart-summary">
              <div><span>Total estimado</span><strong>{money.format(total)}</strong></div>
              <p>Confirmaremos disponibilidad y precio final antes de coordinar tu pedido.</p>
              <button className="button button--whatsapp button--full" type="button" onClick={() => openWhatsApp(orderMessage(items, total))}>
                <WhatsAppIcon aria-hidden="true" /> Enviar pedido por WhatsApp
              </button>
              <small>Sin pagos en línea. Un asesor continuará la atención por WhatsApp.</small>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}
