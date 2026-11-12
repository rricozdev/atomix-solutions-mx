# Arquitectura

Documento de referencia para entender cómo está organizado el sitio de Atomix
Solutions, cómo fluye la información y dónde tocar cada cosa.

## Resumen

El proyecto es un sitio de catálogo y cotización construido con **Next.js App
Router**. No tiene backend propio ni base de datos: el catálogo vive en archivos
JavaScript y la conversión se cierra por **WhatsApp**. El estado del carrito de
cotización se guarda en el navegador (`localStorage`).

## Stack

| Pieza | Versión | Uso |
|---|---|---|
| Next.js | 16.4.5 | Framework, App Router, SEO, sitemap, robots |
| React | 19.3.0 | Componentes de servidor y cliente |
| Tailwind CSS | 4 | Utilidades y variables de diseño |
| shadcn / Base UI | 4.23 / 1.9 | Primitivas de UI en `components/ui/` |
| GSAP | 3.15.1 | Animaciones, ScrollTrigger, escenas |
| Lenis | 1.3.27 | Scroll suave (puntero fino; en táctil usa inercia nativa) |
| Zod | 4.6.7 | Validación de formulario y carrito |
| lucide-react | 1.69.0 | Iconografía |
| ESLint | 9 | Validación estática |

> Next.js 16 incluye cambios de API respecto a versiones anteriores. Antes de
> modificar rutas, caché o `params`, consulta la documentación local en
> `node_modules/next/dist/docs/` (ver `AGENTS.md`).

## Estructura de carpetas

```text
app/                      Rutas y componentes del App Router
  [slug]/                 Página dinámica de categoría
  producto/[slug]/        Página dinámica de producto
  productos/              Catálogo completo con filtros y paginación
  contacto/               Página de contacto
  nosotros/               Página institucional
  components/             Componentes específicos del sitio
  layout.js               Layout raíz: providers, header, footer, scroll
  page.js                 Portada
  loading.js               Estado de carga global (loader voxel)
  not-found.js            Página 404 personalizada
  robots.js               Reglas de rastreo
  sitemap.js              Sitemap dinámico
  globals.css             Tailwind + estilos del sitio
components/
  ui/                     Primitivas shadcn/Base UI reutilizables
  about-location-map.jsx  Mapa lazy de la página Nosotros
data/
  catalog.js              Categorías y productos (fuente de verdad)
  site.js                 Datos de contacto, navegación y URLs
  seo.js                  Helper de metadatos por página
lib/
  validation.js           Esquemas Zod compartidos
  utils.js                Reexporta `cn`
public/images/
  brand/                  Logotipo
  categories/             Imágenes de categoría
  productos/              Fotografías de producto
  ui/                     Imágenes de portada y recursos visuales
docs/                     Esta documentación
```

`app/components/` contiene componentes con lógica del negocio; `components/ui/`
contiene primitivas genéricas. La convención no es intercambiable: los nuevos
componentes de sección van en `app/components/` y las primitivas reutilizables
en `components/ui/`.

## Modelo de renderizado

- **Layout raíz** (`app/layout.js`) es un componente de servidor que envuelve
  toda la app con:
  - `QuoteCartProvider`: estado del carrito de cotización (cliente).
  - `SmoothScroll`: Lenis + GSAP ScrollTrigger.
  - `SiteHeader`, `GsapAnimations`, `SiteFooter`, `WhatsAppFloat` y
    `QuoteCart`.
- **Páginas estáticas** (`/`, `/productos`, `/nosotros`, `/contacto`) exportan
  `metadata` y renderizan directamente.
- **Páginas dinámicas** (`app/[slug]/page.js` y
  `app/producto/[slug]/page.js`):
  - Usan `generateStaticParams()` para prerenderizar todas las categorías y
    productos del catálogo.
  - Usan `generateMetadata()` con `params` asíncrono (`const { slug } = await
    params`), requisito de Next.js 16.
  - Envuelven el contenido en `<Suspense>` con `VoxelCubeLoader` como
    fallback.
  - Si el slug no existe, llaman a `notFound()`.
- **Caché y prefetch**: `next.config.mjs` habilita `cacheComponents: true` y
  `partialPrefetching: true`. Esto activa Cache Components y Partial
  Prerendering (PPR) de forma global. `SiteFooter` usa la directiva
  `"use cache"`.
- **Rutas que no son categoría**: `app/[slug]` captura cualquier segmento
  único. Las rutas estáticas existentes (`/productos`, `/contacto`, etc.)
  tienen prioridad; cualquier otro slug se valida contra `categories` y
  responde 404 si no coincide.

## Mapa de rutas

| Ruta | Archivo | Contenido |
|---|---|---|
| `/` | `app/page.js` | Portada: hero, categorías, destacados, nosotros, contacto |
| `/productos` | `app/productos/page.js` | Catálogo con filtro por categoría y paginación |
| `/<categoria>` | `app/[slug]/page.js` | Detalle de categoría y sus productos |
| `/producto/<slug>` | `app/producto/[slug]/page.js` | Ficha de producto, especificaciones y relacionados |
| `/nosotros` | `app/nosotros/page.js` | Información institucional y mapa |
| `/contacto` | `app/contacto/page.js` | Datos de contacto y formulario |
| `/sitemap.xml` | `app/sitemap.js` | Sitemap generado desde el catálogo |
| `/robots.txt` | `app/robots.js` | Reglas de rastreo |
| 404 | `app/not-found.js` | Escena animada con enlaces de recuperación |

## Flujo de datos

```text
data/catalog.js ──► páginas de categoría, producto y catálogo
                └─► sitemap.js
                └─► quote-cart-context.js (valida IDs contra el catálogo)

data/site.js ─────► header, footer, contacto, WhatsApp, mapas
data/seo.js ──────► metadata de páginas estáticas y dinámicas
lib/validation.js ► contact-form.js y quote-cart-context.js
```

Reglas clave:

- El catálogo es la **única fuente de verdad** de productos y categorías.
- El carrito guarda solo `{ id, quantity }`; el resto se resuelve contra
  `getProductById` al leer. Así se evita persistir datos obsoletos.
- Los datos de contacto y las URLs de WhatsApp viven en `data/site.js`; no se
  hardcodean en las páginas.

## Estilos y UI

- `app/globals.css` concentra la mayor parte del diseño (variables, layout,
  secciones, animaciones y estados). Es un archivo grande; antes de agregar una
  clase, busca si ya existe una equivalente con `grep` o por nombre de sección.
- Se importan `tailwindcss`, `tw-animate-css` y `shadcn/tailwind.css`.
- `components.json` define shadcn con estilo `base-nova`, RSC activo, sin
  TypeScript y con variables CSS.
- Los primitivos (`Button`, `Card`, `Badge`, `Input`, `Textarea`) están en
  `components/ui/` y se combinan con clases del sitio (`button`, `button-dark`,
  etc.).
- El alias `@/*` está configurado en `jsconfig.json`, aunque la mayoría de los
  imports del proyecto usan rutas relativas. Mantén el estilo del archivo que
  edites.

## Componentes principales

| Componente | Tipo | Responsabilidad |
|---|---|---|
| `app/layout.js` | Servidor | Metadatos raíz y composición de providers |
| `site-header.js` | Cliente | Navegación, menú móvil, botón de cotización |
| `site-footer.js` | Servidor (`use cache`) | Enlaces, contacto y copyright |
| `product-card.js` | Servidor | Tarjeta de producto con acción de cotización |
| `product-catalog.js` | Cliente | Filtro por categoría y paginación (12 por página) |
| `add-to-quote-button.js` | Cliente | Agrega un producto y muestra confirmación |
| `quote-cart-context.js` | Cliente | Estado global, persistencia y validación |
| `quote-cart.js` | Cliente | Diálogo lateral, cantidades y envío a WhatsApp |
| `contact-form.js` | Cliente | Validación Zod y apertura de WhatsApp |
| `gsap-animations.js` | Cliente | Apariciones y parallax por scroll |
| `smooth-scroll.js` | Cliente | Lenis + sincronización con ScrollTrigger |
| `voxel-loader.js` | Cliente | Loader animado para `loading` y Suspense |
| `not-found-scene.js` | Cliente | Animación de la página 404 |
| `whatsapp-float.js` | Servidor | Botón flotante de WhatsApp |
| `about-location-map.jsx` | Cliente | Iframe de Google Maps con estado de carga |

## Scripts

```bash
npm run dev    # Servidor de desarrollo
npm run build  # Compilación de producción
npm run start  # Servir la compilación
npm run lint   # ESLint
```

## Convenciones

- **JavaScript, no TypeScript**: archivos `.js` para rutas y componentes, `.jsx`
  para primitivas de UI.
- **Server Components por defecto**: agrega `"use client"` solo cuando se
  necesiten estado, efectos, eventos o APIs del navegador.
- **Accesibilidad**: mantén `aria-*`, `role`, foco visible, `skip-link` y
  etiquetas descriptivas. Los diálogos y menús ya usan elementos nativos
  (`<dialog>`, `<details>`).
- **Movimiento reducido**: todo componente animado debe respetar
  `prefers-reduced-motion`. Ya existe el patrón en GSAP, Lenis, carrito y
  loader.
- **Rendimiento**: usa `next/image` con `sizes` adecuados; las imágenes de
  producto y categoría usan `fill`. Evita importar GSAP/Lenis en componentes
  de servidor.
- **Caché**: si agregas componentes de servidor costosos, evalúa `"use cache"`
  como en `SiteFooter`, pero verifica primero la documentación local de Next.js.
