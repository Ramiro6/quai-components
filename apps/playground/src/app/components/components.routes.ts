import { Route } from '@angular/router';

export const COMPONENTS_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./components-container').then((m) => m.ComponentsContainer),
    children: [
      {
        path: 'buttons',
        loadChildren: () => import('./button/buttons.routes').then((m) => m.BUTTON_ROUTES),
      },
      {
        path: 'text',
        loadChildren: () => import('./text/texts.routes').then((m) => m.TEXT_ROUTES),
      },
      {
        path: 'tab',
        loadChildren: () => import('./tab/tabs.routes').then((m) => m.TAB_ROUTES),
      },
      {
        path: 'nav-menu',
        loadChildren: () => import('./nav-menu/nav-menu.routes').then((m) => m.NAV_MENU_ROUTES),
      },
      {
        path: 'codeblock',
        loadChildren: () => import('./codeblock/codeblock.routes').then((m) => m.CODEBLOCK_ROUTES),
      },
      {
        path: 'layout',
        loadChildren: () => import('./layout/layouts.routes').then((m) => m.LAYOUT_ROUTES),
      },
    ],
  },
];
