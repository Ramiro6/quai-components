import { InjectionToken } from '@angular/core';
import { QuaiThemeProviderConfig } from './quai-theme.config';

export const QUAI_THEME_TOKEN = new InjectionToken<QuaiThemeProviderConfig>(
  'QUAI_THEME_TOKEN'
);
