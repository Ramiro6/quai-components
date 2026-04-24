import { Route } from '@angular/router';

export const TAB_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./tabs').then((m) => m.ContainerTab),
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        loadComponent: () =>
          import('./views/overview/overview-tab').then((m) => m.OverviewTab),
      },
      {
        path: 'api',
        loadComponent: () =>
          import('./views/api/api-tab').then((m) => m.ApiTab),
      },
      {
        path: 'example',
        loadComponent: () =>
          import('./views/example/example-tab').then((m) => m.ExampleTab),
      },
    ],
  },
];
