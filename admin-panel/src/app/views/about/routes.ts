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
        redirectTo: 'education',
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
      }
    ]
  },
];
