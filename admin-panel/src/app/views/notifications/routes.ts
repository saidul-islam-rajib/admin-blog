import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Notifications'
    },
    children: [
      {
        path: '',
        redirectTo: 'badges',
        pathMatch: 'full'
      },
      {
        path: 'toasts',
        loadComponent: () => import('./toasters/toasters.component').then(m => m.ToastersComponent),
        data: {
          title: 'Toasts'
        }
      }
    ]
  }
];
