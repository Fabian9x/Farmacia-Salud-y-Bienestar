import { useEffect } from 'react'
import { absoluteUrl } from '../config/site'

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

export default function Seo({ title, description, path = '/', image, type = 'website', structuredData }) {
  useEffect(() => {
    const canonicalUrl = absoluteUrl(path)
    const socialImage = image || absoluteUrl('/logo.png')

    document.title = title
    setMeta('name', 'description', description)
    setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
    setMeta('property', 'og:locale', 'es_EC')
    setMeta('property', 'og:site_name', 'Farmacia Salud y Bienestar')
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:url', canonicalUrl)
    setMeta('property', 'og:image', socialImage)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', socialImage)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', canonicalUrl)

    let jsonLd = document.head.querySelector('#page-structured-data')
    if (!jsonLd) {
      jsonLd = document.createElement('script')
      jsonLd.id = 'page-structured-data'
      jsonLd.type = 'application/ld+json'
      document.head.appendChild(jsonLd)
    }
    jsonLd.textContent = JSON.stringify(structuredData || {})
  }, [description, image, path, structuredData, title, type])

  return null
}
