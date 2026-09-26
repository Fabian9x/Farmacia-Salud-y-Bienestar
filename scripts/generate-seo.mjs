import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { products } from '../src/data/products.js'
import { productPath } from '../src/utils/productPath.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const siteUrl = (process.env.VITE_SITE_URL || 'https://fabian9x.github.io/Farmacia-Salud-y-Bienestar').replace(/\/$/, '')
const template = await readFile(path.join(dist, 'index.html'), 'utf8')
const today = new Date().toISOString().slice(0, 10)

const absoluteUrl = (route = '/') => `${siteUrl}${route === '/' ? '/' : `/${route.replace(/^\/+|\/+$/g, '')}`}`
const productUrl = (product) => absoluteUrl(productPath(product))
const productImage = (product) => absoluteUrl(`/images/products/${product.image}`)
const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

function escapeHtml(value) {
  return String(value).replace(/[&<>\"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[character])
}

function jsonLd(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

function renderSeo(page) {
  const clean = template
    .replace(/\s*<title>[\s\S]*?<\/title>/i, '')
    .replace(/\s*<meta[^>]+(?:name|property)="(?:description|robots|twitter:[^"]+|og:[^"]+)"[^>]*>/gi, '')
    .replace(/\s*<link[^>]+rel="canonical"[^>]*>/gi, '')
    .replace(/\s*<script[^>]+id="page-structured-data"[\s\S]*?<\/script>/gi, '')

  const tags = `
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <link rel="canonical" href="${escapeHtml(page.url)}" />
    <meta property="og:locale" content="es_EC" />
    <meta property="og:site_name" content="Farmacia Salud y Bienestar" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:type" content="${page.type || 'website'}" />
    <meta property="og:url" content="${escapeHtml(page.url)}" />
    <meta property="og:image" content="${escapeHtml(page.image)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(page.title)}" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <meta name="twitter:image" content="${escapeHtml(page.image)}" />
    <script id="page-structured-data" type="application/ld+json">${jsonLd(page.structuredData)}</script>`

  return clean.replace('</head>', `${tags}\n  </head>`)
}

const pharmacyId = `${absoluteUrl('/')}#pharmacy`
const pages = [
  {
    route: '/',
    title: 'Farmacia Salud y Bienestar | Productos y pedidos por WhatsApp',
    description: 'Compra medicamentos y productos para tu bienestar. Revisa precios, agrega al carrito y finaliza tu pedido por WhatsApp.',
    url: absoluteUrl('/'),
    image: absoluteUrl('/images/farmacia-local.jpg'),
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'Pharmacy', '@id': pharmacyId, name: 'Farmacia Salud y Bienestar', url: absoluteUrl('/'), logo: absoluteUrl('/logo.png'), image: absoluteUrl('/images/farmacia-local.jpg'), telephone: '+593985023640', sameAs: ['https://www.facebook.com/profile.php?id=61594095577891', 'https://www.tiktok.com/@user328004974'], priceRange: '$', currenciesAccepted: 'USD' },
        { '@type': 'WebSite', '@id': `${absoluteUrl('/')}#website`, url: absoluteUrl('/'), name: 'Farmacia Salud y Bienestar', inLanguage: 'es-EC', publisher: { '@id': pharmacyId } },
      ],
    },
  },
  {
    route: '/productos',
    title: 'Catálogo de productos | Farmacia Salud y Bienestar',
    description: 'Explora medicamentos, higiene, vitaminas y productos de bienestar con precios visibles. Arma tu carrito y pide por WhatsApp.',
    url: absoluteUrl('/productos'),
    image: absoluteUrl('/logo.png'),
    structuredData: { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Catálogo de Farmacia Salud y Bienestar', numberOfItems: products.length, itemListElement: products.map((product, index) => ({ '@type': 'ListItem', position: index + 1, url: productUrl(product), name: product.name })) },
  },
]

for (const product of products) {
  const route = productPath(product)
  const url = productUrl(product)
  const image = productImage(product)
  const description = `${product.name}, ${product.presentation}. Precio: ${money.format(product.price)}. Consulta disponibilidad y pide por WhatsApp.`
  pages.push({
    route,
    title: `${product.name} ${product.presentation} | Farmacia Salud y Bienestar`,
    description,
    url,
    image,
    type: 'product',
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'Product', '@id': `${url}#product`, name: product.name, image: [image], description: product.description, sku: `FSB-${String(product.id).padStart(3, '0')}`, category: product.category, url, brand: { '@type': 'Brand', name: product.name.split(' ')[0] }, offers: { '@type': 'Offer', url, priceCurrency: 'USD', price: product.price.toFixed(2), availability: product.available ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder', itemCondition: 'https://schema.org/NewCondition', seller: { '@type': 'Organization', name: 'Farmacia Salud y Bienestar' } } },
        { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Inicio', item: absoluteUrl('/') }, { '@type': 'ListItem', position: 2, name: 'Productos', item: absoluteUrl('/productos') }, { '@type': 'ListItem', position: 3, name: product.name, item: url }] },
      ],
    },
  })
}

for (const page of pages) {
  const directory = page.route === '/' ? dist : path.join(dist, page.route.replace(/^\//, ''))
  await mkdir(directory, { recursive: true })
  await writeFile(path.join(directory, 'index.html'), renderSeo(page), 'utf8')
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => `  <url><loc>${escapeHtml(page.url)}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>\n`

await writeFile(path.join(dist, 'sitemap.xml'), sitemap, 'utf8')
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`, 'utf8')

const notFound = renderSeo({ ...pages[0], title: 'Página no encontrada | Farmacia Salud y Bienestar' })
  .replace('index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1', 'noindex, follow')
await writeFile(path.join(dist, '404.html'), notFound, 'utf8')
