import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./start').then((m) => m.Start),
  },
  {
    path: 'playground',
    loadComponent: () => import('./playground/playground').then((m) => m.Playground),
  },
  {
    path: 'components',
    loadChildren: () => import('./components/components.routes').then((m) => m.COMPONENTS_ROUTES),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
