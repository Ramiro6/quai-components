# Implementation Plan: DS Components Phase 2

## Overview

This plan implements 8 features for the Kiro DS v2 design system, ordered from simpler CSS-only tasks to CSS+JS components, then demo/integration work. Each task builds incrementally on previous steps, with checkpoints for validation. All styles follow the existing BEM + semantic token architecture, and all JavaScript uses the established IIFE pattern.

## Tasks

- [x] 1. Implement Spacing Utilities (CSS-only)
  - [x] 1.1 Create `utilities/spacing.css` with margin utility classes
    - Generate `.m-{scale}` (all sides), `.mt-`, `.mr-`, `.mb-`, `.ml-` (individual sides), `.mx-`, `.my-` (axes) for scale values 0, 1, 2, 3, 4, 6, 8, 12, 16, 24
    - Include `.mx-auto` for horizontal centering
    - All values reference existing `var(--space-*)` tokens
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

  - [x] 1.2 Add padding utility classes to `utilities/spacing.css`
    - Generate `.p-{scale}`, `.pt-`, `.pr-`, `.pb-`, `.pl-`, `.px-`, `.py-` for the same scale values
    - Include `.p-0` for reset
    - _Requirements: 10.2, 10.4, 10.5_

  - [x] 1.3 Add gap utility classes to `utilities/spacing.css`
    - Generate `.gap-{scale}`, `.gap-x-{scale}`, `.gap-y-{scale}` for scale values 1, 2, 3, 4, 6, 8, 12, 16, 24
    - _Requirements: 11.1, 11.2_

- [x] 2. Implement Responsive Grid Layout System (CSS-only)
  - [x] 2.1 Create `utilities/grid.css` with 12-column grid
    - Implement `.grid` container with `display: grid`, `grid-template-columns: repeat(12, 1fr)`, `gap: var(--space-4)`
    - Implement `.col-1` through `.col-12` span classes and `.col-full` for full-width span
    - _Requirements: 17.1, 17.2, 17.4_

  - [x] 2.2 Add responsive column span classes to `utilities/grid.css`
    - Implement `.sm\:col-{n}` at `min-width: 640px`, `.md\:col-{n}` at `min-width: 768px`, `.lg\:col-{n}` at `min-width: 1024px`
    - Use escaped colon syntax for class names
    - _Requirements: 17.3_

  - [x] 2.3 Add flex helpers, auto-fit grid, and stacking utilities to `utilities/grid.css`
    - Implement `.row` (flex-wrap), `.col` (flex: 1 1 0%)
    - Implement `.grid-auto` with `repeat(auto-fit, minmax(var(--grid-auto-min, 280px), 1fr))`
    - Implement `.stack-v` (vertical) and `.stack-h` (horizontal) stacking utilities
    - All layout classes use `gap: var(--space-4)` as default, overridable via gap utilities
    - _Requirements: 18.1, 18.2, 18.3, 18.4, 18.5_

- [x] 3. Implement Button Press Animation (CSS-only enhancement)
  - [x] 3.1 Add press animation to `components/button/button.css`
    - Extend the `.button` base `transition` property to include `transform 150ms ease`
    - Add `.button:active:not([disabled]) { transform: scale(0.97); }` rule
    - Verify it applies universally to all variants without per-variant rules
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

- [x] 4. Implement Header Component (CSS-only)
  - [x] 4.1 Create `components/header/header.css`
    - Implement `.header` base with flex layout, padding `var(--space-3) var(--space-6)`, bottom border, background
    - Implement `.header__brand`, `.header__content` (flex: 1), `.header__actions` sub-elements
    - Implement `.header--full` (standard padding) and `.header--sidebar-aligned` (padding-left: `var(--sidebar-width, 16rem)`) variants
    - Add responsive rule at `max-width: 767px` to remove sidebar offset on mobile
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 14.1, 14.2, 14.3_

- [x] 5. Checkpoint — Verify CSS-only components
  - Ensure all CSS files are syntactically valid
  - Verify spacing utilities, grid system, button animation, and header component render correctly
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Implement Code Block Card Component (CSS + JS)
  - [x] 6.1 Create `components/codeblock/codeblock.css`
    - Implement `.codeblock` container with border, border-radius, overflow hidden
    - Implement `.codeblock__header` with flex layout, border-bottom, padding `var(--space-3) var(--space-4)`
    - Implement `.codeblock__lang` label with `var(--text-xs)`, `var(--font-medium)`, `var(--color-text-muted)`
    - Implement `.codeblock__copy` ghost-style button with hover states
    - Implement `.codeblock__pre` with `overflow-x: auto`, padding `var(--space-4)`, `background-color: var(--surface-1)`
    - Implement `.codeblock__code` with Geist Mono font, `var(--text-sm)`, `white-space: pre`
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 2.5_

  - [x] 6.2 Create `components/codeblock/codeblock.js`
    - Implement IIFE pattern matching `modal.js` / `sidebar.js`
    - Initialize all `.codeblock__copy` buttons on DOMContentLoaded
    - Implement click handler: navigate from button to closest `.codeblock`, find `.codeblock__code`, copy `textContent`
    - Implement Clipboard API primary path with `navigator.clipboard.writeText`
    - Implement `execCommand('copy')` fallback with temporary textarea
    - Implement success feedback: change label to "Copied!" for 2000ms, update `aria-label`
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.6, 3.1, 3.2, 3.3, 3.4, 22.3_

- [x] 7. Implement Tabs Component (CSS + JS)
  - [x] 7.1 Create `components/tabs/tabs.css`
    - Implement `.tabs` container
    - Implement `.tabs__list` with flex, border-bottom, `overflow-x: auto`, hidden scrollbar (`scrollbar-width: none`, `::-webkit-scrollbar { display: none }`)
    - Implement `.tabs__tab` with padding, font styles, transparent background, `border-bottom: 2px solid transparent`, transitions
    - Implement `.tabs__tab--active` with `var(--color-text)`, `var(--font-semibold)`, `border-bottom-color: var(--color-text)`
    - Implement `.tabs__tab:hover` and `.tabs__tab:focus-visible` states
    - Implement `.tabs__panel` with padding and `[hidden] { display: none }`
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7_

  - [x] 7.2 Create `components/tabs/tabs.js`
    - Implement IIFE pattern, initialize all `.tabs` containers on DOMContentLoaded
    - Implement `activateTab()`: set `aria-selected`, toggle `tabindex`, add/remove `tabs__tab--active`, show/hide panels via `hidden` attribute
    - Implement click handler on each tab button
    - Implement keyboard navigation on tablist: ArrowRight/ArrowLeft with wrapping, Enter/Space to activate
    - Use manual activation mode (arrows move focus, Enter/Space activates)
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 7.1, 7.2, 22.1, 22.2_

- [x] 8. Checkpoint — Verify CSS+JS components
  - Ensure codeblock.js and tabs.js follow the IIFE pattern correctly
  - Verify Code Block copy functionality and Tabs keyboard navigation work as designed
  - Ensure all tests pass, ask the user if questions arise.

- [x] 9. Update `index.css` with new imports
  - Add `@import './utilities/spacing.css';` and `@import './utilities/grid.css';` in the utilities section (after helpers.css)
  - Add `@import './components/codeblock/codeblock.css';` in the components section (alphabetical order)
  - Add `@import './components/header/header.css';` in the components section
  - Add `@import './components/tabs/tabs.css';` in the components section
  - Maintain existing import order
  - _Requirements: 20.6_

- [x] 10. Update `demo.html` — Inline new CSS styles
  - Add all new component CSS (codeblock, tabs, header, spacing utilities, grid system, button press animation) inlined in the `<style>` block of `demo.html`
  - Maintain consistency with existing inlined styles
  - _Requirements: 20.7, 21.3_

- [x] 11. Update `demo.html` — Inline new JavaScript
  - Add codeblock.js and tabs.js code inlined in `<script>` blocks at the end of `demo.html` body
  - Follow the same inline script pattern used by existing components (modal, sidebar, navigation, toggle, chips)
  - _Requirements: 20.7_

- [x] 12. Update `demo.html` — Add Code Block demo section
  - Add a "Code Block" section with at least three examples: JavaScript, TypeScript, and one additional language
  - Each example should have realistic code snippets of at least 5 lines
  - Include at least one example with a long line to demonstrate horizontal scrolling
  - Each code block should have a working copy button
  - _Requirements: 4.1, 4.2, 4.3_

- [x] 13. Update `demo.html` — Add Tabs demo section
  - Add a "Tabs" section with at least one tabs example containing three or more panels with representative content
  - Include a second tabs example with enough tabs to demonstrate horizontal scroll overflow
  - _Requirements: 7.3, 7.4_

- [x] 14. Update `demo.html` — Add Modal Playground section
  - Add a "Modal — Playground" section with trigger buttons for three configurations:
    - Default modal (header + body + footer)
    - Modal without footer
    - Compact modal (reduced max-width via inline style)
  - Add corresponding `<dialog>` elements with unique IDs and `.modal` class structure
  - Use existing `data-modal-trigger` pattern for button triggers
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [x] 15. Update `demo.html` — Add Header demo section
  - Add a "Header" section with at least two examples: full-width and sidebar-aligned
  - Render examples inside bordered containers to demonstrate layout without affecting the page
  - _Requirements: 15.1, 15.2_

- [x] 16. Update `demo.html` — Add Spacing Utilities demo section
  - Add a "Spacing Utilities" section with visual demonstrations of the spacing scale
  - Show examples of margin, padding, and gap utilities applied to colored blocks
  - _Requirements: 12.1, 12.2_

- [x] 17. Update `demo.html` — Add Grid System demo section
  - Add a "Grid System" section demonstrating the 12-column grid with different column span configurations
  - Show responsive behavior with breakpoint-based column changes
  - Demonstrate `.grid-auto` with cards that reflow automatically
  - Demonstrate `.stack-v` and `.stack-h` stacking utilities
  - _Requirements: 19.1, 19.2, 19.3, 19.4_

- [x] 18. Update `demo.html` — Add Sidebar text-only variant demo
  - Add an additional sidebar example within the existing Sidebar demo section showing links without icons
  - Use the same `.sidebar__link` class and BEM structure, demonstrating no additional CSS is needed
  - _Requirements: 16.1, 16.2_

- [x] 19. Final checkpoint — Full integration verification
  - Verify all new components render correctly in both light and dark themes
  - Verify all ARIA attributes are correctly applied (tabs, code block copy button)
  - Verify button press animation works across all variants
  - Verify header sidebar-aligned variant responds correctly at mobile breakpoint
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks are ordered: CSS-only utilities first (1–4), then CSS+JS components (6–7), then integration (9–18)
- All components use exclusively semantic tokens — dark theme works via token redefinition, no `.theme-dark` per-component rules needed
- All JavaScript follows the IIFE pattern with DOMContentLoaded initialization
- All styles are both in separate component files AND inlined in `demo.html` for `file://` compatibility
- Checkpoints at tasks 5, 8, and 19 ensure incremental validation
- Each task references specific requirement acceptance criteria for traceability
