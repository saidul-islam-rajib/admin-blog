import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Interest',
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        loadComponent: () =>
          import('./interests.component').then(
            (m) => m.InterestsComponent
          ),
        data: {
          title: 'List'
        }
      },
      {
        path: 'add',
        loadComponent: () =>
          import('./add-interest/add-interest.component').then(
            (m) => m.AddInterestComponent
          ),
        data: {
          title: 'Add'
        }
      }
    ],
  },
];
