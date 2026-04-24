# Documento de Requisitos — Expansión de Componentes UI

## Introducción

Este documento define los requisitos para expandir la biblioteca de componentes del Design System Kiro DS v2 con tres nuevos componentes: un **Sidebar** de navegación lateral, la **componentización de Tipografía** como componente independiente con showcase en el demo, y un **componente Card con variantes** adicionales de estilo. Los nuevos componentes deben integrarse con el sistema de tokens existente (OKLCH, escala zinc, acento violeta), soportar tema oscuro, seguir nomenclatura BEM, y mantener el nivel de calidad visual inspirado en shadcn/ui y la página de Claude Code — sin copiar, sino alcanzando un nivel de refinamiento similar con identidad propia.

## Glosario

- **Sidebar**: Componente de navegación lateral fijo o colapsable que permite al usuario navegar entre secciones de una aplicación. Se posiciona al costado izquierdo del viewport.
- **Typography**: Componente que encapsula los estilos tipográficos del design system (headings, body, labels, captions, código) como clases CSS reutilizables con showcase visual en el demo.
- **Card**: Componente contenedor existente que agrupa contenido relacionado. Se extiende con variantes visuales adicionales (elevated, outlined, ghost, accent-border, image-header).
- **Design_Token**: Variable CSS custom property que almacena un valor de diseño reutilizable (color, espaciado, tipografía, borde).
- **BEM**: Convención de nomenclatura CSS (Block__Element--Modifier) utilizada en todos los componentes del sistema.
- **Demo_Page**: Archivo `demo.html` que sirve como showcase interactivo de todos los componentes del design system.
- **Theme_Switcher**: Módulo JavaScript existente que alterna entre tema claro y oscuro mediante la clase `.theme-dark` en el elemento `<html>`.
- **WCAG_AA**: Nivel de conformidad de accesibilidad web que requiere contraste mínimo de 4.5:1 para texto normal y 3:1 para texto grande y componentes UI.

## Requisitos

### Requisito 1: Componente Sidebar — Estructura base

**Historia de usuario:** Como desarrollador, quiero un componente sidebar de navegación lateral, para que pueda construir layouts de aplicación con navegación persistente en el costado.

#### Criterios de aceptación

1. THE Sidebar SHALL renderizar un contenedor `<aside>` con la clase `.sidebar` que se posicione al lado izquierdo del viewport con ancho fijo configurable mediante custom property `--sidebar-width`.
2. THE Sidebar SHALL contener las secciones `.sidebar__header`, `.sidebar__nav`, y `.sidebar__footer` como sub-elementos BEM opcionales.
3. THE Sidebar SHALL utilizar exclusivamente tokens semánticos del design system (`--background`, `--surface-1`, `--border-default-color`, `--color-text`, `--color-text-secondary`) para colores y superficies.
4. THE Sidebar SHALL incluir un borde derecho de 1px usando `var(--border-default-color)` como separador visual del contenido principal.
5. THE Sidebar SHALL ocupar el 100% de la altura del viewport mediante `height: 100vh` o `height: 100dvh`.

### Requisito 2: Componente Sidebar — Navegación interna

**Historia de usuario:** Como usuario, quiero navegar entre secciones usando enlaces en el sidebar, para que pueda acceder rápidamente a diferentes áreas de la aplicación.

#### Criterios de aceptación

1. THE Sidebar SHALL renderizar enlaces de navegación como elementos `<a>` con la clase `.sidebar__link` dentro de un `<nav>` con `aria-label` descriptivo.
2. WHEN el usuario posiciona el cursor sobre un enlace del Sidebar, THE Sidebar SHALL mostrar un cambio de fondo a `var(--surface-1)` con transición de 150ms ease.
3. THE Sidebar SHALL distinguir el enlace activo mediante la clase `.sidebar__link--active` con fondo `var(--surface-2)` y peso de fuente `var(--font-semibold)`.
4. WHEN un enlace del Sidebar recibe foco por teclado, THE Sidebar SHALL mostrar un outline de 2px solid `var(--zinc-950)` con offset de 2px, consistente con el patrón `:focus-visible` del design system.
5. THE Sidebar SHALL soportar agrupación de enlaces mediante secciones con la clase `.sidebar__group` que incluya un label `.sidebar__group-label` en tamaño `var(--text-xs)` y color `var(--color-text-muted)`.

### Requisito 3: Componente Sidebar — Comportamiento responsive y colapsable

**Historia de usuario:** Como usuario en dispositivo móvil, quiero que el sidebar se adapte al tamaño de pantalla, para que no obstruya el contenido principal en pantallas pequeñas.

#### Criterios de aceptación

1. WHILE el viewport tiene un ancho menor a 768px, THE Sidebar SHALL ocultarse fuera del viewport con `transform: translateX(-100%)`.
2. WHEN el usuario activa el botón de toggle del Sidebar en viewport menor a 768px, THE Sidebar SHALL deslizarse a su posición visible con una transición de 250ms usando `cubic-bezier(0.16, 1, 0.3, 1)`.
3. WHEN el Sidebar está abierto en viewport menor a 768px, THE Sidebar SHALL renderizar un overlay semitransparente (`rgba(0, 0, 0, 0.5)`) detrás del sidebar y sobre el contenido principal.
4. WHEN el usuario presiona la tecla Escape mientras el Sidebar está abierto en mobile, THE Sidebar SHALL cerrarse y devolver el foco al botón de toggle.
5. WHEN el usuario hace clic en el overlay del Sidebar, THE Sidebar SHALL cerrarse.
6. THE Sidebar SHALL incluir un botón de toggle con la clase `.sidebar__toggle` que tenga `aria-expanded` y `aria-controls` apuntando al id del sidebar.
7. WHILE el usuario tiene configurada la preferencia `prefers-reduced-motion: reduce`, THE Sidebar SHALL omitir la animación de deslizamiento y mostrarse/ocultarse de forma instantánea.

### Requisito 4: Componente Sidebar — Tema oscuro

**Historia de usuario:** Como usuario, quiero que el sidebar se adapte automáticamente al tema oscuro, para que mantenga coherencia visual con el resto de la interfaz.

#### Criterios de aceptación

1. WHEN la clase `.theme-dark` está activa en el elemento `<html>`, THE Sidebar SHALL adaptar sus colores utilizando los tokens semánticos redefinidos en el tema oscuro sin reglas CSS adicionales específicas del componente.
2. THE Sidebar SHALL mantener contraste WCAG AA (4.5:1 para texto, 3:1 para componentes UI) en ambos temas, claro y oscuro.

### Requisito 5: Componente Typography — Clases tipográficas reutilizables

**Historia de usuario:** Como desarrollador, quiero clases CSS tipográficas predefinidas, para que pueda aplicar estilos de texto consistentes sin escribir estilos inline.

#### Criterios de aceptación

1. THE Typography SHALL proveer clases para headings (`.text-h1` a `.text-h4`) que apliquen tamaño, peso, line-height y letter-spacing correspondientes a la escala tipográfica del design system.
2. THE Typography SHALL proveer clases para texto de cuerpo (`.text-body`, `.text-body-sm`) que apliquen `var(--text-base)` y `var(--text-sm)` respectivamente con `line-height: var(--leading-body)`.
3. THE Typography SHALL proveer clases para texto de UI (`.text-label`, `.text-caption`) que apliquen los tamaños `var(--text-sm)` y `var(--text-xs)` con `line-height: var(--leading-ui)`.
4. THE Typography SHALL proveer una clase `.text-muted` que aplique `color: var(--color-text-muted)` como modificador combinable con cualquier clase tipográfica.
5. THE Typography SHALL proveer una clase `.text-code` para texto de código inline que aplique fuente monoespaciada, fondo `var(--surface-1)`, padding horizontal de `0.25em`, y border-radius `var(--radius-sm)`.
6. THE Typography SHALL proveer una clase `.text-lead` para texto introductorio que aplique `var(--text-lg)` con `color: var(--color-text-secondary)` y `line-height: var(--leading-body)`.

### Requisito 6: Componente Typography — Showcase en demo

**Historia de usuario:** Como desarrollador que evalúa el design system, quiero ver todos los estilos tipográficos en una sección dedicada del demo, para que pueda entender la escala y jerarquía visual disponible.

#### Criterios de aceptación

1. THE Demo_Page SHALL incluir una sección "Tipografía — Componente" que muestre cada clase tipográfica con texto de ejemplo representativo.
2. THE Demo_Page SHALL mostrar las clases de heading (`.text-h1` a `.text-h4`) con texto de ejemplo que demuestre la jerarquía visual descendente.
3. THE Demo_Page SHALL mostrar las clases de cuerpo, UI y utilidades tipográficas (`.text-body`, `.text-body-sm`, `.text-label`, `.text-caption`, `.text-lead`, `.text-muted`, `.text-code`) con ejemplos de uso contextual.
4. THE Demo_Page SHALL mostrar al menos un ejemplo de combinación de clases tipográficas (`.text-caption.text-muted`) para demostrar la composabilidad.

### Requisito 7: Componente Card — Variante Elevated

**Historia de usuario:** Como desarrollador, quiero una variante de card con elevación visual, para que pueda destacar contenido importante sobre el fondo de la página.

#### Criterios de aceptación

1. THE Card SHALL proveer una variante `.card--elevated` que aplique `background-color: var(--surface-2)` y una sombra sutil (`box-shadow`) para crear percepción de elevación.
2. THE Card con variante `.card--elevated` SHALL omitir el borde por defecto (`border: none`) para que la sombra sea el único indicador de separación.
3. WHEN la clase `.theme-dark` está activa, THE Card con variante `.card--elevated` SHALL usar una superficie más clara (`var(--surface-2)`) como indicador de elevación en lugar de sombra, siguiendo la convención de dark mode del design system.

### Requisito 8: Componente Card — Variante Ghost

**Historia de usuario:** Como desarrollador, quiero una variante de card sin fondo ni borde visible, para que pueda agrupar contenido con estructura semántica sin peso visual adicional.

#### Criterios de aceptación

1. THE Card SHALL proveer una variante `.card--ghost` que aplique `background-color: transparent` y `border: none`.
2. THE Card con variante `.card--ghost` SHALL mantener el mismo padding interno (1.5rem) que la card base para preservar la alineación del contenido.

### Requisito 9: Componente Card — Variante con borde de acento

**Historia de usuario:** Como desarrollador, quiero una variante de card con borde lateral de color acento, para que pueda señalar visualmente contenido destacado o notificaciones.

#### Criterios de aceptación

1. THE Card SHALL proveer una variante `.card--accent-left` que aplique un borde izquierdo de 3px solid `var(--accent)` manteniendo los bordes restantes con el estilo por defecto.
2. THE Card con variante `.card--accent-left` SHALL ajustar el `border-radius` del lado izquierdo para que el borde de acento se integre visualmente con las esquinas redondeadas.

### Requisito 10: Componente Card — Variante con imagen de cabecera

**Historia de usuario:** Como desarrollador, quiero una variante de card que soporte una imagen en la parte superior, para que pueda crear cards de contenido visual como artículos o productos.

#### Criterios de aceptación

1. THE Card SHALL proveer un sub-elemento `.card__image` que renderice una imagen en la parte superior de la card con `width: 100%`, `object-fit: cover`, y altura configurable mediante custom property `--card-image-height` con valor por defecto de 12rem.
2. THE Card con sub-elemento `.card__image` SHALL aplicar `border-radius` en las esquinas superiores igual a `var(--radius-md)` para alinearse con el borde redondeado de la card, y eliminar el border-radius de las esquinas inferiores de la imagen.
3. WHEN la imagen del Card no carga correctamente, THE Card SHALL mantener el espacio reservado con `background-color: var(--surface-1)` como placeholder visual.

### Requisito 11: Componente Card — Variante Outlined

**Historia de usuario:** Como desarrollador, quiero una variante de card con borde más prominente y sin fondo, para que pueda crear cards que se distingan del fondo sin usar elevación.

#### Criterios de aceptación

1. THE Card SHALL proveer una variante `.card--outlined` que aplique `background-color: transparent` y un borde de `1px solid var(--border-default-color)`.
2. WHEN el usuario posiciona el cursor sobre un Card con variante `.card--outlined.card--interactive`, THE Card SHALL mostrar un cambio de `border-color` a `var(--zinc-400)` con transición de 150ms ease.

### Requisito 12: Componente Card — Showcase de variantes en demo

**Historia de usuario:** Como desarrollador que evalúa el design system, quiero ver todas las variantes de card en el demo, para que pueda comparar visualmente las opciones disponibles.

#### Criterios de aceptación

1. THE Demo_Page SHALL incluir una sección "Cards — Variantes" que muestre cada variante de card (elevated, ghost, accent-left, image-header, outlined) con contenido de ejemplo representativo.
2. THE Demo_Page SHALL mostrar al menos una card con imagen de cabecera usando un placeholder visual o imagen de ejemplo.
3. THE Demo_Page SHALL mostrar las variantes de card en un grid responsive usando el patrón existente `.demo-grid` con `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`.

### Requisito 13: Integración con el sistema de archivos existente

**Historia de usuario:** Como desarrollador del design system, quiero que los nuevos componentes sigan la estructura de archivos existente, para que el proyecto mantenga su organización modular.

#### Criterios de aceptación

1. THE Sidebar SHALL tener su CSS en `components/sidebar/sidebar.css` y su JavaScript en `components/sidebar/sidebar.js`, siguiendo la convención de directorio por componente del proyecto.
2. THE Typography SHALL tener su CSS en `components/typography/typography.css`, siguiendo la convención de directorio por componente del proyecto.
3. THE archivo `index.css` SHALL importar los nuevos archivos CSS de componentes (`sidebar/sidebar.css`, `typography/typography.css`) en la sección de componentes, manteniendo el orden existente.
4. THE Demo_Page SHALL incluir las nuevas secciones de showcase integradas con las secciones existentes, manteniendo la estructura de `demo-section` con heading y subtext.

### Requisito 14: Accesibilidad transversal

**Historia de usuario:** Como usuario con discapacidad, quiero que los nuevos componentes sean accesibles por teclado y lectores de pantalla, para que pueda usar la interfaz sin barreras.

#### Criterios de aceptación

1. THE Sidebar SHALL usar el elemento semántico `<aside>` con `role="complementary"` y un `aria-label` descriptivo.
2. THE Sidebar SHALL ser completamente navegable por teclado, permitiendo recorrer todos los enlaces con Tab y activarlos con Enter.
3. WHEN el Sidebar está en modo mobile overlay, THE Sidebar SHALL implementar trampa de foco (focus trap) que mantenga el foco dentro del sidebar mientras está abierto.
4. THE Typography SHALL usar elementos HTML semánticos apropiados en los ejemplos del demo (`<h1>`-`<h4>` para headings, `<p>` para párrafos, `<code>` para código).
5. THE Card con sub-elemento `.card__image` SHALL requerir un atributo `alt` descriptivo en la imagen para lectores de pantalla.
6. WHEN un Card con variante `.card--interactive` recibe foco por teclado, THE Card SHALL mostrar un outline de 2px solid `var(--zinc-950)` con offset de 2px.

### Requisito 15: Compatibilidad con temas

**Historia de usuario:** Como usuario, quiero que todos los nuevos componentes funcionen correctamente en tema claro y oscuro, para que la experiencia visual sea coherente al cambiar de tema.

#### Criterios de aceptación

1. THE Sidebar, Typography, y las nuevas variantes de Card SHALL funcionar correctamente en tema claro y oscuro sin necesidad de reglas CSS específicas por tema, utilizando exclusivamente tokens semánticos que se redefinen en `themes/dark.css`.
2. IF un componente nuevo requiere un token semántico que no existe en el sistema actual, THEN THE componente SHALL definir el token en `:root` y en `.theme-dark` dentro de `themes/dark.css` antes de utilizarlo.
3. THE Demo_Page SHALL permitir verificar visualmente todos los nuevos componentes en ambos temas mediante el Theme_Switcher existente.
