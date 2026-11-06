# Atomix Solutions

Sitio web de Atomix Solutions, distribuidor en México de tapas y componentes
para envasado. Construido con Next.js App Router, React y Tailwind CSS 4.

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
- `/productos` — catálogo completo organizado por categoría.
- `/<categoria>` — detalle de atomizadores, bombas, tapas o triggers.
- `/producto/<producto>` — ficha con medidas y especificaciones.
- `/nosotros` — información de Atomix Solutions.
- `/contacto` — datos de contacto y formulario de solicitud.

El formulario de contacto prepara la solicitud y la envía a WhatsApp para que
el usuario la revise antes de enviarla.

## Datos e imágenes

- `data/catalog.js` contiene categorías, productos y especificaciones.
- `data/site.js` contiene la información de contacto, navegación y enlaces.
- `public/images/` contiene el logotipo, las fotografías de productos y los
  recursos gráficos locales.
