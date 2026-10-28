import Seo from '../components/Seo'

const updatedAt = '28 de octubre de 2026'

export default function Privacy() {
  return (
    <>
      <Seo
        title="Política de privacidad | Farmacia Salud y Bienestar"
        description="Conoce cómo Farmacia Salud y Bienestar utiliza datos, almacenamiento local, servicios externos y publicidad en este sitio web."
        path="/privacidad"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Política de privacidad',
          inLanguage: 'es-EC',
        }}
      />
      <header className="legal-hero">
        <div className="container legal-hero__inner">
          <p>Información y transparencia</p>
          <h1>Política de privacidad</h1>
          <span>Última actualización: {updatedAt}</span>
        </div>
      </header>
      <article className="container legal-content">
        <section>
          <h2>Responsable del sitio</h2>
          <p>Farmacia Salud y Bienestar administra este sitio para mostrar su catálogo y facilitar consultas y pedidos mediante WhatsApp.</p>
        </section>
        <section>
          <h2>Información que utiliza el sitio</h2>
          <p>El carrito guarda localmente en tu dispositivo los productos y cantidades seleccionados. Esta información no se envía a nuestro servidor. Cuando decides continuar por WhatsApp, el mensaje se abre en esa plataforma y se rige por sus propias condiciones y política de privacidad.</p>
        </section>
        <section>
          <h2>Publicidad y cookies</h2>
          <p>Este sitio utiliza Google AdSense para mostrar anuncios. Google y sus socios pueden emplear cookies, identificadores u otras tecnologías para publicar, medir y personalizar anuncios, de acuerdo con el consentimiento aplicable y sus políticas.</p>
          <p>Puedes consultar cómo Google utiliza la información de sitios asociados en <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">Privacidad y términos de Google</a>.</p>
        </section>
        <section>
          <h2>Servicios y enlaces externos</h2>
          <p>La web contiene enlaces a WhatsApp, Facebook y TikTok. Al abrirlos, el tratamiento de información dependerá de cada proveedor. No controlamos sus cookies ni sus prácticas de privacidad.</p>
        </section>
        <section>
          <h2>Tus opciones</h2>
          <p>Puedes eliminar la información del carrito borrando los datos del sitio desde la configuración de tu navegador. También puedes administrar o rechazar las opciones de publicidad cuando se muestre el mensaje de consentimiento de Google.</p>
        </section>
        <section>
          <h2>Contacto</h2>
          <p>Para consultas relacionadas con esta política puedes escribirnos al WhatsApp <a href="https://wa.me/593985023640" target="_blank" rel="noopener noreferrer">+593 98 502 3640</a> o visitarnos en Callejón 45 y Rosendo Avilés.</p>
        </section>
      </article>
    </>
  )
}
