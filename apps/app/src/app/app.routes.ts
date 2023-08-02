import { Route } from '@angular/router';
import { authGuard } from '@base/client/auth';

export const appRoutes: Route[] = [
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () => import('@base/client/store').then((m) => m.StoreModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('@base/client/auth').then((m) => m.AuthModule),
  },
];
