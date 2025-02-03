import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Hobby',
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
          import('./hobbies.component').then(
            (m) => m.HobbiesComponent
          ),
        data: {
          title: 'List'
        }
      },
      {
        path: 'add',
        loadComponent: () =>
          import('./add-hobby/add-hobby.component').then(
            (m) => m.AddHobbyComponent
          ),
        data: {
          title: 'Add'
        }
      }
    ],
  },
];
