import { Route } from '@angular/router';
import { Dashboard } from './public/dashboard/dashboard';

export const appRoutes: Route[] = [
  { path: 'dashboard', component: Dashboard, loadChildren: () => import('./public/components/boundary-error-legacy/boundary-error-legacy.routes').then(mod => mod.boundaryErrorLegacyRoutes) },
  { path: '**', redirectTo: 'dashboard' },
];
