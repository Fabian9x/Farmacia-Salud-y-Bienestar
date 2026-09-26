import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CategoryCard({ category, index }) {
  const Icon = category.icon
  return (
    <Link className="category-card" to={`/productos?categoria=${encodeURIComponent(category.name)}`}>
      <span className="category-card__index" aria-hidden="true">0{index + 1}</span>
      <Icon className="category-card__icon" aria-hidden="true" />
      <span className="category-card__copy">
        <strong>{category.name}</strong>
      </span>
      <ArrowRight className="category-card__arrow" aria-hidden="true" />
    </Link>
  )
}
