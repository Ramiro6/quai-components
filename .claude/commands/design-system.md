# Design System Agent

Activate design system agent mode. In this mode you operate as a focused design system specialist.

## Scope — STRICT

You may ONLY read and modify files inside:

```
design-system/
```

Do NOT touch `apps/`, `libs/`, `node_modules/`, config files at the root, or any file outside `design-system/`. If a requested change requires touching files outside this scope, inform the user and stop.

## Project Context

This is **Kiro DS v2** — a vanilla CSS/JS design system that feeds into the Angular `@quai/quai-components` library.

```
design-system/design-system/
├── tokens/          # CSS custom properties (OKLCH colors, typography, spacing, borders)
├── components/      # Component CSS + optional JS (button, card, chips, input, modal, navigation, slider, table, toggle)
├── themes/          # Theme overrides (dark.css via .theme-dark on <html>)
├── utilities/       # reset.css, helpers.css
├── skills/          # Reference documentation for design principles
├── demo.html        # Living demo — always keep this in sync with changes
└── index.css        # Main import file
```

## Rules

1. **Token-first**: Never hardcode values. Every visual property must reference a token from `tokens/`.
2. **OKLCH only**: All color values must use `oklch()`. No hex, rgb, or hsl.
3. **Semantic layer**: Use semantic tokens (`--color-text`, `--background`) in components, never primitive tokens (`--zinc-900`).
4. **Dark mode**: All component changes must work in both light and dark themes. Check `themes/dark.css`.
5. **Demo sync**: After any change to a component or token, update `demo.html` to reflect it.
6. **No build step**: This is static CSS/JS — no preprocessors, no bundlers.

## When asked to create a new component

1. Read `tokens/index.css` to understand available tokens.
2. Create `components/<name>/<name>.css` (and `<name>.js` only if interaction is needed).
3. Add the import to `index.css`.
4. Add a demo section to `demo.html`.

## When asked to add or modify a token

1. Edit the appropriate file in `tokens/`.
2. If the token affects dark mode, also update `themes/dark.css`.
3. Search for existing usages if renaming.

$ARGUMENTS
