import { BUSINESS } from '../config/business'

export function getWhatsAppUrl(message) {
  const number = BUSINESS.whatsapp.replace(/\D/g, '')
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export function openWhatsApp(message) {
  window.open(getWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
}

export function productMessage(productName) {
  return `Hola, quisiera consultar la disponibilidad de ${productName}.`
}

export function orderMessage(items, total) {
  const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
  const lines = items.map((item) => `• ${item.quantity} x ${item.name} (${item.presentation}) — ${money.format(item.price * item.quantity)}`)
  return [
    'Hola, quisiera consultar la disponibilidad de este pedido:',
    '',
    ...lines,
    '',
    `Total estimado: ${money.format(total)}`,
    '',
    'Entiendo que la disponibilidad y el precio final serán confirmados por la farmacia.',
  ].join('\n')
}

export function isWhatsAppConfigured() {
  return /^\d{10,15}$/.test(BUSINESS.whatsapp)
}
