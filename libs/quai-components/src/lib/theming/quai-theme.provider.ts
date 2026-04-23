import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { QUAI_THEME_TOKEN } from './quai-theme.token';
import { QuaiThemeService } from './quai-theme.service';
import { QuaiThemeProviderConfig } from './quai-theme.config';

/**
 * Provider function to enable theming for Quai components.
 * Use in your app.config.ts:
 *
 * @example
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideQuaiTheme({
 *       defaultScheme: 'auto',
 *       themes: {
 *         light: { primary: 'oklch(55% 0.15 290)', background: '...' },
 *         dark: { primary: 'oklch(78% 0.17 210)', background: '...' },
 *       }
 *     }),
 *     // ... other providers
 *   ]
 * };
 */
export function provideQuaiTheme(
  config: QuaiThemeProviderConfig
): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: QUAI_THEME_TOKEN,
      useValue: config,
    },
    QuaiThemeService, // Automatically initialize the theme service
  ]);
}
