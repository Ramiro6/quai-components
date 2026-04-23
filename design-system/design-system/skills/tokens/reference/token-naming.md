# Token Naming & Structure

## The Two-Layer Rule

Every token system must have exactly two layers. More layers create confusion; fewer layers make theming impossible.

```
Layer 1 — Primitives    Concrete values. Never used directly in components.
Layer 2 — Semantics     Named roles. These are what components consume.
```

```css
/* Layer 1: Primitives — what IS it? */
--zinc-100: oklch(96% 0.004 270);
--zinc-900: oklch(15% 0.005 270);
--violet-500: oklch(55% 0.15 290);

/* Layer 2: Semantics — what does it DO? */
--background: var(--zinc-100);
--color-text: var(--zinc-900);
--accent: var(--violet-500);
```

Theming (dark mode, brand variants) only touches Layer 2. Layer 1 never changes.

## Naming Formula

```
--[category]-[property]-[variant?]-[state?]
```

| Segment | Examples | Notes |
|---------|---------|-------|
| category | `color`, `text`, `space`, `radius`, `border` | Top-level domain |
| property | `text`, `bg`, `surface`, `primary`, `secondary` | The role |
| variant | `subtle`, `inverted`, `muted` | Optional modifier |
| state | `hover`, `active`, `disabled` | Optional — only for tokens that vary by state |

### Good names
```css
--color-text              /* Default text color */
--color-text-secondary    /* Secondary/muted text */
--color-text-muted        /* Placeholder, captions */
--color-surface-1         /* Card background */
--color-surface-2         /* Elevated surface */
--color-border            /* Default border */
--color-border-focus      /* Focus ring color */
--color-success           /* Success state */
--color-success-subtle    /* Success background tint */
```

### Bad names (and why)
```css
--gray-text               /* Category is a primitive, not a role */
--textColorPrimary        /* camelCase is inconsistent */
--font-size-14            /* Value-based: breaks when value changes */
--blue                    /* No role — what does "blue" mean in context? */
--button-color            /* Too specific — tokens are system-wide, not component-specific */
```

## Color Token Categories

For Kiro DS, the semantic color tokens should cover:

```css
/* Text */
--color-text             /* Primary body text */
--color-text-secondary   /* Supporting text */
--color-text-muted       /* Placeholders, captions, timestamps */
--color-text-inverted    /* Text on colored backgrounds */
--color-text-disabled    /* Disabled state */

/* Surfaces */
--background             /* Page background */
--surface-1              /* Cards, panels */
--surface-2              /* Modals, popovers (elevated) */
--surface-overlay        /* Backdrop, scrim */

/* Interactive */
--color-primary          /* Primary action color */
--color-primary-hover    /* Primary action hover */
--accent                 /* Brand accent (CTAs, links) */
--accent-subtle          /* Accent tint background */

/* Borders */
--border-default         /* Standard borders */
--border-subtle          /* De-emphasized borders */
--border-strong          /* High-emphasis borders */
--border-focus           /* Focus ring */

/* States */
--color-success          /* Confirmations */
--color-success-subtle   /* Success backgrounds */
--color-error            /* Errors, destructive */
--color-error-subtle     /* Error backgrounds */
--color-warning          /* Caution */
--color-warning-subtle   /* Warning backgrounds */
--color-info             /* Informational */
--color-info-subtle      /* Info backgrounds */
```

## Spacing Scale

Use a multiplicative scale, not arbitrary values. The base unit is `0.25rem` (4px):

```css
--space-1:  0.25rem;   /*  4px */
--space-2:  0.5rem;    /*  8px */
--space-3:  0.75rem;   /* 12px */
--space-4:  1rem;      /* 16px */
--space-5:  1.25rem;   /* 20px */
--space-6:  1.5rem;    /* 24px */
--space-8:  2rem;      /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
```

Skip odd increments (`--space-7`, `--space-9`). They exist in Tailwind but create decision fatigue. The gaps in the scale force intentional choices.

## Typography Tokens

Size tokens describe size steps, not pixel values:

```css
/* Scale — name by role, not by value */
--text-xs:   0.75rem;     /* Captions, labels */
--text-sm:   0.875rem;    /* Secondary UI */
--text-base: 1rem;        /* Body text */
--text-lg:   1.125rem;    /* Lead text */
--text-xl:   1.25rem;     /* Subheadings */
--text-2xl:  1.5rem;      /* Section headings */
--text-3xl:  1.875rem;    /* Page titles */
```

## When to Add a New Token

Add a token when:
- A value is used in 3+ places
- A value needs to change across themes (light/dark, brand variants)
- The value represents a design decision that should be documented

Do NOT add a token for:
- One-off values used in a single component and never reused
- Values that are derived from other tokens via calc() — just use calc()
- Browser defaults you're not overriding

---

**Avoid**: Token names that describe appearance rather than role (`--blue` instead of `--accent`). Component-specific tokens in the global token file. Inconsistent naming conventions within the same category. Too many token layers (3+).
