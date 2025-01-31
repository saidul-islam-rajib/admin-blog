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
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadComponent: () => import('./educations/educations.component').then(m => m.EducationsComponent),
        data: {
          title: 'List'
        }
      },
      {
        path: 'add',
        loadComponent: () => import('./educations/add-education/add-education.component').then(m => m.AddEducationComponent),
        data: {
          title: 'Add'
        }
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./educations/edit-education/edit-education.component').then(m => m.EditEducationComponent),
        data: {
          title: 'Edit'
        }
      },
    ]
  },
];
