# Funcionalidades

Este documento describe el comportamiento de las piezas interactivas del sitio:
cotización, formulario de contacto, SEO, animaciones y estados de carga.

## Carrito de cotización

### Flujo de uso

1. El usuario pulsa **Agregar a cotización** en una tarjeta de producto o en una
   ficha (`AddToQuoteButton`).
2. `QuoteCartProvider` agrega el producto al estado global y muestra un toast.
3. El carrito se persiste en `localStorage` con la clave `atomix-quote-cart`.
4. El botón **Cotizar** del header (o del menú móvil) abre el diálogo lateral.
5. El usuario ajusta cantidades, elimina productos o vacía la selección.
6. **Cotizar por WhatsApp** abre `wa.me` con un mensaje prearmado que incluye
   cada producto, su medida/rosca, especificaciones y cantidad.

No hay precios, inventario, cuentas ni pago. El cierre real ocurre en WhatsApp.

### Estado y persistencia

`app/components/quote-cart-context.js` es la fuente de verdad del carrito:

- Guarda únicamente `{ id, quantity }` por artículo.
- Al leer, resuelve el producto con `getProductById(id)`.
- Valida cada artículo con `quoteCartItemSchema`; los inválidos se descartan y
  se registra un `console.warn`.
- Si el JSON guardado no es un arreglo, se descarta completo.
- La hidratación se hace en `requestAnimationFrame` para no romper la
  hidratación de React.
- La escritura en `localStorage` ocurre solo después de `isReady`.
- `itemCount` es la **suma de cantidades**, no el número de líneas.
- `addProduct` incrementa la cantidad si el producto ya existe.
- `setQuantity` valida con `quoteQuantitySchema` (entero, mínimo 1) y verifica
  que el ID exista.
- `removeProduct` y `clearCart` actualizan el estado y emiten un toast.
- El máximo de cantidad es `Number.MAX_SAFE_INTEGER`
  (`MAX_QUOTE_QUANTITY`).

API del contexto (`useQuoteCart()`):

| Campo | Tipo | Uso |
|---|---|---|
| `items` | array | Artículos con `product` resuelto |
| `itemCount` | number | Suma de cantidades |
| `isOpen` | boolean | Estado del diálogo |
| `toast` | object \| null | Aviso temporal |
| `openCart` / `closeCart` | function | Abrir/cerrar diálogo |
| `addProduct` | function | Agregar producto |
| `setQuantity` | function | Cambiar cantidad |
| `removeProduct` | function | Quitar artículo |
| `clearCart` | function | Vaciar selección |
| `dismissToast` | function | Cerrar aviso |

### Interfaz

`app/components/quote-cart.js` usa un `<dialog>` nativo:

- `showModal()` al abrir y `close()` al terminar la animación de salida.
- Animación GSAP del backdrop y del panel lateral.
- Si `prefers-reduced-motion` está activo, las duraciones son `0`.
- Detiene Lenis mientras el diálogo está abierto y lo reanuda al cerrar.
- El listado usa `data-lenis-prevent` para permitir scroll interno.
- El toast se muestra dentro del diálogo si está abierto, o suelto si está
  cerrado.

### Mensaje de WhatsApp

`getQuoteMessage(items)` arma un mensaje con este formato:

```text
¡Hola! Me gustaría cotizar estos productos:

1. <nombre>
   Medida / rosca: <neck>
   <spec 1>: <valor>
   <spec 2>: <valor>
   Cantidad solicitada: <cantidad>
```

El enlace se genera con `whatsappUrl(message)` de `data/site.js`, que hace
`encodeURIComponent` y usa `company.whatsappNumber`.

### Limitaciones

- El carrito es local al navegador; no se sincroniza entre dispositivos.
- Borrar los datos del sitio elimina la selección.
- El mensaje se abre en WhatsApp; el sitio no envía nada por sí mismo.
- No hay validación del lado servidor porque no hay servidor ni API.

## Formulario de contacto

`app/components/contact-form.js` es un componente cliente con `noValidate`.

### Reglas de validación (`lib/validation.js`)

| Campo | Obligatorio | Regla |
|---|---|---|
| `name` | Sí | 2–80 caracteres, recortando espacios |
| `company` | No | Máximo 120 caracteres |
| `phone` | Sí | Máximo 25; solo `+`, dígitos, espacios, `()`, `.`, `-`; mínimo 8 dígitos |
| `email` | No | Si se captura, debe ser un correo válido; vacío se convierte en `undefined` |
| `details` | Sí | 10–1000 caracteres |

### Comportamiento al enviar

1. `preventDefault()` y lectura con `FormData`.
2. `contactFormSchema.safeParse(...)`.
3. Si falla, `error.flatten().fieldErrors` llena el estado de errores y el foco
   va al primer campo inválido en el orden `name`, `company`, `phone`, `email`,
   `details`.
4. Al corregir un campo, su error se limpia en `onChange`.
5. Si es válido, arma un mensaje con nombre, empresa, teléfono, correo y
   necesidad, y ejecuta `window.location.assign(whatsappUrl(message))`.

Consecuencias:

- La navegación a WhatsApp ocurre en la **misma pestaña**.
- No se envía correo ni se guarda la solicitud en el sitio.
- La validación es de cliente; no debe considerarse una barrera de seguridad.

## SEO

### Metadatos

`data/seo.js` expone `createPageMetadata({ title, description, path, image })`:

- `title` simple (el layout raíz aplica la plantilla `%s | Atomix Solutions`).
- `alternates.canonical` con la ruta.
- Open Graph con `siteName`, `locale: es_MX`, tipo `website` e imagen.
- Twitter Card `summary_large_image`.

`app/layout.js` define además:

- `metadataBase` con `SITE_URL`.
- Título por defecto y plantilla.
- `applicationName`, `publisher`, autor y copyright.
- `robots` con index/follow y opciones ampliadas para Googlebot.
- Open Graph y Twitter de la portada.

Las páginas estáticas exportan `metadata`; las dinámicas usan
`generateMetadata()` y `createPageMetadata()` con los datos del catálogo.

### Sitemap

`app/sitemap.js` genera:

- Páginas estáticas: `/`, `/productos`, `/nosotros`, `/contacto`.
- Una URL por categoría, con su imagen y prioridad `0.8`.
- Una URL por producto, con su imagen y prioridad `0.7`.
- Frecuencias: `weekly` para la portada, `monthly` para el resto.

Agregar una categoría o producto al catálogo lo incluye automáticamente.

### Robots

`app/robots.js`:

- Permite `*`.
- Bloquea un listado explícito de bots de IA (GPTBot, ClaudeBot, CCBot,
  PerplexityBot, Bytespider, etc.).
- Declara `sitemap` y `host`.

El bloqueo es por directiva `robots.txt`; no es autenticación ni protección
técnica. El aviso legal completo está en `AI-README.md` y también hay
comentarios disuasorios en `app/layout.js`.

## Animaciones y scroll

### Scroll suave

`app/components/smooth-scroll.js`:

- Crea una instancia de Lenis y la expone como `window.lenis`.
- Sincroniza Lenis con el ticker de GSAP y con `ScrollTrigger.update()`.
- En punteros táctiles (`hover: none` y `pointer: coarse`) desactiva
  `syncTouch` y `smoothWheel` para usar la inercia nativa.
- Al cambiar de ruta hace `scrollTo(0)`, `resize()` y `refresh()`.
- Destruye Lenis y limpia listeners al desmontar.

### Apariciones por scroll

`app/components/gsap-animations.js` envuelve el contenido y aplica:

- Entrada del hero (eyebrow, título, descripción, acciones e imagen).
- Aparición de `h1`/`h2` que no estén en el hero.
- Reveals por grupos de hijos.
- Layouts de dos columnas.
- Marcos de imagen con parallax.

Contrato de clases: si agregas una sección nueva y quieres que se anime, revisa
si su contenedor debe sumarse a `revealGroups`, `layoutGroups` o `imageFrames`.
La animación espera 2.5 s, omite lo que ya está visible y vuelve a ejecutarse
cuando el DOM cambia (`MutationObserver`). Si el usuario activa
`prefers-reduced-motion`, se revierte todo.

### Otras animaciones

- Header: agrega `is-scrolled` al pasar 24 px (`ScrollTrigger`).
- Menú móvil: apertura/cierre con `clipPath`, stagger de enlaces y reverso.
- Carrito: panel lateral y toasts.
- `VoxelCubeLoader`: cubo 3D de módulos para `loading.js` y Suspense.
- `NotFoundScene`: entrada de dígitos/letras y dinosaurio animado.

Todas respetan `prefers-reduced-motion`.

## WhatsApp y mapas

`data/site.js` centraliza:

- `company`: nombre, teléfono, WhatsApp, dirección y Facebook.
- `fullAddress`: dirección formateada.
- `mapsEmbedUrl` y `mapsDirectionsUrl`.
- `whatsappUrl(message)`: enlace `wa.me` con mensaje codificado.
- `navLinks`: navegación principal.

Puntos donde se usa WhatsApp:

- Botón flotante (`whatsapp-float.js`).
- Header/footer y página de contacto.
- Hero de la portada.
- Categoría y ficha de producto.
- Carrito de cotización.

Mapas:

- La portada enlaza a indicaciones con `mapsDirectionsUrl`.
- `/nosotros` muestra un iframe lazy mediante `AboutLocationMap`, que tiene
  estado de carga y `aria-busy`.
- El iframe de `/nosotros` usa una URL embebida fija en la propia página; si
  cambia la dirección, actualiza también `data/site.js` y esa URL.

## Estados de carga y errores

- `app/loading.js` muestra `VoxelCubeLoader` como carga global.
- Las rutas dinámicas envuelven su contenido en `<Suspense>` con el mismo
  loader y un `label` distinto.
- `app/not-found.js` es la 404 personalizada; se activa con `notFound()` en
  slugs inválidos o con cualquier URL sin ruta.
- La 404 incluye enlaces a inicio y catálogo, y una escena animada con
  fallback estático si el usuario prefiere movimiento reducido.

## Accesibilidad

- Enlace **Saltar al contenido** (`skip-link`) al inicio del body.
- `main` con `id="main"` en todas las páginas.
- Navegación con `aria-current` para la sección activa.
- Diálogo con `aria-labelledby`, cierre por `Esc` y botón explícito.
- Toasts con `role="status"`, `aria-live="polite"` y `aria-atomic`.
- Contadores y cantidades con etiquetas accesibles.
- Foco visible en botones, enlaces y controles.
- `prefers-reduced-motion` respetado en GSAP, Lenis, carrito, loader y 404.

## Configuración de Next.js

`next.config.mjs`:

```js
cacheComponents: true,
partialPrefetching: true,
turbopack: {
  rules: {
    "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" },
  },
},
```

- `cacheComponents` activa Cache Components y PPR por defecto.
- `partialPrefetching` habilita el App Shell por ruta.
- La regla de Turbopack conecta Tailwind 4 con el pipeline de CSS.

No hay variables de entorno requeridas. `.env*` está ignorado por Git.

## Limitaciones conocidas

- **Sin backend**: no hay API, base de datos, autenticación ni envío de correo.
- **Cotización manual**: el sitio prepara el mensaje; el envío y seguimiento
  ocurren fuera de la aplicación.
- **Sin precios ni stock**: el catálogo muestra especificaciones, no
  disponibilidad en tiempo real.
- **Correo del footer**: el ícono de correo usa `href="#"` como placeholder
  porque la dirección de correo aún no está definida. No abre un cliente de
  correo; cuando se defina el email, hay que actualizar ese enlace en
  `app/components/site-footer.js`.
- **Validación de cliente**: Zod valida en el navegador; no hay validación
  servidor.
- **Catálogo sin esquema**: un error de tipeo en `data/catalog.js` no se detecta
  automáticamente.
- **Bloqueo de IA por robots**: es una declaración de intenciones, no una
  medida técnica infalible.
