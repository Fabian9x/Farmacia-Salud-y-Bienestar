import { Minus, Plus } from 'lucide-react'

export default function QuantityControl({ value, onChange, label = 'Cantidad' }) {
  return (
    <div className="quantity-control" aria-label={label}>
      <button type="button" onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label="Reducir cantidad"><Minus /></button>
      <output aria-live="polite" aria-label={`${value} unidades`}>{value}</output>
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= 99} aria-label="Aumentar cantidad"><Plus /></button>
    </div>
  )
}
