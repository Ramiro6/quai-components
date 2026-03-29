import { Route } from '@angular/router';

export const COMPONENTS_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./components').then((m) => m.Components),
    children: [
      {
        path: 'buttons',
        loadChildren: () => import('./button/buttons.routes').then((m) => m.BUTTON_ROUTES),
      },
    ],
  },
];
