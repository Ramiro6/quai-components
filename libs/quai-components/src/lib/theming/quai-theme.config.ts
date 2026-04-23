/**
 * Theme configuration for Quai components.
 * Define colors, typography, and spacing for your theme.
 */
export interface QuaiThemeColorConfig {
  /* Backgrounds */
  background?: string;
  surface1?: string;
  surface2?: string;

  /* Text */
  text?: string;
  textSecondary?: string;
  textMuted?: string;

  /* Brand */
  primary?: string;
  primaryForeground?: string;
  accent?: string;
  accentSubtle?: string;

  /* Status */
  success?: string;
  successSubtle?: string;
  error?: string;
  errorSubtle?: string;
  warning?: string;
  warningSubtle?: string;
  info?: string;
  infoSubtle?: string;
}

export interface QuaiThemeTypographyConfig {
  fontFamily?: string;
  fontRegular?: number;
  fontMedium?: number;
  fontSemibold?: number;
  textXs?: string;
  textSm?: string;
  textBase?: string;
  textLg?: string;
  textXl?: string;
  text2xl?: string;
  leadingTight?: number;
  leadingUi?: number;
  leadingBody?: number;
  trackingTight?: string;
  trackingNormal?: string;
  trackingWide?: string;
}

export interface QuaiThemeSpacingConfig {
  space1?: string;
  space2?: string;
  space3?: string;
  space4?: string;
  space5?: string;
  space6?: string;
  space8?: string;
  space10?: string;
  space12?: string;
  space16?: string;
}

export interface QuaiThemeShapeConfig {
  radiusSm?: string;
  radiusMd?: string;
  radiusLg?: string;
  radiusFull?: string;
  shadowFloat?: string;
}

/**
 * Complete theme definition combining all token categories.
 */
export interface QuaiTheme
  extends QuaiThemeColorConfig,
    QuaiThemeTypographyConfig,
    QuaiThemeSpacingConfig,
    QuaiThemeShapeConfig {}

/**
 * Theme provider configuration.
 */
export interface QuaiThemeProviderConfig {
  /**
   * Default color scheme: 'light' | 'dark' | 'auto'
   * - 'light': Always use light theme
   * - 'dark': Always use dark theme
   * - 'auto': Follow OS preference (default)
   */
  defaultScheme?: 'light' | 'dark' | 'auto';

  /**
   * Predefined themes keyed by name.
   * Example: { light: {...}, dark: {...}, midnight: {...} }
   */
  themes?: Record<string, Partial<QuaiTheme>>;

  /**
   * Override specific tokens in the current active theme.
   * Merged with the selected theme.
   */
  overrides?: Partial<QuaiTheme>;
}
