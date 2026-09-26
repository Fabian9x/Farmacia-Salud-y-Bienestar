import { useEffect, useMemo, useState } from 'react'
import { products } from '../data/products'
import { CartContext } from './cart-context'

const STORAGE_KEY = 'farmacia-salud-bienestar-cart-v1'
function readStoredCart() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(stored) ? stored.filter((item) => Number.isInteger(item.id) && item.quantity > 0) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(readStoredCart)
  const [isCartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  const items = useMemo(() => cart.flatMap((line) => {
    const product = products.find((item) => item.id === line.id)
    return product ? [{ ...product, quantity: line.quantity }] : []
  }), [cart])

  const count = items.reduce((sum, item) => sum + item.quantity, 0)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const addItem = (product, quantity = 1) => {
    if (!product.available) return
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)
      return existing
        ? current.map((item) => item.id === product.id ? { ...item, quantity: Math.min(99, item.quantity + quantity) } : item)
        : [...current, { id: product.id, quantity: Math.min(99, quantity) }]
    })
    setCartOpen(true)
  }

  const setQuantity = (id, quantity) => {
    if (quantity <= 0) {
      setCart((current) => current.filter((item) => item.id !== id))
      return
    }
    setCart((current) => current.map((item) => item.id === id ? { ...item, quantity: Math.min(99, quantity) } : item))
  }

  const removeItem = (id) => setCart((current) => current.filter((item) => item.id !== id))

  return (
    <CartContext.Provider value={{ items, count, total, isCartOpen, setCartOpen, addItem, setQuantity, removeItem }}>
      {children}
    </CartContext.Provider>
  )
}
