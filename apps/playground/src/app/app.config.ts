import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideErrorLabels } from '@quai/quai-components';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideErrorLabels({}),
    provideZonelessChangeDetection(),
    provideRouter(appRoutes),
  ],
};
