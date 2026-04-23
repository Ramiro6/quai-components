# CSS Architecture for Design Systems

## Layer Strategy

Use `@layer` to manage specificity predictably. Name layers from lowest to highest priority:

```css
@layer reset, tokens, base, components, utilities, overrides;
```

**Why layers beat specificity hacks**: Instead of fighting with `!important` or inflated selectors, you declare intent. A utility class in `utilities` layer always beats a component style in `components`—no specificity math needed.

## Token Architecture (Two-Layer Model)

Every design system needs exactly two token layers:

```css
/* Layer 1 — Primitives: the raw palette */
--zinc-900: oklch(15% 0.005 270);
--violet-500: oklch(55% 0.15 290);

/* Layer 2 — Semantics: named roles that reference primitives */
--color-text: var(--zinc-900);
--accent: var(--violet-500);
```

**Only reference semantic tokens in components.** Never use `--zinc-900` inside a button. This is how theming and dark mode work without rewriting component code — only the semantic layer changes.

## Naming Conventions

Use a consistent pattern: `--[category]-[property]-[variant]`

```css
/* Good */
--color-text-primary
--color-text-secondary
--color-text-muted
--space-4
--radius-md
--text-sm

/* Bad (inconsistent category, value-based names) */
--textColor
--font-size-14
--spacing-8px
--grayText
```

Value-based names (`--font-size-14`) break the moment you change the value. Name for role, not value.

## Component CSS Structure

Follow this order within a component file:

```css
/* 1. Custom properties scoped to the component */
.button {
  --button-height: 2.25rem;
  --button-padding-x: 1rem;
  --button-radius: var(--radius-md);
  --button-bg: var(--accent);
  --button-color: var(--color-primary-foreground);
}

/* 2. Base layout and visual styles */
.button {
  display: inline-flex;
  align-items: center;
  height: var(--button-height);
  /* ... */
}

/* 3. States — in this order */
.button:hover { }
.button:focus-visible { }
.button:active { }
.button[disabled] { }

/* 4. Variants via modifiers */
.button--secondary { }
.button--ghost { }
.button--sm { }
.button--lg { }
```

Scoped custom properties on the component root allow consumers to override one property without forking the entire component.

## Dark Mode Without Duplication

**Correct pattern**: semantic tokens swap, component code stays the same.

```css
/* Light (default) */
:root {
  --background: oklch(99% 0.003 270);
  --color-text: oklch(15% 0.005 270);
}

/* Dark */
.theme-dark {
  --background: oklch(14% 0.005 270);
  --color-text: oklch(95% 0.003 270);
}

/* Component — never changes */
.card {
  background: var(--background);
  color: var(--color-text);
}
```

**Wrong pattern**: duplicating component rules under `.theme-dark .card {}`. This creates maintenance debt.

## When to Use Utility Classes

Utility classes are for **one-off adjustments**, not component construction. If you use 8+ utility classes on a single element, you need a component.

In a design system, prefer component classes for everything that repeats. Use utilities only for:
- Spacing adjustments between components (`mt-4`, `gap-2`)
- Text alignment or display overrides
- State visibility (`hidden`, `sr-only`)

Never use utility classes inside component CSS files — that's what component scoped properties are for.

## Avoiding Common Pitfalls

**Over-specificity**: `.page .sidebar .nav .nav__item a:hover` — this is unmaintainable. Max 2 levels deep in component selectors.

**Magic numbers**: `margin-top: 13px` — every hardcoded value is a future bug. Use tokens or calc().

**`@media` inside components**: Prefer container queries (`@container`) for component-level responsiveness. Reserve media queries for page-level layout.

**Vendor prefixes**: Don't add them manually. Use Autoprefixer if you need a build step; otherwise the modern browser baseline (2022+) doesn't need most of them.

---

**Avoid**: Deeply nested selectors. Duplicating token values in component files. Using primitive tokens directly in components. Writing dark mode as duplicate component rules.
