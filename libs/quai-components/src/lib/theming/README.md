# Quai Theming

Quai components support **two approaches** to customize themes:

## 1. Static Theming (SCSS Mixin)

Define your theme statically in SCSS using the `create-theme()` mixin.

### Basic Usage

```scss
// your-app/styles.scss
@use '@quai/quai-components/styles/themes' as quai-themes;

:root {
  @include quai-themes.create-theme(
    $background: oklch(99% 0.003 270),
    $text: oklch(15% 0.005 270),
    $primary: oklch(55% 0.15 290),
    $accent: oklch(55% 0.15 290)
  );
}

// Dark theme variant
@media (prefers-color-scheme: dark) {
  :root {
    @include quai-themes.create-theme(
      $background: oklch(13% 0.005 270),
      $text: oklch(95% 0.005 270),
      $primary: oklch(78% 0.17 210)
    );
  }
}
```

### All Available Parameters

```scss
@include quai-themes.create-theme(
  /* Backgrounds */
  $background: oklch(...),
  $surface-1: oklch(...),
  $surface-2: oklch(...),

  /* Text */
  $text: oklch(...),
  $text-secondary: oklch(...),
  $text-muted: oklch(...),

  /* Brand */
  $primary: oklch(...),
  $primary-foreground: oklch(...),
  $accent: oklch(...),
  $accent-subtle: oklch(...),

  /* Status colors */
  $success: oklch(...),
  $success-subtle: oklch(...),
  $error: oklch(...),
  $error-subtle: oklch(...),
  $warning: oklch(...),
  $warning-subtle: oklch(...),
  $info: oklch(...),
  $info-subtle: oklch(...),

  /* Typography */
  $font-family: 'Inter, system-ui',
  $font-regular: 400,
  $font-medium: 500,
  $font-semibold: 600,
  $text-xs: 0.75rem,
  $text-sm: 0.875rem,
  $text-base: 1rem,
  $text-lg: 1.125rem,
  $text-xl: 1.25rem,
  $text-2xl: 1.5rem,
  $leading-tight: 1.0,
  $leading-ui: 1.4,
  $leading-body: 1.6,
  $tracking-tight: -0.025em,
  $tracking-normal: 0,
  $tracking-wide: 0.025em,

  /* Spacing (4pt grid) */
  $space-1: 0.25rem,
  $space-2: 0.5rem,
  $space-3: 0.75rem,
  $space-4: 1rem,
  $space-5: 1.25rem,
  $space-6: 1.5rem,
  $space-8: 2rem,
  $space-10: 2.5rem,
  $space-12: 3rem,
  $space-16: 4rem,

  /* Shape */
  $radius-sm: 0.25rem,
  $radius-md: 0.375rem,
  $radius-lg: 0.75rem,
  $radius-full: 9999px,
  $shadow-float: 0 4px 6px -1px oklch(0% 0 0 / 0.05)
);
```

**Only pass the parameters you want to override.** Unset parameters use library defaults.

---

## 2. Dynamic Theming (TypeScript Provider)

Use the `provideQuaiTheme()` provider to switch themes at runtime.

### Basic Usage

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideQuaiTheme } from '@quai/quai-components';

export const appConfig: ApplicationConfig = {
  providers: [
    provideQuaiTheme({
      defaultScheme: 'auto', // 'light' | 'dark' | 'auto'
      themes: {
        light: {
          background: 'oklch(99% 0.003 270)',
          text: 'oklch(15% 0.005 270)',
          primary: 'oklch(55% 0.15 290)',
          // ... more tokens
        },
        dark: {
          background: 'oklch(13% 0.005 270)',
          text: 'oklch(95% 0.005 270)',
          primary: 'oklch(78% 0.17 210)',
        },
        midnight: {
          background: 'oklch(3% 0.002 270)',
          text: 'oklch(98% 0.001 270)',
          primary: 'oklch(60% 0.16 210)',
        },
      },
      // Optional: override tokens for all themes
      overrides: {
        fontFamily: 'Geist Sans, system-ui',
      },
    }),
    // ... other providers
  ],
};
```

### Inject & Switch Themes

```typescript
import { Component, inject } from '@angular/core';
import { QuaiThemeService } from '@quai/quai-components';

@Component({
  selector: 'app-settings',
  template: `
    <button (click)="switchTheme('light')">Light</button>
    <button (click)="switchTheme('dark')">Dark</button>
    <button (click)="switchTheme('midnight')">Midnight</button>
    <p>Active: {{ activeTheme }}</p>
  `,
})
export class SettingsComponent {
  themeService = inject(QuaiThemeService);
  activeTheme = this.themeService.getActiveThemeName();

  switchTheme(name: string): void {
    this.themeService.switchTheme(name);
    this.activeTheme = this.themeService.getActiveThemeName();
  }

  getAvailable(): string[] {
    return this.themeService.getAvailableThemes();
  }
}
```

### Configuration Options

```typescript
interface QuaiThemeProviderConfig {
  /**
   * Default color scheme:
   * - 'light': Always light
   * - 'dark': Always dark
   * - 'auto': Follow OS preference (default)
   */
  defaultScheme?: 'light' | 'dark' | 'auto';

  /**
   * Predefined themes keyed by name.
   * Built-in: 'light' and 'dark'
   */
  themes?: Record<string, Partial<QuaiTheme>>;

  /**
   * Override specific tokens in the active theme.
   * Merged with the selected theme.
   */
  overrides?: Partial<QuaiTheme>;
}
```

---

## Which Approach Should I Use?

| Use SCSS Mixin | Use TypeScript Provider |
|---|---|
| Theme is static & known at build time | Themes change at runtime |
| Single brand theme with light/dark variants | Multiple preset themes (light, dark, midnight, etc.) |
| Consistent with build pipeline | Theme switcher in the app |
| No JavaScript overhead | Minimal JavaScript (signal-based) |
| Component library approach | Multi-tenant / white-label apps |

---

## Complete Example: Custom Theme

### SCSS Mixin Approach

```scss
// my-app/styles.scss
@use '@quai/quai-components/styles';
@use '@quai/quai-components/styles/themes' as quai-themes;

// Override with custom brand colors
:root {
  @include quai-themes.create-theme(
    $primary: oklch(52% 0.22 160),    // Green instead of violet
    $accent: oklch(58% 0.18 75),      // Amber
    $text: oklch(12% 0.01 270),
    $background: oklch(99.5% 0.001 270)
  );
}

// Dark mode
@media (prefers-color-scheme: dark) {
  :root {
    @include quai-themes.create-theme(
      $primary: oklch(88% 0.22 160),
      $accent: oklch(78% 0.18 75),
      $text: oklch(96% 0.002 270),
      $background: oklch(11% 0.003 270)
    );
  }
}
```

### TypeScript Provider Approach

```typescript
// app.config.ts
provideQuaiTheme({
  defaultScheme: 'auto',
  themes: {
    light: {
      primary: 'oklch(52% 0.22 160)',
      accent: 'oklch(58% 0.18 75)',
      text: 'oklch(12% 0.01 270)',
      background: 'oklch(99.5% 0.001 270)',
    },
    dark: {
      primary: 'oklch(88% 0.22 160)',
      accent: 'oklch(78% 0.18 75)',
      text: 'oklch(96% 0.002 270)',
      background: 'oklch(11% 0.003 270)',
    },
  },
})
```

Both produce **identical results** — the choice is architectural.

---

## Color Space: OKLCH

Quai uses **OKLCH** for all colors. It's perceptually uniform, meaning equal steps in lightness look equal to the human eye.

Format: `oklch(lightness% chroma hue)`

- **Lightness** (0-100%): 0 = black, 100 = white
- **Chroma** (0-0.4+): Saturation / colorfulness
- **Hue** (0-360): Color angle on the color wheel

```
oklch(55% 0.15 290)  ← violet accent
       ↓   ↓    ↓
      L   C    H
```

**Why OKLCH?**
- Perceptually uniform (equal L steps look equally light)
- Consistent across hues (blue at 50% L looks equally bright as red at 50% L)
- Better for accessible contrast (predictable)
- More intuitive than HSL or hex colors

---

## API Reference

### `provideQuaiTheme(config)`

Provider function to enable theming in your app.

```typescript
provideQuaiTheme(config: QuaiThemeProviderConfig): EnvironmentProviders
```

### `QuaiThemeService`

Service for managing theme state and switching.

```typescript
class QuaiThemeService {
  switchTheme(themeName: string): void
  getActiveThemeName(): string
  getAvailableThemes(): string[]
}
```

### `QuaiTheme`

Complete theme configuration interface combining all token categories.

```typescript
interface QuaiTheme {
  // Colors
  background?: string;
  primary?: string;
  accent?: string;
  success?: string;
  error?: string;
  warning?: string;
  // ... + typography, spacing, shape
}
```

---

## CSS Custom Properties

All themes inject CSS custom properties prefixed with `--quai-`:

```css
--quai-color-text
--quai-color-primary
--quai-space-4
--quai-font-family
--quai-radius-md
/* etc. */
```

Components consume these via normal CSS, so theming is automatic.

---

## Tips

1. **Use OKLCH for colors** — stick to the `oklch(L% C H)` format
2. **Only override what you need** — don't redefine every token
3. **Test dark mode** — use browser DevTools to test `prefers-color-scheme: dark`
4. **Respect user preference** — use `defaultScheme: 'auto'` by default
5. **Create a custom theme file** — keep your theme config in one place (my-app/theme.ts or styles/theme.scss)

