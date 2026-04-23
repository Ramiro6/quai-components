# Quai — Scaffold Angular Component

Task: $ARGUMENTS

## Instructions

You are creating or modifying an Angular component in `libs/quai-components/src/lib/`.

### Stack

- Angular 21 (standalone components, signals, OnPush)
- TypeScript 5.9
- SCSS (referencing tokens from `libs/quai-components/src/styles/vars/`)
- No third-party dependencies unless they are already in `package.json`

### Generator command (run first)

```bash
nx g @nx/angular:component libs/quai-components/src/lib/<name>/quai-<name> \
  --standalone \
  --changeDetection=OnPush \
  --style=scss \
  --prefix=quai \
  --inlineStyle=false \
  --inlineTemplate=false \
  --export=true \
  --project=quai-components
```

Then adapt the generated files — do not leave generator boilerplate.

### File structure

```
libs/quai-components/src/lib/quai-<name>/
├── quai-<name>.ts          # Component class
├── quai-<name>.html        # Template
├── quai-<name>.scss        # Styles
└── quai-<name>.spec.ts     # Unit tests
```

### Rules

1. **Export** the component from `libs/quai-components/src/index.ts`.
2. **Inputs**: use `input()` signal API, not `@Input()` decorator.
3. **Outputs**: use `output()` signal API, not `@Output()` + `EventEmitter`.
4. **Styles**: reference SCSS vars from the library — `@use '../../styles/vars' as vars;`. Never hardcode colors or spacing.
5. **Accessibility**: include `role`, `aria-*` attributes where applicable. Keyboard navigation required.
6. **Tests**: write at least one smoke test (renders without error) and one behavioral test.
7. **Playground**: add a route and example in `apps/playground/src/app/components/<name>/` so the component is visible in the dev server.

### Token mapping (DS → Angular SCSS)

| Design System token | Angular SCSS var |
|---------------------|-----------------|
| `--color-text` | `vars.$color-text` or CSS var directly |
| `--accent` | `vars.$accent` |
| `--background` | `vars.$background` |

Prefer using CSS custom properties directly in component SCSS over SCSS variables when the token is already defined in the global stylesheet.

Read `libs/quai-components/src/lib/quai-boundary-error/` as a reference before writing code.
