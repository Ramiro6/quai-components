import { Route } from '@angular/router';

export const LIST_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./lists').then((m) => m.ContainerList),
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        loadComponent: () => import('./views/overview/overview-list').then((m) => m.OverviewList),
      },
      {
        path: 'api',
        loadComponent: () => import('./views/api/api-list').then((m) => m.ApiList),
      },
      {
        path: 'example',
        loadComponent: () => import('./views/example/example-list').then((m) => m.ExampleList),
      },
    ],
  },
];
