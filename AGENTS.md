# AGENTS.md

## 🎯 Objetivo

Mantener una arquitectura limpia, escalable y consistente en todo el proyecto.

---

## 🧱 Arquitectura

### Estructura base

```bash
src/
  app/
  components/
    ui/
    layout/
    sections/
  constants/
  hooks/
  lib/
```

---

## 📌 Reglas obligatorias

### 1. SRP (Single Responsibility Principle)

- Cada componente tiene una sola responsabilidad.
- No mezclar lógica, UI y datos en el mismo archivo.

---

### 2. Flujo de dependencias

page → sections → ui

- `sections` usan `ui`
- `ui` NO depende de `sections`
- Nunca romper este flujo

---

### 3. Design System (CRÍTICO)

- ❌ PROHIBIDO usar colores hardcodeados
- ❌ PROHIBIDO usar clases tipo `bg-blue-500`, `text-red-600`, etc.
- ❌ PROHIBIDO usar colores directos en JSX (`text-[#fff]`, etc.)
- ✅ SOLO usar variables definidas en `globals.css`

Ejemplo correcto:

```jsx
className = "btn-primary";
```

---

### 4. Tailwind v4

- No usar `tailwind.config.js`
- Todo el sistema de diseño vive en `globals.css`
- Usar variables CSS (`var(--token)`)

---

### 5. Componentes

#### `components/ui/`

- Componentes reutilizables
- Sin lógica de negocio
  Ej: Button, Badge, Container

#### `components/sections/`

- Secciones completas de página
- Composición de UI

#### `components/layout/`

- Estructura global (Navbar, Footer)

---

### 6. Código limpio

- Evitar duplicación
- Si algo se repite → abstraer a `ui/`
- Nombres claros y consistentes

---

### 7. Frontend sin lógica crítica

- ❌ No implementar lógica de negocio importante en frontend
- ❌ No cálculos sensibles
- ✅ Solo UI y presentación

---

### 8. Producción

- Siempre usar build de producción
- Source maps desactivados en `next.config.mjs`

---

### 9. Uso de "use client"

- Usar `"use client"` solo cuando sea necesario
- No marcar componentes innecesariamente como cliente

---

## 🚫 Prohibiciones

- No usar estilos inline innecesarios
- No usar colores fuera del sistema
- No mezclar responsabilidades
- No agregar librerías sin justificación

---

## ✅ Principios

- Simplicidad > complejidad
- Consistencia > creatividad
- Escalabilidad > rapidez
