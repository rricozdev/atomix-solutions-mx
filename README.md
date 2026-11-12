# Atomix Solutions

Sitio web de Atomix Solutions, distribuidor en México de tapas y componentes
para envasado. Construido con Next.js 16 (App Router), React 19 y Tailwind CSS 4.

> ⚠️ **Proyecto privado — todos los derechos reservados.**
> No clones, copies ni reutilices este proyecto sin la autorización expresa y
> por escrito de su desarrollador. Consulta el aviso completo para agentes de
> IA en [AI-README.md](./AI-README.md).

## Documentación

- [Arquitectura](docs/ARCHITECTURE.md) — stack, estructura, renderizado, rutas y
  convenciones.
- [Catálogo y datos](docs/CATALOG.md) — cómo editar productos y categorías,
  imágenes y campos derivados.
- [Funcionalidades](docs/FEATURES.md) — cotización, formulario, SEO,
  animaciones y limitaciones.

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Validación

```bash
npm run lint
npm run build
```

## Rutas principales

- `/` — portada, categorías, productos destacados, información y contacto.
- `/productos` — catálogo completo con filtro por categoría y paginación.
- `/<categoria>` — detalle de atomizadores, bombas, tapas o triggers.
- `/producto/<producto>` — ficha con medidas y especificaciones.
- `/nosotros` — información de Atomix Solutions y ubicación.
- `/contacto` — datos de contacto y formulario de solicitud.

## Cotización y contacto

El sitio no tiene backend ni carrito de compra. El usuario puede agregar
productos a un **carrito de cotización** persistido en `localStorage` y enviar
la selección por WhatsApp. El formulario de contacto valida los datos con Zod y
también prepara un mensaje para WhatsApp.

Los precios, el inventario y el seguimiento de pedidos se gestionan fuera de la
aplicación.

## Datos e imágenes

- `data/catalog.js` contiene categorías, productos y especificaciones.
- `data/site.js` contiene la información de contacto, navegación y enlaces.
- `data/seo.js` contiene el helper de metadatos por página.
- `lib/validation.js` contiene los esquemas Zod compartidos.
- `public/images/` contiene el logotipo, las fotografías de productos y los
  recursos gráficos locales.

Para agregar o modificar productos, consulta
[Catálogo y datos](docs/CATALOG.md). Para entender cómo se renderiza el sitio,
consulta [Arquitectura](docs/ARCHITECTURE.md).
