import { Route } from '@angular/router';

export const TEXT_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./texts').then((m) => m.ContainerText),
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        loadComponent: () => import('./views/overview/overview-text').then((m) => m.OverviewText),
      },
      {
        path: 'api',
        loadComponent: () => import('./views/api/api-text').then((m) => m.ApiText),
      },
      {
        path: 'example',
        loadComponent: () => import('./views/example/example-text').then((m) => m.ExampleText),
      },
    ],
  },
];
