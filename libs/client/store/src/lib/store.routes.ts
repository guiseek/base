import { Route } from '@angular/router';
import { StoreContainer } from './store.container';
import { DashboardContainer, ProductsContainer } from './containers';

export const storeRoutes: Route[] = [
  {
    path: '',
    component: StoreContainer,
    children: [
      {
        path: '',
        component: DashboardContainer,
      },
      {
        path: 'products',
        component: ProductsContainer,
      },
    ],
  },
];
