import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideErrorLabels } from '@quai/quai-components';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideErrorLabels({}),
    // provideQuaiTheme({
    //   defaultScheme: 'auto',
    //   themes: {
    //     light: {
    //       /* Light theme — uses defaults from CSS vars */
    //     },
    //     dark: {
    //       /* Dark theme — uses defaults from CSS vars */
    //     },
    //     midnight: {
    //       /* Custom midnight theme */
    //       background: 'oklch(3% 0.002 270)',
    //       surface1: 'oklch(8% 0.003 270)',
    //       surface2: 'oklch(12% 0.004 270)',
    //       text: 'oklch(98% 0.001 270)',
    //       textSecondary: 'oklch(75% 0.005 270)',
    //       textMuted: 'oklch(55% 0.01 270)',
    //       primary: 'oklch(65% 0.18 180)',
    //       accent: 'oklch(70% 0.16 40)',
    //     },
    //     ocean: {
    //       /* Custom ocean theme */
    //       background: 'oklch(96% 0.006 200)',
    //       surface1: 'oklch(93% 0.008 200)',
    //       surface2: 'oklch(100% 0.000 0)',
    //       text: 'oklch(25% 0.02 200)',
    //       textSecondary: 'oklch(45% 0.015 200)',
    //       textMuted: 'oklch(60% 0.01 200)',
    //       primary: 'oklch(52% 0.18 200)',
    //       accent: 'oklch(60% 0.14 180)',
    //     },
    //   },
    // }),
    provideZonelessChangeDetection(),
    provideRouter(appRoutes),
  ],
};
