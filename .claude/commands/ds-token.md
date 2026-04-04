# Design System — Add or Modify Token

Task: $ARGUMENTS

## Instructions

You are modifying design tokens in `design-system/design-system/tokens/`.

### Files by category

| File | Contains |
|------|----------|
| `tokens/colors.css` | Primitive zinc scale, accent, semantic state colors, surface tokens |
| `tokens/typography.css` | Font family, size scale, weights, line-heights, letter-spacing |
| `tokens/spacing.css` | Spacing scale |
| `tokens/borders.css` | Border radius, border width |
| `tokens/index.css` | Imports all token files |

### Rules

1. **OKLCH only** for all color tokens — `oklch(L% C H)`.
2. **Two-layer model**: Add primitives first, then semantic aliases that reference them.
   ```css
   /* Primitive */
   --violet-500: oklch(55% 0.15 290);
   /* Semantic */
   --accent: var(--violet-500);
   ```
3. **Dark mode**: If the token is semantic (surface, text, border, etc.), also add the dark-mode override to `themes/dark.css`.
4. **Naming convention**: use kebab-case, prefixed by category (`--color-*`, `--text-*`, `--space-*`, `--radius-*`).
5. After changes, verify the token is used or demonstrable in `demo.html`.

Read the target token file before editing. Show the diff before writing.
