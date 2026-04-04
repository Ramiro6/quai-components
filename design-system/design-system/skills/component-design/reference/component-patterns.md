# Component Design Patterns

## The Anatomy of a Well-Designed Component

Every component has three responsibilities:

1. **Structure** — what it IS (HTML semantics)
2. **Appearance** — how it LOOKS (CSS tokens)
3. **Behavior** — how it WORKS (JS, only if necessary)

Separate these cleanly. Appearance must never depend on behavior (no JS-injected inline styles). Behavior must never re-implement appearance (no `element.style.color`).

## Variant Architecture

Use data attributes or BEM modifiers for variants, never separate class trees:

```html
<!-- Modifier approach (BEM) -->
<button class="button button--secondary button--sm">...</button>

<!-- Data attribute approach (more flexible with complex variants) -->
<button class="button" data-variant="secondary" data-size="sm">...</button>
```

Data attributes win when variants combine in complex ways — the CSS becomes:

```css
.button[data-variant="secondary"] { }
.button[data-size="sm"] { }
/* Combination — no extra class needed */
.button[data-variant="secondary"][data-size="sm"] { }
```

**Pick one approach and be consistent** across the entire design system.

## Compound Components

For components that have multiple parts (Card with Header, Body, Footer), use a flat class namespace rather than nesting custom elements:

```html
<div class="card">
  <div class="card__header">...</div>
  <div class="card__body">...</div>
  <div class="card__footer">...</div>
</div>
```

The double-underscore separates element from sub-element. Never go deeper than two levels: `.card__header__title` is a smell — introduce `.card__title` instead.

## Interactive State Design

Every interactive component must handle these states — no exceptions:

| State | Trigger | Minimum visual change |
|-------|---------|----------------------|
| Default | - | Base appearance |
| Hover | Mouse over | Background lightness or opacity shift |
| Focus-visible | Keyboard focus | Visible outline ring (2px minimum, offset 2px) |
| Active | Pressed | Scale down (0.97) or darker background |
| Disabled | `disabled` attribute | 40% opacity, `not-allowed` cursor |
| Loading | JS `.is-loading` | Spinner replaces or overlays content |

```css
/* Focus ring — accessible, not garish */
.button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* Active — tactile press feeling */
.button:active:not([disabled]) {
  transform: scale(0.97);
}

/* Disabled — visually and functionally */
.button[disabled] {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}
```

## Size Variants via Scoped Properties

Don't duplicate component code for sizes. Use component-level custom properties:

```css
.button {
  /* Default (md) */
  --button-height: 2.25rem;
  --button-padding-x: 1rem;
  --button-text: var(--text-sm);
}

.button--sm {
  --button-height: 1.75rem;
  --button-padding-x: 0.75rem;
  --button-text: var(--text-xs);
}

.button--lg {
  --button-height: 2.75rem;
  --button-padding-x: 1.5rem;
  --button-text: var(--text-base);
}
```

One set of layout rules, three property sets. Adding a new size never touches the layout code.

## Icon Integration

Icons inside components should:

1. Be sized relative to the text (`1em` or `1.25em`) — not hardcoded pixels
2. Use `currentColor` for fill/stroke — they inherit text color automatically
3. Have `aria-hidden="true"` when decorative, `role="img" aria-label="..."` when meaningful

```css
.button__icon {
  width: 1em;
  height: 1em;
  flex-shrink: 0;
}

/* or SVG directly */
.button svg {
  width: 1em;
  height: 1em;
  fill: currentColor;
}
```

## Progressive Enhancement for Interactive Components

Components with JS behavior must degrade gracefully:

1. **Write CSS-only baseline first** — a disclosure that works with `<details>/<summary>`, a tab panel that's accessible without JS.
2. **Enhance with JS** — add ARIA, animation, keyboard management.
3. **Never rely on JS for basic content visibility** — if JS fails, content must still be readable.

```js
// Enhancement pattern
document.addEventListener('DOMContentLoaded', () => {
  // Query all instances
  document.querySelectorAll('[data-component="modal"]').forEach(el => {
    initModal(el);
  });
});
```

## Accessibility Checklist per Component

- [ ] Correct semantic HTML element (button not div, nav not div, etc.)
- [ ] Focus visible in all themes (light and dark)
- [ ] Keyboard operable without mouse
- [ ] ARIA roles/states where native HTML semantics are insufficient
- [ ] Minimum 44×44px touch target
- [ ] Color is never the only means of conveying information
- [ ] All images/icons have text alternatives or `aria-hidden`

---

**Avoid**: Recreating native HTML behavior (custom checkboxes without proper ARIA). Using `div` and `span` where semantic elements exist. Hardcoding sizes that should be tokens. Writing separate CSS for dark mode per component instead of relying on semantic token swaps.
