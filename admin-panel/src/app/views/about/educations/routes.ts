import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Education',
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
          import('./educations.component').then(
            (m) => m.EducationsComponent
          ),
        data: {
          title: 'List',
        },
      },
      {
        path: 'add',
        loadComponent: () =>
          import('./add-edit-education/add-edit-education.component').then(
            (m) => m.AddEditEducationComponent
          ),
        data: {
          title: 'Add',
        },
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./add-edit-education/add-edit-education.component').then(
            (m) => m.AddEditEducationComponent
          ),
        data: {
          title: 'Edit',
        },
      },
    ],
  },
];
