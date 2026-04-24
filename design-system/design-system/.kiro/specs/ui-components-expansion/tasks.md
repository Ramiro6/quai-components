# Plan de Implementación: Expansión de Componentes UI

## Resumen

Implementación de tres componentes nuevos para Kiro DS v2: **Sidebar** (CSS + JS con comportamiento responsive), **Typography** (clases CSS reutilizables) y **Card variantes** (elevated, ghost, accent-left, outlined, image-header). Incluye integración con `index.css`, secciones de showcase en `demo.html`, cumplimiento de accesibilidad y compatibilidad con temas.

## Tareas

- [x] 1. Implementar el componente Typography — CSS
  - [x] 1.1 Crear `components/typography/typography.css` con las clases tipográficas
    - Crear el directorio `components/typography/`
    - Implementar las clases `.text-h1`, `.text-h2`, `.text-h3`, `.text-h4` con tamaño, peso, line-height y letter-spacing según la tabla del diseño
    - Implementar `.text-body` y `.text-body-sm` con `var(--text-base)` / `var(--text-sm)` y `line-height: var(--leading-body)`
    - Implementar `.text-label` y `.text-caption` con `var(--text-sm)` / `var(--text-xs)` y `line-height: var(--leading-ui)`
    - Implementar `.text-lead` con `var(--text-lg)`, `color: var(--color-text-secondary)` y `line-height: var(--leading-body)`
    - Implementar `.text-muted` como modificador puro de color (`color: var(--color-text-muted)`) sin alterar tamaño, peso ni line-height
    - Implementar `.text-code` con fuente monoespaciada (`'Geist Mono', ui-monospace, monospace`), fondo `var(--surface-1)`, padding `0.125em 0.25em`, border-radius `var(--radius-sm)`, y `font-size: 0.875em` relativo al contexto
    - Usar exclusivamente tokens semánticos del design system (sin tokens primitivos `--zinc-*`)
    - _Requisitos: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 15.1_

  - [ ]* 1.2 Escribir test de propiedad para composabilidad de `.text-muted`
    - **Propiedad 3: Composabilidad del modificador `.text-muted`**
    - Verificar que para cualquier clase tipográfica base combinada con `.text-muted`, solo se modifica `color` a `var(--color-text-muted)`, preservando `font-size`, `font-weight` y `line-height` de la clase base
    - Usar `fast-check` con mínimo 100 iteraciones
    - **Valida: Requisito 5.4**

- [x] 2. Implementar variantes del componente Card — CSS
  - [x] 2.1 Añadir variantes nuevas a `components/card/card.css`
    - Implementar `.card--elevated` con `background-color: var(--surface-2)`, `border: none`, y `box-shadow: 0 1px 3px 0 oklch(0% 0 0 / 0.1), 0 1px 2px -1px oklch(0% 0 0 / 0.1)`
    - Implementar `.card--ghost` con `background-color: transparent` y `border: none`, preservando padding de 1.5rem
    - Implementar `.card--accent-left` con `border-left: 3px solid var(--accent)` y `border-radius` reducido a `var(--radius-sm)` en el lado izquierdo
    - Implementar `.card--outlined` con `background-color: transparent` y `border: 1px solid var(--border-default-color)`
    - Implementar `.card--outlined.card--interactive:hover` con `border-color: var(--zinc-400)` y transición de 150ms ease
    - Implementar `.card__image` con `width: 100%`, `object-fit: cover`, altura configurable via `--card-image-height` (default 12rem), `border-radius` superior igual a `var(--radius-md)`, márgenes negativos para edge-to-edge, y `background-color: var(--surface-1)` como placeholder
    - Implementar `.card--interactive:focus-visible` con `outline: 2px solid var(--zinc-950)` y `outline-offset: 2px`
    - _Requisitos: 7.1, 7.2, 7.3, 8.1, 8.2, 9.1, 9.2, 10.1, 10.2, 10.3, 11.1, 11.2, 14.6, 15.1_

  - [ ]* 2.2 Escribir tests unitarios para variantes de Card
    - Verificar que `.card--elevated` aplica surface-2, box-shadow y sin borde
    - Verificar que `.card--ghost` es transparente, sin borde, con padding preservado
    - Verificar que `.card--accent-left` tiene borde izquierdo de 3px accent y radius ajustado
    - Verificar que `.card--outlined` es transparente con borde visible y hover en interactive
    - Verificar que `.card__image` tiene width 100%, object-fit cover, altura configurable, radius superior y placeholder en error
    - _Requisitos: 7.1, 7.2, 8.1, 8.2, 9.1, 9.2, 10.1, 10.2, 10.3, 11.1, 11.2_

- [x] 3. Checkpoint — Verificar Typography y Card variantes
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Implementar el componente Sidebar — CSS
  - [x] 4.1 Crear `components/sidebar/sidebar.css` con estructura base y estilos
    - Crear el directorio `components/sidebar/`
    - Definir custom properties del componente: `--sidebar-width: 16rem`, `--sidebar-padding: var(--space-4)`, `--sidebar-link-radius: var(--radius-sm)`, `--sidebar-link-padding-y: var(--space-2)`, `--sidebar-link-padding-x: var(--space-3)`
    - Implementar `.sidebar` como contenedor `position: fixed`, izquierda, `height: 100vh`, ancho `var(--sidebar-width)`, fondo `var(--background)`, borde derecho `1px solid var(--border-default-color)`
    - Implementar `.sidebar__header`, `.sidebar__nav`, `.sidebar__footer` (con `margin-top: auto`)
    - Implementar `.sidebar__brand` como enlace de marca
    - Implementar `.sidebar__group` y `.sidebar__group-label` con `var(--text-xs)`, `var(--color-text-muted)`, uppercase
    - Implementar `.sidebar__link` con layout flex, gap para icono, y estados: default (`transparent`, `var(--color-text-secondary)`), hover (`var(--surface-1)`, 150ms ease), focus-visible (`outline: 2px solid var(--zinc-950)`, offset 2px), active (`var(--surface-1)`)
    - Implementar `.sidebar__link--active` con `var(--surface-2)`, `var(--font-semibold)`, `var(--color-text)`
    - Implementar `.sidebar__link-icon` con `1em × 1em`, `currentColor`
    - Implementar `.sidebar__footer-text` como texto auxiliar
    - Usar exclusivamente tokens semánticos (excepto `--zinc-950` para focus rings)
    - _Requisitos: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 2.4, 2.5, 4.1, 15.1_

  - [x] 4.2 Implementar estilos responsive y overlay del Sidebar
    - Implementar media query `max-width: 767px`: ocultar sidebar con `transform: translateX(-100%)`
    - Implementar `.sidebar--open` en mobile: `transform: translateX(0)` con transición `250ms cubic-bezier(0.16, 1, 0.3, 1)`
    - Implementar `.sidebar__overlay` con `rgba(0, 0, 0, 0.5)` y fade de 200ms
    - Implementar `.sidebar__toggle` visible solo en mobile con estilos de botón hamburguesa
    - Implementar `@media (prefers-reduced-motion: reduce)` para omitir animación de deslizamiento
    - Implementar body scroll lock cuando overlay está activo (`overflow: hidden` en body)
    - _Requisitos: 3.1, 3.2, 3.3, 3.6, 3.7_

  - [ ]* 4.3 Escribir test de propiedad para exclusividad de tokens semánticos
    - **Propiedad 1: Exclusividad de tokens semánticos en componentes nuevos**
    - Parsear `sidebar.css`, `typography.css` y las nuevas reglas en `card.css`
    - Verificar que los valores de color/background/border-color referencian exclusivamente tokens semánticos, con excepción documentada de `--zinc-950` para focus rings y `--zinc-400` para hover
    - Usar `fast-check` con mínimo 100 iteraciones
    - **Valida: Requisitos 1.3, 15.1**

  - [ ]* 4.4 Escribir test de propiedad para arquitectura agnóstica al tema
    - **Propiedad 2: Arquitectura CSS agnóstica al tema**
    - Parsear `sidebar.css` y `typography.css`
    - Verificar que ningún selector contiene `.theme-dark`
    - Usar `fast-check` con mínimo 100 iteraciones
    - **Valida: Requisitos 4.1, 15.1**

- [x] 5. Implementar el componente Sidebar — JavaScript
  - [x] 5.1 Crear `components/sidebar/sidebar.js` con comportamiento interactivo
    - Implementar IIFE con patrón de inicialización consistente con `navigation.js` y `modal.js`
    - Implementar toggle open/close: alternar clase `.sidebar--open` y `aria-expanded` en el botón toggle
    - Implementar cierre al hacer clic en `.sidebar__overlay`
    - Implementar cierre con tecla Escape y devolución de foco al botón toggle
    - Implementar focus trap: Tab y Shift+Tab ciclan entre elementos focusables dentro del sidebar (`a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])`)
    - Implementar body scroll lock: `overflow: hidden` en `<body>` cuando overlay está activo
    - Verificar existencia del elemento referenciado por `aria-controls` antes de inicializar; emitir `console.warn` si no existe
    - _Requisitos: 3.2, 3.4, 3.5, 3.6, 14.2, 14.3_

  - [ ]* 5.2 Escribir tests unitarios para comportamiento del Sidebar
    - Verificar que toggle cambia `aria-expanded` y muestra/oculta sidebar
    - Verificar que clic en overlay cierra el sidebar
    - Verificar que Escape cierra el sidebar y devuelve foco al toggle
    - Verificar que focus trap mantiene el foco dentro del sidebar en mobile
    - _Requisitos: 3.2, 3.4, 3.5, 14.2, 14.3_

- [x] 6. Checkpoint — Verificar Sidebar completo
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Integración con el sistema de archivos
  - [x] 7.1 Actualizar `index.css` con imports de nuevos componentes
    - Añadir `@import './components/sidebar/sidebar.css';` después de `navigation.css` (orden alfabético)
    - Añadir `@import './components/typography/typography.css';` después de `toggle.css` (orden alfabético)
    - Mantener el orden y estructura existente de la sección de componentes
    - _Requisitos: 13.3_

- [x] 8. Secciones de showcase en demo.html
  - [x] 8.1 Añadir sección "Tipografía — Componente" al demo
    - Crear sección `.demo-section` con heading "Tipografía — Componente" y subtext descriptivo
    - Mostrar clases de heading (`.text-h1` a `.text-h4`) con texto de ejemplo que demuestre jerarquía visual descendente, usando elementos semánticos `<h1>`–`<h4>`
    - Mostrar clases de cuerpo (`.text-body`, `.text-body-sm`), UI (`.text-label`, `.text-caption`), lead (`.text-lead`), muted (`.text-muted`) y code (`.text-code`) con ejemplos de uso contextual
    - Incluir al menos un ejemplo de combinación de clases (`.text-caption.text-muted`) para demostrar composabilidad
    - Usar elementos HTML semánticos apropiados (`<h1>`–`<h4>` para headings, `<p>` para párrafos, `<code>` para código)
    - _Requisitos: 6.1, 6.2, 6.3, 6.4, 14.4_

  - [x] 8.2 Añadir sección "Cards — Variantes" al demo
    - Crear sección `.demo-section` con heading "Cards — Variantes" y subtext descriptivo
    - Mostrar cada variante de card (elevated, ghost, accent-left, outlined, image-header) con contenido de ejemplo representativo
    - Incluir al menos una card con imagen de cabecera usando un placeholder visual (gradient o color sólido con `var(--surface-1)`)
    - Usar grid responsive `.demo-grid` con `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`
    - Incluir atributo `alt` descriptivo en la imagen de la card
    - _Requisitos: 12.1, 12.2, 12.3, 14.5_

  - [x] 8.3 Añadir sección "Sidebar" al demo
    - Crear sección `.demo-section` con heading "Sidebar" y subtext descriptivo
    - Mostrar un ejemplo embebido del sidebar con header, grupos de navegación con labels, enlaces con iconos, enlace activo, y footer
    - Incluir el botón toggle con `aria-expanded` y `aria-controls`
    - Incluir el overlay para demostración mobile
    - Usar `<aside>` con `role="complementary"` y `aria-label` descriptivo
    - Incluir `<nav>` con `aria-label` descriptivo para la navegación interna
    - Incluir el script `sidebar.js` en el demo
    - _Requisitos: 13.4, 14.1, 14.2, 1.1, 1.2, 2.1_

- [x] 9. Checkpoint — Verificar integración y demo completo
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Verificación final de accesibilidad y temas
  - [x] 10.1 Verificar accesibilidad transversal y compatibilidad con temas
    - Confirmar que el Sidebar usa `<aside>` con `role="complementary"` y `aria-label`
    - Confirmar que el Sidebar es navegable por teclado (Tab entre enlaces, Enter para activar)
    - Confirmar que el focus trap funciona en modo mobile overlay
    - Confirmar que `.card--interactive:focus-visible` muestra outline correcto
    - Confirmar que `.card__image` tiene atributo `alt` en los ejemplos del demo
    - Confirmar que todos los componentes funcionan en tema claro y oscuro sin reglas CSS específicas por tema (excepto las excepciones documentadas)
    - Confirmar que el Theme Switcher existente permite verificar visualmente todos los nuevos componentes en ambos temas
    - _Requisitos: 4.1, 4.2, 14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 15.1, 15.2, 15.3_

- [x] 11. Checkpoint final — Verificar todo el feature
  - Ensure all tests pass, ask the user if questions arise.

## Notas

- Las tareas marcadas con `*` son opcionales y pueden omitirse para un MVP más rápido
- Cada tarea referencia requisitos específicos para trazabilidad
- Los checkpoints aseguran validación incremental
- Los tests de propiedad validan propiedades universales de correctitud definidas en el diseño
- Los tests unitarios validan ejemplos específicos y casos borde
- Todos los componentes usan exclusivamente tokens semánticos para garantizar compatibilidad automática con tema oscuro
