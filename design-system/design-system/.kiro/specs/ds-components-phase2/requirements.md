# Requirements Document — DS Components Phase 2

## Introduction

This document defines the requirements for the second phase of component expansion for the Kiro DS v2 design system. Building on the foundation established in the `ui-components-expansion` spec (Sidebar, Typography, Card variants), this phase introduces six new components/systems and two improvements to existing components: a **Code Block Card** for displaying code snippets, a **Tabs** navigation component, a **Modal Playground** improvement for the demo page, a **Button Press Animation** enhancement, **Spacing Utilities** for margin/padding/gap, a **Header** component, a **Sidebar text-only variant** demo showcase, and a **Responsive Grid Layout System**. All new components integrate with the existing token architecture (OKLCH, zinc scale, violet accent), support dark theme via `.theme-dark` token swapping, follow BEM naming, and maintain WCAG AA accessibility. All styles are inlined in `demo.html` for `file://` compatibility, in addition to separate component files.

## Glossary

- **Code_Block**: Component that displays code snippets inside a card-like container with syntax-appropriate monospace styling, a language label, and a copy-to-clipboard button. BEM block: `.codeblock`.
- **Tabs**: Component that provides tabbed navigation with a horizontal scrollable tab list, active tab indicator, keyboard navigation via roving tabindex, and ARIA tablist/tab/tabpanel roles. BEM block: `.tabs`.
- **Modal_Playground**: An enhanced demo section in `demo.html` that showcases the existing Modal component with interactive controls for opening modals of different configurations (sizes, with/without footer).
- **Button_Press_Animation**: A subtle scale-down animation applied to all button variants on the `:active` state, providing tactile press feedback.
- **Spacing_Utilities**: A set of utility CSS classes for margin, padding, and gap based on the existing spacing token scale (`--space-1` through `--space-24`), enabling rapid layout adjustments without custom CSS.
- **Header**: A page header component that aligns with the Sidebar when present, contains a brand label, and supports full-width and sidebar-aligned variants. BEM block: `.header`.
- **Grid_System**: A responsive CSS grid/flex layout system providing a 12-column grid, responsive breakpoint prefixes, row/column helpers, auto-fit grid, and vertical/horizontal stacking utilities.
- **Demo_Page**: The `demo.html` file that serves as the interactive showcase for all design system components, with all styles inlined for `file://` compatibility.
- **Design_Token**: A CSS custom property that stores a reusable design value (color, spacing, typography, border).
- **BEM**: CSS naming convention (Block__Element--Modifier) used across all components in the system.
- **IIFE**: Immediately Invoked Function Expression — the JavaScript pattern used for all component scripts in the design system (`(function(){ ... })();`).
- **Roving_Tabindex**: Keyboard navigation pattern where one item in a group has `tabindex="0"` and the rest have `tabindex="-1"`, with arrow keys moving the active tabindex between items.
- **Geist_Mono**: The monospace font family used for code display: `'Geist Mono', ui-monospace, monospace`.

## Requirements

### Requirement 1: Code Block Card — Structure and Styling

**User Story:** As a developer, I want a code block card component that displays code snippets with proper monospace formatting and a language label, so that I can showcase code examples within the design system.

#### Acceptance Criteria

1. THE Code_Block SHALL render a container with the class `.codeblock` that contains a header area (`.codeblock__header`) and a code area (`.codeblock__pre` wrapping `.codeblock__code`).
2. THE Code_Block header SHALL display a language label element (`.codeblock__lang`) showing the programming language name in `var(--text-xs)` size with `var(--font-medium)` weight and `var(--color-text-muted)` color.
3. THE Code_Block code area SHALL use the Geist_Mono font family (`'Geist Mono', ui-monospace, monospace`) at `var(--text-sm)` size with `var(--leading-body)` line-height.
4. THE Code_Block SHALL apply a dark surface background (`var(--surface-1)`) to the code area with `var(--radius-md)` border-radius and `1px solid var(--border-default-color)` border.
5. THE Code_Block code area SHALL support horizontal scrolling via `overflow-x: auto` for code lines that exceed the container width, without truncating or wrapping the code text.
6. THE Code_Block SHALL apply padding of `var(--space-4)` to the code area and `var(--space-3) var(--space-4)` to the header area.

### Requirement 2: Code Block Card — Copy to Clipboard

**User Story:** As a user viewing code examples, I want a copy button on the code block, so that I can quickly copy the code content to my clipboard.

#### Acceptance Criteria

1. THE Code_Block SHALL include a copy button element (`.codeblock__copy`) positioned in the header area, aligned to the right.
2. WHEN the user clicks the copy button, THE Code_Block SHALL copy the text content of the `.codeblock__code` element to the system clipboard using the Clipboard API (`navigator.clipboard.writeText`).
3. WHEN the copy operation succeeds, THE Code_Block SHALL change the copy button label from "Copy" to "Copied!" for 2000 milliseconds, then revert to "Copy".
4. IF the Clipboard API is unavailable or the copy operation fails, THEN THE Code_Block SHALL fall back to a `document.execCommand('copy')` approach using a temporary textarea element.
5. THE Code_Block copy button SHALL follow the ghost button styling pattern: transparent background, `var(--color-text-muted)` color, with hover state changing to `var(--color-text)` and `var(--surface-2)` background.
6. THE Code_Block copy button SHALL have `aria-label="Copy code"` and update to `aria-label="Copied"` during the success feedback period.

### Requirement 3: Code Block Card — JavaScript Behavior

**User Story:** As a developer integrating the code block, I want the component JavaScript to follow the existing IIFE pattern, so that it initializes automatically and works without build tools.

#### Acceptance Criteria

1. THE Code_Block JavaScript SHALL be implemented as an IIFE following the pattern established by `modal.js`, `sidebar.js`, and `navigation.js`.
2. THE Code_Block JavaScript SHALL initialize all `.codeblock__copy` buttons on DOMContentLoaded by querying `document.querySelectorAll('.codeblock__copy')`.
3. THE Code_Block JavaScript SHALL locate the associated `.codeblock__code` element by traversing from the copy button to the closest `.codeblock` ancestor and querying within it.
4. THE Code_Block JavaScript file SHALL be located at `components/codeblock/codeblock.js` following the directory-per-component convention.

### Requirement 4: Code Block Card — Demo Showcase

**User Story:** As a developer evaluating the design system, I want to see code block examples in the demo page, so that I can understand how the component looks and behaves.

#### Acceptance Criteria

1. THE Demo_Page SHALL include a section titled "Code Block" that displays at least three code block examples with different programming languages (JavaScript, TypeScript, and one additional language).
2. THE Demo_Page SHALL show code block examples with realistic, representative code snippets of at least 5 lines each.
3. THE Demo_Page SHALL include at least one code block example with a line long enough to demonstrate horizontal scrolling behavior.

### Requirement 5: Tabs Component — Structure and Styling

**User Story:** As a developer, I want a tabs component with horizontal tab navigation, so that I can organize content into switchable panels.

#### Acceptance Criteria

1. THE Tabs SHALL render a container with the class `.tabs` containing a tab list (`.tabs__list`) and one or more tab panels (`.tabs__panel`).
2. THE Tabs tab list SHALL use `role="tablist"` and each tab button SHALL use `role="tab"` with `aria-selected` indicating the active state.
3. THE Tabs SHALL render each tab panel with `role="tabpanel"`, `aria-labelledby` referencing the associated tab, and `tabindex="0"` for keyboard accessibility.
4. THE Tabs active tab SHALL be visually distinguished using the class `.tabs__tab--active` with a bottom border indicator of `2px solid var(--color-text)` and `var(--font-semibold)` weight.
5. THE Tabs inactive tabs SHALL use `var(--color-text-secondary)` color with hover state changing to `var(--color-text)`.
6. THE Tabs tab list SHALL support horizontal scrolling via `overflow-x: auto` when tabs exceed the container width, without truncating tab text or wrapping to a new line.
7. THE Tabs tab list SHALL hide the scrollbar visually using `scrollbar-width: none` and `::-webkit-scrollbar { display: none }` while maintaining scroll functionality.

### Requirement 6: Tabs Component — Keyboard Navigation

**User Story:** As a keyboard user, I want to navigate between tabs using arrow keys, so that I can switch tabs without using a mouse.

#### Acceptance Criteria

1. THE Tabs SHALL implement Roving_Tabindex where the active tab has `tabindex="0"` and all other tabs have `tabindex="-1"`.
2. WHEN the user presses the ArrowRight key while a tab has focus, THE Tabs SHALL move focus to the next tab, wrapping to the first tab after the last.
3. WHEN the user presses the ArrowLeft key while a tab has focus, THE Tabs SHALL move focus to the previous tab, wrapping to the last tab after the first.
4. WHEN the user presses Enter or Space on a focused tab, THE Tabs SHALL activate that tab, showing its associated panel and hiding all other panels.
5. WHEN a tab is activated, THE Tabs SHALL set `aria-selected="true"` on the active tab, `aria-selected="false"` on all other tabs, show the associated panel, and hide all other panels.

### Requirement 7: Tabs Component — JavaScript and Demo

**User Story:** As a developer, I want the tabs component to initialize automatically and be showcased in the demo, so that I can see it working and integrate it easily.

#### Acceptance Criteria

1. THE Tabs JavaScript SHALL be implemented as an IIFE following the established component pattern, located at `components/tabs/tabs.js`.
2. THE Tabs JavaScript SHALL initialize all `.tabs` containers on DOMContentLoaded.
3. THE Demo_Page SHALL include a section titled "Tabs" that displays at least one tabs example with three or more tab panels containing representative content.
4. THE Demo_Page SHALL include a tabs example demonstrating horizontal scroll behavior with enough tabs to overflow the container on standard viewport widths.

### Requirement 8: Modal Playground — Interactive Demo

**User Story:** As a developer evaluating the design system, I want an interactive modal playground in the demo page, so that I can test different modal configurations without modifying code.

#### Acceptance Criteria

1. THE Demo_Page SHALL include a section titled "Modal — Playground" that provides buttons to open modals with different configurations.
2. THE Demo_Page SHALL provide at least three modal configuration options: a default modal with header, body, and footer; a modal without footer; and a compact modal with reduced max-width.
3. WHEN the user clicks a modal trigger button in the playground, THE Demo_Page SHALL open the corresponding modal using the existing `showModal()` pattern.
4. THE Demo_Page SHALL include the necessary `<dialog>` elements for each modal configuration, each with a unique `id` and the existing `.modal` class structure.

### Requirement 9: Button Press Animation

**User Story:** As a user interacting with buttons, I want a subtle press animation when I click a button, so that the interface feels responsive and tactile.

#### Acceptance Criteria

1. THE Button SHALL apply `transform: scale(0.97)` on the `:active` state for all button variants, providing a subtle press-down effect.
2. THE Button `:active` state SHALL only apply when the button is not disabled, using the selector `.button:active:not([disabled])`.
3. THE Button SHALL include `transform` in its existing `transition` property with `150ms ease` timing, consistent with the existing transition for `background-color`, `color`, and `border-color`.
4. THE Button press animation SHALL apply to all button variants including primary, secondary, ghost, destructive, semantic colors, outline, inverted, icon-only, and shadow variants without requiring additional CSS rules per variant.

### Requirement 10: Spacing Utilities — Margin and Padding

**User Story:** As a developer, I want utility classes for margin and padding, so that I can make quick spacing adjustments between components without writing custom CSS.

#### Acceptance Criteria

1. THE Spacing_Utilities SHALL provide margin utility classes following the pattern `.m-{scale}` for all sides, `.mt-{scale}`, `.mr-{scale}`, `.mb-{scale}`, `.ml-{scale}` for individual sides, and `.mx-{scale}`, `.my-{scale}` for horizontal and vertical axes, where `{scale}` corresponds to the spacing token scale values (1, 2, 3, 4, 6, 8, 12, 16, 24).
2. THE Spacing_Utilities SHALL provide padding utility classes following the same pattern as margin: `.p-{scale}`, `.pt-{scale}`, `.pr-{scale}`, `.pb-{scale}`, `.pl-{scale}`, `.px-{scale}`, `.py-{scale}` for the same scale values.
3. THE Spacing_Utilities SHALL provide `.mx-auto` for horizontal centering via `margin-left: auto; margin-right: auto`.
4. THE Spacing_Utilities SHALL provide `.m-0` and `.p-0` for resetting margin and padding to zero.
5. THE Spacing_Utilities SHALL reference the existing spacing tokens (`var(--space-1)` through `var(--space-24)`) as values, maintaining consistency with the design system token scale.

### Requirement 11: Spacing Utilities — Gap

**User Story:** As a developer using flexbox and grid layouts, I want gap utility classes, so that I can control spacing between child elements without margin hacks.

#### Acceptance Criteria

1. THE Spacing_Utilities SHALL provide gap utility classes following the pattern `.gap-{scale}` for the spacing token scale values (1, 2, 3, 4, 6, 8, 12, 16, 24).
2. THE Spacing_Utilities SHALL provide `.gap-x-{scale}` and `.gap-y-{scale}` for controlling column-gap and row-gap independently.

### Requirement 12: Spacing Utilities — Demo Showcase

**User Story:** As a developer evaluating the design system, I want to see the spacing utilities visualized in the demo, so that I can understand the available scale and how to use the classes.

#### Acceptance Criteria

1. THE Demo_Page SHALL include a section titled "Spacing Utilities" that visually demonstrates the spacing scale using colored blocks with different margin or padding values applied.
2. THE Demo_Page SHALL show examples of margin, padding, and gap utilities applied to real elements, demonstrating the visual effect of each scale step.

### Requirement 13: Header Component — Structure and Styling

**User Story:** As a developer, I want a page header component, so that I can build consistent page layouts with a top navigation bar that aligns with the sidebar.

#### Acceptance Criteria

1. THE Header SHALL render a `<header>` element with the class `.header` containing a brand area (`.header__brand`), a content area (`.header__content`), and an actions area (`.header__actions`).
2. THE Header SHALL use `display: flex`, `align-items: center`, and `justify-content: space-between` for horizontal layout with `var(--space-3) var(--space-6)` padding, consistent with the Navigation component.
3. THE Header SHALL apply a bottom border of `1px solid var(--border-default-color)` and `var(--background)` as background color.
4. THE Header brand area SHALL use `var(--text-base)` size, `var(--font-semibold)` weight, and `var(--color-text)` color, matching the Sidebar brand styling.
5. THE Header actions area SHALL use `display: flex`, `align-items: center`, and `gap: var(--space-3)` for action button layout.

### Requirement 14: Header Component — Sidebar Alignment Variant

**User Story:** As a developer building layouts with a sidebar, I want the header to align with the sidebar, so that the brand label in the header aligns with the sidebar brand and the content area starts after the sidebar width.

#### Acceptance Criteria

1. THE Header SHALL provide a variant `.header--sidebar-aligned` that applies `padding-left` equal to `var(--sidebar-width, 16rem)` to offset the header content past the sidebar.
2. WHILE the viewport has a width less than 768px, THE Header with variant `.header--sidebar-aligned` SHALL remove the sidebar offset and use standard padding, since the sidebar is hidden on mobile.
3. THE Header SHALL provide a variant `.header--full` that spans the full viewport width without any sidebar offset, using standard padding on both sides.

### Requirement 15: Header Component — Demo Showcase

**User Story:** As a developer evaluating the design system, I want to see header examples in the demo, so that I can understand the available variants and how they integrate with the sidebar.

#### Acceptance Criteria

1. THE Demo_Page SHALL include a section titled "Header" that displays at least two header examples: a full-width header and a sidebar-aligned header.
2. THE Demo_Page SHALL render header examples inside a bordered container to demonstrate the layout without affecting the actual page header.

### Requirement 16: Sidebar — Text-Only Variant Demo

**User Story:** As a developer, I want to see a sidebar example with text-only links (no icons), so that I can understand how the sidebar looks in a simpler configuration.

#### Acceptance Criteria

1. THE Demo_Page SHALL include an additional sidebar example within the existing Sidebar demo section that shows links without icons, using only text content inside `.sidebar__link` elements.
2. THE Demo_Page text-only sidebar example SHALL use the same `.sidebar__link` class and BEM structure as the icon variant, demonstrating that no additional CSS is required for text-only links.

### Requirement 17: Responsive Grid Layout System — Column Grid

**User Story:** As a developer, I want a 12-column responsive grid system, so that I can create flexible layouts that adapt to different screen sizes.

#### Acceptance Criteria

1. THE Grid_System SHALL provide a grid container class `.grid` that applies `display: grid` with `grid-template-columns: repeat(12, 1fr)` and `gap: var(--space-4)` as default gap.
2. THE Grid_System SHALL provide column span classes `.col-1` through `.col-12` that apply `grid-column: span {n}` for the corresponding number of columns.
3. THE Grid_System SHALL provide responsive column span classes using the pattern `.sm\:col-{n}`, `.md\:col-{n}`, and `.lg\:col-{n}` that apply at the breakpoints `640px`, `768px`, and `1024px` respectively, using `min-width` media queries.
4. THE Grid_System SHALL provide a `.col-full` class that applies `grid-column: 1 / -1` to span all 12 columns.

### Requirement 18: Responsive Grid Layout System — Flex Helpers and Auto Grid

**User Story:** As a developer, I want flex-based row/column helpers and an auto-fit grid, so that I can create common layout patterns without writing custom CSS.

#### Acceptance Criteria

1. THE Grid_System SHALL provide a `.row` class that applies `display: flex` and `flex-wrap: wrap` with `gap: var(--space-4)` as default gap.
2. THE Grid_System SHALL provide a `.col` class that applies `flex: 1 1 0%` for equal-width flex children.
3. THE Grid_System SHALL provide a `.grid-auto` class that applies `display: grid` with `grid-template-columns: repeat(auto-fit, minmax(var(--grid-auto-min, 280px), 1fr))` for automatic responsive columns, with the minimum width configurable via the `--grid-auto-min` custom property.
4. THE Grid_System SHALL provide stacking utilities `.stack-v` (vertical) and `.stack-h` (horizontal) that apply `display: flex` with `flex-direction: column` and `flex-direction: row` respectively, with `gap: var(--space-4)` as default gap.
5. THE Grid_System stacking utilities SHALL support configurable gap via the spacing gap utilities (`.gap-{scale}`).

### Requirement 19: Responsive Grid Layout System — Demo Showcase

**User Story:** As a developer evaluating the design system, I want to see the grid system demonstrated with real components, so that I can understand how to build responsive layouts.

#### Acceptance Criteria

1. THE Demo_Page SHALL include a section titled "Grid System" that demonstrates the 12-column grid with cards or colored blocks showing different column span configurations.
2. THE Demo_Page SHALL demonstrate responsive behavior by showing a grid that changes column spans at different breakpoints (e.g., full-width on mobile, 2 columns on medium, 3 columns on large).
3. THE Demo_Page SHALL demonstrate the `.grid-auto` auto-fit grid with a set of cards that automatically reflow based on available width.
4. THE Demo_Page SHALL demonstrate the `.stack-v` and `.stack-h` stacking utilities with example content.

### Requirement 20: File System Integration

**User Story:** As a developer of the design system, I want all new components to follow the existing file structure, so that the project maintains its modular organization.

#### Acceptance Criteria

1. THE Code_Block SHALL have its CSS in `components/codeblock/codeblock.css` and its JavaScript in `components/codeblock/codeblock.js`, following the directory-per-component convention.
2. THE Tabs SHALL have its CSS in `components/tabs/tabs.css` and its JavaScript in `components/tabs/tabs.js`, following the directory-per-component convention.
3. THE Header SHALL have its CSS in `components/header/header.css`, following the directory-per-component convention.
4. THE Spacing_Utilities SHALL have their CSS in `utilities/spacing.css`, following the utilities directory convention.
5. THE Grid_System SHALL have its CSS in `utilities/grid.css`, following the utilities directory convention.
6. THE `index.css` file SHALL import the new component CSS files in the appropriate sections, maintaining the existing import order.
7. THE Demo_Page SHALL include all new styles inlined in the `<style>` block and all new scripts inlined in the `<script>` block, maintaining `file://` compatibility.

### Requirement 21: Theme Compatibility

**User Story:** As a user, I want all new components to work correctly in both light and dark themes, so that the visual experience is coherent when switching themes.

#### Acceptance Criteria

1. THE Code_Block, Tabs, Header, Spacing_Utilities, and Grid_System SHALL function correctly in light and dark themes by using exclusively semantic tokens that are redefined in `themes/dark.css`, without component-specific `.theme-dark` rules.
2. IF a new component requires a semantic token that does not exist in the current system, THEN THE component SHALL define the token in `:root` and redefine it in `.theme-dark` within `themes/dark.css` before using it.
3. THE Demo_Page SHALL allow visual verification of all new components in both themes via the existing Theme_Switcher.

### Requirement 22: Accessibility

**User Story:** As a user with a disability, I want all new components to be accessible via keyboard and screen readers, so that I can use the interface without barriers.

#### Acceptance Criteria

1. THE Tabs SHALL use the correct ARIA roles (`tablist`, `tab`, `tabpanel`) with `aria-selected`, `aria-controls`, and `aria-labelledby` attributes properly connected.
2. THE Tabs SHALL be fully navigable by keyboard using arrow keys for tab switching and Tab key to move into the active panel content.
3. THE Code_Block copy button SHALL have an accessible label (`aria-label`) that updates to reflect the current state (copy available vs. copied).
4. THE Header SHALL use the semantic `<header>` element for proper document structure.
5. WHEN a Button receives a press animation on `:active`, THE Button SHALL maintain its existing `:focus-visible` outline without the scale transform interfering with the focus ring visibility.
6. THE Grid_System and Spacing_Utilities SHALL not introduce any accessibility barriers, as they are purely presentational layout utilities.

