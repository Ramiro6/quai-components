// import { Injectable, Inject, signal, effect, DOCUMENT } from '@angular/core';
// import { QUAI_THEME_TOKEN } from './quai-theme.token';
// import { QuaiTheme, QuaiThemeProviderConfig } from './quai-theme.config';
//
// /**
//  * Service that manages theme switching and applies CSS custom properties.
//  * Handles color scheme changes (light/dark) and custom token overrides.
//  */
// @Injectable({ providedIn: 'root' })
// export class QuaiThemeService {
//   private config: QuaiThemeProviderConfig;
//   private htmlElement: HTMLElement;
//
//   /**
//    * Current active theme name. 'light' and 'dark' are built-in.
//    */
//   private activeThemeName = signal<string>('light');
//
//   /**
//    * Current color scheme ('light' or 'dark').
//    */
//   private colorScheme = signal<'light' | 'dark'>('light');
//
//   /**
//    * Merged theme tokens (base theme + overrides).
//    */
//   private mergedTheme = signal<Partial<QuaiTheme>>({});
//
//   /**
//    * Style element for injecting computed CSS custom properties.
//    */
//   private styleElement: HTMLStyleElement | null = null;
//
//   constructor(
//     @Inject(DOCUMENT) private document: Document,
//     @Inject(QUAI_THEME_TOKEN) config: QuaiThemeProviderConfig
//   ) {
//     this.config = config;
//     this.htmlElement = this.document.documentElement;
//
//     // Initialize color scheme based on config
//     this.initializeColorScheme();
//
//     // Create effect to apply theme whenever it changes
//     effect(() => {
//       this.applyTheme(this.activeThemeName(), this.config.overrides || {});
//     });
//   }
//
//   /**
//    * Determine and apply the initial color scheme.
//    */
//   private initializeColorScheme(): void {
//     const defaultScheme = this.config.defaultScheme || 'auto';
//
//     if (defaultScheme === 'auto') {
//       // Check OS preference
//       const prefersDark = this.document.defaultView?.matchMedia(
//         '(prefers-color-scheme: dark)'
//       ).matches;
//       this.colorScheme.set(prefersDark ? 'dark' : 'light');
//
//       // Listen for OS preference changes
//       this.document.defaultView?.matchMedia('(prefers-color-scheme: dark)').addEventListener(
//         'change',
//         (e) => {
//           this.colorScheme.set(e.matches ? 'dark' : 'light');
//           this.activeThemeName.set(e.matches ? 'dark' : 'light');
//         }
//       );
//     } else {
//       this.colorScheme.set(defaultScheme);
//       this.activeThemeName.set(defaultScheme);
//     }
//   }
//
//   /**
//    * Switch to a different theme.
//    */
//   switchTheme(themeName: string): void {
//     if (this.config.themes?.[themeName]) {
//       this.activeThemeName.set(themeName);
//     }
//   }
//
//   /**
//    * Get the list of available themes.
//    */
//   getAvailableThemes(): string[] {
//     return Object.keys(this.config.themes || {});
//   }
//
//   /**
//    * Get the current active theme name.
//    */
//   getActiveThemeName(): string {
//     return this.activeThemeName();
//   }
//
//   /**
//    * Apply a theme by merging base theme + overrides and injecting CSS custom properties.
//    */
//   private applyTheme(themeName: string, overrides: Partial<QuaiTheme>): void {
//     // Get base theme from config
//     const baseTheme = this.config.themes?.[themeName] || {};
//
//     // Merge base + overrides
//     const merged = { ...baseTheme, ...overrides };
//     this.mergedTheme.set(merged);
//
//     // Apply to DOM
//     this.injectThemeAsCSS(merged);
//
//     // Update data-theme attribute on <html>
//     if (themeName === 'light' || themeName === 'dark') {
//       this.htmlElement.setAttribute('data-theme', themeName);
//     }
//   }
//
//   /**
//    * Convert theme object to CSS custom properties and inject into <style> tag.
//    */
//   private injectThemeAsCSS(theme: Partial<QuaiTheme>): void {
//     // Create or reuse style element
//     if (!this.styleElement) {
//       this.styleElement = this.document.createElement('style');
//       this.styleElement.id = 'quai-theme-overrides';
//       this.document.head.appendChild(this.styleElement);
//     }
//
//     // Map theme keys to CSS custom properties
//     const cssVariables = this.themeToCSS(theme);
//
//     // Build CSS text
//     const cssText = `:root { ${cssVariables.join('; ')}; }`;
//
//     // Inject into style element
//     this.styleElement.textContent = cssText;
//   }
//
//   /**
//    * Convert theme object keys/values to CSS custom property declarations.
//    */
//   private themeToCSS(theme: Partial<QuaiTheme>): string[] {
//     const declarations: string[] = [];
//
//     // Mapping of theme config keys to CSS custom property names
//     const keyMap: Record<keyof QuaiTheme, string> = {
//       /* Colors */
//       background: '--quai-background',
//       surface1: '--quai-surface-1',
//       surface2: '--quai-surface-2',
//       text: '--quai-color-text',
//       textSecondary: '--quai-color-text-secondary',
//       textMuted: '--quai-color-text-muted',
//       primary: '--quai-color-primary',
//       primaryForeground: '--quai-color-primary-foreground',
//       accent: '--quai-accent',
//       accentSubtle: '--quai-accent-subtle',
//       success: '--quai-color-success',
//       successSubtle: '--quai-color-success-subtle',
//       error: '--quai-color-error',
//       errorSubtle: '--quai-color-error-subtle',
//       warning: '--quai-color-warning',
//       warningSubtle: '--quai-color-warning-subtle',
//       info: '--quai-color-info',
//       infoSubtle: '--quai-color-info-subtle',
//
//       /* Typography */
//       fontFamily: '--quai-font-family',
//       fontRegular: '--quai-font-regular',
//       fontMedium: '--quai-font-medium',
//       fontSemibold: '--quai-font-semibold',
//       textXs: '--quai-text-xs',
//       textSm: '--quai-text-sm',
//       textBase: '--quai-text-base',
//       textLg: '--quai-text-lg',
//       textXl: '--quai-text-xl',
//       text2xl: '--quai-text-2xl',
//       leadingTight: '--quai-leading-tight',
//       leadingUi: '--quai-leading-ui',
//       leadingBody: '--quai-leading-body',
//       trackingTight: '--quai-tracking-tight',
//       trackingNormal: '--quai-tracking-normal',
//       trackingWide: '--quai-tracking-wide',
//
//       /* Spacing */
//       space1: '--quai-space-1',
//       space2: '--quai-space-2',
//       space3: '--quai-space-3',
//       space4: '--quai-space-4',
//       space5: '--quai-space-5',
//       space6: '--quai-space-6',
//       space8: '--quai-space-8',
//       space10: '--quai-space-10',
//       space12: '--quai-space-12',
//       space16: '--quai-space-16',
//
//       /* Shape */
//       radiusSm: '--quai-radius-sm',
//       radiusMd: '--quai-radius-md',
//       radiusLg: '--quai-radius-lg',
//       radiusFull: '--quai-radius-full',
//       shadowFloat: '--quai-shadow-float',
//     };
//
//     // Convert theme to CSS declarations
//     for (const [key, cssVar] of Object.entries(keyMap) as Array<
//       [keyof QuaiTheme, string]
//     >) {
//       const value = theme[key];
//       if (value !== undefined && value !== null) {
//         declarations.push(`${cssVar}: ${value}`);
//       }
//     }
//
//     return declarations;
//   }
// }
