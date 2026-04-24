---
name: quai-playground-component
description: Scaffold Angular component examples for the Quai Design System playground. Creates folder structure, container component, routes, and example view.
license: MIT
metadata:
  author: Quai Design System
  version: '1.0'
---

# Quai Playground Component Scaffolder

## Overview

Generates a new component example in `apps/playground/src/app/components/` with the standard Quai Design System structure.

## Structure Generated

```
<component-name>/
├── <component-name>s.ts              # Container component (e.g., buttons.ts)
├── <component-name>s.routes.ts       # Routes config (e.g., buttons.routes.ts)
└── views/
    └── example/
        └── example-<component-name>.ts  # Example component (e.g., example-button.ts)
```

## Naming Conventions

- **Folder**: singular, lowercase (e.g., `button`, `panel`, `input`)
- **Container file**: plural form + `.ts` (e.g., `buttons.ts`)
- **Container class**: `Container{Name}` (e.g., `ContainerButton`)
- **Routes export**: `{NAME}_ROUTES` uppercase (e.g., `BUTTON_ROUTES`)
- **Example file**: `example-{name}.ts` (e.g., `example-button.ts`)
- **Example class**: `Example{Name}` (e.g., `ExampleButton`)

## Templates

### Container Component
```typescript
// buttons.ts
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'playground-container-button',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  styles: ``,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerButton {}
```

### Routes Config
```typescript
// buttons.routes.ts
import { Route } from '@angular/router';

export const BUTTON_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./buttons').then((m) => m.ContainerButton),
    children: [
      {
        path: '',
        redirectTo: 'example',
        pathMatch: 'full',
      },
      {
        path: 'example',
        loadComponent: () => import('./views/example/example-button').then((m) => m.ExampleButton),
      },
    ],
  },
];
```

### Example Component
```typescript
// views/example/example-button.ts
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'playground-example-button',
  template: `<p>Button example works!</p>`,
  styles: ``,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleButton {}
```

## Design System Style Lookup

When scaffolding a new component, **always** check if a matching CSS file exists in the design system:

- **Path to check**: `design-system/design-system/components/<component-name>/<component-name>.css`
- If the file **exists**, copy its full CSS content into the `styles` property of the **example component** (`example-<component-name>.ts`).
- If the file **does not exist**, leave `styles` empty — do not invent styles.
- **Only copy the CSS/SCSS** — do not add any logic, JS behavior, or template markup based on the design system file. The user handles the logic themselves.

### Example with design system match
```typescript
// views/example/example-button.ts — when design-system/design-system/components/button/button.css exists
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'playground-example-button',
  template: `<p>Button example works!</p>`,
  styles: `
    /* Styles pulled from design-system/design-system/components/button/button.css */
    .button { /* ... */ }
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleButton {}
```

## Integration Steps

After scaffolding:

1. **Update routing** — Add to `apps/playground/src/app/components/components.routes.ts`:
   ```typescript
   {
     path: '<component-name>',
     loadChildren: () => import('./<component-name>/<component-name>s.routes').then((m) => m.<NAME>_ROUTES),
   }
   ```

2. **Update navigation** — Add link to `apps/playground/src/share/aside.ts`:
   ```html
   <li>
     <a routerLink="<component-name>" routerLinkActive="is-active" [routerLinkActiveOptions]="{exact: false}">
       {Name}
     </a>
   </li>
   ```

3. **Customize** — Edit example component and styles as needed.

## Usage

When creating a new component, provide:
- **Component name** (singular, lowercase): `panel`, `input`, `form`, etc.
- **Display name** (for UI): `Panel`, `Input`, `Form`, etc.

The scaffolder will generate all files and folder structure automatically.
