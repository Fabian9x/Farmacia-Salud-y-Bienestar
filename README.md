# Farmacia Salud y Bienestar

Sitio web estático, responsive y accesible para presentar la farmacia, explorar un catálogo, ver el detalle de cada producto, preparar un carrito y enviar el pedido completo por WhatsApp. Construido con React, Vite y CSS moderno; no necesita backend ni base de datos.

## Ejecutar el proyecto

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev
```

Vite mostrará una dirección local, normalmente `http://localhost:5173`.

## Compilar y probar

```bash
npm run build
npm run preview
```

La versión lista para publicar se genera en `dist/`.

## Editar el contenido

- **Productos, precios e imágenes:** `src/data/products.js`
- **Categorías:** `src/data/categories.js`
- **WhatsApp, teléfono, dirección y horarios:** `src/config/business.js`
- **Logo y favicon:** reemplaza `public/logo.png` y `public/favicon.png` manteniendo los mismos nombres.
- **Imágenes de producto:** guarda los archivos en `public/images/products/` y usa su nombre en la propiedad `image` del producto.

El número de WhatsApp debe escribirse con código de país, sin `+`, espacios ni guiones. Ejemplo para Ecuador: `593XXXXXXXXX`.

El carrito se guarda localmente en el navegador. El sitio no procesa pagos: al finalizar se abre WhatsApp con el detalle, las cantidades y el total estimado para que la farmacia confirme disponibilidad y precio.

## Publicar en GitHub Pages

El repositorio incluye el flujo `.github/workflows/deploy.yml`. La ruta base se calcula automáticamente desde el nombre del repositorio.

1. Crea un repositorio en GitHub.
2. Sube este proyecto a la rama `main`.
3. En GitHub abre **Settings → Pages**.
4. En **Build and deployment → Source**, selecciona **GitHub Actions**.
5. Haz un nuevo `git push origin main` o ejecuta manualmente el flujo **Deploy to GitHub Pages** desde la pestaña Actions.

GitHub instalará las dependencias, ejecutará `npm run build` y publicará `dist/`. La navegación usa `HashRouter`, por lo que el catálogo funciona en una URL como `https://USUARIO.github.io/REPOSITORIO/#/productos` sin errores al recargar.

## Comandos disponibles

```bash
npm run dev      # servidor de desarrollo
npm run build    # compilación de producción
npm run preview  # prueba local del build
npm run lint     # revisión estática del código
```

> Los productos y precios incluidos son datos de demostración. Revisa y reemplaza esta información antes de publicar el sitio definitivo.
