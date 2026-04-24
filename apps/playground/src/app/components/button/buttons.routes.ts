import { Route } from '@angular/router';

export const BUTTON_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./buttons').then((m) => m.ContainerButton),
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        loadComponent: () => import('./views/overview/overview-button').then((m) => m.OverviewButton),
      },
      {
        path: 'api',
        loadComponent: () => import('./views/api/api-button').then((m) => m.ApiButton),
      },
      {
        path: 'example',
        loadComponent: () => import('./views/example/example-button').then((m) => m.ExampleButton),
      },
    ],
  },
];
