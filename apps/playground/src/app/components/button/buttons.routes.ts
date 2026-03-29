import { Route } from '@angular/router';

export const BUTTON_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./buttons').then((m) => m.ContainerButton),
    children: [
      {
        path: 'example',
        loadComponent: () => import('./views/example/example-button').then((m) => m.ExampleButton),
      },
    ],
  },
];
