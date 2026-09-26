import { Link } from 'react-router-dom'

const logoUrl = `${import.meta.env.BASE_URL}logo.png`

export default function Logo({ footer = false }) {
  return (
    <Link className={`brand-logo ${footer ? 'brand-logo--footer' : ''}`} to="/" aria-label="Farmacia Salud y Bienestar, inicio">
      <span className="brand-logo__mark" aria-hidden="true">
        <img src={logoUrl} alt="" />
      </span>
      <span className="brand-logo__words">
        <strong>Farmacia</strong>
        <span>Salud y Bienestar</span>
      </span>
    </Link>
  )
}
