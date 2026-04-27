import { Route } from '@angular/router';

export const CODEBLOCK_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./codeblock').then((m) => m.ContainerCodeblock),
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        loadComponent: () => import('./views/overview/overview-codeblock').then((m) => m.OverviewCodeblock),
      },
      {
        path: 'api',
        loadComponent: () => import('./views/api/api-codeblock').then((m) => m.ApiCodeblock),
      },
      {
        path: 'example',
        loadComponent: () => import('./views/example/example-codeblock').then((m) => m.ExampleCodeblock),
      },
    ],
  },
];
