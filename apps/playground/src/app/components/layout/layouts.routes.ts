import { Route } from '@angular/router';

export const LAYOUT_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./layouts').then((m) => m.ContainerLayout),
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        loadComponent: () =>
          import('./views/overview/overview-layout').then((m) => m.OverviewLayout),
      },
      {
        path: 'api',
        loadComponent: () =>
          import('./views/api/api-layout').then((m) => m.ApiLayout),
      },
      {
        path: 'example',
        loadComponent: () =>
          import('./views/example/example-layout').then((m) => m.ExampleLayout),
      },
    ],
  },
];
