const fallbackSiteUrl = 'https://fabian9x.github.io/Farmacia-Salud-y-Bienestar'

export const SITE_URL = (import.meta.env.VITE_SITE_URL || fallbackSiteUrl).replace(/\/$/, '')

export function absoluteUrl(path = '/') {
  const normalizedPath = path === '/' ? '' : `/${path.replace(/^\/+|\/+$/g, '')}`
  return `${SITE_URL}${normalizedPath || '/'}`
}

export function absoluteAsset(path) {
  return absoluteUrl(path)
}
