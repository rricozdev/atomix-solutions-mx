# Catálogo y datos

Toda la información de productos y categorías vive en `data/catalog.js`. No hay
CMS, base de datos ni API: editar ese archivo y las imágenes de `public/` es
suficiente para publicar cambios.

## Categorías

`categories` es un arreglo de objetos. Cada categoría genera automáticamente:

- La ruta `/<slug>`.
- Una entrada en el sitemap.
- Metadatos SEO (`title`, `description`, imagen Open Graph).
- Una tarjeta en la portada y un filtro en `/productos`.

### Campos

| Campo | Tipo | Uso |
|---|---|---|
| `slug` | string | URL y relación con productos. Debe ser único y estable |
| `name` | string | Nombre completo visible |
| `short` | string | Etiqueta corta para filtros y tarjetas |
| `tagline` | string | Frase de apoyo en la tarjeta y el hero de categoría |
| `description` | string | Texto descriptivo y meta description |
| `uses` | string[] | Aplicaciones recomendadas (badges) |
| `image` | string | Ruta pública de la imagen de categoría |
| `sizes` | string[] | Medidas disponibles mostradas en la categoría |

### Ejemplo

```js
{
  slug: "tapa-disktop",
  name: "Tapa Disktop",
  short: "Disktop",
  tagline: "Abre con un toque",
  description:
    "Tapa dosificadora que se abre presionando uno de sus lados...",
  uses: ["Shampoo", "Acondicionador", "Cremas", "Gel"],
  image: "/images/categories/tapa-disktop.webp",
  sizes: ["20 mm", "24 mm", "28 mm"],
}
```

## Productos

Los productos se declaran como **tuplas** en `rawProducts` y luego se transforman
en objetos con campos derivados. El formato es compacto para facilitar la carga
masiva, pero exige respetar el orden.

### Formato de la tupla

```js
[
  id,           // número entero único y positivo
  slug,         // string único para /producto/<slug>
  name,         // nombre visible
  category,     // slug de una categoría existente
  description,  // descripción y meta description
  filename,     // nombre del archivo dentro de public/images/productos/
  size,         // "20 mm" | "24 mm" | "28 mm"
  thread,       // "410" | "415" | "400" | null
  specText,     // especificaciones separadas por "|" y "="
]
```

### Ejemplo

```js
[
  11,
  "11-disktop-24-415",
  "Disktop 24-415",
  "tapa-disktop",
  "Tapa Disktop de 24 mm, rosca 415.",
  "disktop-24mm-415.webp",
  "24 mm",
  "415",
  "Color=Blanco, Natural|PZ por caja=2500",
],
```

### Especificaciones (`specText`)

Se separan con `|`; cada par usa `=` entre etiqueta y valor:

```text
Color=Blanco, Negro|Rosca=Liso|PZ por caja=3000|Popote=12 cm
```

Reglas:

- No uses `=` dentro de una etiqueta ni de un valor.
- `Color` y `PZ por caja` son especiales: de ellas se derivan `colors` y
  `piecesPerBox`.
- Los valores de `Color` se separan con coma y se recortan con `trim()`.
- `PZ por caja` se convierte a número con `Number()`; si no es numérico, el
  resultado será `NaN`.
- Cualquier otro par se muestra tal cual en la ficha del producto.

## Campos derivados

Cada producto final incluye:

| Campo | Origen |
|---|---|
| `id`, `slug`, `name`, `category`, `description`, `size`, `thread` | Tupla |
| `image` | `/images/productos/` + `filename` |
| `neck` | `size/thread` si hay rosca; si no, solo `size` |
| `colors` | Valor de la especificación `Color` |
| `piecesPerBox` | Valor numérico de `PZ por caja` |
| `specs` | Arreglo `{ label, value }` con todas las especificaciones |
| `featured` | `true` si el `id` está en `FEATURED` |

Ejemplos de `neck`:

- `24 mm` + `410` → `24/410`
- `20 mm` + `null` → `20 mm`

## Catálogo actual

| Categoría | Slug | Productos |
|---|---|---|
| Atomizadores de Botón | `atomizadores-de-boton` | 6 |
| Bomba Dosificadora | `bomba-dosificadora` | 3 |
| Tapa Disktop | `tapa-disktop` | 6 |
| Tapa FlipTop | `tapa-fliptop` | 3 |
| Triggers | `triggers` | 4 |
| **Total** | | **22** |

Destacados en la portada: IDs `3` (Atomizador 24 Liso) y `11`
(Disktop 24-415), definidos en `const FEATURED = [3, 11]`.

## Helpers exportados

| Función / constante | Uso |
|---|---|
| `getCategory(slug)` | Busca una categoría por slug |
| `getProduct(slug)` | Busca un producto por slug |
| `getProductById(id)` | Busca un producto por ID (usado por el carrito) |
| `getProductsByCategory(slug)` | Productos de una categoría |
| `getRelated(product, limit = 4)` | Productos de la misma categoría, excluyendo el actual |
| `FEATURED` | IDs que aparecen como destacados |
| `COLOR_SWATCHES` | Mapa de colores a estilos visuales (disponible, hoy sin uso) |
| `SIZES` | Medidas globales (`20 mm`, `24 mm`, `28 mm`) (disponible, hoy sin uso) |

## Agregar un producto

1. Copia la imagen a `public/images/productos/` con un nombre descriptivo y
   estable, preferentemente `.webp`.
2. Agrega una tupla nueva al final de `rawProducts` con un `id` que no exista.
3. Usa un `slug` único; el patrón actual es `<id>-<nombre-descriptivo>`.
4. Verifica que `category` coincida exactamente con el `slug` de una categoría.
5. Usa una medida de `20 mm`, `24 mm` o `28 mm`; si no aplica rosca, usa
   `null` en `thread`.
6. Escribe `specText` con al menos `Color` y `PZ por caja` si quieres que la
   ficha y el carrito muestren esos datos.
7. Si debe aparecer en la portada, agrega su `id` a `FEATURED`.
8. Comprueba `/producto/<slug>`, `/productos`, la categoría correspondiente y
   `/sitemap.xml`.
9. Ejecuta `npm run lint` y `npm run build`.

## Agregar una categoría

1. Agrega un objeto nuevo a `categories` con un `slug` único.
2. Copia su imagen a `public/images/categories/`.
3. Agrega productos que referencien el nuevo `slug`.
4. La ruta, el sitemap, los metadatos y la tarjeta de portada se generan solos.
5. Si quieres que aparezca en la navegación principal, agrega el enlace en
   `navLinks` de `data/site.js`. La navegación actual solo incluye las páginas
   principales, no cada categoría.
6. Ejecuta `npm run lint` y `npm run build`.

## Imágenes

### Convención de rutas

| Tipo | Ruta |
|---|---|
| Productos | `public/images/productos/` |
| Categorías | `public/images/categories/` |
| Marca | `public/images/brand/` |
| Portada y recursos visuales | `public/images/ui/` |

El catálogo construye la ruta del producto así:

```js
image: `/images/productos/${filename.replace(/\.jpg$/, ".jpeg")}`
```

Consecuencias:

- Los archivos `.webp` se usan tal cual.
- Si declaras un archivo `.jpg`, el catálogo buscará `.jpeg`: el archivo real
  debe llamarse `.jpeg`.
- Recomendación: usa siempre `.webp` para producto y categoría.

### Buenas prácticas

- Optimiza el peso antes de subir la imagen; el sitio usa `next/image`, pero no
  genera el archivo fuente.
- Usa nombres estables: cambiar el nombre de archivo obliga a editar el
  catálogo.
- Mantén una relación de aspecto consistente para que las tarjetas no salten.
- El `alt` de producto se toma de `name`; el de categoría, de `name`.
- Las imágenes de producto también se usan como imagen Open Graph en su ficha.

### Archivos presentes sin uso directo

En `public/images/categories/` existen imágenes que hoy no referencia el
catálogo (`mini-trigger.webp`, `trigger-cola-de-pato.webp`,
`trigger-economico.webp`). No son un error, pero conviene no asumir que toda
imagen pública está en uso. Igual ocurre con algunos `.jpeg` de `ui/` que se
conservan como respaldo.

## Validación del catálogo

No hay un esquema Zod ni pruebas automatizadas para `data/catalog.js`. Los
errores más comunes son:

- `category` con un slug inexistente: el producto aparece en `/productos` y en
  la ficha, pero no en la página de categoría.
- `id` duplicado: el carrito y `getProductById` pueden resolver el producto
  equivocado.
- `slug` duplicado: una ficha pisa a otra en `generateStaticParams`.
- `specText` mal formado: una especificación se muestra incompleta o con
  `undefined`.
- Imagen inexistente: `next/image` falla al renderizar o devuelve 404.

Antes de publicar, revisa visualmente la portada, `/productos`, cada categoría y
al menos una ficha de producto; después corre `npm run build`.
