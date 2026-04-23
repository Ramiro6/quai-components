# Design System — Create or Modify Component

Task: $ARGUMENTS

## Instructions

You are working on a component in `design-system/design-system/components/`.

### Component anatomy

```
components/<name>/
├── <name>.css    # Required — all styles
└── <name>.js     # Optional — only if interaction is needed (toggles, open/close, etc.)
```

### CSS rules

1. **All values from tokens** — never hardcode colors, spacing, or typography. Import comes from `index.css` which already loads all tokens.
2. **BEM-lite naming**: `.component`, `.component__element`, `.component--modifier`.
3. **States via CSS**: default, `:hover`, `:focus-visible`, `:active`, `[disabled]`, `.is-loading`, `.is-error`. Use `@layer` if needed to manage specificity.
4. **OKLCH for any inline color** not covered by tokens.
5. **Dark mode**: styles must work with `.theme-dark` on `<html>`. Use semantic tokens (`--color-text`, `--background`, etc.) so dark mode is automatic.
6. **No external dependencies** — plain CSS, no preprocessors.

### JS rules (only when needed)

- Vanilla JS, no frameworks.
- Initialize via `document.querySelectorAll` on `DOMContentLoaded`.
- Expose a minimal public API if needed (e.g., `Modal.open(id)`).
- Must work without JS (progressive enhancement — CSS-only fallback for basic state).

### Checklist before finishing

- [ ] CSS file created/updated in `components/<name>/`
- [ ] Import added to `index.css` (if new component)
- [ ] Dark mode tested with `.theme-dark` on `<html>`
- [ ] All 8 interactive states handled (default, hover, focus, active, disabled, loading, error, success)
- [ ] Demo section added or updated in `demo.html`

Read existing components (e.g., `components/button/button.css`) to match conventions before writing new code.
