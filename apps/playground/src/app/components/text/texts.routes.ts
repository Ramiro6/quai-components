import { Route } from '@angular/router';

export const TEXT_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./texts').then((m) => m.ContainerText),
    children: [
      {
        path: '',
        redirectTo: 'example',
        pathMatch: 'full',
      },
      {
        path: 'example',
        loadComponent: () => import('./views/example/example-text').then((m) => m.ExampleText),
      },
    ],
  },
];
