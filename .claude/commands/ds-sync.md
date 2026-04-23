# Design System — Sync Tokens to Angular Library

Sync design tokens from the vanilla CSS design system to the Angular component library.

## Source → Destination mapping

| Source (design-system) | Destination (Angular lib) |
|------------------------|--------------------------|
| `design-system/design-system/tokens/colors.css` | `libs/quai-components/src/styles/vars/_color.scss` |
| `design-system/design-system/tokens/typography.css` | `libs/quai-components/src/styles/vars/_typography.scss` |
| `design-system/design-system/tokens/spacing.css` | `libs/quai-components/src/styles/vars/_spacing.scss` |
| `design-system/design-system/tokens/borders.css` | `libs/quai-components/src/styles/vars/_shape.scss` |
| `design-system/design-system/themes/dark.css` | `libs/quai-components/src/styles/themes/_dark.scss` |

## Process

1. Read the source token file.
2. Read the destination SCSS file.
3. Identify tokens that are new, modified, or removed.
4. Convert CSS custom properties to SCSS format:
   ```css
   /* CSS (source) */
   --color-text: var(--zinc-900);
   ```
   ```scss
   // SCSS (destination) — keep as CSS vars, not SCSS vars
   // The SCSS file re-exports them inside :root {}
   --color-text: var(--zinc-900);
   ```
5. Preserve any Angular-specific additions in the SCSS file that don't exist in the source.
6. Report a diff of what changed.

## Rules

- Never remove tokens from the Angular lib that are used in existing components — check with `grep` first.
- Keep OKLCH color values as-is.
- Dark mode overrides go in `_dark.scss` and must use the same selector convention as the existing file.

$ARGUMENTS
