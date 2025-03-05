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
          import('./add-edit-interest/add-edit-interest.component').then(
            (m) => m.AddEditInterestComponent
          ),
        data: {
          title: 'Add'
        }
      }
    ],
  },
];
